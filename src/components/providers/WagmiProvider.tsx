// src/components/providers/WagmiProvider.tsx

"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { base, degen, mainnet, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { coinbaseWallet, metaMask, injected } from 'wagmi/connectors';
import { APP_NAME, APP_ICON_URL, APP_URL } from "~/lib/constants";
import React from "react";
// Tidak perlu lagi createConnector dan connector kustom

// Konfigurasi Wagmi v2 yang lebih simpel
export const config = createConfig({
  chains: [base, optimism, mainnet, degen],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
    [mainnet.id]: http(),
    [degen.id]: http(),
  },
  // Hapus customFarcasterConnector, gunakan 'injected' sebagai fallback
  connectors: [
    injected(), // Ini akan menangani provider dari Farcaster, MetaMask, dll.
    coinbaseWallet({
      appName: APP_NAME || "Watchportal",
      appLogoUrl: APP_ICON_URL,
      preference: 'all',
    }),
    metaMask({
      dappMetadata: {
        name: APP_NAME || "Watchportal",
        url: APP_URL || "",
      },
    }),
  ],
});

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
