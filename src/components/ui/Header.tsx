// src/components/ui/Header.tsx

"use client";

// Impor yang mungkin kita butuhkan nanti
import { useMiniApp } from "@neynar/react";

export function Header() {
  // Kita bisa ambil data pengguna nanti dari sini
  const { context } = useMiniApp();

  return (
    // Ini adalah kontainer utama untuk header kita.
    // Semua elemen header akan kita masukkan di sini.
    <div className="flex h-16 items-center justify-between p-2">
      
      {/* Bagian Kiri Header (untuk Logo dan Nama) */}
      <div>
        {/* Nanti kita isi di sini */}
      </div>

      {/* Bagian Kanan Header (untuk Profil Pengguna) */}
      <div>
        {/* Nanti kita isi di sini */}
      </div>

    </div>
  );
}
