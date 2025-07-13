// Lokasi file: src/app/api/news/route.ts
// Ini adalah versi asli yang menggunakan NewsAPI.org

import { NextResponse } from 'next/server';

// Cache hasil dari endpoint ini selama 1 jam (3600 detik)
// untuk mengurangi panggilan ke NewsAPI dan mempercepat loading.
export const revalidate = 600;

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'News API key not configured' }, { status: 500 });
  }

  // URL untuk mencari berita terkait crypto dan Farcaster dalam bahasa Inggris
  // Menggunakan beberapa kata kunci untuk hasil yang lebih relevan.
  const newsApiUrl = `https://newsapi.org/v2/everything?q=(crypto OR farcaster OR web3 OR nft OR blockchain)&language=en&sortBy=publishedAt&pageSize=20`;

  try {
    const response = await fetch(newsApiUrl, {
      headers: {
        'X-Api-Key': apiKey, // NewsAPI menggunakan header 'X-Api-Key' untuk otentikasi
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('NewsAPI Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch news from source' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Internal Server Error fetching news:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
