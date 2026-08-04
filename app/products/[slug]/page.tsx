import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCart from "@/components/AddToCart";
import { getProductBySlug, pkr, firstImage } from "@/lib/queries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProductBySlug(slug);
  if (!result) return { title: "Product — SILORA" };
  return {
    title: `${result.product.name} — SILORA`,
    description: result.product.description ?? undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getProductBySlug(slug);
  if (!result) notFound();

  const { product, variants } = result;
  const img = firstImage(product);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Image */}
          <div
            className="aspect-square w-full bg-cover bg-center"
            style={{
              backgroundColor: "#d3c6ad",
              backgroundImage: img
                ? `url('${img}')`
                : "linear-gradient(150deg, #d3c6ad, #b8ab90)",
            }}
            role="img"
            aria-label={product.name}
          />

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)] md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 text-lg">
              <span className="text-[var(--charcoal)]">{pkr(product.price)}</span>
              {product.compare_at && (
                <span className="ml-3 text-[var(--muted)] line-through">
                  {pkr(product.compare_at)}
                </span>
              )}
            </p>

            {product.description && (
              <p className="mt-6 leading-relaxed text-[var(--muted)]">
                {product.description}
              </p>
            )}

            <div className="mt-8">
              <AddToCart
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  image: img,
                }}
                variants={variants}
              />
            </div>

            <ul className="mt-10 space-y-2 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)]">
              <li>Free delivery nationwide</li>
              <li>Cash on delivery available</li>
              <li>7-day easy exchange</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
