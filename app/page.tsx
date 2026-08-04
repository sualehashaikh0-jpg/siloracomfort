import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import Story from "@/components/Story";
import Footer from "@/components/Footer";
import { getFeaturedProducts, getCategories } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collections categories={categories} />
        <FeaturedProducts products={featured} />
        <Story />
      </main>
      <Footer />
    </>
  );
}
