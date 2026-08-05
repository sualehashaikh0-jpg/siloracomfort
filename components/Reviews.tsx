import Reveal from "./Reveal";

/** Customer reviews. Edit this array to add/change reviews. */
const reviews = [
  {
    name: "Humza Saeed",
    text: "I heard about them online and wanted to try them. And to be honest, the prices are above average but the quality is worth it. I bought the waffle style duvet set and white bedsheet to match my bedroom theme, and I'm really in love with the quality of the product.",
  },
  {
    name: "Ayesha Tariq",
    text: "Ordered a king size set for my parents' room and the fabric feels so soft and premium. Delivery was quick and the packaging was lovely. Will definitely be ordering again for the rest of the house.",
  },
  {
    name: "Bilal Farooq",
    text: "Was a little unsure about buying bedsheets online but SILORA changed my mind. The stitching and finish are honestly better than what I've seen in big stores. Highly recommend the comforter sets.",
  },
  {
    name: "Sana Malik",
    text: "The colours look exactly like the pictures, which is rare. Bought two duvet covers and both washed beautifully without fading. Customer service on WhatsApp was also very helpful and polite.",
  },
];

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
        <p className="tracking-nav text-center text-[12px] text-[var(--gold)]">
          KIND WORDS
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
          What our customers say
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <Reveal key={r.name} delay={i * 90}>
            <figure className="flex h-full flex-col border border-[var(--line)] bg-[var(--marble)]/50 p-7">
              <Stars />
              <blockquote className="mt-4 flex-1 font-[family-name:var(--font-cormorant)] text-lg italic leading-relaxed text-[var(--charcoal)]/85">
                “{r.text}”
              </blockquote>
              <figcaption className="tracking-nav mt-5 text-[12px] text-[var(--charcoal)]">
                {r.name.toUpperCase()}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
