// Alamat file: src/app/api/apps/submit/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase'; // Mengimpor koneksi Supabase kita

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

    // 4. Perintahkan Supabase untuk menyimpan data ini ke tabel 'app_submissions'
    const { data, error } = await supabase
      .from('app_submissions')
      .insert(dataToInsert)
      .select() // Minta Supabase mengembalikan data yang baru saja disimpan
      .single(); // Kita hanya memasukkan satu baris, jadi ambil satu hasil

    // 5. Jika Supabase mengembalikan error, catat dan kirim pesan error
    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ error: 'Failed to save submission to the database.' }, { status: 500 });
    }

    // 6. Jika semua berhasil, kirim respons sukses ke frontend
    return NextResponse.json({ message: 'Submission successful!', savedData: data }, { status: 201 });

  } catch (err) {
    // Tangani jika ada masalah saat memproses data JSON
    console.error('API route processing error:', err);
    return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
  }
}
