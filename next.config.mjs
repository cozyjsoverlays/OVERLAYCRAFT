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
};

export default nextConfig;
