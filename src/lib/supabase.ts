import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
  console.error(
    '❌ KONFIGURASI SUPABASE TIDAK DITEMUKAN!\n' +
    'Mohon atur NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di Dashboard Vercel (Project Settings > Environment Variables) lalu lakukan REDEPLOY TANPA me-centang "USE EXISTING BUILD CACHE".'
  );
}

// Inisialisasi koneksi client Supabase
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
