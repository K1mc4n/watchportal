// Lokasi file: src/components/Demo.tsx
"use client";

import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
import { ActionCard } from "./ui/ActionCard"; 
// Impor ikon yang dibutuhkan
import { Newspaper, ListChecks, Swords, AppWindow, PlusSquare } from 'lucide-react';

export default function ThemedFeed() {
  return (
    <>
      <Header />
      <main className="mx-auto py-6 px-4 pb-32 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 mb-2">
          Watch Portal
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          The Farcaster App Store, supercharged.
        </p>
        
        {/* --- KARTU MENU UTAMA --- */}
        <div className="my-8 grid grid-cols-2 gap-4">
            <ActionCard 
              href="/apps" 
              icon={AppWindow} 
              title="App Directory" 
              description="Browse all apps" 
              className="col-span-2 bg-gradient-to-br from-gold/20 to-neutral-800 border-gold/50 hover:bg-gold/10" 
            />
            <ActionCard 
              href="/news" 
              icon={Newspaper} 
              title="Web3 News" 
              description="Stay updated" 
              className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" 
            />
            <ActionCard 
              href="/quests" 
              icon={ListChecks} 
              title="Quests" 
              description="Earn points" 
              className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" 
            />
            <ActionCard 
              href="/quiz" 
              icon={Swords} 
              title="Challenge" 
              description="Test knowledge" 
              className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" 
            />
            <ActionCard 
              href="/submit" 
              icon={PlusSquare} 
              title="Submit App" 
              description="Share your tool" 
              className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" 
            />
        </div>
      </main>
      <Footer />
    </>
  );
}
