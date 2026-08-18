import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import PromoPopup from "@/components/PromoPopup";
import { getFeaturedProducts, getCategoryTiles } from "@/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategoryTiles(),
  ]);

  return (
    <>
      <PromoPopup />
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Collections categories={categories} />
        <FeaturedProducts products={featured} />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
