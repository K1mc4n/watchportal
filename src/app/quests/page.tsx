// src/app/quests/page.tsx
"use client";

import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';

export default function QuestsPage() {
  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-gold">Quests & Challenges</h1>
          <p className="text-gray-400 my-8">
            Complete tasks to earn points and climb the leaderboard.
            <br />
            New quests coming soon!
          </p>
          {/* Nanti kita akan menampilkan daftar quest di sini */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
