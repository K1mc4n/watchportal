// src/components/ui/Header.tsx (Perbaikan Final)
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
      setIsUserDropdownOpen(false);
    }
  };

  const LoadingOrLoggedOutState = () => (
    <div className="flex h-16 items-center justify-end px-2">
      <div className="w-10 h-10 rounded-full bg-neutral-700 animate-pulse"></div>
    </div>
  );

  const LoggedInState = () => (
    <div className="relative mb-2">
      <div className="flex h-16 items-center justify-end px-2">
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
                {/* --- PERBAIKAN DI SINI --- */}
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
                  {/* --- DAN DI SINI --- */}
                  {loggedInUser?.displayName || loggedInUser?.username}
                </h3>
                {/* --- DAN DI SINI --- */}
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
