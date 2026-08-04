import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Minimal server-side validation — never trust the client.
    const required = ["customer_name", "phone", "address", "items", "total"];
    for (const f of required) {
      if (!body[f]) {
        return NextResponse.json({ error: `Missing ${f}` }, { status: 400 });
      }
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: body.customer_name,
        phone: body.phone,
        address: body.address,
        city: body.city ?? null,
        items: body.items,
        subtotal: body.subtotal ?? body.total,
        shipping: body.shipping ?? 0,
        total: body.total,
        payment_method: body.payment_method ?? "cod",
        notes: body.notes ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("order insert:", error.message);
      return NextResponse.json({ error: "Could not place order" }, { status: 500 });
    }

    return NextResponse.json({ id: data.id });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
