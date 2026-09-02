import type { Metadata } from "next";
import Script from "next/script";
import { Cinzel, Outfit, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WishlistProvider } from "@/components/WishlistProvider";
import { SITE, SOCIAL_LINKS } from "@/data/site";
import "./globals.css";

const display = Cinzel({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600"] });
const body = Outfit({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - Animated Twitch, YouTube & Kick Stream Overlays`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  authors: [{ name: SITE.shop }],
  creator: SITE.shop,
  publisher: SITE.shop,
  category: "Stream Overlays & Graphics",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: SITE.name,
    type: "website",
    url: SITE.url,
    title: `${SITE.name} - Your Stream Is About to Feel Like a Different Place`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Your Stream Is About to Feel Like a Different Place`,
    description: SITE.description,
  },
  icons: { icon: "/favicon.svg" },
};

/**
 * Site-wide structured data. One Organization node (brand identity, logo and
 * every verified social profile via sameAs - feeds Google's brand/Knowledge
 * panel) and one WebSite node with a SearchAction so Google can show a
 * sitelinks search box that points into the catalog.
 */
const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: SITE.shop,
      url: SITE.url,
      logo: `${SITE.url}/favicon.svg`,
      description: SITE.description,
      sameAs: SOCIAL_LINKS.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.tagline,
      publisher: { "@id": `${SITE.url}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE.url}/overlays?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Set the theme class before paint to avoid a flash of the wrong mode. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
        <WishlistProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </WishlistProvider>

        {/* Google Analytics 4 (loads after the page is interactive) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2KPSDPGHLH"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2KPSDPGHLH');`}
        </Script>
      </body>
    </html>
  );
}
