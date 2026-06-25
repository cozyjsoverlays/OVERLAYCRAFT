"use client";

import { useMemo, useState } from "react";
import { Search, Copy, Check } from "lucide-react";
import { REWARD_IDEAS, REWARD_CATEGORIES } from "@/data/channel-point-ideas";
import { clsx } from "@/lib/clsx";

export function ChannelPointIdeas() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return REWARD_IDEAS.filter(
      (r) =>
        (cat === "All" || r.category === cat) &&
        (!q || r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)),
    );
  }, [query, cat]);

  function copy(name: string) {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reward ideas…"
            className="w-full rounded-full border border-subtle bg-surface/50 py-3 pl-11 pr-4 text-heading focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {REWARD_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-sm font-bold transition-colors",
                cat === c ? "border-transparent bg-accent-gradient text-base" : "border-subtle bg-white/5 text-body hover:border-lavender/40",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="flex flex-col gap-2.5">
        {filtered.map((r) => (
          <li key={r.name} className="glass flex items-center gap-3 rounded-2xl p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-heading">{r.name}</p>
              <p className="text-xs text-muted">
                {r.category} · ~{r.cost.toLocaleString()} pts
              </p>
            </div>
            <button
              type="button"
              onClick={() => copy(r.name)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-subtle px-3 py-1.5 text-xs font-bold text-heading hover:border-lavender/40"
            >
              {copied === r.name ? <Check size={13} /> : <Copy size={13} />}
              {copied === r.name ? "Copied" : "Copy"}
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-subtle bg-surface/40 p-6 text-center text-body">
            No ideas match — try another search.
          </li>
        )}
      </ul>
    </div>
  );
}
