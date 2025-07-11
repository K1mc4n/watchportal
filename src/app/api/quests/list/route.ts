// src/app/api/quests/list/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

// Cache hasil ini, tapi tidak terlalu lama agar quest baru bisa muncul
export const revalidate = 300; // 5 menit

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('quests')
      .select('*') // Ambil semua kolom
      .eq('is_active', true); // Hanya ambil quest yang aktif

    if (error) {
      throw error;
    }

    return NextResponse.json({ quests: data });
  } catch (err) {
    console.error('Error fetching quests:', err);
    return NextResponse.json({ error: 'Failed to fetch quests' }, { status: 500 });
  }
}
