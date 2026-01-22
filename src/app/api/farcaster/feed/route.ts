import { NextResponse } from "next/server";
import { getNeynarClient } from "../../../../lib/neynar";

export async function GET() {
  try {
    const client = getNeynarClient();

    const result = await client.fetchAllCasts({
      page_size: 20,
    });

    return NextResponse.json({
      casts: result.result.casts,
    });
  } catch (error) {
    console.error("Feed error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
