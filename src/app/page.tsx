// src/app/page.tsx

import { Metadata } from 'next';
import Image from 'next/image'; // Impor komponen Image
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils';

export const revalidate = 300; 

// Bagian metadata ini sudah benar dan menggunakan format modern
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    openGraph: {
      title: APP_NAME,
      description: APP_DESCRIPTION,
      images: [APP_OG_IMAGE_URL],
    },
    other: {
      'fc:frame': JSON.stringify(getMiniAppEmbedMetadata()),
    },
  };
}


// --- INI BAGIAN TAMPILAN YANG DIPERBARUI ---
// Komponen halaman utama yang sudah disesuaikan dengan tema Anda
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#111111]">
      <div className="text-center space-y-6">
        {/* Menambahkan Logo di atas judul */}
        <Image 
            src="/watchcoin-logo.png" // Pastikan file ini ada di /public
            alt="Watchcoin Portal Logo"
            width={120}
            height={120}
            className="mx-auto"
        />
        {/* Judul dengan warna emas */}
        <h1 className="text-5xl font-bold text-gold">{APP_NAME}</h1>
        
        {/* Deskripsi dengan warna abu-abu terang */}
        <p className="text-xl text-gray-300">{APP_DESCRIPTION}</p>
        
        {/* Tombol CTA dengan gaya yang sesuai tema */}
        <a 
          href="/app" 
          className="inline-block px-8 py-3 bg-gold text-black font-semibold rounded-lg shadow-lg shadow-gold/20 transition-transform hover:scale-105"
        >
          Launch Portal
        </a>
        
        {/* Teks bantuan untuk pengguna browser biasa */}
        <p className="text-md text-gray-500 pt-2">
            Open in a Farcaster client like Warpcast.
        </p>
      </div>
    </main>
  );
}
