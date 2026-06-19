import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/AuroraBackground";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { BlogCard } from "@/components/BlogCard";
import { BLOG_POSTS, getPost } from "@/data/blog";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <article>
          <header className="relative isolate overflow-hidden pb-8 pt-36 md:pt-44">
            <AuroraBackground />
            <div className="container-page max-w-3xl">
              <Reveal>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-lavender transition-colors hover:text-pink"
                >
                  <ArrowLeft size={15} /> All articles
                </Link>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full border border-subtle bg-lavender/10 px-2.5 py-1 font-bold text-lavender">
                    {post.tag}
                  </span>
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {post.readingTime}
                  </span>
                </div>
                <h1 className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight text-heading">
                  {post.title}
                </h1>
                <p className="mt-5 text-lg text-body">{post.excerpt}</p>
              </Reveal>
            </div>
          </header>

          <div className="container-page max-w-3xl pb-16">
            <div className="prose-cozy mt-4 flex flex-col gap-8">
              {post.body.map((block, i) => (
                <Reveal key={i} delay={0.04}>
                  <section>
                    {block.heading && (
                      <h2 className="mb-3 text-xl font-bold text-heading md:text-2xl">
                        {block.heading}
                      </h2>
                    )}
                    <div className="flex flex-col gap-4">
                      {block.paragraphs.map((p, j) => (
                        <p
                          key={j}
                          className="text-[17px] leading-relaxed text-body"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </article>

        <div className="container-page max-w-3xl pb-16">
          <NewsletterCTA />
        </div>

        <section className="section-pad border-t border-subtle pt-16">
          <div className="container-page">
            <h2 className="text-2xl font-extrabold text-heading">
              Keep reading
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
