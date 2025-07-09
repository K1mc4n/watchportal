// src/app/submit/page.tsx

"use client";

import { useState } from 'react';
import { Header } from '~/components/ui/Header';
import { Footer } from '~/components/ui/Footer';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/Button';
import { useMiniApp } from '@neynar/react';
import Link from 'next/link';

// --- PERUBAHAN 1: Tipe data untuk menampung error per-field ---
interface FormErrors {
  appName?: string;
  appUrl?: string;
  iconUrl?: string;
  description?: string;
}

export default function SubmitPage() {
  const { context } = useMiniApp();
  const [appName, setAppName] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [description, setDescription] = useState('');
  const [chain, setChain] = useState('Base');
  const [tags, setTags] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // --- PERUBAHAN 2: State baru untuk menampung error ---
  const [errors, setErrors] = useState<FormErrors>({});

  // --- PERUBAHAN 3: Fungsi validasi ---
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!appName) newErrors.appName = 'App Name is required.';
    if (!appUrl) newErrors.appUrl = 'App URL is required.';
    if (!iconUrl) newErrors.iconUrl = 'Icon URL is required.';
    if (!description) newErrors.description = 'Description is required.';
    
    // Validasi URL sederhana
    try {
      if (appUrl) new URL(appUrl);
    } catch (_) {
      newErrors.appUrl = 'Please enter a valid URL.';
    }
     try {
      if (iconUrl) new URL(iconUrl);
    } catch (_) {
      newErrors.iconUrl = 'Please enter a valid URL for the icon.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // --- PERUBAHAN 4: Panggil fungsi validasi kita ---
    if (!validateForm()) {
      return; // Hentikan jika validasi gagal
    }

    if (!context?.user?.fid) {
      setMessage({ type: 'error', text: 'You must be logged in to submit an app.' });
      return;
    }

    setIsLoading(true);

    const submissionData = {
      name: appName,
      url: appUrl,
      iconUrl: iconUrl,
      description: description,
      chain: chain,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      submitted_by_fid: context.user.fid,
    };

    try {
      const response = await fetch('/api/apps/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }

      setMessage({ type: 'success', text: 'Submission successful! It will be reviewed shortly.' });
      setAppName(''); setAppUrl(''); setIconUrl(''); setDescription(''); setChain('Base'); setTags(''); setErrors({});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Could not submit the app.';
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
          <h1 className="text-2xl font-bold text-center">Submit Your App</h1>
          <p className="text-center text-gray-400 mb-8">
            Get your Farcaster Mini App or crypto tool listed on Watchportal.
          </p>
          
          {/* --- PERUBAHAN 5: noValidate di form --- */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="appName" className="block text-sm font-medium text-gray-300 mb-1">App Name</label>
              <Input id="appName" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="e.g., Cool App" />
              {/* --- Tampilkan error kustom --- */}
              {errors.appName && <p className="text-red-500 text-xs mt-1">{errors.appName}</p>}
            </div>

            <div>
              <label htmlFor="appUrl" className="block text-sm font-medium text-gray-300 mb-1">App URL</label>
              <Input id="appUrl" type="url" value={appUrl} onChange={(e) => setAppUrl(e.target.value)} placeholder="https://yourapp.xyz" />
              {errors.appUrl && <p className="text-red-500 text-xs mt-1">{errors.appUrl}</p>}
            </div>

            <div>
              <label htmlFor="iconUrl" className="block text-sm font-medium text-gray-300 mb-1">Icon URL</label>
              <Input id="iconUrl" type="url" value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} placeholder="https://yourapp.xyz/icon.png" />
              {errors.iconUrl && <p className="text-red-500 text-xs mt-1">{errors.iconUrl}</p>}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Short Description</label>
              <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What your app does" />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Sisa form tidak perlu diubah, karena tidak memiliki 'required' */}
            <div>
              <label htmlFor="chain" className="block text-sm font-medium text-gray-300 mb-1">Primary Chain</label>
              <select id="chain" value={chain} onChange={(e) => setChain(e.target.value)} className="w-full h-10 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold">
                <option>Base</option><option>Optimism</option><option>Degen</option><option>Arbitrum</option><option>Multi-chain</option><option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g., DeFi, Social, Tools" />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading} disabled={!context?.user}>
              Submit for Review
            </Button>

            {message && <div className={`mt-4 text-center p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>{message.text}</div>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
