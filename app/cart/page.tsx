"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { pkr } from "@/lib/queries";

export default function CartPage() {
  const { items, remove, setQty, subtotal, keyOf } = useCart();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-20">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--charcoal)]">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-[var(--muted)]">Your cart is empty.</p>
            <Link
              href="/shop"
              className="tracking-nav mt-6 inline-block border border-[var(--charcoal)]/50 px-8 py-3 text-[13px] text-[var(--charcoal)] transition-colors hover:bg-[var(--charcoal)] hover:text-[var(--ivory)]"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-10 divide-y divide-[var(--line)]">
              {items.map((i) => {
                const k = keyOf(i);
                const label = [i.size, i.color].filter(Boolean).join(" / ");
                return (
                  <li key={k} className="flex gap-4 py-5">
                    <div
                      className="h-20 w-20 shrink-0 bg-cover bg-center"
                      style={{
                        backgroundColor: "#d3c6ad",
                        backgroundImage: i.image
                          ? `url('${i.image}')`
                          : "linear-gradient(150deg,#d3c6ad,#b8ab90)",
                      }}
                    />
                    <div className="flex flex-1 flex-col">
                      <Link
                        href={`/products/${i.slug}`}
                        className="text-sm text-[var(--charcoal)] hover:underline"
                      >
                        {i.name}
                      </Link>
                      {label && (
                        <span className="mt-0.5 text-xs text-[var(--muted)]">
                          {label}
                        </span>
                      )}
                      <div className="mt-auto flex items-center gap-3">
                        <div className="flex items-center border border-[var(--line)]">
                          <button
                            onClick={() => setQty(k, i.qty - 1)}
                            className="px-2.5 py-1 text-[var(--charcoal)]"
                            aria-label="Decrease"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">{i.qty}</span>
                          <button
                            onClick={() => setQty(k, i.qty + 1)}
                            className="px-2.5 py-1 text-[var(--charcoal)]"
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => remove(k)}
                          className="text-xs text-[var(--muted)] underline hover:text-[var(--charcoal)]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-[var(--charcoal)]">
                      {pkr(i.price * i.qty)}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-6">
              <span className="tracking-nav text-[13px] text-[var(--charcoal)]">
                SUBTOTAL
              </span>
              <span className="text-lg text-[var(--charcoal)]">{pkr(subtotal)}</span>
            </div>

            <Link
              href="/checkout"
              className="tracking-nav mt-6 block w-full bg-[var(--charcoal)] py-4 text-center text-[13px] text-[var(--ivory)] transition-opacity hover:opacity-90"
            >
              PROCEED TO CHECKOUT
            </Link>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
