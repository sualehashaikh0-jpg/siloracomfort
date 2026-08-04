import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, getCategories } from "@/lib/queries";

export const revalidate = 60;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <header className="text-center">
          <p className="tracking-nav text-[12px] text-[var(--gold)]">COLLECTION</p>
          <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--charcoal)]">
            {category.name}
          </h1>
        </header>

        {products.length === 0 ? (
          <p className="mt-16 text-center text-[var(--muted)]">
            Nothing here yet — check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
