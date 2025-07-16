// Lokasi file: src/app/bounties/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { BountyCard, type Bounty } from '~/components/ui/BountyCard';
import { Button } from '~/components/ui/Button';
import { LoaderCircle } from 'lucide-react';

export default function BountiesPage() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBounties = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/bounties/list');
        if (!response.ok) {
          throw new Error('Failed to fetch bounties');
        }
        const data = await response.json();
        setBounties(data.bounties || []);
      } catch (error) {
        console.error("Error fetching bounties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBounties();
  }, []);

  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <div className="flex justify-between items-center mt-6 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-center text-gold">Live Bounties</h1>
                <p className="text-gray-400">Discover bounties from across Farcaster.</p>
            </div>
            <Link href="/bounties/submit">
                <Button>Submit Bounty</Button>
            </Link>
        </div>
        
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
                <LoaderCircle className="animate-spin h-10 w-10 text-gold" />
            </div>
          ) : bounties.length > 0 ? (
            bounties.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No active bounties right now.</p>
              <p>Be the first to submit one!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
