import { FARCASTER_CONFIG } from "~/lib/constants";

export async function GET() {
  return new Response(JSON.stringify(FARCASTER_CONFIG), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600", // Cache for 1 hour
    },
  });
}
