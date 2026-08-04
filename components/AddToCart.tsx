"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";
import type { Variant } from "@/lib/queries";

type Props = {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    image: string | null;
  };
  variants: Variant[];
};

export default function AddToCart({ product, variants }: Props) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState<number | null>(
    variants[0]?.id ?? null
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const selected = variants.find((v) => v.id === variantId) ?? null;
  const price = selected?.price ?? product.price;

  function handleAdd() {
    add({
      productId: product.id,
      variantId: selected?.id ?? null,
      name: product.name,
      slug: product.slug,
      price,
      image: product.image,
      size: selected?.size ?? null,
      color: selected?.color ?? null,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-5">
      {/* Variant picker — only if there's a real choice */}
      {variants.length > 1 && (
        <div>
          <label className="tracking-nav mb-2 block text-[12px] text-[var(--charcoal)]">
            OPTION
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const label = [v.size, v.color].filter(Boolean).join(" / ") || "Standard";
              const active = v.id === variantId;
              const out = v.stock <= 0;
              return (
                <button
                  key={v.id}
                  disabled={out}
                  onClick={() => setVariantId(v.id)}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--ivory)]"
                      : "border-[var(--line)] text-[var(--charcoal)] hover:border-[var(--charcoal)]"
                  } ${out ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {label}
                  {out && " (sold out)"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="tracking-nav text-[12px] text-[var(--charcoal)]">QTY</span>
        <div className="flex items-center border border-[var(--line)]">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 text-[var(--charcoal)]"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-2 text-[var(--charcoal)]"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="tracking-nav w-full bg-[var(--charcoal)] py-4 text-[13px] text-[var(--ivory)] transition-opacity hover:opacity-90"
      >
        {added ? "ADDED ✓" : "ADD TO CART"}
      </button>
    </div>
  );
}
