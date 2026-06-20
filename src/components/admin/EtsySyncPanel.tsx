"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RefreshCcw,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Info,
} from "lucide-react";

interface LastSync {
  status: string;
  startedAt: string;
  upserted: number;
  errors: number;
  message: string | null;
}

interface EtsyProduct {
  id: string;
  name: string;
  needsFile: boolean;
  active: boolean;
  etsyUrl: string | null;
}

export function EtsySyncPanel({
  configured,
  connected,
  shopId,
  lastSync,
  etsyProducts,
}: {
  configured: boolean;
  connected: boolean;
  shopId: string | null;
  lastSync: LastSync | null;
  etsyProducts: EtsyProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<{ msg: string; ok: boolean } | null>(null);

  const justConnected = searchParams.get("connected") === "1";
  const oauthError = searchParams.get("error");

  // ── Not configured: graceful, clear message ────────────────────────────────
  if (!configured) {
    return (
      <div className="rounded-2xl border border-subtle bg-surface p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lavender/15 text-lavender">
            <Info size={20} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-heading">
              Etsy sync not configured
            </h2>
            <p className="mt-2 max-w-xl text-sm text-body">
              Your shop runs 100% on the admin panel — no Etsy needed. To enable
              optional import of your Etsy listings, you&apos;ll need an approved
              Etsy app. Add these env vars and redeploy:
            </p>
            <ul className="mt-3 space-y-1 font-mono text-xs text-muted">
              <li>ETSY_CLIENT_ID</li>
              <li>ETSY_CLIENT_SECRET</li>
              <li>ETSY_SHOP_ID</li>
              <li>ETSY_REDIRECT_URI</li>
              <li>TOKEN_ENCRYPTION_KEY</li>
            </ul>
            <p className="mt-4 text-sm text-muted">
              Apply for API access at{" "}
              <a
                href="https://www.etsy.com/developers/register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-lavender hover:underline"
              >
                etsy.com/developers <ExternalLink size={12} />
              </a>
              . New-app approval is selective and can take time. See the README
              for the full walkthrough.
            </p>
          </div>
        </div>
      </div>
    );
  }

  async function handleSync() {
    setSyncing(true);
    setResult(null);
    try {
      const res = await fetch("/api/etsy/sync", { method: "POST" });
      const data = (await res.json()) as {
        ok?: boolean;
        upserted?: number;
        errors?: number;
        error?: string;
      };
      if (res.ok && data.ok) {
        setResult({
          msg: `Synced ${data.upserted} listings (${data.errors} errors).`,
          ok: true,
        });
        router.refresh();
      } else {
        setResult({ msg: data.error ?? "Sync failed", ok: false });
      }
    } catch {
      setResult({ msg: "Network error during sync", ok: false });
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="space-y-6">
      {justConnected && (
        <div className="flex items-center gap-2 rounded-xl bg-cyan/10 px-4 py-3 text-sm text-cyan">
          <CheckCircle2 size={16} /> Etsy connected successfully.
        </div>
      )}
      {oauthError && (
        <div className="flex items-center gap-2 rounded-xl bg-pink/10 px-4 py-3 text-sm text-pink">
          <AlertTriangle size={16} /> Connection error: {oauthError}
        </div>
      )}

      {/* Connection card */}
      <div className="rounded-2xl border border-subtle bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                connected ? "bg-cyan/15 text-cyan" : "bg-white/5 text-muted"
              }`}
            >
              {connected ? <CheckCircle2 size={18} /> : <Link2 size={18} />}
            </span>
            <div>
              <p className="font-bold text-heading">
                {connected ? "Connected to Etsy" : "Not connected"}
              </p>
              <p className="text-xs text-muted">
                {connected ? `Shop ID ${shopId}` : "Authorize to start syncing"}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href="/api/etsy/oauth/start"
              className="inline-flex items-center gap-2 rounded-full border border-subtle px-4 py-2 text-sm font-medium text-body hover:border-lavender/40 hover:text-heading"
            >
              <Link2 size={14} /> {connected ? "Reconnect" : "Connect Etsy"}
            </a>
            {connected && (
              <button
                onClick={handleSync}
                disabled={syncing}
                className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2 text-sm font-bold text-base shadow-glow disabled:opacity-50"
              >
                {syncing ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <RefreshCcw size={14} />
                )}
                {syncing ? "Syncing…" : "Sync now"}
              </button>
            )}
          </div>
        </div>

        {result && (
          <p
            className={`mt-4 rounded-xl px-4 py-2.5 text-sm ${
              result.ok ? "bg-cyan/10 text-cyan" : "bg-pink/10 text-pink"
            }`}
          >
            {result.msg}
          </p>
        )}

        {lastSync && (
          <p className="mt-4 text-xs text-muted">
            Last sync: {new Date(lastSync.startedAt).toLocaleString()} ·{" "}
            <span
              className={
                lastSync.status === "success"
                  ? "text-cyan"
                  : lastSync.status === "error"
                    ? "text-pink"
                    : "text-muted"
              }
            >
              {lastSync.status}
            </span>{" "}
            · {lastSync.upserted} upserted
            {lastSync.message ? ` · ${lastSync.message}` : ""}
          </p>
        )}
      </div>

      {/* Imported products needing files */}
      {etsyProducts.length > 0 && (
        <div className="rounded-2xl border border-subtle bg-surface p-6">
          <h2 className="mb-1 font-bold text-heading">Imported listings</h2>
          <p className="mb-4 text-sm text-muted">
            Etsy doesn&apos;t expose your digital files — attach each pack&apos;s
            .zip to publish it.
          </p>
          <ul className="divide-y divide-subtle">
            {etsyProducts.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-heading">{p.name}</p>
                  {p.etsyUrl && (
                    <a
                      href={p.etsyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted hover:text-lavender"
                    >
                      View on Etsy <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                {p.needsFile ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-pink/15 px-2.5 py-1 text-xs font-bold text-pink">
                    <AlertTriangle size={11} /> Needs file
                  </span>
                ) : (
                  <span className="rounded-full bg-cyan/15 px-2.5 py-1 text-xs font-bold text-cyan">
                    {p.active ? "Live" : "Ready"}
                  </span>
                )}
                <Link
                  href={`/admin/products/${p.id}`}
                  className="rounded-full border border-subtle px-3 py-1.5 text-xs font-medium text-body hover:border-lavender/40 hover:text-heading"
                >
                  {p.needsFile ? "Attach file" : "Edit"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cron note */}
      <div className="rounded-2xl border border-subtle bg-surface/50 p-5">
        <p className="text-xs text-muted">
          <strong className="text-body">Auto-refresh:</strong> a daily Vercel
          Cron (<code className="text-lavender">/api/cron/etsy-sync</code>)
          re-syncs automatically when credentials exist. See README for the{" "}
          <code className="text-lavender">vercel.json</code> config.
        </p>
      </div>
    </div>
  );
}
