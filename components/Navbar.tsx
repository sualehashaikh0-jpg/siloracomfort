"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "HOME" },
  { href: "/collections", label: "COLLECTIONS" },
  { href: "/shop", label: "SHOP ALL" },
  { href: "/story", label: "STORY" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--sand-deep)]/40 bg-[var(--sand)]">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Mobile: brand on the left */}
        <Link
          href="/"
          className="tracking-brand text-sm font-light md:hidden"
          aria-label="SILORA home"
        >
          SILORA
        </Link>

        {/* Desktop: centered links */}
        <ul className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="tracking-nav text-[13px] font-normal text-[var(--charcoal)]/85 transition-colors hover:text-[var(--charcoal)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster: cart / user */}
        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="tracking-nav flex items-center gap-2 text-[13px] text-[var(--charcoal)]/85 transition-colors hover:text-[var(--charcoal)]"
          >
            <CartIcon />
            <span className="hidden sm:inline">CART</span>
            {count > 0 && (
              <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--charcoal)] px-1 text-[10px] leading-none text-[var(--ivory)]">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/account"
            className="tracking-nav hidden items-center gap-2 text-[13px] text-[var(--charcoal)]/85 transition-colors hover:text-[var(--charcoal)] sm:flex"
          >
            <UserIcon />
            <span>USER</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden"
          >
            <span className="block h-px w-6 bg-[var(--charcoal)]" />
            <span className="mt-1.5 block h-px w-6 bg-[var(--charcoal)]" />
            <span className="mt-1.5 block h-px w-6 bg-[var(--charcoal)]" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul className="border-t border-[var(--sand-deep)]/40 bg-[var(--sand)] px-5 pb-5 pt-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="tracking-nav block py-3 text-[13px] text-[var(--charcoal)]/85"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="tracking-nav block py-3 text-[13px] text-[var(--charcoal)]/85"
            >
              USER
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M6 6h15l-1.5 9h-12L5 3H2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1.6-3.2 4.3-4.8 7.5-4.8s5.9 1.6 7.5 4.8" strokeLinecap="round" />
    </svg>
  );
}
