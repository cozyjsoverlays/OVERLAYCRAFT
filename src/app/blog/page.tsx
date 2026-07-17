import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Stream Overlay Guides & OBS Setup Tutorials",
  description:
    "Practical guides from the OverlayCraft atelier: OBS overlay setup, Twitch graphic sizes, animated vs static overlays, Kick and VTuber setups.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-8">
      <SectionHeading label="From the atelier" title="Stream Design Guides" />
      <p className="mt-6 max-w-2xl leading-relaxed text-mist">
        OBS setup, overlay sizes, and the craft of making a channel feel like a
        place — written between commissions by the studio behind 127 overlay
        worlds.
      </p>
      <div className="mt-10 space-y-5">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-veil bg-ink2/70 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-lilac/50 hover:shadow-volt-soft md:p-8"
          >
            <p className="font-mono text-xs text-mist">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <h2 className="mt-2 font-display text-xl text-blush md:text-2xl">{post.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mist">{post.excerpt}</p>
            <span className="mt-4 inline-block text-sm font-medium text-lilac">Read the guide →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
