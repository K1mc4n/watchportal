// Lokasi file: src/app/api/bounties/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

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

    // Masukkan data ke tabel baru kita dengan status default 'pending'
    const { data, error } = await supabase
      .from('bounty_submissions')
      .insert({
        url: url,
        submitted_by_fid: submitted_by_fid,
        status: 'pending' // Admin akan menyetujuinya nanti
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error for bounty:', error.message);
      return NextResponse.json({ error: 'Failed to save bounty submission.' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Bounty submitted successfully! It will be reviewed shortly.', savedData: data }, { status: 201 });

  } catch (err) {
    console.error('API route /api/bounties/submit error:', err);
    return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
  }
      }
