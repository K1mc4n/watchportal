// Lokasi file: src/app/api/bounties/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
// Supabase dihapus

export async function POST(request: NextRequest) {
  try {
    const { url, submitted_by_fid } = await request.json();

    // Validasi sederhana di server
    if (!url || !submitted_by_fid) {
      return NextResponse.json({ error: 'URL and FID are required.' }, { status: 400 });
    }

    // Coba validasi apakah URL valid
    try {
      new URL(url);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    // Simulasi penyimpanan data tanpa supabase
    const data = { url, submitted_by_fid, status: 'pending' };
    return NextResponse.json({ message: 'Bounty submitted successfully! It will be reviewed shortly.', savedData: data }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
  }
}
