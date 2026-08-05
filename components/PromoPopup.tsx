"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SEEN_KEY = "silora_promo_seen_v1";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show once per visitor; a short delay feels intentional, not jarring.
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* private mode — just show it */
    }
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-label="Free delivery offer"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-[var(--charcoal)]/40 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-md border border-[var(--sand-deep)]/50 bg-[var(--ivory)] px-8 py-10 text-center shadow-xl">
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-[var(--muted)] transition-colors hover:text-[var(--charcoal)]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <p className="tracking-brand text-sm font-light text-[var(--charcoal)]">
          SILORA
        </p>

        <div className="mx-auto my-5 h-px w-10 bg-[var(--gold)]" />

        <h2 className="font-[family-name:var(--font-cormorant)] text-3xl leading-tight text-[var(--charcoal)]">
          Free Delivery
        </h2>
        <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg italic text-[var(--gold)]">
          for our first 100 customers
        </p>

        <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
          Be among the first to bring SILORA home — your order ships free,
          nationwide.
        </p>

        <Link
          href="/shop"
          onClick={close}
          className="tracking-nav mt-7 inline-block bg-[var(--charcoal)] px-10 py-3.5 text-[13px] text-[var(--ivory)] transition-opacity hover:opacity-90"
        >
          SHOP NOW
        </Link>

        <button
          onClick={close}
          className="mt-4 block w-full text-xs text-[var(--muted)] underline underline-offset-2 hover:text-[var(--charcoal)]"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
