import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass group flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover"
    >
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="rounded-full border border-subtle bg-lavender/10 px-2.5 py-1 font-bold text-lavender">
          {post.tag}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} /> {post.readingTime}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug text-heading transition-colors group-hover:text-lavender">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-sm text-body">{post.excerpt}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-lavender">
        Read article
        <ArrowRight
          size={15}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
