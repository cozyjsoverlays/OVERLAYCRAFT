"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, ToggleLeft, ToggleRight, AlertTriangle } from "lucide-react";
import { formatCents } from "@/lib/money";
import type { Product } from "@prisma/client";

export function ProductTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function toggleActive(p: Product) {
    setBusy(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !p.active }),
      });
      if (!res.ok) throw new Error();
      showToast(`"${p.name}" ${p.active ? "hidden" : "published"}`, true);
      router.refresh();
    } catch {
      showToast("Failed to update", false);
    } finally {
      setBusy(null);
    }
  }

  async function deleteProduct(p: Product) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    setBusy(p.id);
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast(`"${p.name}" deleted`, true);
      router.refresh();
    } catch {
      showToast("Delete failed", false);
    } finally {
      setBusy(null);
    }
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-subtle bg-surface p-12 text-center">
        <p className="text-muted">No products yet.</p>
        <Link
          href="/admin/products/new"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-bold text-base shadow-glow"
        >
          Add your first pack
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm font-bold shadow-card ${
            toast.ok ? "bg-cyan/15 text-cyan" : "bg-pink/15 text-pink"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-subtle">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-subtle bg-surface/60">
              <th className="px-4 py-3 text-left font-semibold text-muted">Pack</th>
              <th className="px-4 py-3 text-left font-semibold text-muted">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-muted">Price</th>
              <th className="px-4 py-3 text-left font-semibold text-muted">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-muted">Source</th>
              <th className="px-4 py-3 text-right font-semibold text-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {products.map((p) => (
              <tr key={p.id} className="bg-surface/30 hover:bg-surface/60 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-black/40">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-heading">{p.name}</p>
                      <p className="truncate text-xs text-muted">/{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize text-body">{p.category}</td>
                <td className="px-4 py-3 font-mono text-lavender">
                  {formatCents(p.priceCents, p.currency)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-bold ${
                        p.active
                          ? "bg-cyan/15 text-cyan"
                          : "bg-white/5 text-muted"
                      }`}
                    >
                      {p.active ? "Live" : "Hidden"}
                    </span>
                    {p.needsFile && (
                      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-pink/15 px-2 py-0.5 text-xs font-bold text-pink">
                        <AlertTriangle size={10} /> Needs file
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted capitalize">
                    {p.source}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => toggleActive(p)}
                      disabled={busy === p.id}
                      title={p.active ? "Hide" : "Publish"}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-heading disabled:opacity-40"
                    >
                      {p.active ? <ToggleRight size={16} className="text-cyan" /> : <ToggleLeft size={16} />}
                    </button>
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-heading"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => deleteProduct(p)}
                      disabled={busy === p.id}
                      title="Delete"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-pink disabled:opacity-40"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
