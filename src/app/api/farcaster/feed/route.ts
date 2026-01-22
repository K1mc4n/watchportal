import { NextResponse } from "next/server";
import { getNeynarClient } from "../../../../lib/neynar";

export async function GET() {
  try {
    const client = getNeynarClient();

    const result = await client.fetchRecentCasts({
      limit: 20,
    });

    return NextResponse.json({
      casts: result.casts,
    });
  } catch (error) {
    console.error("Feed error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
