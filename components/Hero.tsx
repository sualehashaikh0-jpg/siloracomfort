/**
 * Hero — public/hero.jpg with a permanent "Up to 50% Off" overlay.
 * Text is black for readability on the light photo.
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
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="flex flex-col items-center text-center">
          <p className="tracking-nav text-[12px] text-black">THIS SEASON</p>
          <h2 className="mt-2 font-[family-name:var(--font-cormorant)] text-4xl leading-tight text-black md:text-6xl">
            Up to 50% Off
          </h2>
          <p className="mt-2 font-[family-name:var(--font-cormorant)] text-lg italic text-black">
            This Season Free Delivery Nationwide
          </p>

          <a href="#collections" className="tracking-nav mt-7 border border-black/70 bg-white/25 px-8 py-3 text-[13px] text-black backdrop-blur-sm transition-colors hover:bg-black hover:text-white">
            SHOP THE COLLECTIONS
          </a>
        </div>
      </div>

      <a href="#collections" aria-label="Scroll to collections" className="animate-drift absolute bottom-5 left-1/2 -translate-x-1/2 text-black">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
