"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabaseBrowser";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Wrong email or password.");
      setLoading(false);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  const input =
    "w-full border border-[var(--line)] bg-transparent px-3 py-2.5 text-sm text-[var(--charcoal)] placeholder:text-[var(--muted)]/60 focus:border-[var(--charcoal)] focus:outline-none";

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={signIn} className="w-full max-w-sm">
        <p className="tracking-brand mb-8 text-center text-lg font-light text-[var(--charcoal)]">
          SILORA
        </p>
        <h1 className="mb-6 text-center font-[family-name:var(--font-cormorant)] text-2xl text-[var(--charcoal)]">
          Admin sign in
        </h1>
        <div className="space-y-3">
          <input
            className={input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className={input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="tracking-nav mt-6 w-full bg-[var(--charcoal)] py-3 text-[13px] text-[var(--ivory)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "SIGNING IN…" : "SIGN IN"}
        </button>
      </form>
    </main>
  );
}
