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
      // ... (blok error tidak berubah) ...
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data)) {
      return NextResponse.json({ pools: [] });
    }

    const trendingPools = data.data
      .map((pool: any) => {
        // === VALIDASI KETAT DI SINI ===
        // Pastikan semua path data yang kita butuhkan ada
        const attributes = pool?.attributes;
        const baseTokenData = pool?.relationships?.base_token?.data;
        const quoteTokenData = pool?.relationships?.quote_token?.data;

        if (!attributes || !baseTokenData || !quoteTokenData) {
          return null; // Lewati pool ini jika data dasarnya tidak lengkap
        }

        return {
          id: pool.id,
          address: attributes.address,
          name: attributes.name ?? 'Unknown Pool',
          price_usd: attributes.base_token_price_usd ?? '0',
          price_change_percentage_h24: attributes.price_change_percentage?.h24 ?? '0',
          volume_h24_usd: attributes.volume_usd?.h24 ?? '0',
          base_token: {
            name: baseTokenData.attributes?.name ?? 'Unknown',
            symbol: baseTokenData.attributes?.symbol ?? 'N/A',
          },
          quote_token: {
            name: quoteTokenData.attributes?.name ?? 'Unknown',
            symbol: quoteTokenData.attributes?.symbol ?? 'N/A',
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
