import { NextResponse } from "next/server";
import { NEYNAR_API_KEY, NEYNAR_BASE_URL } from "../../../../lib/neynar";

export async function GET() {
  try {
    const res = await fetch(
      `${NEYNAR_BASE_URL}/farcaster/feed?feed_type=global&limit=20`,
      {
        headers: {
          "accept": "application/json",
          "api_key": NEYNAR_API_KEY,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch feed");
    }

    const data = await res.json();

    return NextResponse.json({
      casts: data.casts ?? [],
    });
  } catch (err) {
    console.error("Global feed error:", err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
