// src/app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { getWeek } from 'date-fns';

export const revalidate = 60;

export async function GET() {
  try {
    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;
    // Supabase dihapus, sesuaikan dengan data dummy atau kosong
    return NextResponse.json({ leaderboard: [] });
  } catch (err) {
    console.error("Leaderboard API Error:", err);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
