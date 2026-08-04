import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/queries";

export const revalidate = 60;

const tones = ["#d9cdb8", "#cfc4ae", "#c5b79d", "#d3c6ad"];

export default async function CollectionsPage() {
  const categories = await getCategories();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <header className="text-center">
          <p className="tracking-nav text-[12px] text-[var(--gold)]">THE RANGE</p>
          <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--charcoal)]">
            Collections
          </h1>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/collections/${c.slug}`}
              className="group block overflow-hidden"
            >
              <div
                className="aspect-[3/4] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                style={{
                  background: `linear-gradient(160deg, ${tones[i % tones.length]}, #cbbfa8)`,
                }}
                role="img"
                aria-label={c.name}
              />
              <div className="border border-t-0 border-[var(--line)] px-4 py-4 text-center">
                <h3 className="tracking-nav text-[13px] text-[var(--charcoal)]">
                  {c.name.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
