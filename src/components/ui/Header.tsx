// Lokasi file: src/components/ui/Header.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button'; 
import { Trophy } from 'lucide-react';

export function Header() {
  const { context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;
  const [totalPoints, setTotalPoints] = useState<number | null>(null);

  // --- LOGIKA BARU UNTUK MENDETEKSI SCROLL ---
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const offset = window.scrollY;
    // Aktifkan efek setelah scroll sejauh 10 piksel
    setIsScrolled(offset > 10);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Cleanup listener untuk mencegah memory leak
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  // --- AKHIR LOGIKA SCROLL ---

  useEffect(() => {
    if (loggedInUser?.fid) {
      fetch(`/api/user/points?fid=${loggedInUser.fid}`)
        .then(res => res.json())
        .then(data => {
          if (data.points !== null) setTotalPoints(data.points);
        })
        .catch(err => console.error("Failed to fetch user points:", err));
    }
  }, [loggedInUser?.fid]);

  const handleViewProfile = () => {
    if (loggedInUser && actions?.viewProfile) {
      actions.viewProfile({ fid: loggedInUser.fid });
      setIsUserDropdownOpen(false);
    }
  };
  
  const handleBuyLink = () => {
    const buyUrl = 'https://www.clanker.world/clanker/0x6e12d90023BBCA9548d4F4196b06dfcec55c0b07';
    if (actions?.openUrl) {
      actions.openUrl(buyUrl);
    } else {
      window.open(buyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    // Terapkan kelas secara dinamis berdasarkan state isScrolled
    <div className={`header-sticky ${isScrolled ? 'scrolled-header' : ''}`}>
      <div className="flex h-16 items-center justify-between px-2 gap-2 max-w-2xl mx-auto">
        {/* Kontainer Kiri */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image src="/watchcoin-logo.png" alt="Watch Portal Logo" width={36} height={36} className="rounded-md" priority unoptimized={true} />
          </Link>
          <Button onClick={handleBuyLink} variant="secondary" size="sm">
            Buy Watch
          </Button>
        </div>
        
        {/* Kontainer Kanan */}
        <div className="flex items-center gap-3">
          <Link href="/leaderboard">
            <Button variant="ghost" size="icon" className="text-gold hover:bg-neutral-800">
              <Trophy className="w-6 h-6" />
            </Button>
          </Link>

          {loggedInUser && (
            <div className="flex items-center justify-center bg-neutral-800 px-4 py-2 rounded-full border border-neutral-700">
              <p className="text-md font-bold text-white leading-none">
                {totalPoints !== null ? totalPoints : '...'}
              </p>
            </div>
          )}

          {loggedInUser ? (
            <div className="relative">
              <div className="cursor-pointer" onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
                <Image src={loggedInUser.pfpUrl!} alt="Profile" className="w-10 h-10 rounded-full border-2 border-gold" width={40} height={40} key={loggedInUser.fid} />
              </div>
              {isUserDropdownOpen && (
                <div className="absolute top-full right-0 z-50 mt-1 w-40 bg-neutral-900 rounded-lg shadow-lg border border-neutral-700 p-2">
                  <div className="text-right px-2 py-1 mb-2 border-b border-neutral-700">
                    <p className="font-bold text-sm text-white truncate">{loggedInUser.displayName || loggedInUser.username}</p>
                    <p className="text-xs text-gray-400 truncate">@{loggedInUser.username}</p>
                  </div>
                  <button onClick={handleViewProfile} className="w-full text-left px-2 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800 rounded-md">View Profile</button>
                </div>
              )}
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-700" />
          )}
        </div>
      </div>
    </div>
  );
}
