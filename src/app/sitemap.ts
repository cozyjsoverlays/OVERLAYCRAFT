import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { BLOG_POSTS } from "@/data/blog";
import { PACKS } from "@/data/packs";
import { TOOLS } from "@/lib/tools-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/free-tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE.url}/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const tools: MetadataRoute.Sitemap = TOOLS.filter((t) => t.live).map((t) => ({
    url: `${SITE.url}/free-tools/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const products: MetadataRoute.Sitemap = PACKS.map((p) => ({
    url: `${SITE.url}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const posts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...tools, ...products, ...posts];
}
