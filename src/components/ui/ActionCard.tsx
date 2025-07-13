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
    <Link href={href} className={`group block p-4 rounded-xl border transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-neutral-800 rounded-lg">
          <Icon className="w-6 h-6 text-gold" />
        </div>
        <div>
          <h3 className="font-bold text-white group-hover:text-gold transition-colors">{title}</h3>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};
