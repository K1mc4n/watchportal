// src/app/api/launch/route.ts

import { NextRequest, NextResponse } from 'next/server';

/**
 * Endpoint ini secara khusus menangani aksi 'post_redirect' dari Farcaster Frame.
 * Sesuai dokumentasi Farcaster, endpoint ini harus mengembalikan HTTP 302 Redirect.
 */
export async function POST(req: NextRequest) {
  // Ambil URL dasar aplikasi dari environment variables
  const appUrl = process.env.NEXT_PUBLIC_URL;
  
  if (!appUrl) {
    // Jika URL tidak dikonfigurasi, kirim error server
    console.error("Server configuration error: NEXT_PUBLIC_URL is not set");
    return new NextResponse('Server configuration error', { status: 500 });
  }

  // ==== PERUBAHAN DI SINI: URL tujuan diubah ke halaman root ====
  const destinationUrl = `${appUrl}/`;

  // Kembalikan respons HTTP 302 dengan header 'Location'
  // Ini akan memberitahu klien Farcaster untuk mengalihkan pengguna.
  console.log(`Redirecting to: ${destinationUrl}`);
  return NextResponse.redirect(destinationUrl, 302);
}

// Praktik yang baik adalah menangani metode GET juga, kalau-kalau ada yang mengaksesnya langsung
export async function GET(req: NextRequest) {
    const appUrl = process.env.NEXT_PUBLIC_URL;
    if (!appUrl) {
       return new NextResponse('Server configuration error', { status: 500 });
    }
    // ==== PERUBAHAN DI SINI: URL tujuan diubah ke halaman root ====
    const destinationUrl = `${appUrl}/`;
    // Alihkan pengguna yang tersesat langsung ke aplikasi
    return NextResponse.redirect(destinationUrl, 302);
}
