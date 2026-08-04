import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProduct() {
  const { data: categories } = await supabaseAdmin
    .from("categories")
    .select("id, name")
    .order("sort_order");

  return (
    <div>
      <Link
        href="/admin/products"
        className="tracking-nav text-[12px] text-[var(--muted)] hover:text-[var(--charcoal)]"
      >
        ← BACK
      </Link>
      <h1 className="mb-8 mt-3 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)]">
        Add product
      </h1>
      <ProductForm categories={categories ?? []} />
    </div>
  );
}
