// src/app/page.tsx

import { Metadata } from 'next';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils';

// Ini memastikan metadata dibuat ulang secara berkala agar tetap fresh
export const revalidate = 300; 

// Fungsi async untuk menghasilkan metadata, yang berjalan di server
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
      // Perubahan utama: mengubah seluruh objek frame modern menjadi string JSON dalam satu tag
      'fc:frame': JSON.stringify(getMiniAppEmbedMetadata()),
    },
  };
}


// Tampilan UI halaman ini tetap sama
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
