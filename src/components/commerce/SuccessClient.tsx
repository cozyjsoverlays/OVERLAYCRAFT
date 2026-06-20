"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Mail, CheckCircle2, Clock, Home } from "lucide-react";

interface StoredOrder {
  email: string;
  downloads: { name: string; url: string }[];
}

export function SuccessClient({ orderId }: { orderId: string | null }) {
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setReady(true);
      return;
    }
    try {
      const raw = sessionStorage.getItem(`cozy-order-${orderId}`);
      if (raw) setOrder(JSON.parse(raw) as StoredOrder);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [orderId]);

  return (
    <div className="container-page max-w-2xl py-20 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan/15 text-cyan">
        <CheckCircle2 size={34} />
      </span>
      <h1 className="mt-6 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight text-heading">
        Thank you! <span className="gradient-text">Enjoy your packs</span>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-body">
        Your payment was successful. Your download links are below — and we&apos;ve
        emailed them to you too.
      </p>

      {ready && order && order.downloads.length > 0 ? (
        <div className="mt-10 text-left">
          <ul className="flex flex-col gap-3">
            {order.downloads.map((d) => (
              <li
                key={d.url}
                className="glass flex items-center justify-between gap-4 rounded-2xl p-4"
              >
                <span className="min-w-0 truncate font-bold text-heading">
                  {d.name}
                </span>
                <a
                  href={d.url}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  <Download size={15} /> Download
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-subtle bg-surface/50 p-4 text-sm text-body">
            <span className="flex items-center gap-2">
              <Mail size={15} className="text-lavender" /> Sent to{" "}
              <strong className="text-heading">{order.email}</strong>
            </span>
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-lavender" /> Links are valid for 72
              hours and a few downloads — save your files somewhere safe.
            </span>
          </div>
        </div>
      ) : ready ? (
        <div className="mt-10 rounded-2xl border border-subtle bg-surface/50 p-6 text-body">
          <p>
            Your order is confirmed{orderId ? ` (ref ${orderId})` : ""}. We&apos;ve
            emailed your download links — check your inbox (and spam folder).
          </p>
          <p className="mt-2 text-sm text-muted">
            Can&apos;t find them? Contact us with your order email and we&apos;ll
            re-send right away.
          </p>
        </div>
      ) : null}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-6 py-3 text-sm font-bold text-heading hover:border-lavender/40"
        >
          Browse more packs
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-heading"
        >
          <Home size={15} /> Back home
        </Link>
      </div>
    </div>
  );
}
