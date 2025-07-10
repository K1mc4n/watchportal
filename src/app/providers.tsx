// src/app/providers.tsx (Kode yang Benar)
"use client";

import { MiniAppProvider } from "@neynar/react";
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
