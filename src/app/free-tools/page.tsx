import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Free Streamer Tools - Twitch Name & Bio Generators",
  description:
    "Free tools for streamers: generate a Twitch username that fits your vibe and write a bio that makes people follow. No signup, instant results.",
  alternates: { canonical: "/free-tools" },
};

const TOOLS = [
  {
    href: "/free-tools/twitch-name-generator",
    glyph: "✨",
    title: "Twitch Name Generator",
    desc: "Pick a vibe - cozy, gothic, kawaii, epic or chaotic - add an optional word, and get 8 stream-ready usernames to copy.",
  },
  {
    href: "/free-tools/twitch-bio-generator",
    glyph: "📝",
    title: "Twitch Bio Generator",
    desc: "Tell it what you stream and the vibe you want, get 3 ready-to-paste channel bios under Twitch's 300-character limit.",
  },
];

export default function FreeToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <SectionHeading label="On the house" title="Free Streamer Tools" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        Little helpers from the studio behind 127 overlay worlds. No signup, no
        watermark, no catch - just tools that get your channel moving.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block rounded-2xl border border-veil bg-ink2/70 p-7 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-lilac/50 hover:shadow-volt-soft"
          >
            <span className="text-3xl" aria-hidden>{t.glyph}</span>
            <h2 className="mt-3 font-display text-xl text-blush">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{t.desc}</p>
            <span className="mt-4 inline-block text-sm font-medium text-lilac">Open the tool →</span>
          </Link>
        ))}
      </div>
      <p className="mt-10 text-sm text-mist">
        Got your name and bio? The next step is looking the part -{" "}
        <Link href="/overlays" className="text-lilac underline-offset-4 hover:underline">
          browse 127 animated overlay packs
        </Link>{" "}
        with real video previews.
      </p>
    </div>
  );
}
