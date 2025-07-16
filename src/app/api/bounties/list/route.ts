// Lokasi file: src/app/api/bounties/list/route.ts

import { NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { getFrameMetadata } from '@coinbase/onchainkit';

// Cache hasil ini selama 5 menit
export const revalidate = 300;

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

    // 2. Untuk setiap URL, ambil metadata Farcaster Frame-nya
    const bountyDetailsPromises = approvedSubmissions.map(async (submission) => {
      try {
        const metadata = await getFrameMetadata(submission.url);
        // Kita ambil data yang relevan dari metadata frame
        const frameImage = metadata.frameInfo?.image.src || '';
        const frameTitle = metadata.frameInfo?.title || 'Bounty';

        return {
          id: submission.id,
          url: submission.url,
          title: frameTitle,
          imageUrl: frameImage,
        };
      } catch (e) {
        console.error(`Failed to fetch metadata for ${submission.url}`, e);
        // Jika gagal, kembalikan data dasar agar tidak merusak seluruh daftar
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
