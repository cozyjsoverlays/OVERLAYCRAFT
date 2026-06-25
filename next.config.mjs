/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export → a plain ./out folder of HTML/CSS/JS. No Node/Next runtime
  // needed at serve time, which makes deploying on Hostinger reliable. The site
  // is a static catalog that sells on Etsy, so no server features are required.
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true, // required for static export; serves images as-is
    remotePatterns: [
      { protocol: "https", hostname: "i.etsystatic.com" },
      { protocol: "https", hostname: "v.etsystatic.com" },
    ],
  },
};

export default nextConfig;
