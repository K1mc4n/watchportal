"use client";

import WalletChecker from "@/components/WalletChecker";
import NewsSection from "@/components/NewsSection";
import FarcasterFeed from "@/components/FarcasterFeed";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6 space-y-10">
      
      {/* ===== HEADER ===== */}
      <section className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-wide">
          Watchcoin Portal
        </h1>
        <p className="text-gray-400 text-sm">
          Your portal to crypto news, wallets, and Farcaster activity
        </p>
      </section>

      {/* ===== WALLET CHECKER ===== */}
      <section className="bg-zinc-900 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">
          🔍 Check Wallet
        </h2>
        <WalletChecker />
      </section>

      {/* ===== NEWS ===== */}
      <section className="bg-zinc-900 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">
          📰 Crypto News
        </h2>
        <NewsSection />
      </section>

      {/* ===== FARCASTER FEED ===== */}
      <section className="bg-zinc-900 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">
          🟣 Farcaster – Recent Casts
        </h2>
        <FarcasterFeed />
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-center text-xs text-gray-500 pt-6">
        © {new Date().getFullYear()} Watchcoin — Built on Base & Farcaster
      </footer>

    </main>
  );
}
