// src/app/api/apps/approved/route.ts

import { NextResponse } from 'next/server';
// Supabase dihapus

// Ini akan memberitahu Vercel untuk menyimpan hasil dari API ini di cache selama 1 jam.
// Ini sangat bagus untuk performa, karena tidak perlu memanggil database setiap saat.
export const revalidate = 3600;

// Fungsi ini akan menangani request GET
export async function GET() {
  try {
    // 1. Ambil semua data dari tabel 'app_submissions'
    // Simulasi data apps yang sudah disetujui
    return NextResponse.json({ apps: [] });

  } catch (e) {
    console.error('API route error:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
