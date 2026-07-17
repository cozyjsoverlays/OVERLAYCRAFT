import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { BLOG_POSTS } from "@/data/blog";
import { productPath } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/overlays", "/custom", "/about", "/faq", "/contact", "/blog", "/terms", "/privacy", "/license"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })
  );

  const categoryPages = CATEGORIES.map((c) => ({
    url: `${SITE.url}/overlays/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${SITE.url}${productPath(p)}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
