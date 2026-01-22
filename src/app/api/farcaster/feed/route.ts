import { NextResponse } from "next/server";
import {
  NEYNAR_API_KEY,
  NEYNAR_BASE_URL,
} from "../../../../lib/neynar";

export async function GET() {
  try {
    const res = await fetch(
      `${NEYNAR_BASE_URL}/farcaster/feed?feed_type=global&limit=20`,
      {
        headers: {
          accept: "application/json",
          api_key: NEYNAR_API_KEY,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    return NextResponse.json({
      casts: data.casts ?? [],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load global feed" },
      { status: 500 }
    );
  }
}
