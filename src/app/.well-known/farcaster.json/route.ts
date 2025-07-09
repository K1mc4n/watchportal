import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    frame: {
      url: 'https://yourdomain.com/api/frame'
    }
  });
}
