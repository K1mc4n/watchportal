// Lokasi file: src/components/Demo.tsx
"use client";

import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
import { ActionCard } from "./ui/ActionCard"; 
import { SponsorBanner } from "./ui/SponsorBanner";
        
// Impor ikon-ikon yang dibutuhkan, termasuk Trophy untuk bounty
import { Newspaper } from 'lucide-react';
import BaseTxCountForm from './BaseTxCountForm';

const sponsors = [
  { 
    name: "Seconds", 
    logoUrl: "/images/seconds-logo.png",
    description: "$SECONDS is an innovative, up-only token technology powered by Proof of Time. The more $SECONDS you hold, the more $SECONDS you can mint.",
    learnMoreLink: "https://farcaster.xyz/miniapps/6exyQocUa5yy/seconds"
  },
  { 
    name: "Scout Games", 
    logoUrl: "/images/scout-games-logo.png",
    description: "Fantasy game where you collect developers, earn rewards, and support open-source.",
    learnMoreLink: "https://farcaster.xyz/miniapps/JX-BIkAO-oMv/scout-game"
  },
  { 
    name: "Calendar3", 
    logoUrl: "/images/calendar3-logo.png",
    description: "Calendar3 mini‑app: launchpad for founders and developers to schedule precise crypto launches.",
    learnMoreLink: "https://farcaster.xyz/miniapps/VWJYBgehaDcZ/calendar3"
  },
  { 
    name: "Poidh", 
    logoUrl: "/images/poidh-logo.png",
    description: "On‑chain bounty dApp where users create, share, claim simple crypto challenges.",
    learnMoreLink: "https://farcaster.xyz/miniapps/E4kUegtA0DOk/poidh" 
  },
];

export default function ThemedFeed() {
  // ...existing code...

  return (
    <>
      <Header />
      <main className="mx-auto py-6 px-4 pb-32 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-center mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-400">
                Watch{' '}
            </span>
            <span className="text-gold">
                Portal
            </span>
        </h1>
        <p className="text-center text-neutral-400 mb-8">
          The Farcaster App Store, supercharged.
        </p>

        {/* Fitur Cek Total Transaksi Wallet Base */}
        <div className="max-w-md mx-auto py-6">
          <h2 className="text-xl font-bold mb-2 text-center">Cek Total Transaksi Wallet Base</h2>
          <BaseTxCountForm />
        </div>

    
        
        
    <div className="my-8">
      <ActionCard href="/news" icon={Newspaper} title="Web3 News" description="Stay updated" className="w-full bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
    </div>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {sponsors.map(sponsor => (
            <SponsorBanner 
              key={sponsor.name}
              name={sponsor.name}
              logoUrl={sponsor.logoUrl}
              description={sponsor.description}
              learnMoreLink={sponsor.learnMoreLink}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
