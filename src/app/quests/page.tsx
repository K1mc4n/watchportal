// Lokasi file: src/app/quests/page.tsx

"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useMiniApp } from '@neynar/react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Button } from '~/components/ui/Button';
// --- 1. Impor ikon UserPlus ---
import { LoaderCircle, CheckCircle, PartyPopper, UserPlus } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  points: number;
  verification_logic: string;
  is_recurring: boolean;
}

interface Completion {
  quest_id: number;
  completed_at: string;
}

export default function QuestsPage() {
  const { context, actions } = useMiniApp();
  const userFid = context?.user?.fid;

  const [quests, setQuests] = useState<Quest[]>([]);
  const [completions, setCompletions] = useState<Completion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingQuestId, setVerifyingQuestId] = useState<number | null>(null);

  const fetchQuestData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [questsRes, completedRes] = await Promise.all([
        fetch('/api/quests/list'),
        userFid ? fetch(`/api/user/completed-quests?fid=${userFid}`) : Promise.resolve(null)
      ]);

      const questsData = await questsRes.json();
      setQuests(questsData.quests || []);

      if (completedRes && completedRes.ok) {
        const completedData = await completedRes.json();
        setCompletions(completedData.completions || []);
      }
    } catch (error) {
      console.error("Failed to fetch quest data", error);
    } finally {
      setIsLoading(false);
    }
  }, [userFid]);

  useEffect(() => {
    fetchQuestData();
  }, [fetchQuestData]);

  // --- 2. Buat fungsi handler baru untuk aksi Follow ---
  const handleFollowAndVerify = async (quest: Quest) => {
    if (!userFid || !actions?.followUser) {
      alert("This feature is only available in a Farcaster client.");
      return;
    }

    const targetFidStr = quest.verification_logic.split(':')[1];
    const targetFid = parseInt(targetFidStr);

    if (isNaN(targetFid)) {
      alert("Invalid quest configuration.");
      return;
    }

    setVerifyingQuestId(quest.id);
    try {
      // Buka UI native Farcaster untuk follow
      await actions.followUser({ fid: targetFid });
      
      // Beri jeda 1 detik untuk API Farcaster memperbarui status
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Langsung coba verifikasi setelahnya
      await handleVerify(quest.id);

    } catch (error) {
      console.error("Follow action failed:", error);
      // Pengguna mungkin membatalkan, jadi jangan tampilkan error yang mengganggu
    } finally {
      setVerifyingQuestId(null);
    }
  };

  const handleVerify = async (questId: number) => {
    if (!userFid) return;
    setVerifyingQuestId(questId);
    try {
      const response = await fetch('/api/quests/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId, userFid }),
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message || "Quest completed! 🎉");
        await fetchQuestData(); // Refresh data
      } else {
        alert(`Failed: ${result.message || 'Please try again.'}`);
      }
    } catch (error) {
      alert("An error occurred during verification.");
    } finally {
      setVerifyingQuestId(null);
    }
  };

  const getQuestStatus = (quest: Quest): 'done' | 'available' => {
    const completion = completions.find(c => c.quest_id === quest.id);
    return completion ? 'done' : 'available';
  };

  // --- 3. Perbarui logika render tombol ---
  const renderQuestAction = (quest: Quest) => {
    const isVerifying = verifyingQuestId === quest.id;

    if (quest.verification_logic.startsWith('follow_fid:')) {
      return (
        <Button onClick={() => handleFollowAndVerify(quest)} isLoading={isVerifying}>
          <UserPlus className="w-4 h-4 mr-2" /> Follow
        </Button>
      );
    }

    if (quest.verification_logic === 'complete_weekly_quiz') {
      return <Link href="/quiz"><Button isLoading={isVerifying}>Start Quiz</Button></Link>;
    }
    
    if (quest.verification_logic.startsWith('hold_token:') || quest.verification_logic.startsWith('hold_nft:')) {
      return <Button onClick={() => handleVerify(quest.id)} isLoading={isVerifying}>Verify</Button>;
    }
    
    return <Button disabled>Start</Button>;
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
            <div className="flex justify-center items-center h-40"><LoaderCircle className="animate-spin h-10 w-10 text-gold" /></div>
          ) : (
            quests.length > 0 ? (
              <div className="space-y-4">
                {quests.map(quest => {
                  const status = getQuestStatus(quest);
                  return (
                    <div key={quest.id} className={`bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex items-center justify-between transition-opacity ${status !== 'available' ? 'opacity-60' : ''}`}>
                      <div>
                        <h3 className="font-bold text-white">{quest.title}</h3>
                        <p className="text-sm text-neutral-400 mt-1">{quest.description}</p>
                        <p className="text-sm font-bold text-gold mt-2">{quest.points} Points</p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {status === 'done' ? (
                          <div className="flex items-center gap-2 text-green-400 font-semibold px-4">
                            <CheckCircle size={20} />
                            <span>Done</span>
                          </div>
                        ) : (
                          renderQuestAction(quest)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-neutral-800 rounded-lg">
                <PartyPopper className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-4 text-xl font-bold text-white">No Quests Available</h3>
                <p className="mt-2 text-neutral-400">Check back soon for new challenges!</p>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
