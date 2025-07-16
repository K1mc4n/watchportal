// Lokasi file: src/components/ui/BountyCard.tsx
"use client";

import { useMiniApp } from '@neynar/react';
import { Button } from './Button';

export interface Bounty {
  id: number;
  url: string;
  title: string;
  imageUrl: string;
}

interface BountyCardProps {
  bounty: Bounty;
}

export const BountyCard = ({ bounty }: BountyCardProps) => {
  const { actions } = useMiniApp();

  const handleViewBounty = () => {
    if (actions?.openUrl) {
      actions.openUrl(bounty.url);
    } else {
      window.open(bounty.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full bg-neutral-800 rounded-lg shadow-md overflow-hidden my-4 border border-neutral-700 hover:border-gold/50 transition-all">
      {/* Tampilkan gambar dari Farcaster Frame */}
      {bounty.imageUrl && (
        <img
          src={bounty.imageUrl}
          alt={bounty.title}
          className="w-full object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
      {/* Tombol Aksi */}
      <div className="p-4">
        <Button onClick={handleViewBounty} className="w-full bg-gold text-black">
          View & Claim Bounty
        </Button>
      </div>
    </div>
  );
};
