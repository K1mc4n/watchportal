// src/components/ui/Header.tsx (Versi Sederhana untuk fokus pada Profil)
"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';

export function Header() {
  const { isSDKLoaded, context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;

  const handleViewProfile = () => {
    // Pastikan actions dan loggedInUser ada sebelum memanggil
    if (loggedInUser && actions?.viewProfile) {
      // Mengirim fid sebagai objek, sesuai dengan perbaikan sebelumnya
      actions.viewProfile({ fid: loggedInUser.fid });
    }
  };

  // Jika SDK belum dimuat atau tidak ada pengguna, kita render placeholder
  // untuk menjaga tinggi layout agar tidak ada pergeseran saat konten dimuat.
  if (!isSDKLoaded || !loggedInUser) {
    return <div className="h-16 mb-2"></div>;
  }

  return (
    <div className="relative mb-2">
      {/* Container utama header, mendorong semua item ke paling kanan */}
      <div className="flex h-16 items-center justify-end px-2">

        {/* Wrapper untuk Ikon Profil Pengguna dan dropdownnya */}
        <div className="relative">
          <div 
            className="cursor-pointer"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            {loggedInUser.pfpUrl ? (
              <Image 
                src={loggedInUser.pfpUrl} 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-gold"
                width={40}
                height={40}
                key={loggedInUser.fid} // Key penting untuk re-render saat user berganti
              />
            ) : (
              // Placeholder jika pfp tidak ada
              <div className="w-10 h-10 rounded-full border-2 border-gold bg-neutral-700"></div>
            )}
          </div>
          
          {/* Dropdown Menu Pengguna */}
          {isUserDropdownOpen && (
            <div className="absolute top-full right-0 z-50 mt-1 w-max min-w-[150px] bg-neutral-900 rounded-lg shadow-lg border border-neutral-700 p-3">
              <div className="text-right">
                <h3 
                  className="font-bold text-sm hover:underline cursor-pointer"
                  onClick={handleViewProfile}
                >
                  {loggedInUser.displayName || loggedInUser.username}
                </h3>
                <p className="text-xs text-gray-400">@{loggedInUser.username}</p>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
