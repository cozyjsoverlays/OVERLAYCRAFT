import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { EmoteResizer } from "@/components/tools/EmoteResizer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Twitch Emote, Sub Badge & Channel Point Resizer - Free Tool",
  description:
    "Free Twitch resizer: drop in your art and get every required size for emotes (112/56/28), sub badges (72/36/18) and channel point icons (112/56/28), with a live preview.",
  keywords: [
    "twitch emote resizer",
    "twitch emote size",
    "twitch sub badge size",
    "twitch channel point icon size",
    "channel point image size",
    "emote resizer",
    "twitch emote maker",
    "sub badge resizer",
  ],
  alternates: { canonical: "/free-tools/emote-resizer" },
};

const FAQ_ITEMS = [
  {
    question: "What size should a Twitch emote be?",
    answer:
      "Upload at 112x112 pixels. Twitch also uses 56x56 and 28x28 versions, and this tool generates all three. Files must be PNG and under 1 MB each.",
  },
  {
    question: "What size are Twitch sub badges?",
    answer:
      "72x72, 36x36 and 18x18 pixels, PNG, under 1 MB. Switch this tool to sub badge mode and it produces all three from one image.",
  },
  {
    question: "What size are Twitch channel point icons?",
    answer:
      "Channel point reward icons use 112x112, 56x56 and 28x28 pixels, PNG. They display very small in the rewards menu, so a single bold shape reads far better than detailed art.",
  },
  {
    question: "Are my images uploaded anywhere?",
    answer:
      "No. The resizing happens entirely inside your browser using canvas - your artwork never leaves your computer and nothing is stored on our servers.",
  },
  {
    question: "Why does my emote look like a blob at 28px?",
    answer:
      "Too much detail. Emotes are read at thumbnail size, so simplify: bolder shapes, fewer colors, a strong outline and high contrast. Use the chat preview to check before uploading to Twitch.",
  },
];

export default function EmoteResizerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Twitch Emote & Sub Badge Resizer",
    url: `${SITE.url}/free-tools/emote-resizer`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="pb-6 text-xs text-mist" aria-label="Breadcrumb">
        <Link href="/free-tools" className="hover:text-lilac">Free Tools</Link>
        <span className="px-1.5">/</span>
        <span className="text-blush/70">Emote & Sub Badge Resizer</span>
      </nav>

      <SectionHeading label="Free tool" title="Emote, Badge & Channel Point Resizer" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        Drop in one image and get every size Twitch asks for - emotes, sub badges or
        channel point icons - plus a preview of how it actually reads at small sizes.
        Everything happens in your browser, so your art is never uploaded.
      </p>

      <div className="mt-8">
        <EmoteResizer />
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-blush">The sizes Twitch requires</h2>
        <div className="mt-5 overflow-x-auto rounded-xl border border-veil">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-veil bg-ink2/70">
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-lilac">Asset</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-lilac">Sizes (px)</th>
                <th className="px-4 py-3 font-display text-xs uppercase tracking-wider text-lilac">Limits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-veil">
              <tr>
                <td className="px-4 py-3 text-blush/85">Emotes</td>
                <td className="px-4 py-3 font-mono text-volt">112, 56, 28</td>
                <td className="px-4 py-3 text-blush/85">PNG, under 1 MB each</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-blush/85">Sub badges</td>
                <td className="px-4 py-3 font-mono text-volt">72, 36, 18</td>
                <td className="px-4 py-3 text-blush/85">PNG, under 1 MB each</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-blush/85">Channel point icons</td>
                <td className="px-4 py-3 font-mono text-volt">112, 56, 28</td>
                <td className="px-4 py-3 text-blush/85">PNG, under 1 MB each</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-blush">Making art that survives 28 pixels</h2>
        <ul className="mt-4 space-y-3">
          {[
            "Design big, judge small. Draw at 500px+, then check it at 28px before you fall in love with the details.",
            "One idea per emote. A face, a hand, a single object. Two ideas at 28px equals mush.",
            "Add a contrasting outline. It stops the art dissolving into both dark and light chat backgrounds.",
            "Push the expression further than feels natural. Subtlety disappears at thumbnail size.",
          ].map((item) => (
            <li key={item.slice(0, 30)} className="flex items-start gap-2.5 leading-relaxed text-blush/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-lilac" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-blush">FAQ</h2>
        <div className="mt-5">
          <FAQAccordion items={FAQ_ITEMS} />
        </div>
      </section>

      <div className="mt-14 rounded-2xl border border-veil bg-ink2/70 p-7 text-center backdrop-blur">
        <h2 className="font-display text-xl text-blush">
          Want emotes that{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">match your overlay?</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          Every pack ships bonus emotes in the same art style, and custom commissions include a full emote and sub badge set.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link href="/overlays" className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]">
            Browse Overlays
          </Link>
          <Link href="/custom" className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush">
            Custom emote sets
          </Link>
        </div>
      </div>
    </div>
  );
}
