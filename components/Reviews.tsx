import Reveal from "./Reveal";

/**
 * Customer reviews, English or Urdu.
 * lang is "en" or "ur". Edit this list to add or change reviews.
 */
const reviews: { name: string; text: string; lang: "en" | "ur" }[] = [
  { name: "عائشہ طارق", text: "کپڑا بہت نرم اور پریمیم ہے، ڈلیوری تیز اور پیکنگ بہترین۔", lang: "ur" },
  { name: "Humza Saeed", text: "Prices are above average, but the quality is worth it.", lang: "en" },
  { name: "بلال فاروق", text: "سلائی اور فنشنگ بڑے اسٹورز سے بھی بہتر ہے۔", lang: "ur" },
  { name: "Sana Malik", text: "Colours match the photos and wash beautifully.", lang: "en" },
];

const URDU_FONT = "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Segoe UI', Tahoma, sans-serif";

function Stars() {
  return (
    <div className="flex justify-center gap-0.5 text-[var(--gold)]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.8.7-5 4.6 1.4 6.7L12 17.8 5.9 20.3l1.4-6.7-5-4.6 6.8-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <Reveal>
        <p className="tracking-nav text-center text-[12px] text-[var(--gold)]">KIND WORDS</p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
          What our customers say
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((r, i) => (
          <Reveal key={r.name + i} delay={i * 90}>
            <figure className="flex h-full flex-col border border-[var(--line)] bg-[var(--marble)]/50 p-4">
              <Stars />
              <blockquote
                dir={r.lang === "ur" ? "rtl" : "ltr"}
                lang={r.lang}
                style={r.lang === "ur" ? { fontFamily: URDU_FONT, lineHeight: 2 } : undefined}
                className={`mt-3 flex-1 text-center text-sm text-[var(--charcoal)]/85 ${r.lang === "en" ? "font-[family-name:var(--font-cormorant)] italic leading-relaxed" : ""}`}
              >
                {r.text}
              </blockquote>
              <figcaption className={`mt-3 text-center text-[11px] text-[var(--charcoal)] ${r.lang === "en" ? "tracking-nav" : ""}`}>
                {r.lang === "en" ? r.name.toUpperCase() : r.name}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
