"use client";

import { useState } from "react";

const inputCls =
  "w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none";
const labelCls = "block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac";

export function IntakeForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-veil bg-ink2/70 p-10 text-center backdrop-blur">
        <p className="font-display text-2xl text-blush">Brief received ✦</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-mist">
          We&apos;ll reply within 24 hours with questions and a concept direction. Check
          your inbox (and spam folder, just in case).
        </p>
      </div>
    );
  }

  return (
    <form
      id="intake"
      className="grid gap-5 rounded-2xl border border-veil bg-ink2/70 p-7 backdrop-blur md:grid-cols-2 md:p-9"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to email / API route (e.g. POST /api/commission → Resend)
        setSent(true);
      }}
    >
      <div>
        <label htmlFor="in-name" className={labelCls}>Name</label>
        <input id="in-name" name="name" required placeholder="Your name" className={inputCls} />
      </div>
      <div>
        <label htmlFor="in-email" className={labelCls}>Email</label>
        <input id="in-email" name="email" type="email" required placeholder="you@stream.tv" className={inputCls} />
      </div>
      <div>
        <label htmlFor="in-platform" className={labelCls}>Platform</label>
        <select id="in-platform" name="platform" className={inputCls} defaultValue="Twitch">
          {["Twitch", "YouTube", "Kick", "TikTok Live", "Multiple"].map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="in-budget" className={labelCls}>Budget tier</label>
        <select id="in-budget" name="budget" className={inputCls} defaultValue="Pro — $250">
          {["Starter — $100", "Pro — $250", "Full Brand — $400", "Not sure yet"].map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="in-style" className={labelCls}>Style / theme</label>
        <input
          id="in-style"
          name="style"
          required
          placeholder="e.g. gothic raven meets neon Tokyo, cozy autumn café…"
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor="in-colors" className={labelCls}>Colors</label>
        <input id="in-colors" name="colors" placeholder="e.g. deep violet, blush pink" className={inputCls} />
      </div>
      <div>
        <label htmlFor="in-deadline" className={labelCls}>Deadline</label>
        <input id="in-deadline" name="deadline" type="date" className={inputCls} />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="in-refs" className={labelCls}>References (links)</label>
        <textarea
          id="in-refs"
          name="references"
          rows={3}
          placeholder="Links to art, channels, or packs you love — one per line. (File upload lands with accounts.)"
          className={inputCls}
        />
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-volt px-6 py-3.5 font-body text-sm font-medium text-blush shadow-volt transition-all hover:bg-voltDim active:scale-[0.97] md:w-auto"
        >
          Send the brief
        </button>
      </div>
    </form>
  );
}
