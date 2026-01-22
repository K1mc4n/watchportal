import { NextResponse } from "next/server";
import { getNeynarClient } from "../../../../lib/neynar";

export async function GET() {
  try {
    const client = getNeynarClient();

    const feed = await client.fetchFeed({
      feedType: "trending",
      limit: 20,
    });

    return NextResponse.json(feed);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
