// Lokasi file: src/app/trending/page.tsx (VERSI FINAL & BERSIH)
"use client";

import { useState, useEffect } from 'react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { LoaderCircle, TrendingUp, ArrowDown, ArrowUp } from 'lucide-react';

interface Pool {
  id: string;
  name: string;
  price_usd: string;
  price_change_percentage_h24: string;
  volume_h24_usd: string;
}

const formatCurrency = (value: string | number) => { /* ... (tidak berubah) ... */ };
const formatVolume = (value: string | number) => { /* ... (tidak berubah) ... */ };

export default function TrendingPage() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/trending/base');
        const data = await response.json();
        setPools(data.pools || []);
      } catch (error) {
        console.error("Failed to fetch trending pools:", error);
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

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoaderCircle className="animate-spin h-12 w-12 text-gold" />
          </div>
        ) : (
          <div className="space-y-3">
            {pools.map((pool, index) => {
              const priceChange = parseFloat(pool.price_change_percentage_h24);
              const isPositive = priceChange >= 0;

              // ===========================================
              // ==== LOGIKA EKSTRAKSI PALING SEDERHANA ====
              // ===========================================
              // Ambil nama dari pool.name, pisahkan berdasarkan spasi
              const nameParts = pool.name.split(' ');
              const pairSymbols = `${nameParts[0]} / ${nameParts[1]}`;

              return (
                <div key={pool.id} className="bg-neutral-800 p-4 rounded-xl border border-neutral-700 hover:border-gold/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-neutral-500 w-8">{index + 1}</span>
                      <div className='ml-2'>
                        {/* Langsung tampilkan simbol yang sudah dipisahkan */}
                        <p className="font-bold text-lg">{pairSymbols}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{formatCurrency(pool.price_usd)}</p>
                      <div className={`flex items-center justify-end gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        {Math.abs(priceChange).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-neutral-700 flex justify-between items-center text-sm">
                      <p className="text-neutral-400">24h Volume:</p>
                      <p className="font-bold">{formatVolume(pool.volume_h24_usd)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

// Salin helper function lagi
const formatCurrency = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(num);
};

const formatVolume = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num)) return '$0';
    if (num > 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
    if (num > 1_000) return `$${(num / 1_000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
};
