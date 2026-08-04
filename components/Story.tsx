import Link from "next/link";
import Reveal from "./Reveal";

const promises = [
  { title: "Free Delivery", body: "Nationwide, on every order" },
  { title: "Easy Exchange", body: "7-day hassle-free exchanges" },
  { title: "Cash on Delivery", body: "Pay when it arrives" },
  { title: "24/7 Support", body: "We answer on WhatsApp" },
];

export default function Story() {
  return (
    <>
      {/* Story band */}
      <section id="story" className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Reveal>
          <p className="tracking-nav text-[12px] text-[var(--gold)]">OUR STORY</p>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
            Sleep, taken seriously
          </h2>
          <p className="mt-6 font-[family-name:var(--font-cormorant)] text-lg italic leading-relaxed text-[var(--muted)]">
            Every SILORA set starts with soft-washed fabric and ends on the bed
            you look forward to all day. Woven carefully, priced honestly, and
            delivered to your door anywhere in Pakistan.
          </p>
          <Link
            href="/story"
            className="tracking-nav mt-8 inline-block border-b border-[var(--gold)] pb-1 text-[13px] text-[var(--charcoal)] transition-colors hover:text-[var(--gold)]"
          >
            READ MORE
          </Link>
        </Reveal>
      </section>

      {/* Trust strip */}
      <section className="border-y border-[var(--line)] bg-[var(--marble)]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:px-10">
          {promises.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="text-center">
              <h3 className="tracking-nav text-[13px] text-[var(--charcoal)]">
                {p.title.toUpperCase()}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-cormorant)] text-sm italic text-[var(--muted)]">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
