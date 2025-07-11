// Pastikan file ini berisi kode ini: src/app/api/quiz/submit-score/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { correctAnswers } from '~/lib/quizQuestions';
import { getWeek } from 'date-fns';

export async function POST(request: NextRequest) {
  try {
    const { userFid, username, pfpUrl, userAnswers } = await request.json();

    if (!userFid || !username || !userAnswers) {
      console.error('Submit Score Error: Missing required data in request body.');
      return NextResponse.json({ error: 'Missing required data' }, { status: 400 });
    }

    let score = 0;
    userAnswers.forEach((answer: { questionId: number, answerIndex: number }) => {
      if (correctAnswers.get(answer.questionId) === answer.answerIndex) score++;
    });
    console.log(`[FID: ${userFid}] Calculated Quiz Score: ${score}`);

    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;
    
    await supabase.from('weekly_quiz_scores').insert({
      user_fid: userFid, username: username, pfp_url: pfpUrl, score: score, week_identifier: weekIdentifier,
    }).throwOnError();
    console.log(`[FID: ${userFid}] Successfully saved to weekly_quiz_scores.`);

    const { data: quest, error: questError } = await supabase
      .from('quests')
      .select('id, points')
      .eq('verification_logic', 'complete_weekly_quiz')
      .single();

    if (questError || !quest) {
      console.error(`[FID: ${userFid}] CRITICAL: Quest 'complete_weekly_quiz' not found. Points not awarded.`);
      return NextResponse.json({ message: 'Score saved, but quest was not found.', score });
    }
    console.log(`[FID: ${userFid}] Found quest ID: ${quest.id} with ${quest.points} points.`);

    const today = new Date();
    const dayOfWeek = today.getDay();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)));
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const { data: existingCompletion } = await supabase
      .from('user_quest_completions')
      .select('id', { count: 'exact' })
      .eq('user_fid', userFid)
      .eq('quest_id', quest.id)
      .gte('completed_at', firstDayOfWeek.toISOString());

    if (existingCompletion && existingCompletion.length > 0) {
      console.log(`[FID: ${userFid}] Quest already completed this week.`);
    } else {
      console.log(`[FID: ${userFid}] Awarding points...`);
      await supabase.from('user_quest_completions').insert({ 
          user_fid: userFid, quest_id: quest.id 
      }).throwOnError();
      
      const { error: rpcError } = await supabase.rpc('add_user_points', {
        p_user_fid: userFid,
        p_points_to_add: quest.points,
      });
      
      if (rpcError) throw rpcError;
      console.log(`[FID: ${userFid}] Successfully awarded points.`);
    }

    return NextResponse.json({ message: 'Score and quest progress saved!', score });

  } catch (error) {
    console.error(`[API /api/quiz/submit-score] CRITICAL ERROR:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
