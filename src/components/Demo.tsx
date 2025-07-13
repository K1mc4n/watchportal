// Lokasi file: src/components/Demo.tsx
"use client";

import { useState, useMemo } from "react";
import { useMiniApp } from "@neynar/react";
import { useDebounce } from 'use-debounce';
import { MiniAppCard } from "./ui/MiniAppCard";
import { NewsCard, type Article } from "./ui/NewsCard"; // Pastikan Article di-export dari NewsCard
import { type MiniApp } from "~/lib/miniAppsData";
import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";

// ==== INI BAGIAN PALING PENTING ====
// Pastikan interface ini mendefinisikan semua props yang kita kirim
interface ThemedFeedProps {
  title?: string;
  apps: MiniApp[];
  news: Article[];
  isLoading: boolean;
}
// ===================================

export default function ThemedFeed({ title, apps, news, isLoading }: ThemedFeedProps) {
  const { context, actions } = useMiniApp();
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleLaunchApp = (url: string) => {
    if (actions.openUrl) actions.openUrl(url);
    else window.open(url, '_blank');
  };

  const feedItems = useMemo(() => {
    // Filter apps terlebih dahulu
    const filteredApps = apps.filter(app => {
      const chainMatch = selectedChain === 'All' || app.chain === selectedChain;
      const term = debouncedSearchTerm.toLowerCase();
      if (!term) return chainMatch; // Jika tidak ada pencarian, hanya filter chain
      const searchMatch = 
        app.name.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term) ||
        (app.tags && app.tags.some(tag => tag.toLowerCase().includes(term)));
      return chainMatch && searchMatch;
    });

    // Gabungkan apps dan news ke dalam satu feed
    const combined: ( {type: 'app', data: MiniApp} | {type: 'news', data: Article} )[] = [];
    let newsIndex = 0;
    for (let i = 0; i < filteredApps.length; i++) {
        combined.push({ type: 'app', data: filteredApps[i] });
        // Sisipkan berita setiap 4 aplikasi, jika berita masih tersedia
        if ((i + 1) % 4 === 0 && newsIndex < news.length) {
            combined.push({ type: 'news', data: news[newsIndex] });
            newsIndex++;
        }
    }
    return combined;
  }, [selectedChain, debouncedSearchTerm, apps, news]);

  const chains = ['All', 'Base', 'Optimism', 'Degen', 'Multi-chain', 'Arbitrum'];

  return (
    <div style={{ paddingTop: context?.client.safeAreaInsets?.top ?? 0 }}>
      <Header />
      <main className="mx-auto py-6 px-4 pb-24 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400 mb-2">
          Watch Portal
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          Your portal to the world of crypto news, apps, and on-chain data
        </p>

        <div className="sticky top-0 z-10 pt-4 pb-4 bg-neutral-900/50 backdrop-blur-md -mx-4 px-4">
            <input
                type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search apps by name, tag, or chain..."
                className="h-12 w-full rounded-full bg-neutral-800 border border-neutral-700 px-6 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <div className="flex justify-center flex-wrap gap-2 mt-4">
                {chains.map((chain) => (
                    <button key={chain} onClick={() => setSelectedChain(chain)}
                        className={`px-3 py-1 text-sm font-semibold rounded-full transition-all duration-200 ${
                            selectedChain === chain ? 'bg-gold text-black shadow-md shadow-gold/20' : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-700'
                        }`}
                    >
                        {chain}
                    </button>
                ))}
            </div>
        </div>

        <div className="mt-8">
            {feedItems.map((item, index) => {
              if (item.type === 'app') {
                  return (
                    <div key={`app-grid-${item.data.id}`} className="grid grid-cols-2 gap-4 mb-4">
                      {feedItems.slice(index, index + 2).map(appItem => appItem.type === 'app' && (
                        <MiniAppCard key={appItem.data.id} app={appItem.data} onLaunch={handleLaunchApp} />
                      ))}
                    </div>
                  )
              }
              if (item.type === 'news') {
                  return <NewsCard key={`news-${item.data.url}-${index}`} article={item.data} />;
              }
              return null;
            }).filter((_item, index, self) => {
                // Trik untuk mencegah render ganda kartu aplikasi karena slice di atas
                if (index > 0 && self[index]?.type === 'app' && self[index-1]?.type === 'app') {
                    return false;
                }
                return true;
            })}
        </div>
        
        {isLoading && <p className="text-center text-neutral-500 mt-8">Loading...</p>}

      </main>
      <Footer />
    </div>
  );
}
