// src/app/quests/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Button } from '~/components/ui/Button';
import { LoaderCircle, CheckCircle } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  points: number;
}

export default function QuestsPage() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await fetch('/api/quests/list');
        const data = await response.json();
        setQuests(data.quests || []);
      } catch (error) {
        console.error("Failed to fetch quests", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuests();
  }, []);

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
                  {/* Kita akan menambahkan logika untuk 'isCompleted' nanti */}
                  <Link href="/quiz">
                    <Button>Start</Button>
                  </Link>
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
