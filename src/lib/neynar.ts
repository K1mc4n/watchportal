import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const apiKey = process.env.NEYNAR_API_KEY;

if (!apiKey) {
  throw new Error("NEYNAR_API_KEY is missing");
}

/**
 * Singleton Neynar client (SDK versi baru)
 */
const client = new NeynarAPIClient({
  apiKey: apiKey,
});

/**
 * Dipakai di API routes & server components
 */
export function getNeynarClient() {
  return client;
}

/**
 * Backward compatibility
 */
export const neynarClient = client;

/**
 * Helper ambil user Farcaster
 */
export async function getNeynarUser(fid: number) {
  return client.fetchBulkUsers({ fids: [fid] });
}
