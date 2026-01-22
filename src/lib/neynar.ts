import { NeynarAPIClient } from "@neynar/nodejs-sdk";

export const NEYNAR_API_KEY = process.env.NEYNAR_API_KEY as string;
export const NEYNAR_CLIENT_ID = process.env.NEYNAR_CLIENT_ID as string;

if (!NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is missing");
}

let client: NeynarAPIClient | null = null;

export function getNeynarClient() {
  if (!client) {
    client = new NeynarAPIClient(NEYNAR_API_KEY);
  }
  return client;
}
