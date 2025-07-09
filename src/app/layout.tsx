// src/app/layout.tsx

import type { Metadata } from "next";
import "~/app/globals.css";
import { Providers } from "~/app/providers";
import { APP_NAME, APP_DESCRIPTION } from "~/lib/constants";
// HAPUS BARIS INI: import { Chatbot } from "~/components/ui/Chatbot";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          {/* HAPUS BARIS INI: <Chatbot /> */}
        </Providers>
      </body>
    </html>
  );
}
