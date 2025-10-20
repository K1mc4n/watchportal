// src/app/base-leaderboard/page.tsx
'use client';
import { useState } from 'react';

interface WalletResult {
  address: string;
  txCount: number;
  level: string;
}

export default function BaseLeaderboardPage() {
  const [wallets, setWallets] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [results, setResults] = useState<WalletResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const promises = wallets.map(address =>
        fetch('/api/base-txcount', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address, apiKey })
        }).then(res => res.json())
      );
      const data = await Promise.all(promises);
      setResults(data.filter(d => !d.error));
    } catch (e) {
      setError('Failed to fetch leaderboard');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Base Leaderboard</h1>
      <textarea
        placeholder="Masukkan wallet address, satu per baris"
        value={wallets.join('\n')}
        onChange={e => setWallets(e.target.value.split(/\s*\n\s*/).filter(Boolean))}
        className="w-full mb-2 px-3 py-2 border rounded h-32"
      />
      <input
        type="text"
        placeholder="Etherscan API Key"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded"
      />
      <button
        onClick={handleCheck}
        disabled={loading || wallets.length === 0 || !apiKey}
        className="w-full py-2 bg-blue-600 text-white rounded font-bold"
      >
        {loading ? 'Checking...' : 'Check Leaderboard'}
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {results.length > 0 && (
        <div className="mt-6">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2">Address</th>
                <th className="py-2">Total Tx</th>
                <th className="py-2">Level</th>
              </tr>
            </thead>
            <tbody>
              {results.sort((a,b) => b.txCount - a.txCount).map((r, i) => (
                <tr key={r.address} className="border-t">
                  <td className="py-2 font-mono text-xs">{r.address}</td>
                  <td className="py-2 text-center">{r.txCount}</td>
                  <td className="py-2 text-center font-bold">{r.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
