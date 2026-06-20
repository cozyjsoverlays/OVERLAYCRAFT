"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle2, Loader2, X } from "lucide-react";
import type { Product } from "@prisma/client";

const CATEGORIES = ["cat", "dragon", "fox", "bear", "japanese", "frog", "other"] as const;
const FEATURES = [
  "Animated Screens",
  "Alerts",
  "Panels",
  "Emotes",
  "Sub Badges",
  "Overlays",
  "Transitions",
] as const;

interface FormValues {
  name: string;
  slug: string;
  category: string;
  priceStr: string;
  description: string;
  features: string[];
  image: string;
  video: string;
  fileKey: string;
  active: boolean;
  featured: boolean;
  bestseller: boolean;
  sortOrder: string;
}

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;

  const [values, setValues] = useState<FormValues>({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category: product?.category ?? "cat",
    priceStr: product ? String(product.priceCents / 100) : "",
    description: product?.description ?? "",
    features: product
      ? (JSON.parse(product.features) as string[])
      : [],
    image: product?.image ?? "",
    video: product?.video ?? "",
    fileKey: product?.fileKey ?? "",
    active: product?.active ?? true,
    featured: product?.featured ?? false,
    bestseller: product?.bestseller ?? false,
    sortOrder: String(product?.sortOrder ?? 0),
  });

  const [slugManual, setSlugManual] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormValues>(key: K, val: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function handleNameChange(name: string) {
    set("name", name);
    if (!slugManual) set("slug", nameToSlug(name));
  }

  function toggleFeature(f: string) {
    set(
      "features",
      values.features.includes(f)
        ? values.features.filter((x) => x !== f)
        : [...values.features, f],
    );
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".zip")) {
      setUploadError("Only .zip files are accepted.");
      return;
    }

    setUploadError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      const key = `packs/${values.slug || nameToSlug(values.name) || "pack"}-${Date.now()}.zip`;
      const urlRes = await fetch(
        `/api/admin/upload?key=${encodeURIComponent(key)}&contentType=application/zip`,
      );
      if (!urlRes.ok) throw new Error("Could not get upload URL");
      const { uploadUrl, key: finalKey } = (await urlRes.json()) as {
        uploadUrl: string;
        key: string;
      };

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) setUploadProgress(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onload = () => (xhr.status < 300 ? resolve() : reject(new Error(`Upload failed: ${xhr.status}`)));
        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", "application/zip");
        xhr.send(file);
      });

      set("fileKey", finalKey);
      setUploadProgress(100);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const priceCents = Math.round(parseFloat(values.priceStr) * 100);
    if (!priceCents || priceCents <= 0) {
      setError("Enter a valid price.");
      setSaving(false);
      return;
    }

    const payload = {
      name: values.name.trim(),
      slug: values.slug.trim(),
      category: values.category,
      description: values.description.trim(),
      priceCents,
      image: values.image.trim(),
      video: values.video.trim() || null,
      features: values.features,
      fileKey: values.fileKey.trim(),
      active: values.active,
      featured: values.featured,
      bestseller: values.bestseller,
      sortOrder: parseInt(values.sortOrder, 10) || 0,
      needsFile: !values.fileKey.trim(),
    };

    const url = isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error: unknown };
        setError(
          typeof data.error === "string"
            ? data.error
            : "Validation error — check all fields.",
        );
        return;
      }
      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-subtle bg-surface/50 px-3 py-2.5 text-sm text-heading placeholder:text-muted focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20";
  const labelCls = "block text-xs font-semibold text-muted uppercase tracking-wide mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Name + Slug */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Name *</label>
          <input
            className={inputCls}
            value={values.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            placeholder="Cozy Cat Forest Pack"
          />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input
            className={inputCls}
            value={values.slug}
            onChange={(e) => {
              setSlugManual(true);
              set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
            }}
            required
            placeholder="cozy-cat-forest-pack"
            pattern="[a-z0-9-]+"
            title="Lowercase letters, numbers, hyphens only"
          />
        </div>
      </div>

      {/* Category + Price */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Category *</label>
          <select
            className={inputCls}
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
            required
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-surface capitalize">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Price (USD) *</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              $
            </span>
            <input
              className={`${inputCls} pl-7`}
              type="number"
              min="0.01"
              step="0.01"
              value={values.priceStr}
              onChange={(e) => set("priceStr", e.target.value)}
              required
              placeholder="24.99"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelCls}>Description *</label>
        <textarea
          className={`${inputCls} resize-y min-h-[100px]`}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
          required
          placeholder="A cozy animated pack featuring…"
        />
      </div>

      {/* Features */}
      <div>
        <label className={labelCls}>Feature tags</label>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => toggleFeature(f)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                values.features.includes(f)
                  ? "border-lavender bg-lavender/15 text-lavender"
                  : "border-subtle text-muted hover:border-lavender/40 hover:text-heading"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Image + Video */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Preview image URL *</label>
          <input
            className={inputCls}
            type="url"
            value={values.image}
            onChange={(e) => set("image", e.target.value)}
            required
            placeholder="https://i.etsystatic.com/…"
          />
        </div>
        <div>
          <label className={labelCls}>Preview video URL (optional)</label>
          <input
            className={inputCls}
            type="url"
            value={values.video}
            onChange={(e) => set("video", e.target.value)}
            placeholder="https://v.etsystatic.com/…"
          />
        </div>
      </div>

      {/* File upload */}
      <div>
        <label className={labelCls}>Downloadable .zip file</label>
        <div className="rounded-xl border border-subtle bg-surface/30 p-4">
          {values.fileKey ? (
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="shrink-0 text-cyan" />
              <span className="flex-1 truncate font-mono text-xs text-body">
                {values.fileKey}
              </span>
              <button
                type="button"
                onClick={() => {
                  set("fileKey", "");
                  setUploadProgress(0);
                  if (fileRef.current) fileRef.current.value = "";
                }}
                className="text-muted hover:text-pink"
                title="Remove"
              >
                <X size={15} />
              </button>
            </div>
          ) : (
            <label className="flex cursor-pointer flex-col items-center gap-2 text-center">
              <Upload size={20} className="text-muted" />
              <span className="text-sm text-muted">
                {uploading ? `Uploading… ${uploadProgress}%` : "Click to upload .zip"}
              </span>
              <input
                ref={fileRef}
                type="file"
                accept=".zip,application/zip"
                className="sr-only"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          )}
          {uploading && (
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-lavender transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
          {uploadError && (
            <p className="mt-2 text-xs text-pink">{uploadError}</p>
          )}
          {!values.fileKey && !uploading && (
            <p className="mt-2 text-xs text-muted">
              Pack will be hidden from the shop until a file is attached.
            </p>
          )}
        </div>
      </div>

      {/* Flags + Sort */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Flags</label>
          <div className="flex flex-col gap-2">
            {(
              [
                ["active", "Live on shop"],
                ["featured", "Featured"],
                ["bestseller", "Bestseller badge"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={values[key]}
                  onChange={(e) => set(key, e.target.checked)}
                  className="h-4 w-4 accent-[#B088FF] rounded"
                />
                <span className="text-sm text-body">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelCls}>Sort order</label>
          <input
            className={inputCls}
            type="number"
            value={values.sortOrder}
            onChange={(e) => set("sortOrder", e.target.value)}
            placeholder="0"
          />
          <p className="mt-1 text-xs text-muted">Lower = appears first on the shop.</p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink">{error}</div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow disabled:opacity-50"
        >
          {saving && <Loader2 size={15} className="animate-spin" />}
          {isEdit ? "Save changes" : "Create pack"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-subtle px-6 py-3 text-sm font-medium text-muted hover:border-lavender/40 hover:text-heading"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
