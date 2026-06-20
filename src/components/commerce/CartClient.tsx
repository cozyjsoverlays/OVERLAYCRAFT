"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart, cartSubtotalCents } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCents } from "@/lib/money";

export function CartClient() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const hydrated = useHydrated();

  if (!hydrated) return <div className="py-20" aria-hidden />;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 py-20 text-center">
        <span className="text-5xl" aria-hidden>
          🛒
        </span>
        <h1 className="text-2xl font-extrabold text-heading">
          Your cart is empty
        </h1>
        <p className="text-body">Find a cozy pack to get started.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
        >
          Browse the shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const subtotal = cartSubtotalCents(items);
  const currency = items[0]?.currency ?? "USD";

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(320px,380px)]">
      <section>
        <h1 className="text-3xl font-extrabold text-heading">Your Cart</h1>
        <ul className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.slug}
              className="glass flex items-center gap-4 rounded-2xl p-4"
            >
              <Link
                href={`/shop/${item.slug}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-black/40"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${item.slug}`}
                  className="block truncate text-base font-bold text-heading hover:text-lavender"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-muted">Digital download · qty 1</p>
              </div>
              <span className="text-base font-bold text-lavender">
                {formatCents(item.priceCents, item.currency)}
              </span>
              <button
                type="button"
                onClick={() => remove(item.slug)}
                aria-label={`Remove ${item.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted hover:bg-white/5 hover:text-pink"
              >
                <Trash2 size={17} />
              </button>
            </li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-body hover:text-heading"
        >
          <ArrowLeft size={15} /> Continue shopping
        </Link>
      </section>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-extrabold text-heading">Summary</h2>
          <div className="mt-4 flex items-center justify-between border-t border-subtle pt-4">
            <span className="text-sm text-body">Subtotal</span>
            <span className="text-xl font-extrabold text-heading">
              {formatCents(subtotal, currency)}
            </span>
          </div>
          <Link
            href="/checkout"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient bg-[length:200%_auto] px-6 py-3 text-sm font-bold text-base shadow-glow transition-all hover:bg-[position:100%_50%]"
          >
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          <p className="mt-3 text-center text-xs text-muted">
            Instant download · Pay securely with PayPal
          </p>
        </div>
      </aside>
    </div>
  );
}
