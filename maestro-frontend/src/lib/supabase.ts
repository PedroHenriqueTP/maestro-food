import { createClient } from '@supabase/supabase-js';

// Fallback para valores dummy se as credenciais não estiverem configuradas
// (Permite que o sistema compile/rode mockado enquanto o DevOps não injeta o .env real)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
