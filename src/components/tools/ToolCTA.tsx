import Link from "next/link";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";

interface ToolCTAProps {
  heading: string;
  text: string;
  href: string;
  label: string;
}

/** Soft, on-brand conversion nudge shown after the user gets value from a tool. */
export function ToolCTA({ heading, text, href, label }: ToolCTAProps) {
  const external = /^https?:/i.test(href);
  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-lavender/30 bg-gradient-to-br from-surface-2 to-surface p-7 text-center shadow-card">
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-lavender/15 text-lavender">
        <Sparkles size={20} />
      </span>
      <h2 className="mt-4 text-xl font-extrabold text-heading md:text-2xl">
        {heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-body">{text}</p>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
        >
          {label} <ExternalLink size={15} />
        </a>
      ) : (
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5"
        >
          {label} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
