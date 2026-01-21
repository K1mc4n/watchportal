// src/app/page.tsx
import type { Metadata } from 'next';
import { APP_NAME, APP_DESCRIPTION, APP_OG_IMAGE_URL } from '~/lib/constants';
import { getMiniAppEmbedMetadata } from '~/lib/utils';
import ThemedFeed from '~/components/Demo';

// ❌ HAPUS force-dynamic (biar crawler Farcaster bisa baca metadata statis)
// export const dynamic = 'force-dynamic';

// ✅ Boleh tetap pakai revalidate
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: APP_NAME || "Watchcoin",
    description: APP_DESCRIPTION || "Watchcoin Mini App",
    openGraph: {
      title: APP_NAME || "Watchcoin",
      description: APP_DESCRIPTION || "Watchcoin Mini App",
      images: [APP_OG_IMAGE_URL || "https://watchportal.vercel.app/og-image.png"],
    },
    other: {
      "fc:frame": JSON.stringify(getMiniAppEmbedMetadata()),
    },
  };
}

export default function Home() {
  return <ThemedFeed />;
}
