"use client";

import { useEffect, useState } from "react";

type Author = {
  username?: string;
  display_name?: string;
  pfp_url?: string;
};

type Cast = {
  hash?: string;
  text?: string;
  author?: Author;
};

export default function Home() {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/farcaster/feed");
        const data = await res.json();

        // 🔐 AMAN: cek semua kemungkinan
        if (Array.isArray(data?.casts)) {
          setCasts(data.casts);
        } else if (Array.isArray(data)) {
          setCasts(data);
        } else {
          console.warn("Unexpected feed shape:", data);
          setCasts([]);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load feed");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading global feed...</div>;
  }

  if (error) {
    return <div style={{ padding: 20, color: "red" }}>{error}</div>;
  }

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>🌍 Global Farcaster Feed</h2>

      {casts.length === 0 && (
        <div style={{ marginTop: 20 }}>No casts found.</div>
      )}

      {casts.map((cast, i) => (
        <div
          key={cast.hash ?? i}
          style={{
            padding: 12,
            marginTop: 12,
            border: "1px solid #e5e5e5",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
            {cast.author?.pfp_url && (
              <img
                src={cast.author.pfp_url}
                alt="pfp"
                width={36}
                height={36}
                style={{ borderRadius: "50%" }}
              />
            )}
            <div>
              <strong>{cast.author?.display_name ?? "Unknown"}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>
                @{cast.author?.username ?? "unknown"}
              </div>
            </div>
          </div>

          <div>{cast.text || <i>(no text)</i>}</div>
        </div>
      ))}
    </main>
  );
}
