// Lokasi file: src/components/ui/Header.tsx

"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (loggedInUser?.fid) {
      console.log(`[Header] ➡️ Fetching points for FID: ${loggedInUser.fid}`);
      
      fetch(`/api/user/points?fid=${loggedInUser.fid}`)
        .then(async (res) => {
          console.log(`[Header] ⬅️ API Response Status: ${res.status} ${res.statusText}`);
          const responseText = await res.text(); // Baca respons sebagai teks terlebih dahulu
          
          if (!res.ok) {
            console.error('[Header] ❌ API response was not OK. Raw response body:', responseText);
            throw new Error('API response was not ok.');
          }

          console.log('[Header] 📝 Raw API response body:', responseText);
          return JSON.parse(responseText); // Baru parse JSON setelah di-log
        })
        .then(data => {
          console.log('[Header] ✅ Parsed data from API:', data);
          
          if (data && (data.points !== null && data.points !== undefined)) {
            console.log(`[Header] ✅ Setting total points to: ${data.points}`);
            setTotalPoints(data.points);
          } else {
            console.warn('[Header] ⚠️ Points data is null or undefined in response. Setting to 0.');
            setTotalPoints(0);
          }
        })
        .catch(err => {
          console.error("[Header] ❌ CATCH BLOCK - Failed to fetch or process user points:", err);
          setTotalPoints(0); // Set ke 0 sebagai fallback jika ada error
        });
    }
  }, [loggedInUser?.fid]);

  // Sisa kode (handleViewProfile, handleBuyLink, JSX return) tidak berubah
  const handleViewProfile = () => { /* ... */ };
  const handleBuyLink = () => { /* ... */ };
  return (
    <div className="relative mb-2">
      <div className="flex h-16 items-center justify-between px-2 gap-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image src="/watchcoin-logo.png" alt="Watch Portal Logo" width={36} height={36} className="rounded-md" priority unoptimized={true} />
          </Link>
          <Button onClick={handleBuyLink} variant="secondary" size="sm">
            Buy Watch
          </Button>
        </div>
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
          {loggedInUser && (
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
          )}
          {!loggedInUser && (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-700" />
              <div className="w-10 h-10 rounded-full bg-neutral-800 border-2 border-neutral-700" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

(Header.prototype as any).handleViewProfile = function() {
    if (this.loggedInUser && this.actions?.viewProfile) {
      this.actions.viewProfile({ fid: this.loggedInUser.fid });
      this.setIsUserDropdownOpen(false);
    }
};

(Header.prototype as any).handleBuyLink = function() {
    const buyUrl = 'https://streme.fun/token/0x2bb8fd57ac1e62194d56cd7680a067278c505e29';
    if (this.actions?.openUrl) {
      this.actions.openUrl(buyUrl);
    } else {
      window.open(buyUrl, '_blank', 'noopener,noreferrer');
    }
};
