// src/app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '~/lib/supabase';
import { getWeek } from 'date-fns';

export const revalidate = 60;

export async function GET() {
  try {
    const weekIdentifier = `${new Date().getFullYear()}-${getWeek(new Date())}`;
    const { data, error } = await supabase.rpc('get_weekly_leaderboard', { 
        p_week_identifier: weekIdentifier 
    });
    if (error) throw error;
    return NextResponse.json({ leaderboard: data });
  } catch (err) {
    console.error("Leaderboard API Error:", err);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
