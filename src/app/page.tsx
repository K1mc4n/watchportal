"use client";

import { useEffect, useState } from "react";

type User = {
  username: string;
  display_name: string;
  pfp_url: string;
};

type Cast = {
  hash: string;
  text: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);

  const fid = 3; // ganti nanti

  useEffect(() => {
    async function load() {
      const userRes = await fetch(`/api/farcaster/user?fid=${fid}`);
      const userData = await userRes.json();
      setUser(userData);

      const castRes = await fetch(`/api/farcaster/casts?fid=${fid}`);
      const castData = await castRes.json();
      setCasts(castData.casts.slice(0, 5));

      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  return (
    <main style={{ padding: 20 }}>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={user.pfp_url}
            alt="pfp"
            width={48}
            height={48}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <strong>{user.display_name}</strong>
            <div>@{user.username}</div>
          </div>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      <h3>Latest Casts</h3>

      {casts.map((cast) => (
        <div key={cast.hash} style={{ marginBottom: 12 }}>
          {cast.text}
        </div>
      ))}
    </main>
  );
}
