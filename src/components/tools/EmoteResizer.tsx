"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Download, AlertTriangle } from "lucide-react";

type Mode = "emote" | "badge" | "points";

const SIZES: Record<Mode, number[]> = {
  emote: [112, 56, 28],
  badge: [72, 36, 18],
  points: [112, 56, 28],
};

const MODES: { key: Mode; label: string; glyph: string }[] = [
  { key: "emote", label: "Emotes (112 / 56 / 28)", glyph: "😹" },
  { key: "badge", label: "Sub badges (72 / 36 / 18)", glyph: "🏅" },
  { key: "points", label: "Channel points (112 / 56 / 28)", glyph: "💎" },
];

const NOUN: Record<Mode, string> = {
  emote: "Twitch emote",
  badge: "Sub badge",
  points: "Channel point icon",
};

/** Twitch rejects emote/badge/reward images over 1 MB. */
const MAX_BYTES = 1024 * 1024;

interface Output {
  size: number;
  url: string;
  bytes: number;
}

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export function EmoteResizer() {
  const [mode, setMode] = useState<Mode>("emote");
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlsRef = useRef<string[]>([]);
  const reqRef = useRef(0);

  // Revoke every URL we still own when the component goes away.
  useEffect(
    () => () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = [];
    },
    []
  );

  const render = useCallback(async (img: HTMLImageElement, m: Mode) => {
    // Resizing is async (canvas.toBlob), so a fast mode switch can leave two
    // runs in flight. Tag each run and let only the newest one commit,
    // otherwise a slower earlier run overwrites the current mode's output.
    const id = ++reqRef.current;
    const results: Output[] = [];
    const fresh: string[] = [];

    for (const size of SIZES[m]) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // Fit the whole image inside the square, centered, keeping transparency.
      const scale = Math.min(size / img.width, size / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
      if (!blob) continue;
      const url = URL.createObjectURL(blob);
      fresh.push(url);
      results.push({ size, url, bytes: blob.size });
    }

    if (id !== reqRef.current) {
      // A newer run started while this one was working - throw this away.
      fresh.forEach((u) => URL.revokeObjectURL(u));
      return;
    }

    // Commit: release the previous run's URLs only now that we replace them,
    // so the visible images are never revoked out from under the DOM.
    const previous = urlsRef.current;
    urlsRef.current = fresh;
    setOutputs(results);
    previous.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const handleFile = useCallback((file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("That file is not an image. Use a PNG, JPG, GIF or WebP.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        setImgEl(img);
        setFileName(file.name.replace(/\.[^.]+$/, ""));
      };
      img.onerror = () => setError("That image could not be read. Try a different file.");
      img.src = String(reader.result);
    };
    reader.onerror = () => setError("Could not read that file.");
    reader.readAsDataURL(file);
  }, []);

  // Regenerate whenever the image or the target size set changes, so switching
  // between emote, badge and channel point mode always re-renders correctly.
  useEffect(() => {
    if (imgEl) void render(imgEl, mode);
  }, [imgEl, mode, render]);

  const smallest = outputs.length ? Math.min(...outputs.map((o) => o.size)) : 0;

  return (
    <div className="rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur md:p-8">
      {/* Asset type */}
      <div className="flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={`rounded-full px-4 py-2 font-body text-sm transition-colors ${
              mode === m.key ? "bg-volt text-white shadow-volt" : "border border-veil text-mist hover:text-lilac"
            }`}
          >
            {m.glyph} {m.label}
          </button>
        ))}
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`mt-5 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          dragOver ? "border-volt bg-volt/5" : "border-veil"
        }`}
      >
        <Upload size={26} className="mx-auto text-lilac" aria-hidden />
        <p className="mt-3 font-body text-sm text-blush">
          Drop your artwork here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="font-medium text-lilac underline-offset-4 hover:underline"
          >
            choose a file
          </button>
        </p>
        <p className="mt-1 text-xs text-mist">
          PNG with transparency works best. Square art gives the cleanest result.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </div>

      {error && (
        <p className="mt-4 flex items-center gap-2 text-sm text-softRed">
          <AlertTriangle size={15} aria-hidden /> {error}
        </p>
      )}

      {outputs.length > 0 && (
        <>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {outputs.map((o) => (
              <div key={o.size} className="rounded-xl border border-veil bg-ink p-4 text-center">
                <div className="grid h-[120px] place-items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.url}
                    alt={`${NOUN[mode]} at ${o.size} by ${o.size} pixels`}
                    width={o.size}
                    height={o.size}
                    style={{ width: o.size, height: o.size }}
                  />
                </div>
                <p className="mt-2 font-mono text-sm text-volt">
                  {o.size} x {o.size}
                </p>
                <p className={`font-mono text-xs ${o.bytes > MAX_BYTES ? "text-softRed" : "text-mist"}`}>
                  {formatBytes(o.bytes)}
                </p>
                <a
                  href={o.url}
                  download={`${fileName || mode}-${o.size}.png`}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg border border-veil px-3 py-1.5 font-body text-xs text-lilac transition-colors hover:border-lilac/60"
                >
                  <Download size={13} aria-hidden /> PNG
                </a>
              </div>
            ))}
          </div>

          {outputs.some((o) => o.bytes > MAX_BYTES) && (
            <p className="mt-4 flex items-center gap-2 text-sm text-softRed">
              <AlertTriangle size={15} aria-hidden />
              One file is over Twitch&apos;s 1 MB limit. Simplify the artwork or use fewer colors.
            </p>
          )}

          {/* Readability check on real Twitch backgrounds */}
          <div className="mt-8">
            <p className="font-display text-xs uppercase tracking-[0.25em] text-lilac">
              {mode === "points" ? "How it reads in the rewards menu" : "How it reads in chat"}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { bg: "#18181b", fg: "#efeff1", label: "Dark mode" },
                { bg: "#efeff1", fg: "#18181b", label: "Light mode" },
              ].map((theme) => (
                <div key={theme.label} className="overflow-hidden rounded-xl border border-veil">
                  <div className="px-4 py-3" style={{ background: theme.bg }}>
                    {mode === "points" ? (
                      <span
                        className="inline-flex items-center gap-2 rounded px-2.5 py-1.5 text-[13px]"
                        style={{ background: "#3a3a3d", color: "#efeff1" }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={outputs.find((o) => o.size === smallest)?.url}
                          alt=""
                          style={{ width: 28, height: 28 }}
                        />
                        Highlight My Message
                        <span style={{ opacity: 0.7 }}>100</span>
                      </span>
                    ) : (
                      <p className="text-[13px] leading-relaxed" style={{ color: theme.fg }}>
                        <span style={{ color: "#ff3fa5", fontWeight: 700 }}>streamer_fan:</span> this is
                        so good{" "}
                        {outputs
                          .filter((o) => o.size !== Math.max(...outputs.map((x) => x.size)))
                          .map((o) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              key={o.size}
                              src={o.url}
                              alt=""
                              style={{
                                width: o.size,
                                height: o.size,
                                display: "inline-block",
                                verticalAlign: "middle",
                              }}
                            />
                          ))}
                      </p>
                    )}
                  </div>
                  <p className="bg-ink px-4 py-2 font-mono text-[11px] text-mist">{theme.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-mist">
              If you cannot tell what it is at the smallest size, simplify it: fewer details,
              bolder shapes, stronger outline. That is the whole secret to art that gets used.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
