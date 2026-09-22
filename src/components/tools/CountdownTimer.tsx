"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function CountdownTimer() {
  const [minutes, setMinutes] = useState(10);
  const [message, setMessage] = useState("Starting Soon");
  const [left, setLeft] = useState(600);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // OBS browser-source mode: ?min=10&msg=Starting%20Soon auto-starts.
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const m = parseInt(p.get("min") || "", 10);
      const msg = p.get("msg");
      if (msg) setMessage(msg);
      if (m > 0) { setMinutes(m); setLeft(m * 60); setRunning(true); }
    } catch {}
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((l) => (l <= 1 ? 0 : l - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = useCallback(() => { setLeft(minutes * 60); setRunning(true); }, [minutes]);

  function fullscreen() {
    boxRef.current?.requestFullscreen?.().catch(() => {});
  }
  function copyUrl() {
    try {
      const url = `${window.location.origin}/free-tools/countdown-timer?min=${minutes}&msg=${encodeURIComponent(message)}`;
      navigator.clipboard.writeText(url);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  const input = "w-full rounded-xl border border-veil bg-ink px-4 py-3 font-body text-sm text-blush focus:border-lilac/60 focus:outline-none";

  return (
    <div>
      <div
        ref={boxRef}
        className="grid aspect-video w-full place-items-center rounded-2xl border border-veil bg-gradient-to-br from-abyss/40 via-ink to-ink2/30"
      >
        <div className="text-center">
          <p className="font-display text-6xl tabular-nums text-blush md:text-8xl">{fmt(left)}</p>
          <p className="mt-3 font-display text-lg uppercase tracking-[0.3em] text-lilac">{message}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">Minutes</label>
          <input className={input} type="number" min="1" max="120" value={minutes} onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value) || 1))} />
        </div>
        <div>
          <label className="block pb-1.5 font-body text-xs uppercase tracking-wider text-lilac">Message</label>
          <input className={input} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={40} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={start} className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-semibold text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
          {running ? "Restart" : "Start"}
        </button>
        <button onClick={() => setRunning(false)} className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60">Pause</button>
        <button onClick={fullscreen} className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60">Fullscreen</button>
        <button onClick={copyUrl} className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60">
          {copied ? "URL copied!" : "Copy OBS browser-source URL"}
        </button>
      </div>
      <p className="mt-4 text-xs text-mist">
        Add it to OBS as a Browser source using the copied URL (set width 1920, height 1080). The countdown auto-starts from the minutes and message baked into the link.
      </p>
    </div>
  );
}
