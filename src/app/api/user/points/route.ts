// Lokasi file: src/app/api/user/points/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

// Selalu ambil data terbaru untuk poin, jangan di-cache
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userFid = searchParams.get('fid');

  if (!userFid) {
    console.error('[API Points] ❌ ERROR: FID parameter is missing from the request URL.');
    return NextResponse.json({ error: 'FID is required' }, { status: 400 });
  }

  const fidAsInt = parseInt(userFid, 10);
  if (isNaN(fidAsInt)) {
    console.error(`[API Points] ❌ ERROR: Invalid FID parameter. Expected a number, got "${userFid}".`);
    return NextResponse.json({ error: 'Invalid FID format.' }, { status: 400 });
  }
  
  console.log(`[API Points] ➡️ Received request for FID: ${fidAsInt}`);

  try {
    console.log(`[API Points] 📞 Calling Supabase RPC 'get_user_total_points' with FID: ${fidAsInt}`);
    
    // Panggil fungsi RPC yang sudah kita buat di Supabase pada langkah sebelumnya
    const { data, error } = await supabase.rpc('get_user_total_points', {
      p_user_fid: fidAsInt,
    });

    if (error) {
      console.error(`[API Points] ❌ Supabase RPC error for FID ${fidAsInt}:`, JSON.stringify(error, null, 2));
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    console.log(`[API Points] ✅ Successfully fetched points for FID ${fidAsInt}. Raw data:`, data);
    
    // Kirim respons sukses ke frontend
    return NextResponse.json({ points: data });

  } catch (err) {
    console.error(`[API Points] ❌ CATCH BLOCK - An unexpected error occurred while fetching points for FID ${fidAsInt}.`, err);
    const message = err instanceof Error ? err.message : 'An unknown server error occurred.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
