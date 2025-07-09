// src/components/ui/Header.tsx

"use client";

import { useMiniApp } from "@neynar/react";
import Image from 'next/image';

export function Header() {
  const { context } = useMiniApp();
  const loggedInUser = context?.user;

  return (
    // Kontainer utama header
    <div className="flex h-16 items-center justify-between p-2 mb-4">
      
      {/* Bagian Kiri Header (Dikosongkan untuk sekarang) */}
      <div>
        {/*
          Area ini sengaja dibiarkan kosong.
          Nanti bisa diisi dengan logo, nama aplikasi, atau tombol kembali.
        */}
      </div>

      {/* Bagian Kanan Header (Profil Pengguna) */}
      <div>
        {loggedInUser && (
          <div>
            {loggedInUser.pfpUrl ? (
              <Image 
                src={loggedInUser.pfpUrl} 
                alt="Farcaster Profile Picture" 
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                key={loggedInUser.fid}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-neutral-700"></div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
