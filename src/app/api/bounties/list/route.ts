// Lokasi file: src/app/api/bounties/list/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';

// Cache hasil ini selama 5 menit
export const revalidate = 300;

/**
 * Fungsi sederhana untuk mengekstrak konten dari meta tag HTML.
 * @param html Teks HTML dari halaman.
 * @param property Nama properti meta tag (misalnya, 'fc:frame:image').
 * @returns Konten dari meta tag atau string kosong jika tidak ditemukan.
 */
function extractMetaTag(html: string, property: string): string {
  const regex = new RegExp(`<meta\\s+property="([^"]*${property}[^"]*)"\\s+content="([^"]*)"`);
  const match = html.match(regex);
  return match && match[2] ? match[2] : '';
}

export async function GET() {
  try {
    // 1. Ambil semua URL bounty yang statusnya 'approved' dari database kita
    const { data: approvedSubmissions, error: supabaseError } = await supabase
      .from('bounty_submissions')
      .select('id, url')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (supabaseError) {
      throw supabaseError;
    }

    // 2. Untuk setiap URL, ambil metadata Farcaster Frame-nya secara manual
    const bountyDetailsPromises = approvedSubmissions.map(async (submission) => {
      try {
        const response = await fetch(submission.url);
        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }
        const html = await response.text();

        // Ekstrak informasi yang kita butuhkan dari meta tag
        const imageUrl = extractMetaTag(html, 'fc:frame:image');
        const title = extractMetaTag(html, 'og:title'); // Judul biasanya ada di og:title

        return {
          id: submission.id,
          url: submission.url,
          title: title || 'Bounty', // Fallback jika judul tidak ditemukan
          imageUrl: imageUrl,
        };
      } catch (e) {
        console.error(`Failed to fetch metadata for ${submission.url}`, e);
        // Jika gagal, kembalikan data dasar
        return {
          id: submission.id,
          url: submission.url,
          title: 'Bounty (Could not load details)',
          imageUrl: '',
        };
      }
    });

    // 3. Tunggu semua proses pengambilan metadata selesai
    const bounties = await Promise.all(bountyDetailsPromises);

    return NextResponse.json({ bounties });

  } catch (err) {
    console.error('Error fetching approved bounties:', err);
    return NextResponse.json({ error: 'Failed to fetch bounties' }, { status: 500 });
  }
}
