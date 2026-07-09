import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Blog — Stream Design Notes from the Atelier",
  description:
    "Guides on stream overlays, OBS setup, channel branding and going live with style. New posts landing soon.",
  alternates: { canonical: "/blog" },
};

/** SEO growth surface — swap PLANNED for real MDX/CMS posts when ready. */
const PLANNED = [
  "How to set up an animated overlay in OBS in under 5 minutes",
  "Twitch overlay sizes & safe zones — the 2026 cheat sheet",
  "Why animated overlays out-retain static ones (and when they don't)",
  "Kick vs Twitch: does your overlay need to change?",
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <SectionHeading label="From the atelier" title="Blog" />
      <p className="mt-6 leading-relaxed text-mist">
        Stream design notes, OBS guides and channel-branding craft — being
        written between commissions. First posts land soon; here&apos;s what&apos;s
        on the drafting table:
      </p>
      <ul className="mt-8 space-y-3">
        {PLANNED.map((title) => (
          <li key={title} className="rounded-xl border border-veil bg-ink2/70 px-5 py-4 text-sm text-blush/85">
            {title}
            <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-lilac">Soon</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-mist">
        Want these in your inbox?{" "}
        <Link href="/#" className="text-lilac underline-offset-4 hover:underline">
          Join the newsletter below
        </Link>{" "}
        — new drops included.
      </p>
    </div>
  );
}
