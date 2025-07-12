// Lokasi file: src/app/api/quests/verify/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { getNeynarClient } from '~/lib/neynar';
import { type Address } from 'viem';
import { checkTokenBalance, checkNftBalance } from '~/lib/viem';

export async function POST(request: NextRequest) {
  try {
    const { questId, userFid } = await request.json();
    if (!questId || !userFid) {
      return NextResponse.json({ success: false, message: 'Missing questId or userFid.' }, { status: 400 });
    }
    console.log(`[Verify] Received request for FID: ${userFid}, Quest ID: ${questId}`);

    const { data: quest, error: questError } = await supabase
      .from('quests').select('*').eq('id', questId).single();
      
    if (questError || !quest) {
      return NextResponse.json({ success: false, message: 'Quest not found.' }, { status: 404 });
    }
    console.log(`[Verify] Found quest: "${quest.title}"`);

    if (!quest.is_recurring) {
        const { data: existing } = await supabase.from('user_quest_completions')
            .select('id').eq('user_fid', userFid).eq('quest_id', questId).limit(1);
        if (existing && existing.length > 0) {
            return NextResponse.json({ success: false, message: 'Quest already completed.' });
        }
    }

    let isCompleted = false;
    const neynar = getNeynarClient();

    // --- LOGIKA VERIFIKASI UTAMA ---

    if (quest.verification_logic.startsWith('follow_fid:')) {
      const targetFid = parseInt(quest.verification_logic.split(':')[1]);
      const { users } = await neynar.fetchBulkUsers({ fids: [targetFid], viewerFid: userFid });

      if (users[0]?.viewer_context?.following) {
        isCompleted = true;
      } else {
        return NextResponse.json({ success: false, message: `Verification failed: You are not following the target user.` });
      }
    } else if (quest.verification_logic.startsWith('hold_token:') || quest.verification_logic.startsWith('hold_nft:')) {
      const { users } = await neynar.fetchBulkUsers({ fids: [userFid] });
      const wallets = users[0]?.verifications?.map(addr => addr as Address) ?? [];
      if (users[0]?.custody_address) {
        wallets.push(users[0].custody_address as Address);
      }

      if (wallets.length === 0) {
        return NextResponse.json({ success: false, message: 'Could not find a verified wallet for your Farcaster account.' });
      }

      let balanceCheckPassed = false;
      for (const userWallet of wallets) {
        if (balanceCheckPassed) break; // Jika sudah ditemukan, hentikan loop
        let hasBalance = false;
        
        if (quest.verification_logic.startsWith('hold_token:')) {
            const parts = quest.verification_logic.split(':');
            // =================================================================
            // ==== AWAL PERBAIKAN LOGIKA HOLD_TOKEN ====
            // =================================================================
            if (parts.length !== 4) throw new Error(`Invalid hold_token logic format. Expected 'hold_token:CHAIN:CONTRACT:AMOUNT:DECIMALS', got: ${quest.verification_logic}`);
            const [_, chainName, contractAddress, minAmount, decimals] = parts;
            hasBalance = await checkTokenBalance(chainName, userWallet, contractAddress as Address, minAmount, parseInt(decimals));
            // =================================================================
            // ==== AKHIR PERBAIKAN LOGIKA HOLD_TOKEN ====
            // =================================================================
        
        } else if (quest.verification_logic.startsWith('hold_nft:')) {
            const parts = quest.verification_logic.split(':');
            // =================================================================
            // ==== AWAL PERBAIKAN LOGIKA HOLD_NFT ====
            // =================================================================
            if (parts.length !== 3) throw new Error(`Invalid hold_nft logic format. Expected 'hold_nft:CHAIN:CONTRACT', got: ${quest.verification_logic}`);
            const [_, chainName, contractAddress] = parts;
            hasBalance = await checkNftBalance(chainName, userWallet, contractAddress as Address);
            // =================================================================
            // ==== AKHIR PERBAIKAN LOGIKA HOLD_NFT ====
            // =================================================================
        }

        if (hasBalance) {
          balanceCheckPassed = true;
        }
      }

      isCompleted = balanceCheckPassed;
      if (!isCompleted) {
          return NextResponse.json({ success: false, message: `Verification failed: You do not hold the required asset in any of your verified wallets.` });
      }
    } else if (quest.verification_logic.startsWith('share_link:')) {
        isCompleted = true;
    }

    if (isCompleted) {
      await supabase.from('user_quest_completions').insert({ user_fid: userFid, quest_id: quest.id }).throwOnError();
      await supabase.rpc('add_user_points', { p_user_fid: userFid, p_points_to_add: quest.points }).throwOnError();
      return NextResponse.json({ success: true, message: `Quest "${quest.title}" completed! You earned ${quest.points} points.` });
    }

    return NextResponse.json({ success: false, message: 'Verification logic not met or not recognized.' });

  } catch (error) {
    console.error('[VERIFY QUEST API CATCH BLOCK]', error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
