// Alamat file: src/app/api/apps/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
// Supabase dihapus

// Fungsi ini adalah "petugas pos" yang akan bekerja setiap kali ada kiriman
export async function POST(request: NextRequest) {
  try {
    // 1. Terima "surat" (data) dari frontend
    const submissionData = await request.json();

    // 2. Periksa kelengkapan "surat" di sisi server. Ini penting untuk keamanan.
    if (!submissionData.name || !submissionData.url || !submissionData.submitted_by_fid) {
      // Jika tidak lengkap, kirim kembali pesan error
      return NextResponse.json({ error: 'Name, URL, and FID are required.' }, { status: 400 });
    }

    // 3. Siapkan data untuk dimasukkan ke database, termasuk status default
    const dataToInsert = {
      name: submissionData.name,
      url: submissionData.url,
      iconUrl: submissionData.iconUrl,
      description: submissionData.description,
      chain: submissionData.chain,
      tags: submissionData.tags,
      submitted_by_fid: submissionData.submitted_by_fid,
      status: 'pending' // <-- Mengatur status default menjadi "pending"
    };

    // Simulasi penyimpanan data tanpa supabase
    return NextResponse.json({ message: 'Submission successful!', savedData: dataToInsert }, { status: 201 });

  } catch (err) {
    // Tangani jika ada masalah saat memproses data JSON
    console.error('API route processing error:', err);
    return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
  }
}
