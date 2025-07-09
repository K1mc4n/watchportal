"use client";

import { useState } from "react";
import { useMiniApp } from "@neynar/react";
import Image from "next/image"; // Gunakan Image dari Next.js untuk optimasi

export function Header() {
  const { isSDKLoaded, context, actions } = useMiniApp();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const loggedInUser = context?.user;

  return (
    <div className="relative mb-2">
      {/* Baris utama header */}
      <div className="flex h-16 items-center justify-between px-2">
        {/* Bagian Kiri (bisa diisi nanti) */}
        <div>
           {/* Anda bisa tambahkan logo atau nama aplikasi di sini nanti */}
        </div>

        {/* Bagian Kanan */}
        <div className="w-10 h-10">
          {/* Tampilkan skeleton loading jika SDK belum siap */}
          {!isSDKLoaded && (
            <div className="w-10 h-10 animate-pulse rounded-full bg-neutral-800"></div>
          )}

          {/* Tampilkan profil jika SDK sudah siap dan pengguna ada */}
          {isSDKLoaded && loggedInUser && (
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
      </div>

      {/* Dropdown Menu (hanya muncul jika dropdown terbuka) */}
      {isUserDropdownOpen && loggedInUser && (
        <div className="absolute top-full right-2 z-50 w-fit mt-1 rounded-lg border border-neutral-700 bg-neutral-900 p-3 shadow-lg">
          <div className="text-right">
            <h3
              className="cursor-pointer text-sm font-bold hover:underline"
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
