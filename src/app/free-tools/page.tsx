import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Free Streamer Tools - 10 Free Twitch, YouTube & Kick Utilities",
  description:
    "10 free tools for streamers: emote & badge resizer, name, bio, title, tags & chat command generators, fancy fonts, a color palette maker, an OBS countdown timer and a bitrate calculator. No signup.",
  alternates: { canonical: "/free-tools" },
};

const TOOLS = [
  { href: "/free-tools/emote-resizer", glyph: "😹", title: "Emote, Badge & Point Resizer", desc: "Drop one image, get every Twitch emote, sub badge and channel-point size, with a tiny-size preview. Nothing leaves your browser." },
  { href: "/free-tools/twitch-name-generator", glyph: "✨", title: "Twitch Name Generator", desc: "Pick a vibe, add a word, get 6 stream-ready usernames built to be said out loud in a raid." },
  { href: "/free-tools/twitch-bio-generator", glyph: "📝", title: "Twitch Bio Generator", desc: "Tell it what you stream and get channel bios under Twitch's 300-character limit, ready to paste." },
  { href: "/free-tools/stream-title-generator", glyph: "🏷️", title: "Stream Title Generator", desc: "Enter your game and a vibe, get catchy titles built to earn clicks in Twitch browse." },
  { href: "/free-tools/chat-command-generator", glyph: "🤖", title: "Chat Command Generator", desc: "Build ready-to-paste Nightbot or StreamElements !commands for your socials, discord, tips and more." },
  { href: "/free-tools/twitch-tags-generator", glyph: "🔖", title: "Twitch Tags Generator", desc: "Type what you stream and get up to 10 relevant discovery tags so the right viewers find you." },
  { href: "/free-tools/fancy-font-generator", glyph: "🔤", title: "Fancy Font Generator", desc: "Turn plain text into bold, script, bubble and more unicode styles for your bio and display name." },
  { href: "/free-tools/color-palette-generator", glyph: "🎨", title: "Color Palette Generator", desc: "Pick a vibe, get a cohesive 5-color palette with hex codes for your overlays, alerts and panels." },
  { href: "/free-tools/countdown-timer", glyph: "⏱️", title: "Starting Soon Countdown", desc: "Set minutes and a message, then add it to OBS as a browser source for a clean countdown screen." },
  { href: "/free-tools/bitrate-calculator", glyph: "📶", title: "Bitrate Calculator", desc: "Enter your upload speed and quality to get Twitch-safe OBS bitrate and encoding settings." },
];

export default function FreeToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Streamer Tools",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `https://overlaycraft.com${t.href}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SectionHeading label="On the house" title="10 Free Streamer Tools" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        A full toolkit from the studio behind hundreds of overlay worlds. No signup, no
        watermark, no catch - everything runs right in your browser and stays free forever.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex flex-col rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-lilac/50 hover:shadow-volt-soft"
          >
            <span className="text-3xl" aria-hidden>{t.glyph}</span>
            <h2 className="mt-3 font-display text-lg text-blush group-hover:text-lilac">{t.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{t.desc}</p>
            <span className="mt-4 text-sm font-medium text-lilac">Open the tool →</span>
          </Link>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-veil bg-ink2/70 p-8 text-center backdrop-blur">
        <h2 className="font-display text-xl text-blush">
          Tools got you moving? Now get{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">the look.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          Animated overlay packs with real video previews, instant download, straight into OBS.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/overlays" className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
            Browse Overlays
          </Link>
          <Link href="/custom" className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush">
            Commission a custom set
          </Link>
        </div>
      </div>
    </div>
  );
}
