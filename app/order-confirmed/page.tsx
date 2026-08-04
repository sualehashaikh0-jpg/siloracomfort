import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function OrderConfirmed({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; method?: string }>;
}) {
  const { id, method } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="tracking-nav text-[12px] text-[var(--gold)]">THANK YOU</p>
        <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--charcoal)]">
          Order placed
        </h1>
        {id && (
          <p className="mt-4 text-[var(--muted)]">
            Your order number is <strong className="text-[var(--charcoal)]">#{id}</strong>.
          </p>
        )}

        {method === "sadapay" && (
          <p className="mt-4 text-[var(--muted)]">
            Please send your SadaPay payment screenshot to our WhatsApp so we can
            confirm and ship your order.
          </p>
        )}
        {method === "cod" && (
          <p className="mt-4 text-[var(--muted)]">
            Pay in cash when your order arrives. We&apos;ll call to confirm.
          </p>
        )}

        <Link
          href="/shop"
          className="tracking-nav mt-10 inline-block border border-[var(--charcoal)]/50 px-8 py-3 text-[13px] text-[var(--charcoal)] transition-colors hover:bg-[var(--charcoal)] hover:text-[var(--ivory)]"
        >
          CONTINUE SHOPPING
        </Link>
      </main>
      <Footer />
    </>
  );
}
