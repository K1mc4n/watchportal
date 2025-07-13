// Lokasi file: src/app/api/trending/base/route.ts

import { NextResponse } from 'next/server';

export const revalidate = 300;
const GECKO_TERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2';

export async function GET() {
  try {
    // Kita tidak perlu include base_token dan quote_token lagi
    const response = await fetch(
      `${GECKO_TERMINAL_API_URL}/networks/base/pools?sort=h24_volume_usd_desc&page=1`
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("GeckoTerminal API Error:", errorText);
        throw new Error('Failed to fetch from GeckoTerminal');
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data)) {
      return NextResponse.json({ pools: [] });
    }

    // Gunakan Map untuk memastikan setiap pool unik berdasarkan ID
    const uniquePoolsMap = new Map();

    data.data.forEach((pool: any) => {
      if (pool && pool.id && !uniquePoolsMap.has(pool.id)) {
        uniquePoolsMap.set(pool.id, {
          id: pool.id,
          name: pool.attributes.name, // Ini sumber kebenaran kita
          price_usd: pool.attributes.base_token_price_usd,
          price_change_percentage_h24: pool.attributes.price_change_percentage?.h24,
          volume_h24_usd: pool.attributes.volume_usd?.h24,
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
