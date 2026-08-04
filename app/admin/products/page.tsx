import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { deleteProduct } from "../actions";

export const dynamic = "force-dynamic";

const pkr = (n: number | null) =>
  n == null ? "—" : `Rs. ${Number(n).toLocaleString("en-PK")}`;

export default async function AdminProducts() {
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("id, name, price, compare_at, is_active, is_featured")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)]">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="tracking-nav bg-[var(--charcoal)] px-5 py-2.5 text-[12px] text-[var(--ivory)] transition-opacity hover:opacity-90"
        >
          + ADD PRODUCT
        </Link>
      </div>

      <div className="overflow-hidden border border-[var(--line)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--marble)] text-left">
            <tr className="tracking-nav text-[11px] text-[var(--charcoal)]">
              <th className="px-4 py-3">NAME</th>
              <th className="px-4 py-3">PRICE</th>
              <th className="px-4 py-3">STATUS</th>
              <th className="px-4 py-3 text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => (
              <tr key={p.id} className="border-t border-[var(--line)]">
                <td className="px-4 py-3 text-[var(--charcoal)]">
                  {p.name}
                  {p.is_featured && (
                    <span className="ml-2 rounded bg-[var(--gold)]/20 px-1.5 py-0.5 text-[10px] text-[var(--gold)]">
                      FEATURED
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {pkr(p.price)}
                  {p.compare_at && (
                    <span className="ml-2 text-[var(--muted)] line-through">
                      {pkr(p.compare_at)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      p.is_active ? "text-green-700" : "text-[var(--muted)]"
                    }
                  >
                    {p.is_active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-[var(--charcoal)] underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button
                        type="submit"
                        className="text-red-700 underline"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(products ?? []).length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-[var(--muted)]">
                  No products yet. Click “Add product” to create your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
