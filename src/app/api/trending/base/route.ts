// Lokasi file: src/app/api/trending/base/route.ts

import { NextResponse } from 'next/server';

export const revalidate = 300; // Cache selama 5 menit

const GECKO_TERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2';

export async function GET() {
  try {
    const response = await fetch(
      `${GECKO_TERMINAL_API_URL}/networks/base/pools?sort=h24_volume_usd_desc&page=1&include=base_token,quote_token`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GeckoTerminal API Error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch trending data from GeckoTerminal' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Pastikan data.data ada dan merupakan sebuah array sebelum di-map
    if (!data || !Array.isArray(data.data)) {
      return NextResponse.json({ pools: [] });
    }

    // ==== PERBAIKAN UTAMA DI SINI ====
    // Menggunakan optional chaining (?.) dan nullish coalescing (??)
    const trendingPools = data.data
      .map((pool: any) => {
        // Jika data utama tidak ada, lewati pool ini
        if (!pool.attributes || !pool.relationships) {
          return null;
        }

        return {
          id: pool.id,
          address: pool.attributes.address,
          name: pool.attributes.name ?? 'Unknown Pool',
          price_usd: pool.attributes.base_token_price_usd ?? '0',
          price_change_percentage_h24: pool.attributes.price_change_percentage?.h24 ?? '0',
          volume_h24_usd: pool.attributes.volume_usd?.h24 ?? '0',
          base_token: {
            name: pool.relationships.base_token?.data?.attributes?.name ?? 'Unknown',
            symbol: pool.relationships.base_token?.data?.attributes?.symbol ?? 'N/A',
          },
          quote_token: {
            name: pool.relationships.quote_token?.data?.attributes?.name ?? 'Unknown',
            symbol: pool.relationships.quote_token?.data?.attributes?.symbol ?? 'N/A',
          }
        };
      })
      .filter(Boolean); // Menghapus semua pool yang bernilai null

    return NextResponse.json({ pools: trendingPools });

  } catch (error) {
    console.error('Internal Server Error fetching trending data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
