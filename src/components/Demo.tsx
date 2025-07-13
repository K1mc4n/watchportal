// Lokasi file: src/components/Demo.tsx
"use client";

import { useState, useMemo } from "react";
import { useMiniApp } from "@neynar/react";
import { useDebounce } from 'use-debounce';
import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
import { MiniAppCard } from "./ui/MiniAppCard";
import { type MiniApp } from "~/lib/miniAppsData";
import { ActionCard } from "./ui/ActionCard"; 
import { Newspaper, ListChecks, Swords } from 'lucide-react';

interface ThemedFeedProps {
  title?: string;
  apps: MiniApp[];
  isLoading: boolean;
}

export default function ThemedFeed({ apps, isLoading }: ThemedFeedProps) {
  const { context, actions } = useMiniApp();
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleLaunchApp = (url: string) => {
    if (actions.openUrl) actions.openUrl(url);
    else window.open(url, '_blank');
  };

  const filteredApps = useMemo(() => {
    return apps.filter(app => {
      const chainMatch = selectedChain === 'All' || app.chain === selectedChain;
      const term = debouncedSearchTerm.toLowerCase();
      if (!term) return chainMatch;
      return chainMatch && (
        app.name.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term) ||
        (app.tags && app.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    });
  }, [selectedChain, debouncedSearchTerm, apps]);

  const chains = ['All', 'Base', 'Optimism', 'Degen', 'Multi-chain', 'Arbitrum'];

  return (
    <div style={{ paddingTop: context?.client.safeAreaInsets?.top ?? 0 }}>
      <Header />
      <main className="mx-auto py-6 px-4 pb-24 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 mb-2">
          Watch Portal
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          The Farcaster App Store, supercharged.
        </p>

        <div className="sticky top-[72px] z-20 pt-2 pb-4 bg-neutral-900/80 backdrop-blur-md -mx-4 px-4">
            <input
                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search apps by name, tag, or chain..."
                className="h-12 w-full rounded-full bg-neutral-800 border border-neutral-700 px-6 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <div className="flex justify-center flex-wrap gap-2 mt-4">
                {chains.map((chain) => (
                    <button key={chain} onClick={() => setSelectedChain(chain)}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                            selectedChain === chain ? 'bg-gold text-black shadow-md shadow-gold/20' : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-700'
                        }`}
                    >
                        {chain}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ActionCard href="/news" icon={Newspaper} title="Web3 News" description="Stay updated" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
            <ActionCard href="/quests" icon={ListChecks} title="Quests" description="Earn points" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
            <ActionCard href="/quiz" icon={Swords} title="Challenge" description="Test your knowledge" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 px-2 text-transparent bg-clip-text bg-gradient-to-r from-gold to-brand-light">
            ✨ App Directory
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <MiniAppCard key={app.id} app={app} onLaunch={handleLaunchApp} />
            ))}
          </div>
        </div>

        {isLoading && <p className="text-center text-neutral-500 mt-8">Loading community apps...</p>}
        {!isLoading && filteredApps.length === 0 && (
            <p className="text-center text-neutral-500 mt-8">No apps found for this filter.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
