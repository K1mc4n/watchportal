// src/app/quests/page.tsx (Versi Final dengan Logika "Done" yang Benar)
"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useMiniApp } from '@neynar/react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Button } from '~/components/ui/Button';
import { LoaderCircle, CheckCircle, PartyPopper } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  points: number;
  verification_logic: string;
  is_recurring: boolean; // <-- Kita akan gunakan ini
}

// Tipe data baru untuk menyimpan data penyelesaian
interface Completion {
  quest_id: number;
  completed_at: string;
}

export default function QuestsPage() {
  const { context } = useMiniApp();
  const userFid = context?.user?.fid;

  const [quests, setQuests] = useState<Quest[]>([]);
  // State sekarang menyimpan data penyelesaian yang lebih lengkap
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestData = async () => {
      setIsLoading(true);
      try {
        const questsResponse = await fetch('/api/quests/list');
        const questsData = await questsResponse.json();
        setQuests(questsData.quests || []);

        if (userFid) {
          const completedResponse = await fetch(`/api/user/completed-quests?fid=${userFid}`);
          const completedData = await completedResponse.json();
          // Simpan data penyelesaian lengkap
          setCompletions(completedData.completions || []);
        }
      } catch (error) {
        console.error("Failed to fetch quest data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestData();
  }, [userFid]);

  // Fungsi untuk mengecek apakah sebuah quest sudah selesai
  const isQuestCompleted = (quest: Quest): boolean => {
    const completion = completions.find(c => c.quest_id === quest.id);
    if (!completion) return false; // Belum pernah selesai

    // Jika quest tidak bisa diulang, maka selalu dianggap selesai
    if (!quest.is_recurring) return true;

    // Jika bisa diulang (seperti kuis mingguan)
    // Cek apakah sudah diselesaikan dalam 7 hari terakhir
    const completionDate = new Date(completion.completed_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return completionDate > sevenDaysAgo;
  };

  const renderQuestAction = (quest: Quest) => {
    // Tombol "Start" untuk kuis
    if (quest.verification_logic === 'complete_weekly_quiz') {
      return (
        <Link href="/quiz">
          <Button>Start</Button>
        </Link>
      );
    }
    return <Button disabled>Start</Button>;
  };
  
  const questsToShow = quests; // Tampilkan semua quest aktif

  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-center text-gold">Quests & Challenges</h1>
          <p className="text-center text-gray-400 mb-8">
            Complete tasks to earn points and climb the leaderboard.
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <LoaderCircle className="animate-spin h-10 w-10 text-gold" />
            </div>
          ) : (
            questsToShow.length > 0 ? (
              <div className="space-y-4">
                {questsToShow.map(quest => {
                  const completed = isQuestCompleted(quest);
                  return (
                    <div key={quest.id} className={`bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex items-center justify-between transition-opacity ${completed ? 'opacity-60' : ''}`}>
                      <div>
                        <h3 className="font-bold text-white">{quest.title}</h3>
                        <p className="text-sm text-neutral-400 mt-1">{quest.description}</p>
                        <p className="text-sm font-bold text-gold mt-2">{quest.points} Points</p>
                      </div>
                      {completed ? (
                        <div className="flex items-center gap-2 text-green-400 font-semibold px-4">
                          <CheckCircle size={20} />
                          <span>Done</span>
                        </div>
                      ) : (
                        renderQuestAction(quest)
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-neutral-800 rounded-lg">
                <PartyPopper className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-4 text-xl font-bold text-white">No Quests Available</h3>
                <p className="mt-2 text-neutral-400">
                  Check back soon for new challenges!
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
