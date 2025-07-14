// Lokasi file: src/app/apps/page.tsx
"use client";

import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'use-debounce';
import { useMiniApp } from '@neynar/react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { MiniAppCard } from '~/components/ui/MiniAppCard';
import { miniAppsData, type MiniApp } from '~/lib/miniAppsData';
import { LoaderCircle } from 'lucide-react';

export default function AppsPage() {
  const { actions } = useMiniApp();
  const [apps, setApps] = useState<MiniApp[]>(miniAppsData);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk filtering dan search
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Fungsi untuk membuka aplikasi
  const handleLaunchApp = (url: string) => {
    if (actions.openUrl) actions.openUrl(url);
    else window.open(url, '_blank');
  };

  // Logika untuk fetch data aplikasi dari komunitas
  useEffect(() => {
    const fetchFeedData = async () => {
      setIsLoading(true);
      try {
        const appsRes = await fetch('/api/apps/approved');

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          const existingUrls = new Set(miniAppsData.map(app => app.url));
          const newApps = (appsData.apps || []).filter((app: MiniApp) => !existingUrls.has(app.url));
          setApps(prev => [...prev, ...newApps]);
        }
      } catch (error) {
        console.error("Failed to fetch community apps", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedData();
  }, []);

  // Logika untuk memfilter aplikasi berdasarkan pencarian dan chain
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
    <>
      <Header />
      <main className="mx-auto py-6 px-4 pb-32 max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gold mb-2">
          App Directory
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Discover new and popular Farcaster Mini Apps and crypto tools.
        </p>
        
        {/* Kontrol Search dan Filter */}
        <div className="pt-2 pb-4">
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
        
        {/* Grid Aplikasi */}
        <div className="mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredApps.map((app) => (
              <MiniAppCard key={app.id} app={app} onLaunch={handleLaunchApp} />
            ))}
          </div>

          {isLoading && <div className="flex justify-center mt-8"><LoaderCircle className="animate-spin text-gold" /></div>}
          {!isLoading && filteredApps.length === 0 && (
              <p className="text-center text-neutral-500 mt-8">No apps found for this filter.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
                }
