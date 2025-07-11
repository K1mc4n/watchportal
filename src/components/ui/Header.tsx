// src/components/ui/Header.tsx (Versi Diperbarui & Lebih Kokoh)
"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';

export function Header() {
  const { context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;

  const handleViewProfile = () => {
    if (loggedInUser && actions?.viewProfile) {
      actions.viewProfile({ fid: loggedInUser.fid });
      setIsUserDropdownOpen(false); // Tutup dropdown setelah diklik
    }
  };

  // 1. Tampilan saat loading atau jika tidak ada pengguna
  const LoadingOrLoggedOutState = () => (
    <div className="flex h-16 items-center justify-end px-2">
      <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse"></div>
    </div>
  );

  // 2. Tampilan jika sudah login
  const LoggedInState = () => (
    <div className="relative mb-2">
      <div className="flex h-16 items-center justify-end px-2">
        <div className="relative">
          <div 
            className="cursor-pointer"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            {/* 3. Pastikan pfpUrl ada sebelum merender komponen Image */}
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
              // Placeholder jika pfpUrl tidak ada tapi user sudah login
              <div className="w-10 h-10 rounded-full border-2 border-gold bg-neutral-700 flex items-center justify-center text-white font-bold">
                {loggedInUser?.username.charAt(0).toUpperCase()}
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

  // Jika tidak ada user, tampilkan state loading.
  if (!loggedInUser) {
    return <LoadingOrLoggedOutState />;
  }
  
  // Jika ada user, tampilkan profilnya.
  return <LoggedInState />;
}
