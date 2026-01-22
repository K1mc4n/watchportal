import { NextResponse } from "next/server";
import { getNeynarUser } from "@/lib/neynar";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get("fid");

  if (!fid) {
    return NextResponse.json({ error: "fid required" }, { status: 400 });
  }

  const user = await getNeynarUser(Number(fid));

  return NextResponse.json(user);
}
