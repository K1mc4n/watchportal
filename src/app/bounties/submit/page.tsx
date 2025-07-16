// Lokasi file: src/app/bounties/submit/page.tsx
"use client";

import { useState } from 'react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/Button';
import { useMiniApp } from '@neynar/react';

export default function SubmitBountyPage() {
  const { context } = useMiniApp();
  const [bountyUrl, setBountyUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!bountyUrl) {
      setMessage({ type: 'error', text: 'Please enter a bounty URL.' });
      return;
    }

    if (!context?.user?.fid) {
      setMessage({ type: 'error', text: 'You must be logged in to submit a bounty.' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/bounties/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: bountyUrl, submitted_by_fid: context.user.fid }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }

      setMessage({ type: 'success', text: 'Bounty submitted! It will be reviewed shortly.' });
      setBountyUrl('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Could not submit the bounty.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto py-2 px-4 pb-20 max-w-2xl">
        <Header />
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-center">Submit a Bounty</h1>
          <p className="text-center text-gray-400 mb-8">
            Found an interesting bounty? Share it with the community!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="bountyUrl" className="block text-sm font-medium text-gray-300 mb-1">Bounty URL</label>
              <Input id="bountyUrl" type="url" value={bountyUrl} onChange={(e) => setBountyUrl(e.target.value)} placeholder="https://poidh.xyz/base/bounty/..." />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading} disabled={!context?.user}>
              Submit Bounty for Review
            </Button>

            {message && <div className={`mt-4 text-center p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>{message.text}</div>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
