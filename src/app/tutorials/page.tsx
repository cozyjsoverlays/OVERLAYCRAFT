import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { LiteYouTube } from "@/components/LiteYouTube";
import { SITE, TUTORIALS, YOUTUBE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "Stream Setup Tutorials - OBS, Overlays & Facecam Video Guides",
  description:
    "Free video tutorials from VectorKingStudio: set up OBS for streaming, add animated overlays, frame your facecam and go live. Watch and follow along.",
  alternates: { canonical: "/tutorials" },
};

export default function TutorialsPage() {
  const jsonLd = TUTORIALS.map((t) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: t.title,
    description: t.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${t.youtubeId}/maxresdefault.jpg`,
    uploadDate: t.date,
    contentUrl: `https://www.youtube.com/watch?v=${t.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${t.youtubeId}`,
    publisher: { "@type": "Organization", name: SITE.name },
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionHeading label="Watch & follow along" title="Stream Setup Tutorials" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        Step-by-step video guides from the studio - get OBS configured, your
        overlays in place, and your channel live. New tutorials land on the{" "}
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lilac underline-offset-4 hover:underline"
        >
          VectorKingStudio YouTube channel
        </a>
        .
      </p>

      <div className="mt-10 space-y-14">
        {TUTORIALS.map((t) => (
          <article key={t.youtubeId}>
            <LiteYouTube id={t.youtubeId} title={t.title} />
            <h2 className="mt-5 font-display text-xl text-blush md:text-2xl">{t.title}</h2>
            <p className="mt-3 leading-relaxed text-mist">{t.description}</p>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl border border-veil bg-ink2/70 p-7 text-center backdrop-blur">
        <h2 className="font-display text-xl text-blush">
          Got OBS ready? Now give it{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">a world.</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          127 animated overlay packs with real preview videos - instant download, drops straight into the setup from the tutorial.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/overlays"
            className="rounded-xl bg-volt px-6 py-3 font-body text-sm font-medium text-white shadow-volt transition-all hover:bg-voltDim active:scale-[0.97]"
          >
            Browse Overlays
          </Link>
          <Link
            href="/blog/how-to-add-overlay-to-obs"
            className="rounded-xl border border-veil px-6 py-3 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush"
          >
            Read: Add an overlay to OBS
          </Link>
        </div>
      </div>
    </div>
  );
}
