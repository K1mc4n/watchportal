"use client";

import { MiniAppProvider } from "@neynar/react";
// Impor `WagmiProvider` secara langsung. Impor dinamis tidak diperlukan di sini
// karena komponen provider itu sendiri ringan. Komponen yang menggunakannya yang perlu
// dimuat secara dinamis.
import WagmiProvider from "~/components/providers/WagmiProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider>
      <MiniAppProvider analyticsEnabled={true}>
        {children}
      </MiniAppProvider>
    </WagmiProvider>
  );
}
