// src/app/api/user/completed-quests/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userFid = searchParams.get('fid');

  if (!userFid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  try {
    // Ambil quest_id DAN completed_at
    const { data, error } = await supabase
      .from('user_quest_completions')
      .select('quest_id, completed_at') // <-- AMBIL KEDUA KOLOM
      .eq('user_fid', userFid);

    if (error) {
      throw error;
    }

    // Kirim seluruh array objek ke frontend
    return NextResponse.json({ completions: data || [] });

  } catch (err) {
    console.error('Error fetching completed quests:', err);
    return NextResponse.json({ error: 'Failed to fetch completed quests' }, { status: 500 });
  }
}
