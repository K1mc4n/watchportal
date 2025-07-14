// Lokasi file: src/components/ui/ActionCard.tsx
"use client";

import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';

interface ActionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export const ActionCard = ({ href, icon: Icon, title, description, className }: ActionCardProps) => {
  return (
    // --- PERUBAHAN DI SINI: Padding diubah dari p-4 menjadi p-3 ---
    <Link href={href} className={`group block p-3 rounded-xl border transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-3">
        {/* --- PERUBAHAN DI SINI: Ikon dan kotaknya diperkecil --- */}
        <div className="p-2 bg-neutral-800 rounded-lg">
          <Icon className="w-5 h-5 text-gold" />
        </div>
        <div>
          {/* --- PERUBAHAN DI SINI: Ukuran font judul dan deskripsi disesuaikan --- */}
          <h3 className="font-bold text-white group-hover:text-gold transition-colors text-sm">{title}</h3>
          <p className="text-xs text-neutral-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};
