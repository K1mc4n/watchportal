// src/components/ui/Header.tsx (Kode yang Benar)
"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from "next/image"; // Menggunakan komponen Image yang lebih baik
import { APP_NAME } from "~/lib/constants";

export function Header() {
  // Ambil juga `isSDKLoaded` untuk mengecek status koneksi
  const { isSDKLoaded, context } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;

  return (
    <div className="relative">
      <div className="mb-1 flex items-center justify-between rounded-lg border-[3px] border-double border-purple-500 bg-gray-100 py-2 px-3 dark:bg-gray-800">
        <div className="text-lg font-light">
          Welcome to {APP_NAME}!
        </div>

        {/* Kontainer untuk foto profil, diberi ukuran agar layout stabil */}
        <div className="h-10 w-10">
          {/* 1. Tampilkan skeleton loading jika SDK belum siap */}
          {!isSDKLoaded && (
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          )}

          {/* 2. Tampilkan profil HANYA JIKA SDK sudah siap DAN ada pengguna */}
          {isSDKLoaded && loggedInUser && (
            <div
              className="cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {loggedInUser.pfpUrl ? (
                <Image
                  src={loggedInUser.pfpUrl}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-purple-500"
                />
              ) : (
                <div className="h-10 w-10 rounded-full border-2 border-purple-500 bg-gray-700"></div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Menu Pengguna (Logika ini sudah benar) */}
      {isUserDropdownOpen && loggedInUser && (
        <div className="absolute top-full right-0 z-50 mt-1 w-fit rounded-lg border border-gray-200 bg-white p-3 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-2 text-right">
            <h3
              className="cursor-pointer text-sm font-bold hover:underline"
              onClick={() => context.viewProfile(loggedInUser.fid)}
            >
              {loggedInUser.displayName || loggedInUser.username}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">@{loggedInUser.username}</p>
          </div>
        </div>
      )}
    </div>
  );
}
