// src/app/page.tsx
import type { Metadata } from 'next';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils';
import ThemedFeed from '~/components/Demo'; // Langsung impor Demo.tsx

export const revalidate = 300; 
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

export default function Home() {
  return <ThemedFeed />;
}
