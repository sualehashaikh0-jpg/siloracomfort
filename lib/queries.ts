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
