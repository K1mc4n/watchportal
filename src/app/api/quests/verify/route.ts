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
      console.error(`[Verify] Quest not found for ID: ${questId}. Error:`, questError);
      return NextResponse.json({ success: false, message: 'Quest not found.' }, { status: 404 });
    }
    console.log(`[Verify] Found quest: "${quest.title}" on chain: ${quest.chain}`);

    if (!quest.is_recurring) {
        const { data: existing } = await supabase.from('user_quest_completions')
            .select('id').eq('user_fid', userFid).eq('quest_id', questId).limit(1);
        if (existing && existing.length > 0) {
            return NextResponse.json({ success: false, message: 'Quest already completed.' });
        }
    }

    let isCompleted = false;
    const neynar = getNeynarClient();

    if (quest.verification_logic.startsWith('follow_fid:')) {
      // ... (logika follow tetap sama, tidak perlu diubah) ...
      const targetFid = parseInt(quest.verification_logic.split(':')[1]);
      if (isNaN(targetFid)) throw new Error('Invalid FID in verification_logic');
      
      const { users } = await neynar.fetchBulkUsers({ fids: [userFid], viewerFid: targetFid });

      if (users[0]?.viewer_context?.following) {
        isCompleted = true;
      } else {
        return NextResponse.json({ success: false, message: `Verification failed: You are not following the target user.` });
      }
    } else if (quest.verification_logic.startsWith('hold_token:') || quest.verification_logic.startsWith('hold_nft:')) {
      const { users } = await neynar.fetchBulkUsers({ fids: [userFid] });
      // Coba semua verifications/custody addresses
      const wallets = users[0]?.verifications?.map(addr => addr as Address) ?? [];
      if (users[0]?.custody_address) {
        wallets.push(users[0].custody_address as Address);
      }

      if (wallets.length === 0) {
        return NextResponse.json({ success: false, message: 'Could not find a verified wallet for your Farcaster account. Please add one to your profile.' });
      }
      
      let balanceCheckPassed = false;
      for (const userWallet of wallets) {
        if (quest.verification_logic.startsWith('hold_token:')) {
          const [_, contractAddress, minAmount, decimals] = quest.verification_logic.split(':');
          // ==== PERUBAHAN DI SINI: Kirim `quest.chain` ke fungsi checker ====
          const hasBalance = await checkTokenBalance(quest.chain, userWallet, contractAddress as Address, minAmount, parseInt(decimals));
          if (hasBalance) {
            balanceCheckPassed = true;
            break; 
          }
        
        } else if (quest.verification_logic.startsWith('hold_nft:')) {
          const [_, contractAddress] = quest.verification_logic.split(':');
          // ==== PERUBAHAN DI SINI: Kirim `quest.chain` ke fungsi checker ====
          const hasBalance = await checkNftBalance(quest.chain, userWallet, contractAddress as Address);
          if (hasBalance) {
            balanceCheckPassed = true;
            break; 
          }
        }
      }

      isCompleted = balanceCheckPassed;
      if (!isCompleted) {
          return NextResponse.json({ success: false, message: `Verification failed: You do not hold enough ${quest.title}.` });
      }
    }

    if (isCompleted) {
      console.log(`[Verify] Awarding points for FID: ${userFid}`);
      
      await supabase.from('user_quest_completions').insert({ user_fid: userFid, quest_id: questId }).throwOnError();
      await supabase.rpc('add_user_points', { p_user_fid: userFid, p_points_to_add: quest.points }).throwOnError();

      return NextResponse.json({ success: true, message: `Quest "${quest.title}" completed! You earned ${quest.points} points.` });
    }

    return NextResponse.json({ success: false, message: 'Verification logic not met.' });

  } catch (error) {
    console.error('[VERIFY QUEST API CATCH BLOCK]', error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
