// src/app/api/user/completed-quests/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

// Jangan cache endpoint ini, karena status penyelesaian pengguna harus selalu terbaru.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userFid = searchParams.get('fid');

  if (!userFid) {
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  try {
    // Ambil hanya ID dari quest yang sudah diselesaikan oleh pengguna ini.
    // Ini lebih efisien daripada mengambil seluruh baris data.
    const { data, error } = await supabase
      .from('user_quest_completions')
      .select('quest_id')
      .eq('user_fid', userFid);

    if (error) {
      throw error;
    }

    // Ubah array objek [{ quest_id: 1 }, { quest_id: 3 }]
    // menjadi Set yang lebih mudah dicari: Set(1, 3)
    const completedQuestIds = new Set(data.map(item => item.quest_id));

    return NextResponse.json({ completedQuestIds: Array.from(completedQuestIds) });

  } catch (err) {
    console.error('Error fetching completed quests:', err);
    return NextResponse.json({ error: 'Failed to fetch completed quests' }, { status: 500 });
  }
}
