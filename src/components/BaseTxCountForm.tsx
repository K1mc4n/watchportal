"use client";
import { useState } from "react";

export default function BaseTxCountForm() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<{ txCount: number; level: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      // API key diambil dari environment variable di server
      const res = await fetch("/api/base-txcount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult({ txCount: data.txCount, level: data.level });
    } catch (e) {
      setError("Failed to fetch data");
    }
    setLoading(false);
  };

  return (
    <div className="bg-neutral-900 rounded-xl p-4 shadow-lg border border-neutral-800">
      <input
        type="text"
        placeholder="Wallet Address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full mb-2 px-3 py-2 rounded bg-neutral-800 text-white border border-gold/50 focus:border-gold outline-none"
      />
      <button
        onClick={handleCheck}
        disabled={loading || !address}
        className="w-full py-2 rounded font-bold bg-gradient-to-br from-gold/20 to-neutral-800 text-gold border border-gold/50 hover:bg-gold/10 transition"
      >
        {loading ? "Checking..." : "Check"}
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {result && (
        <div className="mt-6 text-center">
          <p className="text-lg text-white">Total Transaksi: <span className="font-bold text-gold">{result.txCount}</span></p>
          <p className="text-lg text-white">Level: <span className="font-bold text-gold">{result.level}</span></p>
        </div>
      )}
    </div>
  );
}
