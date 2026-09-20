import Link from "next/link";

const shopLinks = [
  { href: "/collections/bedsheets", label: "Bed Sheets" },
  { href: "/collections/premium", label: "Premium" },
];

const helpLinks = [
  { href: "/#reviews", label: "Reviews" },
  { href: "/shop", label: "Shop All" },
];

// Highlight line(s) shown in the footer
const highlights = ["3-5 days delivery"];

const INSTAGRAM =
  "https://www.instagram.com/silora.comfort?utm_source=qr&igsh=aWxhN2QxZ3pjZW0x";
const FACEBOOK = "https://www.facebook.com/share/18u7SMCFNr";
const WHATSAPP = "https://wa.me/923450088846";

export default function Footer() {
  return (
    <footer className="bg-[var(--sand)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
        {/* Brand + socials */}
        <div>
          <p className="tracking-brand text-lg font-light text-[var(--charcoal)]">
            SILORA
          </p>
          <p className="mt-4 max-w-xs font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[var(--charcoal)]/70">
            Premium bedding, delivered across Pakistan.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-[var(--charcoal)]/75">
            {highlights.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="mt-5 flex gap-4">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[var(--charcoal)]/70 transition-colors hover:text-[var(--charcoal)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
              </svg>
            </a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[var(--charcoal)]/70 transition-colors hover:text-[var(--charcoal)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 9h2.5l.5-3h-3V4.2c0-.87.24-1.46 1.5-1.46H17V.1C16.7.06 15.8 0 14.7 0 12.4 0 10.9 1.36 10.9 3.86V6H8.5v3h2.4v9h3.1z" />
              </svg>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-[var(--charcoal)]/70 transition-colors hover:text-[var(--charcoal)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 00-8.6 15.06L2 22l5.06-1.33A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1112 20.2zm4.5-6.2c-.25-.13-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.13.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Shop */}
        <nav aria-label="Shop">
          <h3 className="tracking-nav text-[12px] text-[var(--charcoal)]">SHOP</h3>
          <ul className="mt-4 space-y-2.5">
            {shopLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-[var(--charcoal)]/75 transition-colors hover:text-[var(--charcoal)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Explore */}
        <nav aria-label="Explore">
          <h3 className="tracking-nav text-[12px] text-[var(--charcoal)]">EXPLORE</h3>
          <ul className="mt-4 space-y-2.5">
            {helpLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-[var(--charcoal)]/75 transition-colors hover:text-[var(--charcoal)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="tracking-nav text-[12px] text-[var(--charcoal)]">CONTACT</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--charcoal)]/75">
            <li>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--charcoal)]">
                WhatsApp: 0345 0088846
              </a>
            </li>
            <li>
              <a href="mailto:help.silora@gmail.com" className="transition-colors hover:text-[var(--charcoal)]">
                help.silora@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--charcoal)]/15">
        <p className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-[var(--charcoal)]/60 md:px-10">
          © {new Date().getFullYear()} SILORA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
