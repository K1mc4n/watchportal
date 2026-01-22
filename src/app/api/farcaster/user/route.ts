import { NextResponse } from "next/server";
import { getNeynarUser } from "../../../lib/neynar";

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

    const user = await getNeynarUser(fid);

    if (!user) {
      return NextResponse.json(
        { error: "user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
