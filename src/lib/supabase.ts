import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl && typeof window !== 'undefined') {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseAnonKey && typeof window !== 'undefined') {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Inisialisasi koneksi client Supabase
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
