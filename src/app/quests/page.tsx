// src/app/quests/page.tsx (Versi Final)
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMiniApp } from '@neynar/react'; // <-- Impor hook useMiniApp
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Button } from '~/components/ui/Button';
import { LoaderCircle, CheckCircle } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  points: number;
  // Tambahkan properti ini untuk logika verifikasi nanti
  verification_logic: string; 
}

export default function QuestsPage() {
  const { context } = useMiniApp(); // <-- Gunakan hook untuk mendapatkan data pengguna
  const userFid = context?.user?.fid;

  const [quests, setQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gabungkan kedua fetch ke dalam satu fungsi
    const fetchQuestData = async () => {
      setIsLoading(true);
      try {
        // Fetch semua quest yang aktif
        const questsResponse = await fetch('/api/quests/list');
        const questsData = await questsResponse.json();
        setQuests(questsData.quests || []);

        // Jika pengguna sudah login, fetch quest yang sudah mereka selesaikan
        if (userFid) {
          const completedResponse = await fetch(`/api/user/completed-quests?fid=${userFid}`);
          const completedData = await completedResponse.json();
          setCompletedQuests(new Set(completedData.completedQuestIds || []));
        }

      } catch (error) {
        console.error("Failed to fetch quest data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestData();
  }, [userFid]); // <-- Jalankan ulang useEffect jika userFid berubah (misalnya setelah login)

  // Fungsi untuk menentukan tombol apa yang harus ditampilkan
  const renderQuestAction = (quest: Quest) => {
    const isCompleted = completedQuests.has(quest.id);

    if (isCompleted) {
      return (
        <div className="flex items-center gap-2 text-green-400 font-semibold px-4">
          <CheckCircle size={20} />
          <span>Done</span>
        </div>
      );
    }
    
    // Logika untuk tombol "Start"
    // Di masa depan, ini bisa menjadi lebih kompleks
    if (quest.verification_logic === 'complete_weekly_quiz') {
      return (
        <Link href="/quiz">
          <Button>Start</Button>
        </Link>
      );
    }
    
    // Tombol default untuk quest lain yang belum diimplementasikan
    return <Button disabled>Coming Soon</Button>;
  };

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
            <div className="space-y-4">
              {quests.map(quest => (
                <div key={quest.id} className="bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{quest.title}</h3>
                    <p className="text-sm text-neutral-400 mt-1">{quest.description}</p>
                    <p className="text-sm font-bold text-gold mt-2">{quest.points} Points</p>
                  </div>
                  {/* Panggil fungsi render aksi */}
                  {renderQuestAction(quest)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
