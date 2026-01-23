import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const apiKey = process.env.NEYNAR_API_KEY;

if (!apiKey) {
  throw new Error("NEYNAR_API_KEY is missing");
}

/**
 * Singleton Neynar client
 */
const client = new NeynarAPIClient(apiKey);

/**
 * Dipakai di API routes & server components
 */
export function getNeynarClient() {
  return client;
}

/**
 * Alias lama (biar backward compatible)
 */
export const neynarClient = client;

/**
 * Helper ambil user Farcaster by FID
 */
export async function getNeynarUser(fid: number) {
  return client.fetchBulkUsers({ fids: [fid] });
}
