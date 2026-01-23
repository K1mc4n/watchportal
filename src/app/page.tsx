"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { SponsorBanner } from "@/components/ui/SponsorBanner";
import { MiniAppCard } from "@/components/ui/MiniAppCard";
import { NewsCard } from "@/components/ui/NewsCard";

import { miniAppsData } from "@/lib/miniAppsData";

export default function HomePage() {
  const handleLaunchApp = (app: any) => {
    if (app?.url) {
      window.open(app.url, "_blank");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* ===== HEADER ===== */}
      <Header />

      {/* ===== SPONSOR ===== */}
      <section className="px-4 mt-6">
        <SponsorBanner
          name="Base"
          logoUrl="/base-logo.png"
          description="Build and scale your onchain apps on Base — a secure, low-cost Ethereum L2."
          learnMoreLink="https://base.org"
        />
      </section>

      {/* ===== MINI APPS ===== */}
      <section className="px-4 mt-10">
        <h2 className="text-xl font-bold mb-4">⚡ Mini Apps</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {miniAppsData.map((app) => (
            <MiniAppCard
              key={app.slug}
              app={app}
              onLaunch={handleLaunchApp}
            />
          ))}
        </div>
      </section>

      {/* ===== NEWS ===== */}
      <section className="px-4 mt-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📰 Latest News</h2>
          <a
            href="/news"
            className="text-sm text-gray-400 hover:text-white"
          >
            View all →
          </a>
        </div>

        <NewsCard />
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </main>
  );
}
