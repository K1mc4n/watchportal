// Lokasi file: src/app/api/trending/base/route.ts

import { NextResponse } from 'next/server';

export const revalidate = 300;
const GECKO_TERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2';

export async function GET() {
  try {
    const response = await fetch(
      `${GECKO_TERMINAL_API_URL}/networks/base/pools?sort=h24_volume_usd_desc&page=1&include=base_token,quote_token`
    );
    if (!response.ok) throw new Error('Failed to fetch from GeckoTerminal');

    const data = await response.json();
    if (!data || !Array.isArray(data.data)) return NextResponse.json({ pools: [] });

    // Gunakan Map untuk memastikan setiap pool unik berdasarkan ID
    const uniquePoolsMap = new Map();

    data.data.forEach((pool: any) => {
      const attributes = pool?.attributes;
      const baseTokenData = pool?.relationships?.base_token?.data;
      const quoteTokenData = pool?.relationships?.quote_token?.data;

      // Hanya proses pool yang memiliki semua data yang kita butuhkan
      if (attributes && baseTokenData && quoteTokenData && !uniquePoolsMap.has(pool.id)) {
        uniquePoolsMap.set(pool.id, {
          id: pool.id,
          name: attributes.name,
          price_usd: attributes.base_token_price_usd,
          price_change_percentage_h24: attributes.price_change_percentage?.h24,
          volume_h24_usd: attributes.volume_usd?.h24,
          // Kita tidak lagi butuh base_token & quote_token, tapi biarkan untuk masa depan
        });
      }
    });
    
    const trendingPools = Array.from(uniquePoolsMap.values());
    return NextResponse.json({ pools: trendingPools });

  } catch (error) {
    console.error('Internal Server Error fetching trending data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
