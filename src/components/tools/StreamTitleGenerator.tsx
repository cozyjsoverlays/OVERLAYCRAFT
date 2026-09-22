"use client";

import { useState } from "react";

const VIBES: Record<string, { pre: string[]; post: string[] }> = {
  chill: { pre: ["cozy", "chill", "late night", "low-key", "relaxed"], post: ["come hang", "vibes only", "no pressure", "lofi mood"] },
  hype: { pre: ["RANKED GRIND", "NO SLEEP", "ROAD TO", "INSANE", "LET'S GO"], post: ["!!!", "gone wrong", "new record?", "clip moment"] },
  cozy: { pre: ["cozy", "soft", "rainy day", "candlelit", "comfy"], post: ["with tea", "and good chat", "self care stream", "wind-down"] },
  funny: { pre: ["chaotic", "unhinged", "silly", "certified", "peak comedy"], post: ["what could go wrong", "send help", "this is fine", "chat is menace"] },
  pro: { pre: ["educational", "high-level", "ranked", "competitive", "clean"], post: ["road to top 500", "coaching viewers", "tips + tricks", "climb continues"] },
};

const EMOJI: Record<string, string> = { chill: "🌙", hype: "🔥", cozy: "🍵", funny: "🤡", pro: "🎯" };

export function StreamTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [vibe, setVibe] = useState("chill");
  const [titles, setTitles] = useState<string[]>([]);
  const [copied, setCopied] = useState("");

  function gen() {
    const t = topic.trim() || "just chatting";
    const v = VIBES[vibe];
    const e = EMOJI[vibe];
    const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const out = new Set<string>();
    let guard = 0;
    while (out.size < 6 && guard++ < 40) {
      const shapes = [
        `${e} ${cap(pick(v.pre))} ${t}`,
        `${cap(t)} ${pick(v.post)} ${e}`,
        `${e} ${cap(pick(v.pre))} ${t} - ${pick(v.post)}`,
        `${cap(pick(v.pre))} ${t} ${e} ${pick(v.post)}`,
      ];
      out.add(pick(shapes));
    }
    setTitles([...out]);
  }

  function copy(txt: string) {
    try { navigator.clipboard.writeText(txt); setCopied(txt); setTimeout(() => setCopied(""), 1200); } catch {}
  }

  const input = "w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <input className={input} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What are you streaming? e.g. Valorant ranked, art commissions" />
        <select className={input} value={vibe} onChange={(e) => setVibe(e.target.value)}>
          {Object.keys(VIBES).map((k) => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>
      <button onClick={gen} className="mt-4 rounded-xl bg-volt px-6 py-3 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
        Generate titles
      </button>
      {titles.length > 0 && (
        <ul className="mt-6 space-y-2.5">
          {titles.map((t) => (
            <li key={t}>
              <button onClick={() => copy(t)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-veil bg-ink2/70 px-4 py-3 text-left font-body text-sm text-blush transition-colors hover:border-lilac/50">
                <span>{t}</span>
                <span className="shrink-0 font-mono text-[11px] text-lilac">{copied === t ? "copied!" : "copy"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
