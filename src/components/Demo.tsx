// Lokasi file: src/components/Demo.tsx
"use client";

import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
import { ActionCard } from "./ui/ActionCard"; 
import { SponsorBanner } from "./ui/SponsorBanner";
import { Newspaper, ListChecks, Swords, AppWindow, PlusSquare } from 'lucide-react';

// --- DATA SPONSOR DENGAN DETAIL DARI ANDA ---
const sponsors = [
  { 
    name: "Poidh", 
    logoUrl: "/images/poidh-logo.png",
    description: "On‑chain bounty dApp where users create, share, claim simple crypto challenges.",
    learnMoreLink: "https://poidh.xyz" 
  },
  { 
    name: "Scout Games", 
    logoUrl: "/images/scout-games-logo.png",
    description: "Fantasy game where you collect developers, earn rewards, and support open-source.",
    learnMoreLink: "https://scoutgame.xyz/"
  },
  { 
    name: "Seconds", 
    logoUrl: "/images/seconds-logo.png",
    description: "$SECONDS is an innovative, up-only token technology powered by Proof of Time. The more $SECONDS you hold, the more $SECONDS you can mint.",
    learnMoreLink: "https://farcaster.xyz/miniapps/6exyQocUa5yy/seconds"
  },
  { 
    name: "Calendar3", 
    logoUrl: "/images/calendar3-logo.png",
    description: "Calendar3 mini‑app: launchpad for founders and developers to schedule precise crypto launches.",
    learnMoreLink: "https://farcaster.xyz/miniapps/VWJYBgehaDcZ/calendar3"
  },
];
// -----------------------------------------------------------

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
        
        <div className="my-8 grid grid-cols-2 gap-4">
            <ActionCard href="/apps" icon={AppWindow} title="App Directory" description="Browse all apps" className="col-span-2 bg-gradient-to-br from-gold/20 to-neutral-800 border-gold/50 hover:bg-gold/10" />
            <ActionCard href="/news" icon={Newspaper} title="Web3 News" description="Stay updated" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
            <ActionCard href="/quests" icon={ListChecks} title="Quests" description="Earn points" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
            <ActionCard href="/quiz" icon={Swords} title="Challenge" description="Test knowledge" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
            <ActionCard href="/submit" icon={PlusSquare} title="Submit App" description="Share your tool" className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700/50" />
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
