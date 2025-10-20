// Lokasi file: src/app/leaderboard/page.tsx

"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { LoaderCircle, Award } from 'lucide-react';
import { getWeek } from 'date-fns';
// --- 1. Impor hook useMiniApp ---
import { useMiniApp } from '@neynar/react';

interface LeaderboardEntry {
  user_fid: number;
  username: string;
  pfp_url: string;
  score: number;
}

const getRankColor = (rank: number) => {
  if (rank === 0) return 'text-gold'; // Peringkat 1
  if (rank === 1) return 'text-slate-300'; // Peringkat 2
  if (rank === 2) return 'text-yellow-700'; // Peringkat 3
  return 'text-neutral-500';
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // --- 2. Panggil hook useMiniApp untuk mendapatkan 'actions' ---
  const { actions } = useMiniApp();

  const weekNumber = getWeek(new Date());

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data.');
        }
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // --- 3. Buat fungsi untuk menangani klik profil ---
  const handleViewProfile = (fid: number) => {
    if (actions?.viewProfile) {
      actions.viewProfile({ fid });
    } else {
      // Fallback untuk browser biasa
      window.open(`https://warpcast.com/${fid}`, '_blank');
    }
  };

  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <h1 className="text-2xl font-bold text-center mb-2">Weekly Leaderboard</h1>
        <p className="text-center text-sm text-neutral-400 mb-6">Week {weekNumber} - Scores reset every Monday</p>
        
        <div className="space-y-2">
          {isLoading && (
            <div className="flex justify-center items-center h-40">
                <LoaderCircle className="animate-spin h-10 w-10 text-gold" />
            </div>
          )}
          {error && <div className="text-center py-10 text-red-500">{error}</div>}
          
          {!isLoading && !error && (
            leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <div key={entry.user_fid} className="flex items-center bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                  <div className={`w-10 text-lg font-bold text-center ${getRankColor(index)}`}>
                    {index + 1}
                  </div>
                  <Image 
                    src={entry.pfp_url || '/placeholder.png'} 
                    alt={entry.username} 
                    width={40} 
                    height={40} 
                    className="rounded-full mx-4"
                  />
                  <div className="flex-grow">
                    {/* --- 4. Buat username bisa diklik --- */}
                    <p 
                      className="font-semibold text-white hover:underline cursor-pointer"
                      onClick={() => handleViewProfile(entry.user_fid)}
                    >
                      @{entry.username}
                    </p>
                  </div>
                  <div className="text-lg font-bold text-gold">{entry.score} pts</div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>The leaderboard is empty.</p>
                  <p></p>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
