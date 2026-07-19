import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { BLOG_POSTS, getPost } from "@/data/blog";
import { SITE } from "@/data/site";
import { getProduct } from "@/data/products";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";

/** Render inline [label](/href) links inside body copy as keyword-rich anchors. */
function withLinks(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return (
      <Link key={i} href={m[2]} className="font-medium text-lilac underline-offset-4 hover:underline">
        {m[1]}
      </Link>
    );
  });
}

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: { "@type": "Organization", name: SITE.name },
      mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    },
  ];
  if (post.faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="pb-6 text-xs text-mist" aria-label="Breadcrumb">
        <Link href="/blog" className="hover:text-lilac">Blog</Link>
        <span className="px-1.5">/</span>
        <span className="text-blush/70">{post.title}</span>
      </nav>

      <p className="font-mono text-xs text-mist">
        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        {" · "}OverlayCraft Atelier
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-blush md:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-mist">{post.excerpt}</p>

      <div className="mt-4 flex items-center gap-3">
        <span className="h-px w-16 bg-veil" />
        <span className="h-1.5 w-1.5 rotate-45 bg-lilac" />
        <span className="h-px w-16 bg-veil" />
      </div>

      {post.sections.map((s) => (
        <section key={s.h2} className="mt-10">
          <h2 className="font-display text-2xl text-blush">{s.h2}</h2>
          {s.paragraphs?.map((para) => (
            <p key={para.slice(0, 40)} className="mt-4 leading-relaxed text-blush/85">
              {withLinks(para)}
            </p>
          ))}
          {s.list &&
            (s.ordered ? (
              <ol className="mt-4 list-decimal space-y-3 pl-5 marker:font-mono marker:text-volt">
                {s.list.map((item) => (
                  <li key={item.slice(0, 40)} className="leading-relaxed text-blush/85">{withLinks(item)}</li>
                ))}
              </ol>
            ) : (
              <ul className="mt-4 space-y-3">
                {s.list.map((item) => (
                  <li key={item.slice(0, 40)} className="flex items-start gap-2.5 leading-relaxed text-blush/85">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-lilac" aria-hidden />
                    {withLinks(item)}
                  </li>
                ))}
              </ul>
            ))}
          {s.table && (
            <div className="mt-5 overflow-x-auto rounded-xl border border-veil">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-veil bg-ink2/70">
                    {s.table.head.map((h) => (
                      <th key={h} className="px-4 py-3 font-display text-xs uppercase tracking-wider text-lilac">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-veil">
                  {s.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, ci) => (
                        <td key={cell} className={`px-4 py-3 ${ci === 1 ? "font-mono text-volt" : "text-blush/85"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {post.faq && (
        <section className="mt-12">
          <h2 className="font-display text-2xl text-blush">FAQ</h2>
          <div className="mt-5">
            <FAQAccordion items={post.faq} />
          </div>
        </section>
      )}

      {/* Shoppable packs from this guide */}
      {(() => {
        const packs = post.featuredPacks.map(getProduct).filter(Boolean);
        if (!packs.length) return null;
        return (
          <section className="mt-16">
            <SectionHeading label="Gear up" title="Packs From This Guide" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {packs.map((p) => (
                <ProductCard key={p!.slug} product={p!} />
              ))}
            </div>
          </section>
        );
      })()}

      {/* CTA + internal links */}
      <div className="mt-14 rounded-2xl border border-veil bg-ink2/70 p-7 text-center backdrop-blur">
        <h2 className="font-display text-xl text-blush">
          Ready to make your stream feel like{" "}
          <span className="bg-gradient-to-r from-lilac to-volt bg-clip-text text-transparent">a place?</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-mist">
          127 animated overlay worlds - real preview videos on every pack, instant download, OBS-ready.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {post.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-xl border border-veil px-4 py-2.5 font-body text-sm text-lilac transition-colors hover:border-lilac/60 hover:text-blush"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
