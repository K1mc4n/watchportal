"use client";

import { useState, useEffect, useMemo } from "react";
import { useMiniApp } from "@neynar/react";
import { useDebounce } from 'use-debounce'; // Kita tambahkan lagi fitur pencarian

import { Header } from "~/components/ui/Header";
import { Footer } from "~/components/ui/Footer";
import { MiniAppCard } from "./ui/MiniAppCard";
import { MiniAppCardSkeleton } from "./ui/MiniAppCardSkeleton";
import { miniAppsData, type MiniApp } from "~/lib/miniAppsData"; // Impor data statis dan tipenya

export default function Demo({ title }: { title?: string }) {
  const { isSDKLoaded, context, actions } = useMiniApp();
  
  // --- STATE MANAGEMENT ---
  const [communityApps, setCommunityApps] = useState<MiniApp[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedChain, setSelectedChain] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchCommunityApps = async () => {
      // Kita tidak set isLoading di sini agar daftar featured bisa langsung tampil
      try {
        const response = await fetch('/api/apps/approved');
        if (!response.ok) {
          throw new Error('Could not load community apps.');
        }
        const data = await response.json();

        // Pastikan tidak ada data duplikat dengan yang sudah ada di daftar statis
        const existingUrls = new Set(miniAppsData.map(app => app.url));
        const newApps = (data.apps || []).filter((app: MiniApp) => !existingUrls.has(app.url));

        setCommunityApps(newApps);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An error occurred.');
      } finally {
        setIsLoading(false); // Selesai loading setelah mencoba fetch data komunitas
      }
    };

    fetchCommunityApps();
  }, []);

  const handleLaunchApp = (url: string) => {
    if (isSDKLoaded && actions.openUrl) {
      actions.openUrl(url);
    } else {
      window.open(url, '_blank');
    }
  };

  const chains = ['All', 'Base', 'Optimism', 'Degen', 'Multi-chain', 'Arbitrum'];

  // --- FILTERING LOGIC ---
  const filterFunction = (app: MiniApp) => {
    const chainMatch = selectedChain === 'All' || app.chain === selectedChain;
    const term = debouncedSearchTerm.toLowerCase();
    const searchMatch = !term || 
      app.name.toLowerCase().includes(term) ||
      app.description.toLowerCase().includes(term) ||
      app.tags.some(tag => tag.toLowerCase().includes(term));
    return chainMatch && searchMatch;
  };
  
  const filteredFeaturedApps = useMemo(() => miniAppsData.filter(filterFunction), [selectedChain, debouncedSearchTerm]);
  const filteredCommunityApps = useMemo(() => communityApps.filter(filterFunction), [selectedChain, debouncedSearchTerm, communityApps]);

  // --- RENDER ---
  return (
    <div style={{ paddingTop: context?.client.safeAreaInsets?.top ?? 0 }}>
      <div className="mx-auto py-2 px-4 pb-20">
        <Header />
        <h1 className="text-2xl font-bold text-center mb-1">{title}</h1>
        <p className="text-center text-gray-500 mb-6">Your portal to crypto apps and news.</p>
        
        {/* Search Input */}
        <div className="px-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apps by name, tag, or chain..."
            className="h-10 w-full rounded-md bg-neutral-800 border border-neutral-700 px-4 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        
        {/* Chain Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {chains.map((chain) => (
            <button
              key={chain}
              onClick={() => setSelectedChain(chain)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                selectedChain === chain
                  ? 'bg-gold text-black'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {chain}
            </button>
          ))}
        </div>

        {/* Featured Apps Section */}
        {filteredFeaturedApps.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-3 px-2">✨ Featured Apps</h2>
            <div className="grid grid-cols-4 gap-2 animate-fade-in">
              {filteredFeaturedApps.map((app) => (
                <MiniAppCard key={app.id} app={app} onLaunch={handleLaunchApp} />
              ))}
            </div>
          </>
        )}
        
        {/* Community Submissions Section */}
        {isLoading && (
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-3 px-2 text-neutral-600">🌐 Community Submissions</h2>
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => <MiniAppCardSkeleton key={i} />)}
                </div>
            </div>
        )}

        {!isLoading && filteredCommunityApps.length > 0 && (
          <>
            <h2 className="text-xl font-bold mt-8 mb-3 px-2">🌐 Community Submissions</h2>
            <div className="grid grid-cols-4 gap-2 animate-fade-in">
              {filteredCommunityApps.map((app) => (
                <MiniAppCard key={app.id} app={app} onLaunch={handleLaunchApp} />
              ))}
            </div>
          </>
        )}

        {/* Pesan jika tidak ada hasil sama sekali */}
        {filteredFeaturedApps.length === 0 && filteredCommunityApps.length === 0 && !isLoading && (
            <div className="text-center py-10 text-neutral-500">
              <p>No applications found for your filter.</p>
            </div>
        )}

      </div>
      <Footer />
    </div>
  );
}
