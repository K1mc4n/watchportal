// Lokasi file: src/app/api/trending/base/route.ts

import { NextResponse } from 'next/server';

// Cache data ini selama 5 menit (300 detik) untuk mengurangi panggilan API
export const revalidate = 300;

const GECKO_TERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2';

export async function GET() {
  try {
    // Panggil endpoint pools untuk jaringan 'base'
    // Urutkan berdasarkan volume 24 jam secara menurun (descending)
    // Ambil 30 pool teratas
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

    // Transformasi data agar lebih mudah digunakan di frontend
    const trendingPools = data.data.map((pool: any) => ({
      id: pool.id,
      address: pool.attributes.address,
      name: pool.attributes.name,
      price_usd: pool.attributes.base_token_price_usd,
      price_change_percentage_h24: pool.attributes.price_change_percentage.h24,
      volume_h24_usd: pool.attributes.volume_usd.h24,
      base_token: {
        name: pool.relationships.base_token.data.attributes.name,
        symbol: pool.relationships.base_token.data.attributes.symbol,
      },
      quote_token: {
        name: pool.relationships.quote_token.data.attributes.name,
        symbol: pool.relationships.quote_token.data.attributes.symbol,
      }
    }));

    return NextResponse.json({ pools: trendingPools });

  } catch (error) {
    console.error('Internal Server Error fetching trending data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
