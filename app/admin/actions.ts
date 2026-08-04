"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createSupabaseServer } from "@/lib/supabaseServer";

/** Guard: every admin action confirms there's a logged-in user first. */
async function requireAdmin() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

type VariantInput = {
  size: string;
  color: string;
  price: string;
  stock: string;
};

function parseVariants(raw: string): VariantInput[] {
  try {
    const arr = JSON.parse(raw) as VariantInput[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export async function saveProduct(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string | null;
  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const category_id = formData.get("category_id")
    ? Number(formData.get("category_id"))
    : null;
  const price = Number(formData.get("price"));
  const compareRaw = formData.get("compare_at") as string;
  const compare_at = compareRaw ? Number(compareRaw) : null;
  const is_featured = formData.get("is_featured") === "on";
  const is_active = formData.get("is_active") === "on";
  const images = ((formData.get("images") as string) || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const variants = parseVariants((formData.get("variants") as string) || "[]");

  if (!name || !price) {
    throw new Error("Name and price are required.");
  }

  const slug = slugify(name);

  let productId: number;

  if (id) {
    const { error } = await supabaseAdmin
      .from("products")
      .update({
        name,
        slug,
        description,
        category_id,
        price,
        compare_at,
        images,
        is_featured,
        is_active,
      })
      .eq("id", Number(id));
    if (error) throw new Error(error.message);
    productId = Number(id);

    // replace variants wholesale for simplicity
    await supabaseAdmin.from("product_variants").delete().eq("product_id", productId);
  } else {
    const { data, error } = await supabaseAdmin
      .from("products")
      .insert({
        name,
        slug,
        description,
        category_id,
        price,
        compare_at,
        images,
        is_featured,
        is_active,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    productId = data.id;
  }

  if (variants.length > 0) {
    const rows = variants
      .filter((v) => v.size || v.color)
      .map((v) => ({
        product_id: productId,
        size: v.size || null,
        color: v.color || null,
        price: v.price ? Number(v.price) : null,
        stock: v.stock ? Number(v.stock) : 0,
      }));
    if (rows.length > 0) {
      const { error } = await supabaseAdmin.from("product_variants").insert(rows);
      if (error) throw new Error(error.message);
    }
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/shop");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const order_status = formData.get("order_status") as string;
  const payment_status = formData.get("payment_status") as string;
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ order_status, payment_status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}
