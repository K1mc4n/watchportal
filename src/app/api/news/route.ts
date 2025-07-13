// Lokasi file: src/app/api/news/route.ts

import { NextResponse } from 'next/server';

// Cache hasil ini selama 10 menit (600 detik)
export const revalidate = 600;

interface CustomArticle {
  source: { id: string | null; name: string };
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  // =======================================================
  // ==== PERUBAHAN DI SINI ====
  // =======================================================
  const chatId = '@Botscapital'; // Menggunakan username channel Anda
  // =======================================================

  if (!botToken) {
    return NextResponse.json({ error: 'Telegram Bot Token not configured' }, { status: 500 });
  }

  // API URL Telegram untuk mendapatkan riwayat chat
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/getChatHistory?chat_id=${chatId}&limit=20`;

  try {
    const response = await fetch(telegramApiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API Error:', errorData);
      // Berikan pesan error yang lebih spesifik jika bot tidak bisa akses channel
      if (errorData.description === "Bad Request: chat not found") {
        return NextResponse.json({ error: 'Failed to fetch news: Chat not found. Make sure the bot is an admin in the channel.' }, { status: response.status });
      }
      return NextResponse.json({ error: 'Failed to fetch news from Telegram' }, { status: response.status });
    }

    const data = await response.json();

    if (!data.ok || !data.result) {
        console.warn("Telegram API response was not OK or had no result:", data);
        return NextResponse.json({ articles: [] });
    }

    const articles: CustomArticle[] = data.result
      .filter((update: any) => update.message && update.message.text)
      .map((update: any) => {
        const message = update.message;
        const text: string = message.text || '';
        
        const urlMatch = text.match(/https?:\/\/[^\s]+/);
        const url = urlMatch ? urlMatch[0] : `https://t.me/${chatId.replace('@', '')}/${message.message_id}`;

        // Coba buat judul dan deskripsi yang lebih baik
        const lines = text.split('\n').filter(line => line.trim() !== ''); // Hapus baris kosong
        const title = lines[0]?.trim() || 'Telegram News Update';
        const description = lines.slice(1, 3).join(' ').trim() || text.substring(0, 150);

        return {
          source: { id: 'telegram', name: message.chat.title || 'Telegram Channel' },
          author: message.author_signature || 'Watch Portal Bot',
          title: title,
          description: description,
          url: url,
          urlToImage: null, // Tetap null untuk saat ini
          publishedAt: new Date(message.date * 1000).toISOString(),
          content: text,
        };
      });

    return NextResponse.json({ articles });

  } catch (error) {
    console.error('Internal Server Error fetching news from Telegram:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
