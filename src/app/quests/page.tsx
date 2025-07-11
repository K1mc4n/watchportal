// Lokasi file: src/app/quests/page.tsx

"use client";

import { useEffect, useState, useCallback } from 'react';
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
        const questsResponse = await fetch('/api/quests/list');
        const questsData = await questsResponse.json();
        setQuests(questsData.quests || []);

        if (userFid) {
          const completedResponse = await fetch(`/api/user/completed-quests?fid=${userFid}`);
          const completedData = await completedResponse.json();
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
  
  const handleShareAndVerify = async (quest: Quest) => {
    if (!userFid || !actions?.composeCast) {
        alert("Please login and open in a Farcaster client to share.");
        return;
    }

    // ==== PERBAIKAN LOGIKA DI SINI ====
    // Ambil semua bagian setelah "share_link:"
    const prefix = 'share_link:';
    const urlToShare = quest.verification_logic.startsWith(prefix) 
      ? quest.verification_logic.substring(prefix.length)
      : '';
    
    if (!urlToShare) {
        alert("Invalid share link configured for this quest.");
        return;
    }

    await actions.composeCast({
      text: "Discover awesome Farcaster mini-apps on Watch Portal!",
      embeds: [urlToShare],
    });

    setVerifyingQuestId(quest.id);
    try {
      const response = await fetch('/api/quests/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questId: quest.id, userFid }),
      });
      const result = await response.json();
      if (result.success) {
        alert(result.message || "Quest completed! 🎉 Thank you for sharing!");
        await fetchQuestData();
      } else {
        alert(result.message || "Could not complete quest.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    } finally {
      setVerifyingQuestId(null);
    }
  };


  const handleVerify = async (questId: number) => {
    if (!userFid) {
      alert("Please login to verify quests.");
      return;
    }
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
        await fetchQuestData();
      } else {
        alert(`Verification failed: ${result.message || 'Please ensure you have completed the task.'}`);
      }
    } catch (error) {
      alert("An error occurred during verification. Please try again later.");
      console.error(error);
    } finally {
      setVerifyingQuestId(null);
    }
  };

  const isQuestCompleted = (quest: Quest): boolean => {
    const completion = completions.find(c => c.quest_id === quest.id);
    if (!completion) return false;
    if (!quest.is_recurring) return true;
    const completionDate = new Date(completion.completed_at);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return completionDate > sevenDaysAgo;
  };

  const renderQuestAction = (quest: Quest) => {
    const isLoading = verifyingQuestId === quest.id;

    if (quest.verification_logic === 'complete_weekly_quiz') {
      return (
        <Link href="/quiz">
          <Button isLoading={isLoading}>Start Quiz</Button>
        </Link>
      );
    }

    if (quest.verification_logic.startsWith('share_link:')) {
        return (
            <Button onClick={() => handleShareAndVerify(quest)} isLoading={isLoading}>
                Share & Claim
            </Button>
        );
    }
    
    if (
        quest.verification_logic.startsWith('follow_fid:') ||
        quest.verification_logic.startsWith('hold_token:') ||
        quest.verification_logic.startsWith('hold_nft:')
    ) {
      return (
        <Button onClick={() => handleVerify(quest.id)} isLoading={isLoading}>
          Verify
        </Button>
      );
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
            <div className="flex justify-center items-center h-40">
              <LoaderCircle className="animate-spin h-10 w-10 text-gold" />
            </div>
          ) : (
            quests.length > 0 ? (
              <div className="space-y-4">
                {quests.map(quest => {
                  const completed = isQuestCompleted(quest);
                  return (
                    <div key={quest.id} className={`bg-neutral-800 p-4 rounded-lg border border-neutral-700 flex items-center justify-between transition-opacity ${completed ? 'opacity-60' : ''}`}>
                      <div>
                        <h3 className="font-bold text-white">{quest.title}</h3>
                        <p className="text-sm text-neutral-400 mt-1">{quest.description}</p>
                        <p className="text-sm font-bold text-gold mt-2">{quest.points} Points</p>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        {completed ? (
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
