// src/components/ui/Header.tsx (Mengganti logo kiri)
"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button'; 

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
          {/* Logo aplikasi yang bisa diklik */}
          <Link href="/app" className="flex items-center">
            {/* ==== PERUBAHAN ADA DI SINI ==== */}
            <Image
              src="/watchcoin-logo.png" // Menggunakan logo watchcoin
              alt="Watch Portal Logo"
              width={36}
              height={36}
              className="rounded-md"
              priority
              unoptimized={true}
            />
          </Link>
          {/* Tombol "Buy Watch" */}
          <Button 
            onClick={handleBuyLink}
            variant="secondary"
            size="sm"
          >
            Buy Watch
          </Button>
        </div>
        
        {/* Kontainer untuk item di sebelah kanan (Profil Pengguna) */}
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
            <div className="absolute top-full right-0 z-50 mt-1 w-max min-w-[150px] bg-neutral-900 rounded-lg shadow-lg border border-neutral-700 p-3">
              <div className="text-right">
                <h3 
                  className="font-bold text-sm hover:underline cursor-pointer"
                  onClick={handleViewProfile}
                >
                  {loggedInUser?.displayName || loggedInUser?.username}
                </h3>
                <p className="text-xs text-gray-400">@{loggedInUser?.username}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const LoadingOrLoggedOutState = () => (
    <div className="flex h-16 items-center justify-between px-2">
      {/* Placeholder untuk bagian kiri */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-neutral-700 rounded-md animate-pulse" />
        <div className="w-24 h-9 bg-neutral-700 rounded-md animate-pulse" />
      </div>
      {/* Placeholder untuk bagian kanan */}
      <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse"></div>
    </div>
  );

  if (!loggedInUser) {
    return <LoadingOrLoggedOutState />;
  }
  
  return <LoggedInState />;
}
