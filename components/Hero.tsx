/**
 * Hero — uses public/hero.jpg (SILORA wordmark is baked into the image,
 * so no text is rendered over it). A warm gradient stands in if the image
 * is missing, so the section never looks broken.
 */
export default function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-end overflow-hidden"
      style={{
        backgroundImage:
          "url('/hero.jpg'), radial-gradient(120% 90% at 70% 20%, #eceade 0%, #e2ddd0 45%, #d6cfbf 100%)",
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
      }}
    >
      {/* Gentle bottom scrim so the CTA stays readable over any image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(43,42,38,0.28) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 md:px-10 md:pb-16">
        <div className="flex justify-center">
          <a
            href="#collections"
            className="tracking-nav border border-[var(--ivory)]/70 bg-[var(--charcoal)]/20 px-8 py-3 text-[13px] text-[var(--ivory)] backdrop-blur-sm transition-colors hover:bg-[var(--ivory)] hover:text-[var(--charcoal)]"
          >
            SHOP THE COLLECTIONS
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#collections"
        aria-label="Scroll to collections"
        className="animate-drift absolute bottom-5 left-1/2 -translate-x-1/2 text-[var(--ivory)]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
