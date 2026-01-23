import { NextResponse } from "next/server";
import { getNeynarClient } from "@/lib/neynar";

export async function GET() {
  try {
    const client = getNeynarClient();

    const result = await client.fetchFeed({
      feedType: "following", // ✅ STRING YANG VALID
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
