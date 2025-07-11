// src/app/api/quiz/submit-score/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { correctAnswers } from '~/lib/quizQuestions';
import { getWeek } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userFid, username, pfpUrl, userAnswers } = body;

    // 1. Validasi Input
    if (!userFid || !username || !userAnswers) {
      console.error('Submit Score Error: Missing required data in request body.', body);
      return NextResponse.json({ error: 'Missing required data: fid, username, and answers are required.' }, { status: 400 });
    }

    // 2. Hitung Skor Kuis
    let score = 0;
    userAnswers.forEach((answer: { questionId: number, answerIndex: number }) => {
      if (correctAnswers.get(answer.questionId) === answer.answerIndex) {
        score++;
      }
    });
    console.log(`User FID: ${userFid} | Calculated Quiz Score: ${score}`);

    // 3. Simpan Skor ke tabel 'weekly_quiz_scores'
    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;
    const { error: scoreInsertError } = await supabase.from('weekly_quiz_scores').insert({
      user_fid: userFid,
      username: username,
      pfp_url: pfpUrl,
      score: score,
      week_identifier: weekIdentifier,
    });

    if (scoreInsertError) {
      console.error(`Supabase error saving quiz score for FID ${userFid}:`, scoreInsertError);
      throw new Error(`Failed to save quiz score: ${scoreInsertError.message}`);
    }
    console.log(`Successfully saved quiz score for FID ${userFid}.`);

    // --- LOGIKA QUEST DIMULAI DI SINI ---
    
    // 4. Ambil detail quest dari DB
    const { data: quest, error: questError } = await supabase
      .from('quests')
      .select('id, points, is_recurring')
      .eq('verification_logic', 'complete_weekly_quiz')
      .single();

    if (questError || !quest) {
      console.warn('Could not find "complete_weekly_quiz" quest. Skipping quest logic.');
      return NextResponse.json({ message: 'Score saved, but quest not found.', score });
    }

    // 5. Cek apakah quest ini sudah diselesaikan minggu ini
    const today = new Date();
    // Mendapatkan hari Senin di minggu ini
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)));
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const { data: existingCompletion, error: checkError } = await supabase
      .from('user_quest_completions')
      .select('id', { count: 'exact' })
      .eq('user_fid', userFid)
      .eq('quest_id', quest.id)
      .gte('completed_at', firstDayOfWeek.toISOString());

    if (checkError) {
      console.error(`Error checking quest completion for FID ${userFid}:`, checkError);
      // Lanjutkan saja, lebih baik poin tidak masuk daripada user dapat error
    } else if (existingCompletion && existingCompletion.length > 0) {
      console.log(`FID ${userFid} has already completed the weekly quiz quest this week.`);
    } else {
      // 6. Jika belum, berikan poin dan tandai selesai
      console.log(`Awarding ${quest.points} points to FID ${userFid} for quest ID ${quest.id}.`);
      
      const { error: completionInsertError } = await supabase
        .from('user_quest_completions')
        .insert({ user_fid: userFid, quest_id: quest.id });

      if (completionInsertError) {
        console.error(`Error inserting quest completion for FID ${userFid}:`, completionInsertError);
      } else {
        const { error: rpcError } = await supabase.rpc('add_user_points', {
          p_user_fid: userFid,
          p_points_to_add: quest.points,
        });

        if (rpcError) {
          console.error(`Error calling RPC add_user_points for FID ${userFid}:`, rpcError);
        } else {
          console.log(`Successfully awarded points to FID ${userFid}.`);
        }
      }
    }

    return NextResponse.json({ message: 'Score and quest progress saved!', score });

  } catch (error) {
    console.error('Critical error in /api/quiz/submit-score:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
