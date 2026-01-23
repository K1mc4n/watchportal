import { NextResponse } from "next/server";
import { getNeynarClient } from "@/lib/neynar";

export async function GET() {
  try {
    const client = getNeynarClient();

    const result = await client.fetchFeed({
      feedType: "global",
      limit: 20,
    });

    return NextResponse.json({
      casts: result.casts ?? [],
    });
  } catch (error) {
    console.error("feed error:", error);
    return NextResponse.json(
      { casts: [] },
      { status: 500 }
    );
  }
}
