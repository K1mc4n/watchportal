import { NextResponse } from "next/server";
import { getNeynarClient } from "../../../../lib/neynar";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fidParam = searchParams.get("fid");

    if (!fidParam) {
      return NextResponse.json(
        { error: "fid required" },
        { status: 400 }
      );
    }

    const fid = Number(fidParam);
    if (isNaN(fid)) {
      return NextResponse.json(
        { error: "fid must be a number" },
        { status: 400 }
      );
    }

    const client = getNeynarClient();

    const casts = await client.fetchCastsForUser({
      fid,
      limit: 10,
    });

    return NextResponse.json(casts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
