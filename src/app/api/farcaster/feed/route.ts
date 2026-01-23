import { NextResponse } from "next/server";
import { getNeynarClient } from "@/lib/neynar";

// 🔴 FID CONFIG
const EXTRA_FIDS = [250575];
const MAX_FID = 1000;

// CONFIG
const LIMIT_PER_FID = 1;
const MAX_RESULT = 20;
const HOURS_24 = 24 * 60 * 60 * 1000;
const BATCH_SIZE = 50;

export async function GET() {
  try {
    const client = getNeynarClient();
    const now = Date.now();

    // generate fid list
    const fids: number[] = [];
    for (let i = 1; i <= MAX_FID; i++) fids.push(i);
    fids.push(...EXTRA_FIDS);

    let allCasts: any[] = [];

    // batch fetch
    for (let i = 0; i < fids.length; i += BATCH_SIZE) {
      const batch = fids.slice(i, i + BATCH_SIZE);

      const requests = batch.map((fid) =>
        client.fetchCastsByFid({
          fid,
          limit: LIMIT_PER_FID,
        })
      );

      const results = await Promise.allSettled(requests);

      for (const res of results) {
        if (res.status === "fulfilled") {
          allCasts.push(...(res.value.casts || []));
        }
      }
    }

    // filter 24 jam
    const recentCasts = allCasts.filter((cast) => {
      const time = new Date(cast.timestamp).getTime();
      return now - time <= HOURS_24;
    });

    // sort terbaru
    recentCasts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() -
        new Date(a.timestamp).getTime()
    );

    // limit max 20
    const finalCasts = recentCasts.slice(0, MAX_RESULT);

    return NextResponse.json({
      count: finalCasts.length,
      casts: finalCasts,
      updatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
