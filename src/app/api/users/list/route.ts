// src/app/api/users/list/route.ts

import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk';
import { NextResponse, NextRequest } from 'next/server';

// Definisikan tipe data yang dibutuhkan oleh frontend Anda (TalentCard)
export interface TalentProfile {
  username: string;
  name: string;
  headline: string;
  profile_picture_url: string;
  wallet_address: string;
  fid: number;
  fid_active_tier_name: string;
  followers: number;
  casts: number;
  engagement: number;
  top_channels: string[];
  top_domains: string[];
  total_transactions: number;
}


// --- KONFIGURASI ---
// FID yang akan diprioritaskan di urutan teratas
const PINNED_FIDS = [250575, 1107084]; 
const USER_LIMIT = 100; // Batas total pengguna yang akan ditampilkan

// PERBAIKAN: Memaksa endpoint ini menjadi dinamis.
// Ini mencegah Next.js menjalankan endpoint ini pada saat build,
// sehingga menghindari error API 402.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEYNAR_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error: Missing Neynar API Key.' }, { status: 500 });
  }

  try {
    const neynar = new NeynarAPIClient(new Configuration({ apiKey }));

    // Inferensi tipe pengguna langsung dari return type fungsi SDK.
    type BulkUsersResponse = Awaited<ReturnType<typeof neynar.fetchBulkUsers>>;
    type NeynarUserType = BulkUsersResponse['users'][0];

    // 1. Ambil data untuk pengguna yang di-pin
    const { users: pinnedUsers } = await neynar.fetchBulkUsers({ fids: PINNED_FIDS });

    // 2. Ambil daftar pengguna "Power User"
    const { users: powerUsers } = await neynar.fetchPowerUsers({});

    // 3. Gabungkan daftar dan hapus duplikat
    const allUsersMap = new Map<number, NeynarUserType>();

    pinnedUsers.forEach(user => allUsersMap.set(user.fid, user));
    powerUsers.forEach(user => {
      if (!allUsersMap.has(user.fid)) {
        allUsersMap.set(user.fid, user);
      }
    });

    const top100Users = Array.from(allUsersMap.values()).slice(0, USER_LIMIT);

    // 4. Format data sesuai dengan yang dibutuhkan oleh frontend
    const finalTalents: TalentProfile[] = top100Users.map(user => ({
      username: user.username,
      name: user.display_name || user.username,
      headline: user.profile?.bio?.text || 'A top Farcaster user.',
      profile_picture_url: user.pfp_url || '',
      wallet_address: user.verifications?.length > 0 ? user.verifications[0] : '',
      fid: user.fid,
      fid_active_tier_name: 'active',
      followers: user.follower_count ?? 0,
      casts: 0,
      engagement: 0,
      top_channels: [],
      top_domains: [],
      total_transactions: 0
    }));
    
    return NextResponse.json({ talents: finalTalents });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching from Neynar API:', errorMessage);
    return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
  }
}
