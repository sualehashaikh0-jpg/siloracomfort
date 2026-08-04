"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="tracking-nav text-[12px] text-[var(--charcoal)]/70 hover:text-[var(--charcoal)]"
    >
      SIGN OUT
    </button>
  );
}
