// src/app/page.tsx
import type { Metadata } from "next";
import ThemedFeed from "~/components/Demo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const embed = {
    version: "1",
    imageUrl: "https://watchportal.vercel.app/og-image.png",
    button: {
      title: "Open Watchcoin",
      action: {
        type: "launch_miniapp",
        name: "Watchcoin",
        url: "https://watchportal.vercel.app",
        splashImageUrl: "https://watchportal.vercel.app/splash.png",
        splashBackgroundColor: "#111111",
      },
    },
  };

  return {
    title: "Watchcoin",
    description: "Watchcoin Mini App",
    openGraph: {
      title: "Watchcoin",
      description: "Watchcoin Mini App",
      images: ["https://watchportal.vercel.app/og-image.png"],
    },
    other: {
      "fc:miniapp": JSON.stringify(embed),
      // optional backward compatibility
      "fc:frame": JSON.stringify({
        ...embed,
        button: {
          ...embed.button,
          action: { ...embed.button.action, type: "launch_frame" },
        },
      }),
    },
  };
}

export default function Home() {
  return <ThemedFeed />;
}
