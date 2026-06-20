"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

export function AdminLoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(next ?? "/admin/products");
        router.refresh();
      } else {
        const { error: msg } = (await res.json()) as { error: string };
        setError(msg === "Too many attempts" ? "Too many attempts. Try again in 15 min." : "Wrong password.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <input
          type={showPw ? "text" : "password"}
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          className="w-full rounded-2xl border border-subtle bg-surface px-4 py-3 pr-11 text-sm text-heading placeholder:text-muted focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20"
        />
        <button
          type="button"
          onClick={() => setShowPw((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
          aria-label={showPw ? "Hide password" : "Show password"}
        >
          {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>

      {error && (
        <p className="rounded-xl bg-pink/10 px-4 py-2.5 text-sm text-pink">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow disabled:opacity-50"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
