// src/lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

// Pastikan variabel ini ada di file .env.local dan di Vercel
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
