// src/app/page.tsx

import { Metadata } from 'next';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils'; // Pastikan ini diimpor

export const revalidate = 300; 

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
      // Menggunakan format JSON yang benar untuk Mini App
      'fc:frame': JSON.stringify(getMiniAppEmbedMetadata()),
    },
  };
}

// UI halaman utama
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-[#7C65C1]">{APP_NAME}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">{APP_DESCRIPTION}</p>
        <a href="/app" className="inline-block mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Launch App
        </a>
      </div>
    </main>
  );
}
