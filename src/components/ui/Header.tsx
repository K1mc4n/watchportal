// Lokasi file: src/components/ui/Header.tsx

"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button'; 
// --- 1. Impor ikon untuk Leaderboard ---
import { Trophy } from 'lucide-react';

export function Header() {
  const { context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;

  const handleViewProfile = () => {
    if (loggedInUser && actions?.viewProfile) {
      actions.viewProfile({ fid: loggedInUser.fid });
      setIsUserDropdownOpen(false);
    }
  };
  
  const handleBuyLink = () => {
    const buyUrl = 'https://streme.fun/token/0x2bb8fd57ac1e62194d56cd7680a067278c505e29';
    if (actions?.openUrl) {
      actions.openUrl(buyUrl);
    } else {
      window.open(buyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const LoggedInState = () => (
    <div className="relative mb-2">
      <div className="flex h-16 items-center justify-between px-2 gap-2">
        {/* Kontainer untuk item di sebelah kiri */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/watchcoin-logo.png"
              alt="Watch Portal Logo"
              width={36}
              height={36}
              className="rounded-md"
              priority
              unoptimized={true}
            />
          </Link>
          <Button 
            onClick={handleBuyLink}
            variant="secondary"
            size="sm"
          >
            Buy Watch
          </Button>
        </div>
        
        {/* --- AWAL PERUBAHAN HEADER --- */}
        {/* Kontainer untuk item di sebelah kanan */}
        <div className="flex items-center gap-3">
          {/* Tombol Leaderboard */}
          <Link href="/leaderboard">
            <Button variant="ghost" size="icon" className="text-gold hover:bg-neutral-800">
              <Trophy className="w-6 h-6" />
            </Button>
          </Link>

          {/* Ikon Profil dan Dropdown */}
          <div className="relative">
            <div 
              className="cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {loggedInUser?.pfpUrl ? (
                <Image 
                  src={loggedInUser.pfpUrl} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full border-2 border-gold"
                  width={40}
                  height={40}
                  key={loggedInUser.fid}
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-gold bg-neutral-700 flex items-center justify-center text-white font-bold">
                  {loggedInUser?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            {isUserDropdownOpen && (
              <div className="absolute top-full right-0 z-50 mt-1 w-40 bg-neutral-900 rounded-lg shadow-lg border border-neutral-700 p-2">
                <div className="text-right px-2 py-1 mb-2 border-b border-neutral-700">
                    <p className="font-bold text-sm text-white truncate">{loggedInUser?.displayName || loggedInUser?.username}</p>
                    <p className="text-xs text-gray-400 truncate">@{loggedInUser?.username}</p>
                </div>
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-2 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800 rounded-md"
                >
                  View Profile
                </button>
              </div>
            )}
          </div>
        </div>
        {/* --- AKHIR PERUBAHAN HEADER --- */}
      </div>
    </div>
  );

  const LoadingOrLoggedOutState = () => (
    <div className="flex h-16 items-center justify-between px-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-neutral-700 rounded-md animate-pulse" />
        <div className="w-24 h-9 bg-neutral-700 rounded-md animate-pulse" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse" />
        <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse" />
      </div>
    </div>
  );

  if (!loggedInUser) {
    return <LoadingOrLoggedOutState />;
  }
  
  return <LoggedInState />;
}
