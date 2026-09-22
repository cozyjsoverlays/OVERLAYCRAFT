"use client";

import { useState } from "react";

// Recommended video bitrate (kbps) by resolution + fps, Twitch-safe ranges.
const REC: Record<string, { min: number; max: number }> = {
  "720p30": { min: 2500, max: 3500 },
  "720p60": { min: 3500, max: 5000 },
  "1080p30": { min: 4000, max: 6000 },
  "1080p60": { min: 6000, max: 8000 },
  "1440p60": { min: 9000, max: 13000 },
};

export function BitrateCalculator() {
  const [upload, setUpload] = useState("10");
  const [res, setRes] = useState("1080p60");

  const up = parseFloat(upload) || 0;
  const safeKbps = Math.floor((up * 1000 * 0.7) / 50) * 50; // 70% headroom
  const rec = REC[res];
  const target = Math.max(rec.min, Math.min(rec.max, safeKbps || rec.min));
  const enough = safeKbps >= rec.min;
  const chosen = enough ? target : safeKbps;

  const input = "w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush focus:border-lilac/60 focus:outline-none";

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">Your upload speed (Mbps)</label>
          <input className={input} type="number" min="1" step="0.5" value={upload} onChange={(e) => setUpload(e.target.value)} />
          <p className="mt-1.5 text-xs text-mist">Run a speed test and use your UPLOAD number.</p>
        </div>
        <div>
          <label className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">Target output</label>
          <select className={input} value={res} onChange={(e) => setRes(e.target.value)}>
            {Object.keys(REC).map((k) => <option key={k} value={k}>{k.replace("p", "p ")}fps</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur">
        <p className="font-mono text-xs uppercase tracking-wider text-lilac">Recommended OBS settings</p>
        <p className="mt-2 font-display text-4xl text-blush">
          {chosen.toLocaleString()} <span className="text-lg text-mist">kbps</span>
        </p>
        <p className={`mt-1 text-sm ${enough ? "text-mist" : "text-volt"}`}>
          {enough
            ? `Your connection comfortably handles ${res}. This bitrate leaves headroom so frames never drop.`
            : `Your upload is tight for ${res}. Use this lower bitrate, or drop to a lighter output for a stable stream.`}
        </p>
        <dl className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {[
            ["Rate control", "CBR"],
            ["Keyframe interval", "2 seconds"],
            ["Encoder", "Hardware (NVENC / AV1 if available)"],
            ["Preset", "Quality / P5"],
            ["Profile", "high"],
            ["Audio bitrate", "160 kbps"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 border-b border-veil/60 py-1.5 text-sm">
              <dt className="text-mist">{k}</dt>
              <dd className="text-right font-mono text-blush">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
