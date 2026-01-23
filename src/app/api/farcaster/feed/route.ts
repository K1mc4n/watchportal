import { NextResponse } from "next/server";
import { getNeynarClient } from "@/lib/neynar";
import { FeedType } from "@neynar/nodejs-sdk";

export async function GET() {
  try {
    const client = getNeynarClient();

    const result = await client.fetchFeed({
      feedType: FeedType.Following, // ✅ FIX
      limit: 20,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
