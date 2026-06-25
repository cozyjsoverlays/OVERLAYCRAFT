"use client";

import { useEffect, useState, useCallback } from "react";
import { Shuffle, Lock, LockOpen, Copy, Check, ImageDown, Code2 } from "lucide-react";
import { clsx } from "@/lib/clsx";

type Vibe = "cottagecore" | "kawaii" | "witchy" | "lofi";

const VIBES: { key: Vibe; label: string; pool: string[] }[] = [
  {
    key: "cottagecore",
    label: "Cottagecore",
    pool: ["#a8c686", "#e9e2b6", "#d6a96a", "#7c9070", "#f3e9d2", "#bcae9e", "#8aa67a", "#e2b48c", "#c5d6a0", "#6b7d52"],
  },
  {
    key: "kawaii",
    label: "Kawaii Pastel",
    pool: ["#ffd1e3", "#ffe6f2", "#c9b6ff", "#bce0ff", "#fff0c7", "#ffc2d1", "#d8c2ff", "#a8e6cf", "#ffb7d5", "#e0bbff"],
  },
  {
    key: "witchy",
    label: "Witchy / Dark Fantasy",
    pool: ["#2b2140", "#5b3b8c", "#9d6ad6", "#1a1226", "#c9a227", "#3d2b54", "#7a4fb0", "#0f0a1a", "#b08ae0", "#43355e"],
  },
  {
    key: "lofi",
    label: "Lofi Bedroom",
    pool: ["#3a2f4d", "#e8a07a", "#f0c9a0", "#6c5b7b", "#c08497", "#2c2540", "#f2b5a0", "#8d7b9e", "#e6b89c", "#4a3f5e"],
  },
];

function pickPalette(pool: string[], locked: (string | null)[]): string[] {
  const available = pool.filter((c) => !locked.includes(c));
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  let idx = 0;
  return locked.map((c) => c ?? shuffled[idx++] ?? pool[Math.floor(Math.random() * pool.length)]);
}

function textColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return r * 0.299 + g * 0.587 + b * 0.114 > 150 ? "#1a1226" : "#ffffff";
}

export function PaletteGenerator() {
  const [vibe, setVibe] = useState<Vibe>("cottagecore");
  const [colors, setColors] = useState<string[]>([]);
  const [locked, setLocked] = useState<boolean[]>([false, false, false, false, false]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);

  const pool = VIBES.find((v) => v.key === vibe)!.pool;

  const reshuffle = useCallback(() => {
    setColors((prev) => {
      const lockedColors = prev.map((c, i) => (locked[i] ? c : null));
      return pickPalette(pool, lockedColors.length === 5 ? lockedColors : [null, null, null, null, null]);
    });
  }, [pool, locked]);

  // Fresh palette on vibe change (reset locks).
  useEffect(() => {
    setLocked([false, false, false, false, false]);
    setColors(pickPalette(pool, [null, null, null, null, null]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vibe]);

  function copyHex(hex: string, i: number) {
    navigator.clipboard.writeText(hex);
    setCopiedIdx(i);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  function copyCss() {
    const css = `:root {\n${colors.map((c, i) => `  --cozy-${i + 1}: ${c};`).join("\n")}\n}`;
    navigator.clipboard.writeText(css);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 1500);
  }

  function exportPng() {
    const w = 1000;
    const h = 300;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;
    const cw = w / colors.length;
    colors.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(i * cw, 0, cw, h);
      ctx.fillStyle = textColor(c);
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(c.toUpperCase(), i * cw + cw / 2, h - 24);
    });
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `cozy-palette-${vibe}.png`;
    a.click();
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap gap-2">
        {VIBES.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setVibe(v.key)}
            className={clsx(
              "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
              vibe === v.key ? "border-transparent bg-accent-gradient text-base" : "border-subtle bg-white/5 text-body hover:border-lavender/40",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {colors.map((c, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-subtle">
            <button
              type="button"
              onClick={() => copyHex(c, i)}
              className="flex aspect-[3/4] w-full flex-col items-center justify-end p-3 transition-transform hover:scale-[1.02]"
              style={{ background: c, color: textColor(c) }}
              title="Click to copy HEX"
            >
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-black/15 px-2 py-1 font-mono text-xs font-bold">
                {copiedIdx === i ? <Check size={12} /> : <Copy size={12} />} {c.toUpperCase()}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setLocked((l) => l.map((v, j) => (j === i ? !v : v)))}
              className="flex w-full items-center justify-center gap-1.5 bg-surface py-2 text-xs font-bold text-body hover:text-heading"
            >
              {locked[i] ? <Lock size={13} className="text-lavender" /> : <LockOpen size={13} />}
              {locked[i] ? "Locked" : "Lock"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reshuffle}
          className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
        >
          <Shuffle size={16} /> Reshuffle
        </button>
        <button
          type="button"
          onClick={exportPng}
          className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-5 py-3 text-sm font-bold text-heading hover:border-lavender/40"
        >
          <ImageDown size={16} /> Export PNG
        </button>
        <button
          type="button"
          onClick={copyCss}
          className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-5 py-3 text-sm font-bold text-heading hover:border-lavender/40"
        >
          {copiedCss ? <Check size={16} /> : <Code2 size={16} />} {copiedCss ? "Copied!" : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}
