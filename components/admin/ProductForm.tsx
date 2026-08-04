"use client";

import { useState } from "react";
import { createSupabaseBrowser } from "@/lib/supabaseBrowser";
import { saveProduct } from "@/app/admin/actions";

type Category = { id: number; name: string };
type Variant = { size: string; color: string; price: string; stock: string };

type Props = {
  categories: Category[];
  product?: {
    id: number;
    name: string;
    description: string | null;
    category_id: number | null;
    price: number;
    compare_at: number | null;
    images: string[];
    is_active: boolean;
    is_featured: boolean;
  };
  initialVariants?: Variant[];
};

const input =
  "w-full border border-[var(--line)] bg-transparent px-3 py-2.5 text-sm text-[var(--charcoal)] placeholder:text-[var(--muted)]/60 focus:border-[var(--charcoal)] focus:outline-none";
const label = "tracking-nav mb-1.5 block text-[11px] text-[var(--charcoal)]";

export default function ProductForm({
  categories,
  product,
  initialVariants,
}: Props) {
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(false);
  const [variants, setVariants] = useState<Variant[]>(
    initialVariants && initialVariants.length > 0
      ? initialVariants
      : [{ size: "", color: "", price: "", stock: "" }]
  );
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    const supabase = createSupabaseBrowser();
    const uploaded: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop();
        const path = `products/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${ext}`;
        const { error } = await supabase.storage
          .from("product-images")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (error) throw error;
        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Image upload failed: ${err.message}`
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  function updateVariant(i: number, key: keyof Variant, value: string) {
    setVariants((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, [key]: value } : v))
    );
  }

  return (
    <form action={saveProduct} className="max-w-2xl space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="images" value={images.join(",")} />
      <input type="hidden" name="variants" value={JSON.stringify(variants)} />

      <div>
        <label className={label}>PRODUCT NAME</label>
        <input
          name="name"
          className={input}
          defaultValue={product?.name}
          placeholder="e.g. Fern Beige — Bed Sheet Set"
          required
        />
      </div>

      <div>
        <label className={label}>DESCRIPTION</label>
        <textarea
          name="description"
          rows={4}
          className={input}
          defaultValue={product?.description ?? ""}
          placeholder="Fabric, size, what's included…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>CATEGORY</label>
          <select
            name="category_id"
            className={input}
            defaultValue={product?.category_id ?? ""}
          >
            <option value="">— none —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>PRICE (PKR)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              className={input}
              defaultValue={product?.price}
              required
            />
          </div>
          <div>
            <label className={label}>WAS (optional)</label>
            <input
              name="compare_at"
              type="number"
              step="0.01"
              className={input}
              defaultValue={product?.compare_at ?? ""}
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div>
        <label className={label}>IMAGES</label>
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt=""
                className="h-20 w-20 border border-[var(--line)] object-cover"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--charcoal)] text-xs text-[var(--ivory)]"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          <label className="flex h-20 w-20 cursor-pointer items-center justify-center border border-dashed border-[var(--line)] text-2xl text-[var(--muted)]">
            +
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
        {uploading && (
          <p className="mt-2 text-xs text-[var(--muted)]">Uploading…</p>
        )}
      </div>

      {/* Variants */}
      <div>
        <label className={label}>VARIANTS (size / colour / stock)</label>
        <div className="space-y-2">
          {variants.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input
                className={input}
                placeholder="Size (e.g. King)"
                value={v.size}
                onChange={(e) => updateVariant(i, "size", e.target.value)}
              />
              <input
                className={input}
                placeholder="Colour"
                value={v.color}
                onChange={(e) => updateVariant(i, "color", e.target.value)}
              />
              <input
                className={input}
                placeholder="Stock"
                type="number"
                value={v.stock}
                onChange={(e) => updateVariant(i, "stock", e.target.value)}
              />
              <button
                type="button"
                onClick={() =>
                  setVariants(variants.filter((_, idx) => idx !== i))
                }
                className="shrink-0 px-2 text-[var(--muted)]"
                aria-label="Remove variant"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setVariants([...variants, { size: "", color: "", price: "", stock: "" }])
          }
          className="tracking-nav mt-2 text-[12px] text-[var(--charcoal)] underline"
        >
          + ADD VARIANT
        </button>
      </div>

      {/* Toggles */}
      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm text-[var(--charcoal)]">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={product ? product.is_active : true}
          />
          Active (visible in store)
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--charcoal)]">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={product?.is_featured ?? false}
          />
          Featured on homepage
        </label>
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        className="tracking-nav bg-[var(--charcoal)] px-8 py-3 text-[13px] text-[var(--ivory)] transition-opacity hover:opacity-90"
      >
        SAVE PRODUCT
      </button>
    </form>
  );
}
