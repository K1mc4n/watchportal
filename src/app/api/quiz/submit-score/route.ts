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

    let score = 0;
    userAnswers.forEach((answer: { questionId: number, answerIndex: number }) => {
      if (correctAnswers.get(answer.questionId) === answer.answerIndex) score++;
    });

    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;

    const { error } = await supabase.from('weekly_quiz_scores').insert({
      user_fid: userFid,
      username: username,
      pfp_url: pfpUrl,
      score,
      week_identifier: weekIdentifier,
    });

    if (error) throw error;
    return NextResponse.json({ message: 'Score saved!', score });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }
}
