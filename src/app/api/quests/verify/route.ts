// src/app/api/quests/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { getNeynarClient } from '~/lib/neynar';

export async function POST(request: NextRequest) {
  try {
    const { questId, userFid } = await request.json();
    if (!questId || !userFid) {
      return NextResponse.json({ success: false, message: 'Missing questId or userFid.' }, { status: 400 });
    }

    // Ambil detail quest dari DB
    const { data: quest, error: questError } = await supabase
      .from('quests').select('*').eq('id', questId).single();
      
    if (questError || !quest) {
      return NextResponse.json({ success: false, message: 'Quest not found.' }, { status: 404 });
    }

    // Cek apakah sudah pernah diselesaikan (untuk quest non-recurring)
    if (!quest.is_recurring) {
        const { data: existing } = await supabase.from('user_quest_completions')
            .select('id').eq('user_fid', userFid).eq('quest_id', questId).limit(1);
        if (existing && existing.length > 0) {
            return NextResponse.json({ success: false, message: 'Quest already completed.' });
        }
    }

    let isCompleted = false;

    // LOGIKA VERIFIKASI UTAMA
    if (quest.verification_logic.startsWith('follow_fid:')) {
      const targetFid = parseInt(quest.verification_logic.split(':')[1]);
      if (isNaN(targetFid)) {
        throw new Error('Invalid FID in verification_logic');
      }
      
      const neynar = getNeynarClient();
      // API Neynar untuk memeriksa hubungan follow
      const { users } = await neynar.fetchBulkUsers({ fids: [userFid], viewerFid: targetFid });

      // 'viewer_context.following' akan true jika viewer (targetFid) di-follow oleh user (userFid)
      if (users[0]?.viewer_context?.following) {
        isCompleted = true;
      } else {
        return NextResponse.json({ success: false, message: `You are not following the target user (FID: ${targetFid}).` });
      }
    }
    // Anda bisa menambahkan 'else if' di sini untuk tipe verifikasi lain

    if (isCompleted) {
      // Catat penyelesaian
      await supabase.from('user_quest_completions').insert({ user_fid: userFid, quest_id: questId });
      // Berikan poin
      await supabase.rpc('add_user_points', { p_user_fid: userFid, p_points_to_add: quest.points });
      return NextResponse.json({ success: true, message: `Quest "${quest.title}" completed!` });
    }

    return NextResponse.json({ success: false, message: 'Verification logic not met.' });

  } catch (error) {
    console.error('[VERIFY QUEST ERROR]', error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
