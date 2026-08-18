import Reveal from "./Reveal";

const stats = [
  { value: "1,000+", label: "Happy Customers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "Free", label: "Nationwide Delivery" },
  { value: "7-Day", label: "Easy Exchange" },
];

export default function TrustBadges() {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--marble)]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:px-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
              {s.value}
            </p>
            <p className="tracking-nav mt-2 text-[11px] text-[var(--muted)]">
              {s.label.toUpperCase()}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
