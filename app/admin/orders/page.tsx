import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { updateOrderStatus } from "../actions";

export const dynamic = "force-dynamic";

const pkr = (n: number) => `Rs. ${Number(n).toLocaleString("en-PK")}`;

type OrderItem = { name: string; qty: number; price: number };

export default async function AdminOrders() {
  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-8 font-[family-name:var(--font-cormorant)] text-3xl text-[var(--charcoal)]">
        Orders
      </h1>

      {(orders ?? []).length === 0 ? (
        <p className="text-[var(--muted)]">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {(orders ?? []).map((o) => {
            const items = (o.items as OrderItem[]) ?? [];
            return (
              <div
                key={o.id}
                className="border border-[var(--line)] bg-white/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[var(--charcoal)]">
                      <strong>#{o.id}</strong> · {o.customer_name} · {o.phone}
                    </p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      {o.address}
                      {o.city ? `, ${o.city}` : ""}
                    </p>
                    {o.notes && (
                      <p className="mt-1 text-sm italic text-[var(--muted)]">
                        “{o.notes}”
                      </p>
                    )}
                    <ul className="mt-3 text-sm text-[var(--charcoal)]">
                      {items.map((it, i) => (
                        <li key={i}>
                          {it.name} × {it.qty} — {pkr(it.price * it.qty)}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm">
                      <strong>{pkr(o.total)}</strong> · {o.payment_method}
                    </p>
                  </div>

                  <form
                    action={updateOrderStatus}
                    className="flex flex-col items-end gap-2"
                  >
                    <input type="hidden" name="id" value={o.id} />
                    <label className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      Payment
                      <select
                        name="payment_status"
                        defaultValue={o.payment_status}
                        className="border border-[var(--line)] bg-transparent px-2 py-1 text-sm text-[var(--charcoal)]"
                      >
                        <option value="pending">pending</option>
                        <option value="paid">paid</option>
                        <option value="failed">failed</option>
                      </select>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      Order
                      <select
                        name="order_status"
                        defaultValue={o.order_status}
                        className="border border-[var(--line)] bg-transparent px-2 py-1 text-sm text-[var(--charcoal)]"
                      >
                        <option value="new">new</option>
                        <option value="confirmed">confirmed</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </label>
                    <button
                      type="submit"
                      className="tracking-nav bg-[var(--charcoal)] px-4 py-2 text-[11px] text-[var(--ivory)]"
                    >
                      UPDATE
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
