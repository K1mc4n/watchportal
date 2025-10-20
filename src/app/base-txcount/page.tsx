// src/app/base-txcount/page.tsx
'use client';
import { useState } from 'react';

export default function BaseTxCountPage() {
  const [address, setAddress] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [result, setResult] = useState<{txCount:number,level:string}|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/base-txcount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, apiKey })
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult({ txCount: data.txCount, level: data.level });
    } catch (e) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Cek Total Transaksi Wallet Base</h1>
      <input
        type="text"
        placeholder="Wallet Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded"
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
        disabled={loading || !address || !apiKey}
        className="w-full py-2 bg-blue-600 text-white rounded font-bold"
      >
        {loading ? 'Checking...' : 'Check'}
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg">Total Transaksi: <span className="font-bold">{result.txCount}</span></p>
          <p className="text-lg">Level: <span className="font-bold">{result.level}</span></p>
        </div>
      )}
    </div>
  );
}
