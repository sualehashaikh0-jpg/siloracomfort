"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { pkr } from "@/lib/queries";

const SHIPPING = 0; // free nationwide
const WHATSAPP = "https://wa.me/923450088846";

type Method = "cod" | "meezan" | "easypaisa" | "sadapay";

/** Account details shown to the customer after they pick a method. */
const accountDetails: Record<Exclude<Method, "cod">, { label: string; lines: string[] }> = {
  meezan: {
    label: "Meezan Bank",
    lines: [
      "Account Title: SILORA",
      "Account No: 126108983468",
      "IBAN: PK02MEZN0012610108983468",
    ],
  },
  easypaisa: {
    label: "Easypaisa",
    lines: ["Account Title: SILORA", "Number: 0345 0088846"],
  },
  sadapay: {
    label: "SadaPay",
    lines: ["Account Title: SILORA", "Number: 0325 7844153"],
  },
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [method, setMethod] = useState<Method>("cod");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = subtotal + SHIPPING;
  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function placeOrder() {
    setError(null);
    if (!form.customer_name || !form.phone || !form.address) {
      setError("Please fill in your name, phone, and address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items,
          subtotal,
          shipping: SHIPPING,
          total,
          payment_method: method,
        }),
      });
      if (!res.ok) throw new Error("Order failed. Please try again.");
      const { id } = await res.json();
      clear();
      router.push(`/order-confirmed?id=${id}&method=${method}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-[var(--muted)]">Your cart is empty.</p>
        </main>
        <Footer />
      </>
    );
  }

  const input =
    "w-full border border-[var(--line)] bg-transparent px-3 py-2.5 text-sm text-[var(--charcoal)] placeholder:text-[var(--muted)]/60 focus:border-[var(--charcoal)] focus:outline-none";

  const methods: [Method, string, string][] = [
    ["cod", "Cash on Delivery", "Pay when your order arrives"],
    ["meezan", "Meezan Bank Transfer", "Bank transfer to our account"],
    ["easypaisa", "Easypaisa", "Send to our Easypaisa account"],
    ["sadapay", "SadaPay", "Send to our SadaPay account"],
  ];

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-20">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--charcoal)]">
          Checkout
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4">
            <input className={input} placeholder="Full name" value={form.customer_name} onChange={set("customer_name")} />
            <input className={input} placeholder="Phone number" value={form.phone} onChange={set("phone")} />
            <input className={input} placeholder="Full delivery address" value={form.address} onChange={set("address")} />
            <input className={input} placeholder="City" value={form.city} onChange={set("city")} />
            <textarea className={input} rows={3} placeholder="Order notes (optional)" value={form.notes} onChange={set("notes")} />

            <div className="pt-2">
              <p className="tracking-nav mb-3 text-[12px] text-[var(--charcoal)]">PAYMENT METHOD</p>
              <div className="space-y-2">
                {methods.map(([val, title, sub]) => (
                  <label
                    key={val}
                    className={`flex cursor-pointer items-start gap-3 border p-3 ${
                      method === val ? "border-[var(--charcoal)]" : "border-[var(--line)]"
                    }`}
                  >
                    <input type="radio" name="method" className="mt-1" checked={method === val} onChange={() => setMethod(val)} />
                    <span>
                      <span className="block text-sm text-[var(--charcoal)]">{title}</span>
                      <span className="block text-xs text-[var(--muted)]">{sub}</span>
                    </span>
                  </label>
                ))}
              </div>

              {/* Account details for the selected online method */}
              {method !== "cod" && (
                <div className="mt-3 border border-[var(--line)] bg-[var(--marble)] p-4 text-sm text-[var(--charcoal)]">
                  <p className="mb-2">
                    Send <strong>{pkr(total)}</strong> to our{" "}
                    <strong>{accountDetails[method].label}</strong> account:
                  </p>
                  <ul className="space-y-0.5">
                    {accountDetails[method].lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                  <p className="mt-3 border-t border-[var(--line)] pt-3">
                    For a smooth process, please send a screenshot of your
                    payment to our WhatsApp{" "}
                    <a
                      href={WHATSAPP}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      0345 0088846
                    </a>
                    . We&apos;ll confirm and ship right away.
                  </p>
                </div>
              )}
            </div>

            {error && <p className="text-sm text-red-700">{error}</p>}

            <button
              onClick={placeOrder}
              disabled={submitting}
              className="tracking-nav w-full bg-[var(--charcoal)] py-4 text-[13px] text-[var(--ivory)] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "PLACING ORDER…" : "PLACE ORDER"}
            </button>
          </div>

          <aside className="h-fit border border-[var(--line)] bg-[var(--marble)] p-6">
            <h2 className="tracking-nav text-[12px] text-[var(--charcoal)]">ORDER SUMMARY</h2>
            <ul className="mt-4 space-y-3">
              {items.map((i, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">
                    {i.name} × {i.qty}
                  </span>
                  <span className="text-[var(--charcoal)]">{pkr(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-[var(--line)] pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Subtotal</span>
                <span className="text-[var(--charcoal)]">{pkr(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Shipping</span>
                <span className="text-[var(--charcoal)]">Free</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-2 text-base">
                <span className="text-[var(--charcoal)]">Total</span>
                <span className="text-[var(--charcoal)]">{pkr(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
