// src/components/ui/Header.tsx

"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from 'next/image';
// Impor APP_NAME tidak lagi diperlukan di sini
// import { APP_NAME } from "~/lib/constants"; 

export function Header() {
  const { context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const loggedInUser = context?.user;

  return (
    <div className="relative mb-2">
      <div className="flex h-16 items-center justify-between px-2">
        
        {/* Sisi Kiri: Dikosongkan */}
        <div>
          {/* Area ini sengaja dibiarkan kosong */}
        </div>

        {/* Sisi Kanan: Hanya Profil Pengguna */}
        {loggedInUser && (
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
                key={loggedInUser.fid}
              />
            ) : (
              <div className="w-10 h-10 rounded-full border-2 border-gold bg-neutral-700"></div>
            )}
          </div>
        )}
      </div>
      
      {/* Dropdown Menu Pengguna */}
      {loggedInUser && isUserDropdownOpen && (
        <div className="absolute top-full right-2 z-50 w-fit mt-1 bg-neutral-900 rounded-lg shadow-lg border border-neutral-700 p-3">
          <div className="text-right">
            <h3 
              className="font-bold text-sm hover:underline cursor-pointer"
              onClick={() => actions.viewProfile({ fid: loggedInUser.fid })}
            >
              {loggedInUser.displayName || loggedInUser.username}
            </h3>
            <p className="text-xs text-gray-400">@{loggedInUser.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}
