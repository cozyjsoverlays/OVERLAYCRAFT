/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standard Next.js server build: Hostinger's Web App platform detects the
  // framework and runs Next's own server, which rejects `output: "export"`.
  // Every page is still fully pre-rendered at build time (SSG).
  reactStrictMode: true,
  images: {
    unoptimized: true, // plain <img> assets; no runtime optimizer needed
    remotePatterns: [
      { protocol: "https", hostname: "i.etsystatic.com" },
      { protocol: "https", hostname: "v.etsystatic.com" },
    ],
  },
  async headers() {
    return [
      {
        // HTML pages: never let the CDN hold them past a revalidation window.
        // Next's default (s-maxage=31536000) made Hostinger's CDN serve
        // 5-day-old HTML referencing chunk files deleted by newer deploys →
        // "Application error" on every cached page after a deploy.
        // Hashed /_next/static assets keep their long immutable cache.
        source: "/((?!_next/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=300, stale-while-revalidate=60",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
