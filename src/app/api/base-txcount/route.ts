// src/app/api/base-txcount/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBaseTxCount, getBaseLevel } from '~/lib/etherscan';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();
    const apiKey = process.env.ETHERSCAN_API_KEY;
    if (!address || !apiKey) {
      return NextResponse.json({ error: 'Address and API key required.' }, { status: 400 });
    }
    const txCount = await getBaseTxCount(address, apiKey);
    const level = getBaseLevel(txCount);
    return NextResponse.json({ address, txCount, level });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
