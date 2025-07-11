// src/lib/viem.ts

import { createPublicClient, http, parseUnits, type Address, type Chain } from 'viem';
// 1. Impor semua chain yang kita dukung
import { base, optimism, degen, arbitrum, mainnet } from 'wagmi/chains';

// --- BAGIAN BARU: Pemetaan Chain dan RPC ---
// 2. Buat pemetaan dari nama string ke objek chain dari viem
const chainMap: Record<string, Chain> = {
  Base: base,
  Optimism: optimism,
  Degen: degen,
  Arbitrum: arbitrum,
  'Multi-chain': mainnet, // Asumsikan multi-chain bisa dicek di mainnet atau base
  Other: mainnet, // Fallback ke mainnet untuk 'Other'
};

// 3. Fungsi untuk mendapatkan klien viem yang benar berdasarkan nama chain
const getViemClient = (chainName: string) => {
  const chain = chainMap[chainName];
  if (!chain) {
    throw new Error(`Unsupported chain for verification: ${chainName}`);
  }
  
  // Anda bisa menambahkan RPC URL spesifik per chain jika punya
  // contoh: const rpcUrl = process.env[`${chainName.toUpperCase()}_RPC_URL`];
  return createPublicClient({
    chain: chain,
    transport: http(), // Menggunakan RPC publik default dari viem
  });
};
// --- AKHIR BAGIAN BARU ---


const erc20Abi = [{ type: 'function', name: 'balanceOf', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }], stateMutability: 'view' }] as const;
const erc721Abi = [{ type: 'function', name: 'balanceOf', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }], stateMutability: 'view' }] as const;


/**
 * Memeriksa saldo token ERC20 di chain yang benar.
 * @param chainName Nama chain tempat token berada (cth: "Base", "Optimism").
 * @param userAddress Alamat wallet pengguna.
 * @param tokenContract Alamat kontrak token.
 * @param minAmount Jumlah minimal yang harus dimiliki (sebagai string).
 * @param decimals Jumlah desimal token.
 * @returns true jika saldo mencukupi.
 */
// 4. Tambahkan parameter `chainName`
export async function checkTokenBalance(chainName: string, userAddress: Address, tokenContract: Address, minAmount: string, decimals: number): Promise<boolean> {
  try {
    // 5. Dapatkan client untuk chain yang benar
    const client = getViemClient(chainName);

    const balance = await client.readContract({
      address: tokenContract,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    });

    const requiredAmount = parseUnits(minAmount, decimals);
    
    console.log(`[Viem on ${chainName}] Checking token ${tokenContract} for ${userAddress}. Required: ${requiredAmount}, Has: ${balance}`);
    return balance >= requiredAmount;
  } catch (error) {
    console.error(`[Viem on ${chainName}] Error checking token balance for ${tokenContract}:`, error);
    return false;
  }
}

/**
 * Memeriksa saldo NFT di chain yang benar.
 * @param chainName Nama chain tempat NFT berada.
 * @param userAddress Alamat wallet pengguna.
 * @param nftContract Alamat kontrak NFT.
 * @returns true jika memiliki > 0 NFT.
 */
// 6. Tambahkan parameter `chainName`
export async function checkNftBalance(chainName: string, userAddress: Address, nftContract: Address): Promise<boolean> {
  try {
    // 7. Dapatkan client untuk chain yang benar
    const client = getViemClient(chainName);

    const balance = await client.readContract({
      address: nftContract,
      abi: erc721Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    });

    console.log(`[Viem on ${chainName}] Checking NFT ${nftContract} for ${userAddress}. Has: ${balance}`);
    return balance > 0;
  } catch (error) {
    console.error(`[Viem on ${chainName}] Error checking NFT balance for ${nftContract}:`, error);
    return false;
  }
}
