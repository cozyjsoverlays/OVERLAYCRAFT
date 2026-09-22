"use client";

import { useState } from "react";

const PALETTES: Record<string, string[][]> = {
  cozy: [
    ["#2B2233", "#6D4C7D", "#E9B3FB", "#F7DDF4", "#FFB4A2"],
    ["#3A2E2A", "#7A5C58", "#D8A48F", "#F1D3B3", "#FFF4E6"],
  ],
  gothic: [
    ["#0D0A14", "#1E1630", "#3B0270", "#9D5CFF", "#E9B3FB"],
    ["#0B0B0F", "#241023", "#6E1423", "#B21E35", "#E85D75"],
  ],
  kawaii: [
    ["#FFDDEE", "#FFB4D8", "#FF7AB6", "#C77DFF", "#8E7DFF"],
    ["#FDF2FF", "#FFC2E2", "#B892FF", "#9AD0FF", "#A0F0E0"],
  ],
  neon: [
    ["#0A0A12", "#12122A", "#FF2E97", "#00E5FF", "#B14EFF"],
    ["#0D0221", "#261447", "#FF3864", "#2DE2E6", "#F9C80E"],
  ],
  nature: [
    ["#14261F", "#26433A", "#4E7C5B", "#9BC6A0", "#E9F0C9"],
    ["#1B2A1F", "#3E5C3A", "#7FA65C", "#C7D98C", "#F2E9C9"],
  ],
  fire: [
    ["#1A0A08", "#3D1610", "#8C2A1E", "#E8552B", "#FFB347"],
    ["#120806", "#481B0E", "#B23A20", "#FF6B35", "#FFD166"],
  ],
};

export function ColorPaletteGenerator() {
  const [vibe, setVibe] = useState("cozy");
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState("");

  const palette = PALETTES[vibe][idx % PALETTES[vibe].length];

  function copy(hex: string) {
    try { navigator.clipboard.writeText(hex); setCopied(hex); setTimeout(() => setCopied(""), 1000); } catch {}
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(PALETTES).map((k) => (
          <button key={k} onClick={() => { setVibe(k); setIdx(0); }} className={`rounded-full border px-4 py-2 font-body text-sm capitalize transition-colors ${vibe === k ? "border-volt bg-volt/15 text-blush" : "border-veil text-mist hover:border-lilac/50"}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-veil">
        <div className="flex h-40">
          {palette.map((hex) => (
            <button key={hex} onClick={() => copy(hex)} className="group relative flex-1 transition-all" style={{ backgroundColor: hex }} aria-label={`Copy ${hex}`}>
              <span className="absolute inset-x-0 bottom-0 bg-black/40 py-1 text-center font-mono text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {copied === hex ? "copied!" : hex}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button onClick={() => setIdx(idx + 1)} className="rounded-xl border border-veil px-5 py-2.5 font-body text-sm text-lilac transition-colors hover:border-lilac/60">
          Shuffle palette
        </button>
        <div className="flex flex-wrap gap-1.5">
          {palette.map((hex) => (
            <button key={hex} onClick={() => copy(hex)} className="rounded-md border border-veil bg-ink2 px-2.5 py-1 font-mono text-[11px] text-mist hover:text-blush">
              {copied === hex ? "copied!" : hex}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-mist">Use the two darkest shades for backgrounds and panels, the brightest for alerts and CTAs. Click any swatch to copy its hex.</p>
    </div>
  );
}
