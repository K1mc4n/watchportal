// Pastikan file ini berisi kode ini: src/app/api/quiz/submit-score/route.ts
import { NextRequest, NextResponse } from 'next/server';
// Supabase dihapus
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
    
    // Simulasi penyimpanan data tanpa supabase
    // Simulasi quest
    const quest = { id: 1, points: 10 };

    const today = new Date();
    const dayOfWeek = today.getDay();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)));
    firstDayOfWeek.setHours(0, 0, 0, 0);

    // Simulasi quest completion dan awarding points
    // Tidak ada pengecekan duplikat, langsung berhasil

  return NextResponse.json({ message: 'Score and quest progress saved!', score });

  } catch (error) {
    console.error(`[API /api/quiz/submit-score] CRITICAL ERROR:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
