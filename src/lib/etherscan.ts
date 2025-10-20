// src/lib/etherscan.ts

const ETHERSCAN_V2_API = 'https://api.etherscan.io/v2/api';

export async function getBaseTxCount(address: string, apiKey: string): Promise<number> {
  const url = `${ETHERSCAN_V2_API}?module=account&action=txlist&chainid=8453&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch from Etherscan API');
  const data = await res.json();
  if (data.status !== '1' || !Array.isArray(data.result)) return 0;
  return data.result.length;
}

export function getBaseLevel(txCount: number): string {
  if (txCount <= 100) return 'newbie';
  if (txCount <= 500) return 'junior';
  if (txCount <= 1000) return 'senior';
  return 'KING BASED';
}
