// src/app/page.tsx

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils';
import AppLoading from '~/components/AppLoading';

// Revalidasi dan dynamic export ini penting untuk halaman mini-app
export const revalidate = 300; 
export const dynamic = 'force-dynamic';

// Fungsi ini akan tetap membuat metadata untuk Farcaster Frame
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

// Impor komponen <Demo> secara dinamis, sama seperti di halaman /app sebelumnya
// Ini akan menampilkan komponen loading selagi konten utama disiapkan.
const Demo = dynamic(() => import('~/components/Demo'), {
  ssr: false,
  loading: () => <AppLoading />, 
});

// Sekarang, halaman utama akan langsung merender komponen Demo
export default function Home() {
  return <Demo title={APP_NAME} />;
}
