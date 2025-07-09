// src/app/api/apps/approved/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

// Ini akan memberitahu Vercel untuk menyimpan hasil dari API ini di cache selama 1 jam.
// Ini sangat bagus untuk performa, karena tidak perlu memanggil database setiap saat.
export const revalidate = 3600;

// Fungsi ini akan menangani request GET
export async function GET() {
  try {
    // 1. Ambil semua data dari tabel 'app_submissions'
    const { data, error } = await supabase
      .from('app_submissions')
      .select('*') // Pilih semua kolom
      .eq('status', 'approved'); // <-- Filter: HANYA yang statusnya 'approved'

    // 2. Jika ada error dari Supabase, kirim pesan error
    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch approved apps.' }, { status: 500 });
    }

    // 3. Jika berhasil, kirim daftar aplikasi yang sudah disetujui ke frontend
    return NextResponse.json({ apps: data });

  } catch (e) {
    console.error('API route error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
