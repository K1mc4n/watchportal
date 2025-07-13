// Lokasi file: src/app/trending/page.tsx (VERSI DEBUGGING)
"use client";

import { useState, useEffect } from 'react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { LoaderCircle, TrendingUp } from 'lucide-react';

export default function TrendingPage() {
  const [pools, setPools] = useState<any[]>([]); // Gunakan any[] untuk debugging
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/trending/base');
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log("RAW DATA FROM API:", data); // Log data mentah di console
        setPools(data.pools || []);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="mx-auto py-6 px-4 pb-28 max-w-2xl">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-10 h-10 text-gold" />
          <div>
            <h1 className="text-3xl font-bold">Hot Pairs on Base</h1>
            <p className="text-neutral-400">Top traded pairs in the last 24 hours.</p>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <LoaderCircle className="animate-spin h-12 w-12 text-gold" />
          </div>
        )}
        
        {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg">
                <h3 className="font-bold">An Error Occurred</h3>
                <pre className="mt-2 text-xs whitespace-pre-wrap">{error}</pre>
            </div>
        )}

        {/* ==== BAGIAN DEBUGGING UTAMA ==== */}
        {/* Ini akan menampilkan seluruh data JSON mentah di layar */}
        {!isLoading && !error && pools.length > 0 && (
            <div className="bg-neutral-800 p-4 rounded-lg mt-4">
                <h3 className="font-bold text-yellow-400 mb-2">-- RAW DATA DEBUG --</h3>
                <pre className="text-xs text-white whitespace-pre-wrap">
                    {JSON.stringify(pools, null, 2)}
                </pre>
            </div>
        )}
        
      </main>
      <Footer />
    </>
  );
}
