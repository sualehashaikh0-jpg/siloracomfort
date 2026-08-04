import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server client that reads/writes the auth cookie.
 * Used in server components, route handlers, and middleware-adjacent code
 * to know whether the admin is logged in.
 */
export async function createSupabaseServer() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // called from a Server Component — safe to ignore,
            // middleware refreshes the session instead
          }
        },
      },
    }
  );
}
