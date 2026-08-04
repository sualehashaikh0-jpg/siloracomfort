import Link from "next/link";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/queries";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="bg-[var(--marble)]">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="tracking-nav text-center text-[12px] text-[var(--gold)]">
            MOST LOVED
          </p>
          <h2 className="mt-3 text-center font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
            Featured Sets
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="tracking-nav border border-[var(--charcoal)]/50 px-8 py-3 text-[13px] text-[var(--charcoal)] transition-colors hover:bg-[var(--charcoal)] hover:text-[var(--ivory)]"
          >
            VIEW ALL PRODUCTS
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
