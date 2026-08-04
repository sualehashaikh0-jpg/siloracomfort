/**
 * Hero — matches the SILORA reference frame.
 *
 * Drop your Higgsfield-generated image at  public/hero.jpg
 * (silk drape on marble, landscape, ~2400px wide recommended).
 * Until then, a layered gradient stands in so the page never looks broken.
 */
export default function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden"
      style={{
        backgroundImage:
          // Image first; gradient fallback renders wherever the image is absent.
          "url('/hero.jpg'), radial-gradient(120% 90% at 70% 20%, #eceade 0%, #e2ddd0 45%, #d6cfbf 100%)",
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
      }}
    >
      {/* Soft top-right light wash, like the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(60,52,40,0.10) 0%, rgba(0,0,0,0) 35%, rgba(255,255,255,0.14) 75%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex items-center justify-center gap-6 md:justify-center md:gap-10">
          {/* Wordmark */}
          <h1 className="tracking-brand select-none text-center text-5xl font-light text-[var(--charcoal)] sm:text-6xl md:text-7xl lg:text-8xl">
            SILORA
          </h1>

          {/* Gold monogram — hidden on small screens */}
          <span
            aria-hidden
            className="hidden font-[family-name:var(--font-cormorant)] text-6xl italic text-[var(--gold)] opacity-80 lg:block lg:text-7xl"
          >
            S
          </span>
        </div>

        <p className="mt-6 text-center font-[family-name:var(--font-cormorant)] text-lg italic text-[var(--muted)] md:text-xl">
          Bedding, made for softer sleep.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#collections"
            className="tracking-nav border border-[var(--charcoal)]/50 px-8 py-3 text-[13px] text-[var(--charcoal)] transition-colors hover:bg-[var(--charcoal)] hover:text-[var(--ivory)]"
          >
            SHOP THE COLLECTIONS
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#collections"
        aria-label="Scroll to collections"
        className="animate-drift absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--gold)]"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
