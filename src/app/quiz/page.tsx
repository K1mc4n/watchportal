// src/app/quiz/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useMiniApp } from '@neynar/react';
import Link from 'next/link';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Button } from '~/components/ui/Button';
import { weeklyQuestions } from '~/lib/quizQuestions'; // Impor pertanyaan dari lib
import { LoaderCircle, CheckCircle, XCircle, Award } from 'lucide-react';

type Answer = {
  questionId: number;
  answerIndex: number;
};

export default function QuizPage() {
  const { context } = useMiniApp();
  const [quizState, setQuizState] = useState<'idle' | 'playing' | 'submitting' | 'finished'>('idle');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [finalScore, setFinalScore] = useState(0);

  const handleStartQuiz = () => {
    // Reset state jika pengguna mengulang kuis
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setFinalScore(0);
    setQuizState('playing');
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    // Simpan jawaban pengguna
    setUserAnswers(prev => [...prev, { questionId, answerIndex }]);

    // Pindah ke pertanyaan berikutnya atau selesai
    if (currentQuestionIndex < weeklyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Ini adalah jawaban terakhir, kita akan submit setelah ini
      // Tambahkan jawaban terakhir ke state dulu
      const finalAnswers = [...userAnswers, { questionId, answerIndex }];
      handleSubmitQuiz(finalAnswers);
    }
  };

  const handleSubmitQuiz = async (answers: Answer[]) => {
    if (!context?.user) {
        alert("You must be logged in to submit your score.");
        setQuizState('idle');
        return;
    }
    
    setQuizState('submitting');

    try {
      const response = await fetch('/api/quiz/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userFid: context.user.fid,
          username: context.user.username,
          pfpUrl: context.user.pfpUrl,
          userAnswers: answers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit score.');
      }

      const result = await response.json();
      setFinalScore(result.score);
      setQuizState('finished');

    } catch (error) {
      console.error(error);
      alert("There was an error submitting your score. Please try again.");
      setQuizState('idle'); // Kembali ke awal jika ada error
    }
  };

  // Komponen untuk state 'idle'
  const IdleState = () => (
    <div className="text-center space-y-4">
      <Award className="mx-auto h-16 w-16 text-gold" />
      <h2 className="text-2xl font-bold">Weekly Crypto Challenge</h2>
      <p className="text-neutral-400">
        Test your knowledge on the latest in Web3 & Farcaster.
        A new quiz drops every week!
      </p>
      <Button onClick={handleStartQuiz} size="lg" disabled={!context?.user}>
        {context?.user ? "Start Quiz" : "Login to Play"}
      </Button>
    </div>
  );

  // Komponen untuk state 'playing'
  const PlayingState = () => {
    const question = weeklyQuestions[currentQuestionIndex];
    return (
      <div className="w-full">
        <div className="text-center mb-4">
          <p className="text-sm text-neutral-400">Question {currentQuestionIndex + 1} of {weeklyQuestions.length}</p>
          <div className="w-full bg-neutral-700 rounded-full h-2.5 mt-2">
            <div 
              className="bg-gold h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${((currentQuestionIndex + 1) / weeklyQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold my-6 text-center">{question.questionText}</h2>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(question.id, index)}
              className="w-full text-left p-4 bg-neutral-800 rounded-lg border border-neutral-700 hover:border-gold transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  // Komponen untuk state 'finished'
  const FinishedState = () => (
    <div className="text-center space-y-4">
       {finalScore > weeklyQuestions.length / 2 ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
        )}
      <h2 className="text-2xl font-bold">Quiz Complete!</h2>
      <p className="text-4xl font-bold">{finalScore} <span className="text-xl text-neutral-400">/ {weeklyQuestions.length}</span></p>
      <p className="text-neutral-400">Your score has been submitted to the weekly leaderboard.</p>
      <div className="flex gap-4 justify-center">
        <Button onClick={handleStartQuiz} variant="secondary">Play Again</Button>
        <Link href="/leaderboard"><Button>View Leaderboard</Button></Link>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <main className="mt-8 flex flex-col items-center justify-center min-h-[60vh]">
          {quizState === 'idle' && <IdleState />}
          {quizState === 'playing' && <PlayingState />}
          {quizState === 'submitting' && <LoaderCircle className="animate-spin h-12 w-12 text-gold" />}
          {quizState === 'finished' && <FinishedState />}
        </main>
      </div>
      <Footer />
    </div>
  );
        }
