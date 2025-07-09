// src/components/ui/Header.tsx
"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from "next/image";

export function Header() {
  const { isSDKLoaded, context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;

  return (
    <div className="relative mb-2">
      <div className="flex h-16 items-center justify-between px-2">
        <div>
          {/* Bagian kiri bisa diisi nanti */}
        </div>
        <div className="w-10 h-10">
          {!isSDKLoaded && (
            <div className="w-10 h-10 animate-pulse rounded-full bg-neutral-800"></div>
          )}
          {isSDKLoaded && loggedInUser && (
            <div
              className="cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {loggedInUser.pfpUrl ? (
                <Image
                  src={loggedInUser.pfpUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-purple-500"
                  width={40}
                  height={40}
                  key={loggedInUser.fid}
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-purple-500 bg-neutral-700"></div>
              )}
            </div>
          )}
        </div>
      </div>
      {isUserDropdownOpen && loggedInUser && (
        <div className="absolute top-full right-2 z-50 w-fit mt-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 shadow-lg">
          <div className="text-right">
            <h3
              className="cursor-pointer text-sm font-bold hover:underline"
              onClick={() => actions.viewProfile({ fid: loggedInUser.fid })}
            >
              {loggedInUser.displayName || loggedInUser.username}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              @{loggedInUser.username}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
