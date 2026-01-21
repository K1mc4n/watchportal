// src/app/page.tsx
import type { Metadata } from "next";
import ThemedFeed from "~/components/Demo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Watchcoin",
    description: "Watchcoin Mini App",
    openGraph: {
      title: "Watchcoin",
      description: "Watchcoin Mini App",
      images: ["https://watchportal.vercel.app/og-image.png"],
    },
    other: {
      "fc:frame": "vNext",
      "fc:frame:image": "https://watchportal.vercel.app/og-image.png",
      "fc:frame:aspect_ratio": "1.91:1",
      "fc:frame:button:1": "Open Watchcoin",
      "fc:frame:button:1:action": "link",
      "fc:frame:button:1:target": "https://watchportal.vercel.app",
      "fc:frame:post_url": "https://watchportal.vercel.app",
    },
  };
}

export default function Home() {
  return <ThemedFeed />;
}
