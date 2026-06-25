"use client";

import { useMemo, useState } from "react";
import { Gauge, Zap, Copy, Check } from "lucide-react";
import { PLATFORM } from "@/lib/tools-config";
import { clsx } from "@/lib/clsx";

type Res = "720p" | "900p" | "1080p" | "1440p";
type Fps = 30 | 60;
type Content = "chatting" | "gaming";

// Base recommended video bitrate (kbps) by resolution + fps.
const BASE: Record<Res, Record<Fps, number>> = {
  "720p": { 30: 3000, 60: 4500 },
  "900p": { 30: 3800, 60: 5200 },
  "1080p": { 30: 4500, 60: 6000 },
  "1440p": { 30: 6500, 60: 9000 },
};

export function BitrateCalculator() {
  const [res, setRes] = useState<Res>("1080p");
  const [fps, setFps] = useState<Fps>(60);
  const [content, setContent] = useState<Content>("gaming");
  const [upload, setUpload] = useState("10");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    let kbps = BASE[res][fps];
    // Fast-paced gaming needs more; chatting can go a touch lower.
    if (content === "chatting") kbps = Math.round(kbps * 0.85);
    kbps = Math.min(kbps, PLATFORM.bitrate.twitchMaxVideoKbps + 0); // keep Twitch-friendly reference

    const uploadKbps = (parseFloat(upload) || 0) * 1000;
    // Need ~1.5x headroom so video + audio + overhead fit comfortably.
    const safeMax = uploadKbps / 1.5;

    let verdict: { tone: "ok" | "warn" | "bad"; text: string };
    if (uploadKbps <= 0) {
      verdict = { tone: "warn", text: "Enter your upload speed to get a verdict." };
    } else if (kbps <= safeMax) {
      verdict = { tone: "ok", text: `Your upload comfortably handles ${res}${fps} at ${kbps} kbps.` };
    } else if (kbps <= uploadKbps) {
      verdict = { tone: "warn", text: `It can work, but it's tight. Consider ${fps === 60 ? "30 fps" : "a lower resolution"} or a slightly lower bitrate for stability.` };
    } else {
      verdict = { tone: "bad", text: `Your upload can't sustain ${res}${fps}. Drop to a lower resolution/fps or bitrate.` };
    }

    return { kbps, keyframe: 2, verdict };
  }, [res, fps, content, upload]);

  const summary = `Video bitrate: ${result.kbps} kbps\nResolution: ${res} @ ${fps}fps\nKeyframe interval: 2s\nEncoder: hardware (NVENC / AMD / Apple) if available, else x264 "veryfast"`;

  function copy() {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const Btn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
        active ? "border-transparent bg-accent-gradient text-base" : "border-subtle bg-white/5 text-body hover:border-lavender/40",
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col gap-7">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Resolution</p>
          <div className="flex flex-wrap gap-2">
            {(["720p", "900p", "1080p", "1440p"] as Res[]).map((r) => (
              <Btn key={r} active={res === r} onClick={() => setRes(r)}>{r}</Btn>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Framerate</p>
          <div className="flex flex-wrap gap-2">
            {([30, 60] as Fps[]).map((f) => (
              <Btn key={f} active={fps === f} onClick={() => setFps(f)}>{f} fps</Btn>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Content</p>
          <div className="flex flex-wrap gap-2">
            <Btn active={content === "chatting"} onClick={() => setContent("chatting")}>Chatting / cozy</Btn>
            <Btn active={content === "gaming"} onClick={() => setContent("gaming")}>Fast-paced gaming</Btn>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Upload speed (Mbps)</p>
          <input
            type="number"
            min="0"
            step="0.5"
            value={upload}
            onChange={(e) => setUpload(e.target.value)}
            className="w-full rounded-xl border border-subtle bg-surface/50 px-4 py-2.5 text-heading focus:border-lavender/60 focus:outline-none focus:ring-2 focus:ring-lavender/20"
            placeholder="e.g. 10"
          />
          <p className="mt-1 text-xs text-muted">Tip: run a speed test and use the <em>upload</em> number.</p>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-2xl border border-lavender/30 bg-gradient-to-br from-surface-2 to-surface p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">Recommended video bitrate</p>
            <p className="mt-1 text-4xl font-extrabold text-heading">
              {result.kbps} <span className="text-lg text-lavender">kbps</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm text-cyan">
            <Gauge size={16} /> Keyframe interval 2s · hardware encoder
          </span>
        </div>
        <p
          className={clsx(
            "mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium",
            result.verdict.tone === "ok" && "bg-cyan/10 text-cyan",
            result.verdict.tone === "warn" && "bg-lavender/10 text-lavender",
            result.verdict.tone === "bad" && "bg-pink/10 text-pink",
          )}
        >
          <Zap size={15} /> {result.verdict.text}
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full border border-subtle bg-white/5 px-4 py-2 text-sm font-bold text-heading hover:border-lavender/40"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied!" : "Copy OBS settings"}
          </button>
        </div>
      </div>

      <p className="text-xs text-muted">
        Reference ceilings (editable in config): Twitch ~{PLATFORM.bitrate.twitchMaxVideoKbps} kbps, YouTube up to ~{PLATFORM.bitrate.youtubeMaxVideoKbps} kbps for higher resolutions.
      </p>
    </div>
  );
}
