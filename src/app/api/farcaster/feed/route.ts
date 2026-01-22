import { NextResponse } from "next/server";
import { getNeynarClient } from "../../../../lib/neynar";

export async function GET() {
  try {
    const client = getNeynarClient();

    const feed = await client.fetchFeed({
      feedType: "global",
      limit: 20,
    });

    return NextResponse.json({
      casts: feed.casts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch feed" },
      { status: 500 }
    );
  }
}
