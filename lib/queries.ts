import { supabase } from "./supabase";

/* ---------- Types (match the DB columns) ---------- */
export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at: number | null;
  images: string[];
  is_featured: boolean;
  category_id: number | null;
};

export type Variant = {
  id: number;
  product_id: number;
  size: string | null;
  color: string | null;
  price: number | null;
  stock: number;
};

/* ---------- Helpers ---------- */
export const pkr = (n: number) => `Rs. ${Number(n).toLocaleString("en-PK")}`;

/** First image, or null so the UI can fall back to a tone swatch. */
export const firstImage = (p: Product) =>
  p.images && p.images.length > 0 ? p.images[0] : null;

/* ---------- Queries ---------- */

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8);
  if (error) {
    console.error("getFeaturedProducts:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getAllProducts:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("getCategories:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const { data: cat } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .single();
  if (!cat) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("category_id", cat.id)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getProductsByCategory:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getProductBySlug(
  slug: string
): Promise<{ product: Product; variants: Variant[] } | null> {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error || !product) {
    if (error) console.error("getProductBySlug:", error.message);
    return null;
  }

  const { data: variants } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", product.id);

  return { product, variants: variants ?? [] };
}

/* ---------- Category tiles with a preview image ---------- */
export type CategoryTile = Category & { image: string | null };

/**
 * Categories, each with one product image pulled from a product in that
 * category (newest active product with at least one image). Powers the
 * homepage "THE RANGE" tiles so they're never blank once products exist.
 */
export async function getCategoryTiles(): Promise<CategoryTile[]> {
  const categories = await getCategories();
  if (categories.length === 0) return [];

  // Pull active products that have images, newest first, then map the first
  // image we find per category.
  const { data: products, error } = await supabase
    .from("products")
    .select("category_id, images, created_at")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getCategoryTiles:", error.message);
    return categories.map((c) => ({ ...c, image: null }));
  }

  const imageByCategory = new Map<number, string>();
  for (const p of products ?? []) {
    if (
      p.category_id != null &&
      Array.isArray(p.images) &&
      p.images.length > 0 &&
      !imageByCategory.has(p.category_id)
    ) {
      imageByCategory.set(p.category_id, p.images[0]);
    }
  }

  return categories.map((c) => ({
    ...c,
    image: imageByCategory.get(c.id) ?? null,
  }));
}
