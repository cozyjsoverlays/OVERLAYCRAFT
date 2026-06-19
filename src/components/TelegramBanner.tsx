import { Send, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { LINKS } from "@/data/site";

export function TelegramBanner() {
  return (
    <section className="container-page py-10">
      <Reveal>
        <a
          href={LINKS.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-between gap-5 overflow-hidden rounded-3xl border border-cyan/25 bg-gradient-to-r from-cyan/10 via-surface to-surface p-6 text-center transition-all hover:border-cyan/50 hover:shadow-glow-cyan md:flex-row md:p-8 md:text-left"
        >
          <div
            aria-hidden
            className="glow-blob absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 bg-cyan opacity-30"
          />
          <div className="relative flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan/40 bg-cyan/10 text-cyan">
              <Send size={22} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-heading md:text-2xl">
                Get a <span className="text-cyan">FREE</span> Stream Pack
              </h2>
              <p className="mt-1 text-sm text-body">
                Join our Telegram community and grab your freebie today.
              </p>
            </div>
          </div>
          <span className="relative inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2.5 text-sm font-bold text-cyan transition-all group-hover:bg-cyan/20">
            Join Our Telegram
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
