// Ganti seluruh isi file: src/app/api/quests/verify/route.ts

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

    // =================================================================
    // ==== AWAL PERBAIKAN LOGIKA FOLLOW ====
    // =================================================================
    if (quest.verification_logic.startsWith('follow_fid:')) {
      const targetFid = parseInt(quest.verification_logic.split(':')[1]);
      if (isNaN(targetFid)) throw new Error('Invalid FID in verification_logic');
      
      console.log(`[Verify] Checking if FID ${userFid} follows target FID ${targetFid}...`);

      // Kita fetch profil TARGET_FID dari perspektif USER_FID
      const { users } = await neynar.fetchBulkUsers({ fids: [targetFid], viewerFid: userFid });

      // Cek apakah di konteks viewer (userFid), dia (viewer) mengikuti targetFid
      if (users[0]?.viewer_context?.following) {
        console.log(`[Verify] Verification SUCCESS: FID ${userFid} follows FID ${targetFid}.`);
        isCompleted = true;
      } else {
        console.log(`[Verify] Verification FAILED: FID ${userFid} does NOT follow FID ${targetFid}.`);
        return NextResponse.json({ success: false, message: `Verification failed: You are not following the target user.` });
      }
    // =================================================================
    // ==== AKHIR PERBAIKAN LOGIKA FOLLOW ====
    // =================================================================

    } else if (quest.verification_logic.startsWith('hold_token:') || quest.verification_logic.startsWith('hold_nft:')) {
      // Untuk verifikasi on-chain, pertama kita butuh alamat wallet pengguna
      const { users } = await neynar.fetchBulkUsers({ fids: [userFid] });
      const wallets = users[0]?.verifications?.map(addr => addr as Address) ?? [];
      if (users[0]?.custody_address) {
        wallets.push(users[0].custody_address as Address);
      }

      if (wallets.length === 0) {
        return NextResponse.json({ success: false, message: 'Could not find a verified wallet for your Farcaster account. Please add one to your profile.' });
      }

      let balanceCheckPassed = false;
      for (const userWallet of wallets) {
        let hasBalance = false;
        if (quest.verification_logic.startsWith('hold_token:')) {
          const parts = quest.verification_logic.split(':');
          // PERBAIKAN: Format lama hold_token:CONTRACT:AMOUNT:DECIMALS memiliki 4 bagian
          if (parts.length !== 4) throw new Error(`Invalid hold_token logic format: ${quest.verification_logic}`);
          const [_, contractAddress, minAmount, decimals] = parts;
          // Asumsi verifikasi on-chain terjadi di 'Base' jika tidak dispesifikasi
          hasBalance = await checkTokenBalance("Base", userWallet, contractAddress as Address, minAmount, parseInt(decimals));
        
        } else if (quest.verification_logic.startsWith('hold_nft:')) {
          const parts = quest.verification_logic.split(':');
          // PERBAIKAN: Format lama hold_nft:CONTRACT memiliki 2 bagian
          if (parts.length !== 2) throw new Error(`Invalid hold_nft logic format: ${quest.verification_logic}`);
          const [_, contractAddress] = parts;
          hasBalance = await checkNftBalance("Base", userWallet, contractAddress as Address);
        }

        if (hasBalance) {
          balanceCheckPassed = true;
          break;
        }
      }

      isCompleted = balanceCheckPassed;
      if (!isCompleted) {
          return NextResponse.json({ success: false, message: `Verification failed: You do not hold the required asset in any of your verified wallets.` });
      }
    } else if (quest.verification_logic.startsWith('share_link:')) {
        // Untuk quest 'share', kita langsung anggap berhasil setelah tombol diklik
        isCompleted = true;
    }


    if (isCompleted) {
      console.log(`[Verify] Task is completed. Awarding points for FID: ${userFid}`);
      
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
