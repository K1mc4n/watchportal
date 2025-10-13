// Lokasi file: src/app/api/bounties/list/route.ts

import { NextResponse } from 'next/server';
// Supabase dihapus

export const revalidate = 300;

/**
 * --- FUNGSI DIPERBARUI AGAR LEBIH KUAT ---
 * Fungsi ini sekarang bisa menangani tanda kutip ganda atau tunggal.
 */
function extractMetaTag(html: string, property: string): string {
  const regex = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"]*)["'][^>]*>`);
  const match = html.match(regex);
  return match && match[1] ? match[1] : '';
}

export async function GET() {
  try {
      // Kode supabase dihapus, sesuaikan dengan data dummy atau kosong
      const approvedSubmissions = []; // Data dummy
      const supabaseError = null; // Tidak ada error

    if (supabaseError) throw supabaseError;

    const bountyDetailsPromises = approvedSubmissions.map(async (submission) => {
      try {
        const response = await fetch(submission.url);
        if (!response.ok) throw new Error(`Failed to fetch URL: ${response.statusText}`);
        
        const html = await response.text();
        const imageUrl = extractMetaTag(html, 'fc:frame:image');
        const title = extractMetaTag(html, 'og:title');

        return {
          id: submission.id,
          url: submission.url,
          title: title || 'View Bounty Details', // Fallback jika judul tidak ada
          imageUrl: imageUrl,
        };
      } catch (e) {
        console.error(`Failed to fetch metadata for ${submission.url}`, e);
        return {
          id: submission.id,
          url: submission.url,
          title: 'Could not load details',
          imageUrl: '',
        };
      }
    });

    const bounties = await Promise.all(bountyDetailsPromises);
    return NextResponse.json({ bounties });

  } catch (err) {
    console.error('Error fetching approved bounties:', err);
    return NextResponse.json({ error: 'Failed to fetch bounties' }, { status: 500 });
  }
}
