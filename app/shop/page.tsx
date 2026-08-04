import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 60; // refresh product list at most once a minute

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <header className="text-center">
          <p className="tracking-nav text-[12px] text-[var(--gold)]">EVERYTHING</p>
          <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--charcoal)]">
            Shop All
          </h1>
        </header>

        {products.length === 0 ? (
          <p className="mt-16 text-center text-[var(--muted)]">
            No products yet. Add some from the admin panel.
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
