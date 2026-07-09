"use client";

import { useEffect, useRef, useState } from "react";
import { Share2 } from "lucide-react";
import { SITE } from "@/data/site";

interface ShareButtonProps {
  title: string;
  /** Site-relative product path, e.g. /overlays/crow/dark-gothic-raven */
  path: string;
  etsyUrl: string;
  /** First thumbnail — passed to Pinterest as media. */
  thumbnail?: string;
  className?: string;
}

function intentLinks(url: string, title: string, media?: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return [
    { label: "X / Twitter", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    {
      label: "Pinterest",
      href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}${
        media ? `&media=${encodeURIComponent(media)}` : ""
      }`,
    },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];
}

export function ShareButton({ title, path, etsyUrl, thumbnail, className = "" }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const url = `${SITE.url}${path}`;
  const media = thumbnail ? `${SITE.url}${thumbnail}` : undefined;

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  async function share(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: `${title} — ${SITE.name}`, url });
        return;
      } catch {
        /* user dismissed — fall through to popover */
      }
    }
    setOpen((o) => !o);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        aria-label="Share this overlay"
        onClick={share}
        className="grid h-9 w-9 place-items-center rounded-full border border-veil bg-ink2/70 backdrop-blur transition-transform hover:scale-110 active:scale-95"
      >
        <Share2 size={15} className="text-lilac" aria-hidden />
      </button>

      {open && (
        <div
          className="absolute right-0 top-11 z-30 w-52 rounded-xl border border-veil bg-ink2/95 p-2 shadow-volt-soft backdrop-blur"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={copyLink}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-blush/85 hover:bg-abyss/40 hover:text-lilac"
          >
            {copied ? "Link copied!" : "Copy link"}
          </button>
          {intentLinks(url, title, media).map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-sm text-blush/85 hover:bg-abyss/40 hover:text-lilac"
            >
              {l.label}
            </a>
          ))}
          <div className="my-1 border-t border-veil" />
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(etsyUrl)}&text=${encodeURIComponent(title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-xs text-mist hover:bg-abyss/40 hover:text-lilac"
          >
            Share Etsy listing instead
          </a>
        </div>
      )}
    </div>
  );
}
