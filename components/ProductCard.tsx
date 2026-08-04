import Link from "next/link";
import { pkr, firstImage, type Product } from "@/lib/queries";

const swatch = "#d3c6ad";

export default function ProductCard({ product }: { product: Product }) {
  const img = firstImage(product);
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden">
        <div
          className="aspect-square w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
          style={{
            backgroundColor: swatch,
            backgroundImage: img
              ? `url('${img}')`
              : `linear-gradient(150deg, ${swatch}, #b8ab90)`,
          }}
          role="img"
          aria-label={product.name}
        />
        {product.compare_at && (
          <span className="tracking-nav absolute left-3 top-3 bg-[var(--charcoal)] px-2.5 py-1 text-[10px] text-[var(--ivory)]">
            SALE
          </span>
        )}
      </div>
      <div className="px-1 py-4 text-center">
        <h3 className="text-sm text-[var(--charcoal)]">{product.name}</h3>
        <p className="mt-1.5 text-sm">
          <span className="text-[var(--charcoal)]">{pkr(product.price)}</span>
          {product.compare_at && (
            <span className="ml-2 text-[var(--muted)] line-through">
              {pkr(product.compare_at)}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
}
