// Lokasi file: src/lib/viem.ts

import { createPublicClient, http, parseUnits, type Address } from 'viem';
import { base } from 'wagmi/chains'; // Kita fokus pada chain Base untuk quest ini

// ABI (Application Binary Interface) minimal yang kita butuhkan untuk cek saldo.
const erc20Abi = [{ type: 'function', name: 'balanceOf', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }], stateMutability: 'view' }] as const;
const erc721Abi = [{ type: 'function', name: 'balanceOf', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: 'balance', type: 'uint256' }], stateMutability: 'view' }] as const;

// Inisialisasi klien publik untuk berkomunikasi dengan blockchain Base.
// process.env.BASE_RPC_URL adalah opsional, viem akan menggunakan RPC publik jika tidak ada.
const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.BASE_RPC_URL),
});

/**
 * Memeriksa apakah sebuah alamat memiliki saldo token ERC20 yang cukup.
 * @param userAddress Alamat wallet pengguna.
 * @param tokenContract Alamat kontrak token.
 * @param minAmount Jumlah minimal yang harus dimiliki (sebagai string, cth: "1000").
 * @param decimals Jumlah desimal token.
 * @returns true jika saldo mencukupi, false jika tidak.
 */
export async function checkTokenBalance(userAddress: Address, tokenContract: Address, minAmount: string, decimals: number): Promise<boolean> {
  try {
    const balance = await publicClient.readContract({
      address: tokenContract,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    });

    // Konversi jumlah minimal ke unit terkecil token (seperti wei untuk ETH)
    const requiredAmount = parseUnits(minAmount, decimals);
    
    console.log(`[Viem] Checking token ${tokenContract} for ${userAddress}. Required: ${requiredAmount}, Has: ${balance}`);
    return balance >= requiredAmount;
  } catch (error) {
    console.error(`[Viem] Error checking token balance for ${tokenContract}:`, error);
    return false;
  }
}

/**
 * Memeriksa apakah sebuah alamat memiliki setidaknya satu NFT dari koleksi tertentu.
 * @param userAddress Alamat wallet pengguna.
 * @param nftContract Alamat kontrak NFT.
 * @returns true jika memiliki > 0 NFT, false jika tidak.
 */
export async function checkNftBalance(userAddress: Address, nftContract: Address): Promise<boolean> {
  try {
    const balance = await publicClient.readContract({
      address: nftContract,
      abi: erc721Abi,
      functionName: 'balanceOf',
      args: [userAddress],
    });

    console.log(`[Viem] Checking NFT ${nftContract} for ${userAddress}. Has: ${balance}`);
    return balance > 0;
  } catch (error) {
    console.error(`[Viem] Error checking NFT balance for ${nftContract}:`, error);
    return false;
  }
}
