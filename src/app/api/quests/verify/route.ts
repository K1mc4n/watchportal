// src/app/api/quests/verify/route.ts (Versi Debugging)
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { getNeynarClient } from '~/lib/neynar';

export async function POST(request: NextRequest) {
  try {
    const { questId, userFid } = await request.json();
    if (!questId || !userFid) {
      return NextResponse.json({ success: false, message: 'Missing questId or userFid.' }, { status: 400 });
    }
    console.log(`[Verify] Received request for FID: ${userFid}, Quest ID: ${questId}`);

    // Ambil detail quest dari DB
    const { data: quest, error: questError } = await supabase
      .from('quests').select('*').eq('id', questId).single();
      
    if (questError || !quest) {
      console.error(`[Verify] Quest not found for ID: ${questId}. Error:`, questError);
      return NextResponse.json({ success: false, message: 'Quest not found.' }, { status: 404 });
    }
    console.log(`[Verify] Found quest: "${quest.title}"`);

    // Cek apakah sudah pernah diselesaikan (untuk quest non-recurring)
    if (!quest.is_recurring) {
        const { data: existing, error: checkError } = await supabase.from('user_quest_completions')
            .select('id').eq('user_fid', userFid).eq('quest_id', questId).limit(1);
        
        if (checkError) {
          console.error(`[Verify] Error checking existing completions for FID ${userFid}:`, checkError);
          // Jangan hentikan proses, biarkan verifikasi berjalan, mungkin ini hanya error sementara
        }
        
        if (existing && existing.length > 0) {
            console.log(`[Verify] FID ${userFid} already completed this non-recurring quest.`);
            return NextResponse.json({ success: false, message: 'Quest already completed.' });
        }
    }

    let isCompleted = false;

    // LOGIKA VERIFIKASI UTAMA
    if (quest.verification_logic.startsWith('follow_fid:')) {
      const targetFid = parseInt(quest.verification_logic.split(':')[1]);
      if (isNaN(targetFid)) throw new Error('Invalid FID in verification_logic');
      
      console.log(`[Verify] Checking if FID ${userFid} follows target FID ${targetFid}...`);
      const neynar = getNeynarClient();
      const { users } = await neynar.fetchBulkUsers({ fids: [userFid], viewerFid: targetFid });

      if (users[0]?.viewer_context?.following) {
        console.log(`[Verify] Verification SUCCESS: FID ${userFid} follows FID ${targetFid}.`);
        isCompleted = true;
      } else {
        console.log(`[Verify] Verification FAILED: FID ${userFid} does NOT follow FID ${targetFid}.`);
        return NextResponse.json({ success: false, message: `You are not following the target user.` });
      }
    }
    // Tambahkan 'else if' di sini untuk tipe quest lain

    if (isCompleted) {
      console.log(`[Verify] Task is completed. Awarding points for FID: ${userFid}`);
      
      // 1. Catat penyelesaian
      await supabase.from('user_quest_completions').insert({ 
          user_fid: userFid, 
          quest_id: questId 
      }).throwOnError(); // <-- .throwOnError() akan menghentikan proses jika ada error
      console.log(`[Verify] Successfully inserted into user_quest_completions for FID: ${userFid}`);

      // 2. Berikan poin
      const { error: rpcError } = await supabase.rpc('add_user_points', { 
          p_user_fid: userFid, 
          p_points_to_add: quest.points 
      });

      if (rpcError) {
          // Jika RPC gagal, log errornya dan hentikan proses dengan pesan error
          console.error(`[Verify] CRITICAL: RPC call to 'add_user_points' failed for FID ${userFid}:`, rpcError);
          throw new Error(`Database function 'add_user_points' failed: ${rpcError.message}`);
      }
      console.log(`[Verify] Successfully awarded ${quest.points} points to FID: ${userFid}`);

      return NextResponse.json({ success: true, message: `Quest "${quest.title}" completed!` });
    }

    return NextResponse.json({ success: false, message: 'Verification logic not met.' });

  } catch (error) {
    console.error('[VERIFY QUEST API CATCH BLOCK]', error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
