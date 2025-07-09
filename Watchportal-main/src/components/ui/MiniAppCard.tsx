// src/components/ui/MiniAppCard.tsx

import { MiniApp } from '~/lib/miniAppsData';

interface MiniAppCardProps {
  app: MiniApp;
  onLaunch: (url: string) => void;
}

export const MiniAppCard = ({ app, onLaunch }: MiniAppCardProps) => {
  return (
    <div 
      // --- SEMUA PERUBAHAN ADA DI SINI ---
      className="
        flex flex-col items-center text-center w-full h-full 
        bg-neutral-800                             // 1. Latar belakang diubah menjadi abu-abu gelap
        rounded-lg shadow-md overflow-hidden 
        border border-transparent                 // 2. Border dibuat transparan secara default
        p-2 cursor-pointer 
        transition-all duration-200 ease-in-out   // 3. Tambahkan transisi halus untuk semua perubahan
        hover:border-gold                         // 4. Saat di-hover, border menjadi emas
        hover:scale-105                           // 5. Saat di-hover, kartu sedikit membesar
        hover:shadow-lg hover:shadow-gold/10      // 6. Saat di-hover, tambahkan bayangan emas
      "
      onClick={() => onLaunch(app.url)}
    >
      {/* Ikon Aplikasi */}
      <img
        className="w-12 h-12 rounded-lg object-cover mb-1"
        src={app.iconUrl}
        alt={`Icon for ${app.name}`}
      />
      
      {/* Nama Aplikasi */}
      <p className="text-xs font-semibold text-gray-200 leading-tight">
        {app.name}
      </p>
    </div>
  );
};
