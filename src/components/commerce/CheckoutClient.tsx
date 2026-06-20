"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShoppingBag, AlertCircle, ArrowRight } from "lucide-react";
import { useCart, cartSubtotalCents } from "@/store/cart";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCents } from "@/lib/money";
import { PayPalCheckout } from "@/components/commerce/PayPalCheckout";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CheckoutClient() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const hydrated = useHydrated();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const emailValid = EMAIL_RE.test(email);
  const subtotal = cartSubtotalCents(items);
  const currency = items[0]?.currency ?? "USD";

  if (!hydrated) {
    return <div className="container-page py-20" aria-hidden />;
  }

  if (items.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-5 py-24 text-center">
        <span className="text-5xl" aria-hidden>
          🛒
        </span>
        <h1 className="text-2xl font-extrabold text-heading">
          Your cart is empty
        </h1>
        <p className="text-body">Add a cozy pack and come back to check out.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
        >
          Browse the shop <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_minmax(360px,420px)]">
      {/* Summary */}
      <section>
        <h1 className="text-2xl font-extrabold text-heading">Checkout</h1>
        <p className="mt-2 text-sm text-body">
          Digital download · delivered instantly after payment.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.slug}
              className="glass flex items-center gap-3 rounded-xl p-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/40">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-heading">
                  {item.name}
                </p>
                <p className="text-xs text-muted">Digital pack · qty 1</p>
              </div>
              <span className="text-sm font-bold text-lavender">
                {formatCents(item.priceCents, item.currency)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Payment panel */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between border-b border-subtle pb-4">
            <span className="text-sm text-body">Total</span>
            <span className="text-2xl font-extrabold text-heading">
              {formatCents(subtotal, currency)}
            </span>
          </div>

          <div className="mt-5">
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-body"
            >
              Email for your download links
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-subtle bg-base/60 px-4 py-3 text-sm text-heading placeholder:text-muted focus:border-lavender/50 focus:outline-none"
            />
            {email.length > 0 && !emailValid && (
              <p className="mt-1.5 text-xs text-pink">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-pink/30 bg-pink/10 p-3 text-sm text-body">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-pink" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-5">
            <PayPalCheckout
              items={items}
              email={email}
              emailValid={emailValid}
              onError={setError}
              onSuccess={() => clear()}
            />
          </div>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Lock size={12} /> Secure checkout · powered by PayPal
          </p>
        </div>

        <Link
          href="/cart"
          className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-body hover:text-heading"
        >
          <ShoppingBag size={14} /> Edit cart
        </Link>
      </aside>
    </div>
  );
}
