// src/app/.well-known/farcaster/manifest.json/route.ts

import { getFarcasterMetadata } from '~/lib/utils';
import { NextResponse } from 'next/server';

// Perintah ini memastikan Farcaster selalu mendapatkan data manifest yang paling baru.
export const revalidate = 0;

// Fungsi ini akan dijalankan ketika Farcaster mengakses URL ini.
export async function GET() {
  try {
    // Memanggil fungsi yang sudah ada di proyek Anda untuk membuat data manifest.
    const manifest = await getFarcasterMetadata();
    
    // Mengirim data manifest sebagai respons dalam format JSON.
    return NextResponse.json(manifest);
  } catch (error) {
    // Jika terjadi error, catat di log server dan kirim pesan error.
    console.error('Failed to generate Farcaster manifest:', error);
    return new NextResponse('Internal Server Error while generating manifest', { status: 500 });
  }
}
