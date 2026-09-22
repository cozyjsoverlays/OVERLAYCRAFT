"use client";

import { useState } from "react";

// Map a-z / A-Z / 0-9 to a unicode variant by code-point offset ranges.
const UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LO = "abcdefghijklmnopqrstuvwxyz";
const DI = "0123456789";

function mapper(upBase: number | null, loBase: number | null, diBase: number | null, extra: Record<string, string> = {}) {
  return (s: string) =>
    [...s]
      .map((ch) => {
        if (extra[ch]) return extra[ch];
        const u = UP.indexOf(ch), l = LO.indexOf(ch), d = DI.indexOf(ch);
        if (u > -1 && upBase !== null) return String.fromCodePoint(upBase + u);
        if (l > -1 && loBase !== null) return String.fromCodePoint(loBase + l);
        if (d > -1 && diBase !== null) return String.fromCodePoint(diBase + d);
        return ch;
      })
      .join("");
}

const STYLES: { name: string; fn: (s: string) => string }[] = [
  { name: "Bold", fn: mapper(0x1d400, 0x1d41a, 0x1d7ce) },
  { name: "Italic", fn: mapper(0x1d434, 0x1d44e, null) },
  { name: "Bold Italic", fn: mapper(0x1d468, 0x1d482, null) },
  { name: "Script", fn: mapper(0x1d49c, 0x1d4b6, null) },
  { name: "Fraktur", fn: mapper(0x1d504, 0x1d51e, null) },
  { name: "Double-struck", fn: mapper(0x1d538, 0x1d552, 0x1d7d8) },
  { name: "Monospace", fn: mapper(0x1d670, 0x1d68a, 0x1d7f6) },
  { name: "Bubble", fn: mapper(0x24b6, 0x24d0, null, { "0": "⓪" }) },
  { name: "Square", fn: mapper(0x1f130, 0x1f130, null) },
  { name: "Wide", fn: mapper(0xff21, 0xff41, 0xff10, { " ": "　" }) },
];

export function FancyFontGenerator() {
  const [text, setText] = useState("YourName");
  const [copied, setCopied] = useState("");

  function copy(txt: string) {
    try { navigator.clipboard.writeText(txt); setCopied(txt); setTimeout(() => setCopied(""), 1200); } catch {}
  }

  return (
    <div>
      <input
        className="w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush placeholder:text-mist/60 focus:border-lilac/60 focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your name or bio text"
        maxLength={60}
      />
      <ul className="mt-6 space-y-2.5">
        {STYLES.map((s) => {
          const out = s.fn(text || "YourName");
          return (
            <li key={s.name}>
              <button onClick={() => copy(out)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-veil bg-ink2/70 px-4 py-3 text-left transition-colors hover:border-lilac/50">
                <span className="truncate text-lg text-blush">{out}</span>
                <span className="shrink-0 font-mono text-[11px] text-lilac">{copied === out ? "copied!" : `${s.name} · copy`}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-xs text-mist">Some platforms hide fancy unicode from search or screen readers - keep your @handle plain and use these for display names and bios.</p>
    </div>
  );
}
