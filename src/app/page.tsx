"use client";

import { useEffect, useState } from "react";

type FeedCast = {
  hash: string;
  text: string;
  author: {
    username: string;
    display_name: string;
    pfp_url: string;
  };
};

export default function Home() {
  const [casts, setCasts] = useState<FeedCast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/farcaster/feed");
      const data = await res.json();
      setCasts(data.casts);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading global feed...</div>;
  }

  return (
    <main style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>🌍 Global Farcaster Feed</h2>

      {casts.map((cast) => (
        <div
          key={cast.hash}
          style={{
            padding: 12,
            marginTop: 12,
            border: "1px solid #e5e5e5",
            borderRadius: 8,
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
            <img
              src={cast.author.pfp_url}
              alt="pfp"
              width={36}
              height={36}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <strong>{cast.author.display_name}</strong>
              <div style={{ fontSize: 12, color: "#666" }}>
                @{cast.author.username}
              </div>
            </div>
          </div>

          <div>{cast.text || <i>(no text)</i>}</div>
        </div>
      ))}
    </main>
  );
}
