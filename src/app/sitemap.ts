import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { BLOG_POSTS } from "@/data/blog";
import { productPath } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/overlays", "/custom", "/tutorials", "/free-tools", "/free-tools/emote-resizer", "/free-tools/twitch-name-generator", "/free-tools/twitch-bio-generator", "/about", "/faq", "/contact", "/blog", "/terms", "/privacy", "/license"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const categoryPages = CATEGORIES.map((c) => ({
    url: `${SITE.url}/overlays/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${SITE.url}${productPath(p)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
