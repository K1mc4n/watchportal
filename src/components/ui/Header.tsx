// src/components/ui/Header.tsx (Versi Baru)
"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';
import Link from 'next/link'; // <-- Impor komponen Link

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

  // State saat loading atau logout, sekarang dengan layout yang seimbang
  const LoadingOrLoggedOutState = () => (
    <div className="flex h-16 items-center justify-between px-2">
      <div className="w-10 h-10" /> {/* Placeholder untuk logo agar layout tidak bergeser */}
      <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse"></div>
    </div>
  );

  // State saat sudah login
  const LoggedInState = () => (
    <div className="relative mb-2">
      {/* UBAH BARIS INI: Gunakan justify-between untuk memisahkan item */}
      <div className="flex h-16 items-center justify-between px-2">
        {/* TAMBAHKAN BLOK INI: Logo di sebelah kiri */}
        <Link href="/app" className="flex items-center gap-2">
          <Image
            src="/watchcoin-logo.png" // Menggunakan logo yang lebih kecil
            alt="Watch Portal Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="font-bold text-lg hidden sm:inline text-gold">Watch Portal</span>
        </Link>
        
        {/* Kode profil pengguna yang sudah ada sebelumnya */}
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

  if (!loggedInUser) {
    return <LoadingOrLoggedOutState />;
  }
  
  return <LoggedInState />;
}
