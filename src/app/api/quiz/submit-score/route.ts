// src/app/api/quiz/submit-score/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { correctAnswers } from '~/lib/quizQuestions';
import { getWeek } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { userFid, username, pfpUrl, userAnswers } = await request.json(); 
    if (!userFid || !username || !userAnswers) {
        return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // 1. Hitung skor kuis seperti biasa
    let score = 0;
    userAnswers.forEach((answer: { questionId: number, answerIndex: number }) => {
      if (correctAnswers.get(answer.questionId) === answer.answerIndex) score++;
    });

    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;

    // 2. Simpan skor ke leaderboard seperti biasa
    const { error: scoreError } = await supabase.from('weekly_quiz_scores').insert({
      user_fid: userFid,
      username: username,
      pfp_url: pfpUrl,
      score,
      week_identifier: weekIdentifier,
    });

    if (scoreError) {
        // Jika gagal menyimpan skor, lebih baik hentikan prosesnya di sini
        console.error("Error saving quiz score:", scoreError);
        throw new Error('Failed to save quiz score.');
    }

    // =======================================================
    // == QUEST COMPLETION LOGIC (LOGIKA BARU DIMULAI DI SINI) ==
    // =======================================================
    try {
      // a. Ambil detail quest berdasarkan 'verification_logic' yang kita definisikan.
      const { data: questData, error: questFetchError } = await supabase
        .from('quests')
        .select('id, points')
        .eq('verification_logic', 'complete_weekly_quiz')
        .single();

      if (questFetchError || !questData) {
        // Jika quest tidak ditemukan, log error tapi jangan hentikan proses.
        // Skor pengguna tetap harus disimpan.
        console.error('Could not find the weekly quiz quest in the database.');
      } else {
        // b. Cek apakah pengguna sudah menyelesaikan quest ini MINGGU INI.
        // Ini penting karena quest ini bersifat recurring (bisa diulang setiap minggu).
        const { data: existingCompletion, error: checkError } = await supabase
            .from('user_quest_completions')
            .select('id')
            .eq('user_fid', userFid)
            .eq('quest_id', questData.id)
            // Cek apakah sudah diselesaikan setelah awal minggu ini
            .gte('completed_at', new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).toISOString())
            .maybeSingle();

        if (checkError) {
          console.error("Error checking for existing quest completion:", checkError);
        } else if (!existingCompletion) {
          // c. Jika belum ada, catat penyelesaian quest!
          const { error: completionError } = await supabase
            .from('user_quest_completions')
            .insert({ user_fid: userFid, quest_id: questData.id });
          
          if (completionError) {
            console.error("Error inserting quest completion:", completionError);
          } else {
             // d. (Opsional tapi direkomendasikan) Tambahkan poin ke tabel user_points
             // Menggunakan 'rpc' untuk memanggil fungsi database yang aman.
             const { error: pointsError } = await supabase.rpc('add_user_points', { 
                p_user_fid: userFid, 
                p_points_to_add: questData.points 
             });
             if (pointsError) console.error("Error adding points:", pointsError);
          }
        }
      }
    } catch (questError) {
        console.error("An error occurred during quest completion logic:", questError);
    }
    // =======================================================
    // == AKHIR DARI LOGIKA BARU ==
    // =======================================================

    // Kembalikan respons sukses seperti biasa
    return NextResponse.json({ message: 'Score saved!', score });

  } catch (e) {
    console.error(e);
    // Berikan pesan error yang lebih spesifik jika memungkinkan
    const errorMessage = e instanceof Error ? e.message : 'Failed to save score';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
