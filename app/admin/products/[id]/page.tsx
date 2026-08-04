import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [{ data: product }, { data: categories }, { data: variants }] =
    await Promise.all([
      supabaseAdmin.from("products").select("*").eq("id", Number(id)).single(),
      supabaseAdmin.from("categories").select("id, name").order("sort_order"),
      supabaseAdmin
        .from("product_variants")
        .select("size, color, price, stock")
        .eq("product_id", Number(id)),
    ]);

  if (!product) notFound();

  const initialVariants = (variants ?? []).map((v) => ({
    size: v.size ?? "",
    color: v.color ?? "",
    price: v.price != null ? String(v.price) : "",
    stock: v.stock != null ? String(v.stock) : "",
  }));

  return (
    <div>
      <Link
        href="/admin/products"
        className="tracking-nav text-[12px] text-[var(--muted)] hover:text-[var(--charcoal)]"
      >
        ← BACK
      </Link>
      <h1 className="mb-8 mt-3 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)]">
        Edit product
      </h1>
      <ProductForm
        categories={categories ?? []}
        product={product}
        initialVariants={initialVariants}
      />
    </div>
  );
}
