// src/app/api/quests/list/route.ts

import { NextResponse } from 'next/server';
// Supabase dihapus

// Cache hasil ini, tapi tidak terlalu lama agar quest baru bisa muncul
export const revalidate = 300; // 5 menit

export async function GET() {
  try {
    // Simulasi data quests aktif
    return NextResponse.json({ quests: [] });
  } catch (err) {
    console.error('Error fetching quests:', err);
    return NextResponse.json({ error: 'Failed to fetch quests' }, { status: 500 });
  }
}
