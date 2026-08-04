import Link from "next/link";
import Reveal from "./Reveal";
import type { Category } from "@/lib/queries";

const tones = ["#d9cdb8", "#cfc4ae", "#c5b79d", "#d3c6ad"];
const taglines: Record<string, string> = {
  bedsheets: "Soft-washed cotton, king & queen",
  "duvet-covers": "Buttoned, breathable, easy-care",
  comforters: "Cloud-fill warmth for every season",
  "bed-sets": "Complete looks, perfectly matched",
};

export default function Collections({ categories }: { categories: Category[] }) {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="tracking-nav text-center text-[12px] text-[var(--gold)]">
          THE RANGE
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
          Collections
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 90}>
            <Link
              href={`/collections/${c.slug}`}
              className="group block overflow-hidden"
            >
              <div
                className="aspect-[3/4] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(160deg, ${tones[i % tones.length]}, #cbbfa8)`,
                }}
                role="img"
                aria-label={c.name}
              />
              <div className="border border-t-0 border-[var(--line)] px-4 py-4 text-center">
                <h3 className="tracking-nav text-[13px] text-[var(--charcoal)]">
                  {c.name.toUpperCase()}
                </h3>
                <p className="mt-1 font-[family-name:var(--font-cormorant)] text-sm italic text-[var(--muted)]">
                  {taglines[c.slug] ?? "Discover the range"}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
