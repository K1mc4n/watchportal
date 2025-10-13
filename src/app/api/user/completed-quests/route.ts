// src/app/api/user/completed-quests/route.ts

import { NextRequest, NextResponse } from 'next/server';
// Supabase dihapus

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userFid = searchParams.get('fid');

  if (!userFid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  try {
    // Ambil quest_id DAN completed_at
    // Kode supabase dihapus, sesuaikan dengan data dummy atau kosong
    return NextResponse.json({ completions: [] });

  } catch (err) {
    console.error('Error fetching completed quests:', err);
    return NextResponse.json({ error: 'Failed to fetch completed quests' }, { status: 500 });
  }
}
