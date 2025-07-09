// src/app/page.tsx (VERSI YANG BENAR SESUAI DOKUMENTASI)

import type { Metadata } from 'next';

// --- Informasi Aplikasi (Hardcoded untuk Kejelasan & Stabilitas) ---
// Kita tuliskan URL secara langsung untuk menghindari masalah `process.env`.
// Ini adalah praktik paling aman untuk metadata statis.
const APP_URL = "https://watchportal.vercel.app";
const APP_NAME = "Watchcoin Portal";
const APP_DESCRIPTION = "Your portal to the world of crypto news, apps, and on-chain data.";
const APP_SPLASH_IMAGE_URL = `${APP_URL}/splash.png`; // Pastikan file 'splash.png' ada di folder /public

// --- URL untuk endpoint API yang akan menangani redirect ---
// Ini adalah kunci utama dari metode 'post_redirect'.
const FRAME_POST_URL = `${APP_URL}/api/launch`;

// --- Objek Metadata Lengkap ---
export const metadata: Metadata = {
  // --- Metadata Standar untuk SEO & Sharing (Twitter, Discord, dll.) ---
  title: APP_NAME,
  description: APP_DESCRIPTION,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [APP_SPLASH_IMAGE_URL],
  },
  
  // --- Metadata Farcaster Frame yang Tepat untuk Meluncurkan Mini App ---
  other: {
    // Memberitahu Farcaster bahwa ini adalah sebuah Frame.
    'fc:frame': 'vNext',
    
    // URL gambar yang akan ditampilkan di dalam feed Farcaster.
    'fc:frame:image': APP_SPLASH_IMAGE_URL,
    
    // URL API yang akan menerima POST request saat tombol ditekan.
    'fc:frame:post_url': FRAME_POST_URL,
    
    // Teks yang akan muncul di tombol.
    'fc:frame:button:1': 'Launch Portal',
    
    // Aksi yang akan dilakukan saat tombol ditekan.
    // 'post_redirect' adalah cara yang direkomendasikan oleh Farcaster.
    'fc:frame:button:1:action': 'post_redirect',
  },
};

// --- Komponen Halaman ---
// Ini adalah tampilan halaman jika seseorang membukanya di browser biasa.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gold">{APP_NAME}</h1>
        <p className="text-xl text-gray-300">{APP_DESCRIPTION}</p>
        <a 
          href="/app" 
          className="inline-block mt-4 px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold/90"
        >
          Launch Portal
        </a>
        <p className="text-md text-gray-500 mt-2">
            Open in a Farcaster client like Warpcast.
        </p>
      </div>
    </main>
  );
}
