"use client";

import { useState } from "react";

const FIELDS = [
  { key: "discord", label: "Discord invite URL", cmd: "!discord", resp: (v: string) => `Join the Discord: ${v}` },
  { key: "youtube", label: "YouTube channel URL", cmd: "!youtube", resp: (v: string) => `New videos every week: ${v}` },
  { key: "socials", label: "Socials (Twitter/IG/TikTok)", cmd: "!socials", resp: (v: string) => `Follow everywhere: ${v}` },
  { key: "tip", label: "Tip / donation link", cmd: "!tip", resp: (v: string) => `Support the stream (never required, always appreciated): ${v}` },
  { key: "schedule", label: "Streaming schedule", cmd: "!schedule", resp: (v: string) => `Live: ${v}` },
  { key: "specs", label: "PC / setup", cmd: "!specs", resp: (v: string) => `My setup: ${v}` },
];

const STATIC = [
  { cmd: "!lurk", resp: "Thanks for the lurk! Every viewer counts, hang out as long as you like. 💜" },
  { cmd: "!followage", resp: "$(twitch $(user) followage)" },
  { cmd: "!so", resp: "Go show @$(1) some love and drop a follow: twitch.tv/$(1)" },
];

export function ChatCommandGenerator() {
  const [platform, setPlatform] = useState<"nightbot" | "streamelements">("nightbot");
  const [vals, setVals] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState("");

  const add = platform === "nightbot" ? "!addcom" : "!command add";

  const lines = [
    ...FIELDS.filter((f) => vals[f.key]?.trim()).map((f) => `${add} ${f.cmd} ${f.resp(vals[f.key].trim())}`),
    ...STATIC.map((s) => `${add} ${s.cmd} ${s.resp}`),
  ];

  function copy(txt: string, id: string) {
    try { navigator.clipboard.writeText(txt); setCopied(id); setTimeout(() => setCopied(""), 1200); } catch {}
  }

  const input = "w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none";

  return (
    <div>
      <div className="mb-5 inline-flex rounded-xl border border-veil bg-ink2/70 p-1">
        {(["nightbot", "streamelements"] as const).map((p) => (
          <button key={p} onClick={() => setPlatform(p)} className={`rounded-lg px-4 py-2 font-body text-xs font-medium capitalize transition-colors ${platform === p ? "bg-volt text-white" : "text-mist hover:text-blush"}`}>
            {p === "streamelements" ? "StreamElements" : "Nightbot"}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">{f.label}</label>
            <input className={input} value={vals[f.key] || ""} onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })} placeholder="paste here (optional)" />
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-veil bg-ink2/70 p-5 backdrop-blur">
        <div className="flex items-center justify-between">
          <p className="font-display text-sm text-blush">Paste these in your chat</p>
          <button onClick={() => copy(lines.join("\n"), "all")} className="rounded-lg bg-volt px-3 py-1.5 font-mono text-[11px] font-bold text-white">
            {copied === "all" ? "copied!" : "copy all"}
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {lines.map((l) => (
            <button key={l} onClick={() => copy(l, l)} className="block w-full truncate rounded-lg border border-veil bg-ink px-3 py-2 text-left font-mono text-[12px] text-mist transition-colors hover:border-lilac/50 hover:text-blush">
              {copied === l ? "copied!" : l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
