// src/lib/neynar.ts

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

/* ===============================
   ENV
================================ */
export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY as string;
export const NEYNAR_BASE_URL = "https://api.neynar.com/v2";

if (!NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is missing");
}

/* ===============================
   CLIENT (SDK)
================================ */
let client: NeynarAPIClient | null = null;

export function getNeynarClient() {
  if (!client) {
    client = new NeynarAPIClient(NEYNAR_API_KEY);
  }
  return client;
}

/* ===============================
   USER HELPER
================================ */
export async function getNeynarUser(fid: number) {
  try {
    const client = getNeynarClient();
    const res = await client.fetchBulkUsers({ fids: [fid] });
    return res.users?.[0] ?? null;
  } catch (e) {
    console.error("getNeynarUser error", e);
    return null;
  }
}
