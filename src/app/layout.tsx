// Lokasi file: src/app/layout.tsx

import type { Metadata } from "next";
import "~/app/globals.css"; // Impor CSS global kita
import { Providers } from "~/app/providers";
import { APP_NAME, APP_DESCRIPTION, FARCASTER_CONFIG } from "~/lib/constants";
// Anda bisa menambahkan impor font di sini jika belum ada
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  other: {
    "fc:frame": JSON.stringify(FARCASTER_CONFIG.frame),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Terapkan kelas font ke html atau body
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
