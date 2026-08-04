import Link from "next/link";
import { createSupabaseServer } from "@/lib/supabaseServer";
import SignOutButton from "@/components/admin/SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Login page (unauthenticated) renders bare, without the admin chrome.
  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[var(--ivory)]">
      <header className="border-b border-[var(--line)] bg-[var(--sand)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <div className="flex items-center gap-6">
            <span className="tracking-brand text-sm font-light text-[var(--charcoal)]">
              SILORA
            </span>
            <nav className="flex gap-5">
              <Link href="/admin/products" className="tracking-nav text-[12px] text-[var(--charcoal)]/85 hover:text-[var(--charcoal)]">
                PRODUCTS
              </Link>
              <Link href="/admin/orders" className="tracking-nav text-[12px] text-[var(--charcoal)]/85 hover:text-[var(--charcoal)]">
                ORDERS
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="tracking-nav text-[12px] text-[var(--charcoal)]/70 hover:text-[var(--charcoal)]">
              VIEW STORE
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
