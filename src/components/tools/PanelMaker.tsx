"use client";

import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import { PLATFORM } from "@/lib/tools-config";
import { clsx } from "@/lib/clsx";

const W = PLATFORM.twitchPanelMaxWidth; // 320
const H = 100;

const TEMPLATES: { id: string; label: string; from: string; to: string; text: string }[] = [
  { id: "cottage", label: "Cottagecore", from: "#a8c686", to: "#e9e2b6", text: "#33402a" },
  { id: "kawaii", label: "Kawaii", from: "#ffd1e3", to: "#c9b6ff", text: "#5b2a52" },
  { id: "witchy", label: "Witchy", from: "#2b2140", to: "#5b3b8c", text: "#f0e6ff" },
  { id: "lofi", label: "Lofi", from: "#3a2f4d", to: "#e8a07a", text: "#fff3ec" },
];

const PANEL_LABELS = ["About", "Schedule", "Socials", "Donate", "Discord", "Rules"];

export function PanelMaker() {
  const [tplId, setTplId] = useState("cottage");
  const [label, setLabel] = useState("About");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tpl = TEMPLATES.find((t) => t.id === tplId)!;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, tpl.from);
    grad.addColorStop(1, tpl.to);
    ctx.clearRect(0, 0, W, H);
    // Rounded rect
    const r = 16;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.arcTo(W, 0, W, H, r);
    ctx.arcTo(W, H, 0, H, r);
    ctx.arcTo(0, H, 0, 0, r);
    ctx.arcTo(0, 0, W, 0, r);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    // Label
    ctx.fillStyle = tpl.text;
    ctx.font = "700 30px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label || "Panel", W / 2, H / 2 + 2);
  }, [tpl, label]);

  function exportPng() {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = `panel-${label.toLowerCase() || "panel"}.png`;
    a.click();
  }

  return (
    <div className="flex flex-col gap-7">
      {/* Reference card */}
      <div className="rounded-2xl border border-subtle bg-surface/40 p-5">
        <p className="text-sm text-body">
          <strong className="text-heading">Twitch panel sizing:</strong> panels display at a
          maximum width of <strong className="text-lavender">{W}px</strong>. There&apos;s no fixed
          height — keep it tidy (≈100px) and use the same look across every panel for a polished
          channel page.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Template</p>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTplId(t.id)}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                    tplId === t.id ? "border-transparent bg-accent-gradient text-base" : "border-subtle bg-white/5 text-body hover:border-lavender/40",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Label</p>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={18}
              className="w-full rounded-xl border border-subtle bg-surface/50 px-4 py-2.5 text-heading focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20"
              placeholder="About"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PANEL_LABELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLabel(l)}
                  className="rounded-full border border-subtle px-2.5 py-1 text-xs text-muted hover:border-lavender/40 hover:text-heading"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-subtle bg-surface/30 p-6">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">Preview ({W}×{H})</p>
          <canvas ref={canvasRef} width={W} height={H} className="rounded-2xl shadow-card" style={{ width: W, height: H }} />
          <button
            type="button"
            onClick={exportPng}
            className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow"
          >
            <Download size={16} /> Export PNG panel
          </button>
        </div>
      </div>
    </div>
  );
}
