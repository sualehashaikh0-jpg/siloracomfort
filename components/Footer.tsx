import Link from "next/link";

const shopLinks = [
  { href: "/collections/bedsheets", label: "Bed Sheets" },
  { href: "/collections/duvet-covers", label: "Duvet Covers" },
  { href: "/collections/comforters", label: "Comforters" },
  { href: "/collections/bed-sets", label: "Bed Sets" },
];

const helpLinks = [
  { href: "/shipping", label: "Shipping Details" },
  { href: "/returns", label: "Return & Exchange" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--sand)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-10">
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
                <Link
                  href={l.href}
                  className="text-sm text-[var(--charcoal)]/75 transition-colors hover:text-[var(--charcoal)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Help */}
        <nav aria-label="Help">
          <h3 className="tracking-nav text-[12px] text-[var(--charcoal)]">HELP</h3>
          <ul className="mt-4 space-y-2.5">
            {helpLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-[var(--charcoal)]/75 transition-colors hover:text-[var(--charcoal)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div>
          <h3 className="tracking-nav text-[12px] text-[var(--charcoal)]">
            STAY IN TOUCH
          </h3>
          <p className="mt-4 text-sm text-[var(--charcoal)]/75">
            New drops and sale alerts, no spam.
          </p>
          <div className="mt-4 flex border border-[var(--charcoal)]/40">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[var(--charcoal)] placeholder:text-[var(--charcoal)]/45 focus:outline-none"
            />
            <button
              type="button"
              className="tracking-nav bg-[var(--charcoal)] px-4 text-[12px] text-[var(--ivory)] transition-opacity hover:opacity-90"
            >
              JOIN
            </button>
          </div>
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
