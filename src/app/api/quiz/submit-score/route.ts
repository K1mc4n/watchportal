// src/app/api/quiz/submit-score/route.ts (Versi Perbaikan)
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { correctAnswers } from '~/lib/quizQuestions';
import { getWeek } from 'date-fns';

// Fungsi utama yang menangani request. Semua logika harus ada di dalam sini.
export async function POST(request: NextRequest) {
  try {
    const { userFid, username, pfpUrl, userAnswers } = await request.json(); 
    if (!userFid || !username || !userAnswers) {
        return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    // 1. Hitung skor kuis
    let score = 0;
    userAnswers.forEach((answer: { questionId: number, answerIndex: number }) => {
      if (correctAnswers.get(answer.questionId) === answer.answerIndex) score++;
    });

    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;

    // 2. Simpan skor ke leaderboard
    const { error: scoreError } = await supabase.from('weekly_quiz_scores').insert({
      user_fid: userFid,
      username: username,
      pfp_url: pfpUrl,
      score,
      week_identifier: weekIdentifier,
    });

    if (scoreError) {
        console.error("Error saving quiz score:", scoreError);
        throw new Error('Failed to save quiz score.');
    }

    // 3. Logika untuk Quest Completion
    // Semua logika ini sudah berada di dalam async function POST, jadi ini aman.
    const { data: questData, error: questFetchError } = await supabase
      .from('quests')
      .select('id, points')
      .eq('verification_logic', 'complete_weekly_quiz')
      .single();

    if (!questFetchError && questData) {
      const today = new Date();
      const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)));
      firstDayOfWeek.setHours(0, 0, 0, 0);

      const { data: existingCompletion, error: checkError } = await supabase
          .from('user_quest_completions')
          .select('id', { count: 'exact' })
          .eq('user_fid', userFid)
          .eq('quest_id', questData.id)
          .gte('completed_at', firstDayOfWeek.toISOString())
          .limit(1);

      if (!checkError && existingCompletion?.length === 0) {
        await supabase
          .from('user_quest_completions')
          .insert({ user_fid: userFid, quest_id: questData.id });
        
        await supabase.rpc('add_user_points', { 
            p_user_fid: userFid, 
            p_points_to_add: questData.points 
        });
      }
    } else if (questFetchError) {
        console.error('Could not find the weekly quiz quest in the database:', questFetchError.message);
    }
    
    // 4. Kembalikan respons sukses
    return NextResponse.json({ message: 'Score saved!', score });

  } catch (e) {
    console.error("Top-level error in submit-score API:", e);
    const errorMessage = e instanceof Error ? e.message : 'Failed to save score';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
