// src/app/page.tsx

import type { Metadata } from 'next';
// PERBAIKAN: Ganti nama impor 'dynamic' menjadi nama lain, misalnya 'dynamicImport'
import dynamicImport from 'next/dynamic';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils';
import AppLoading from '~/components/AppLoading';

export const revalidate = 300;
// Konstanta ini harus tetap ada dan diekspor
export const dynamic = 'force-dynamic';

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

// Gunakan nama baru 'dynamicImport' saat memanggil fungsi
const Demo = dynamicImport(() => import('~/components/Demo'), {
  ssr: false,
  loading: () => <AppLoading />, 
});

export default function Home() {
  return <Demo title={APP_NAME} />;
}
