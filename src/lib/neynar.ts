import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const apiKey = process.env.NEYNAR_API_KEY;

if (!apiKey) {
  throw new Error("NEYNAR_API_KEY is missing");
}

export const neynarClient = new NeynarAPIClient(apiKey);
