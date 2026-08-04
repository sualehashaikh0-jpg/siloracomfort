import { createClient } from "@supabase/supabase-js";

/**
 * Server-only client using the SECRET key.
 * Bypasses Row Level Security — never import this into a client component.
 * The secret key must ONLY live in server env vars, never NEXT_PUBLIC_*.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const secret = process.env.SUPABASE_SECRET_KEY!;

export const supabaseAdmin = createClient(url, secret, {
  auth: { persistSession: false },
});
