import { Send, Youtube, ExternalLink } from "lucide-react";
import { LINKS } from "@/data/site";
import { EtsyIcon } from "@/components/icons";

export function NewsletterCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-subtle bg-surface p-8 text-center md:p-12">
      <div
        aria-hidden
        className="glow-blob absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 bg-cyan opacity-20"
      />
      <div className="relative mx-auto max-w-xl">
        <h2 className="text-2xl font-extrabold text-heading md:text-3xl">
          Get a <span className="gradient-text">free pack</span> &amp; new drops
        </h2>
        <p className="mt-3 text-base text-body">
          Join our Telegram for a free stream pack, follow along on YouTube for
          tutorials, or browse the full collection on Etsy.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-3 text-sm font-bold text-cyan transition-all hover:bg-cyan/20 sm:w-auto"
          >
            <Send size={16} /> Join Telegram
          </a>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-subtle bg-white/5 px-5 py-3 text-sm font-bold text-heading transition-all hover:border-lavender/40 sm:w-auto"
          >
            <Youtube size={16} className="text-pink" /> Watch on YouTube
          </a>
          <a
            href={LINKS.etsy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-5 py-3 text-sm font-bold text-base shadow-glow transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            <EtsyIcon className="h-4 w-4" /> Shop on Etsy <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
