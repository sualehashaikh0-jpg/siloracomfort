import Link from "next/link";

const shopLinks = [
  { href: "/collections/bedsheets", label: "Bed Sheets" },
  { href: "/collections/duvet-covers", label: "Duvet Covers" },
  { href: "/collections/comforters", label: "Comforters" },
  { href: "/collections/bed-sets", label: "Bed Sets" },
];

const helpLinks = [
  { href: "/#reviews", label: "Reviews" },
  { href: "/shop", label: "Shop All" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--sand)]">
      <div className="mx-auto grid gap-12 px-6 py-16 md:grid-cols-4 md:px-10 max-w-7xl">
        {/* Brand */}
        <div>
          <p className="tracking-brand text-lg font-light text-[var(--charcoal)]">
            SILORA
          </p>
          <p className="mt-4 max-w-xs font-[family-name:var(--font-cormorant)] text-sm italic leading-relaxed text-[var(--charcoal)]/70">
            Premium bedding, delivered across Pakistan.
          </p>
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
              <a href="https://wa.me/923450088846" className="transition-colors hover:text-[var(--charcoal)]">
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
