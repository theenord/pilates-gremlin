import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// NOTE: update this to the real production domain once the site is live.
// It is used to resolve absolute URLs for Open Graph / canonical tags.
const siteUrl = "https://www.pilatesgremlin.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pilates Gremlin | Pilates in Lake Forest & Orange County",
    template: "%s | Pilates Gremlin",
  },
  description:
    "Pilates Gremlin teaches mat Pilates at Neaumix Fit in Lake Forest, CA. Group classes and private sessions serving Lake Forest, Mission Viejo, Laguna Hills, Irvine, and all of Orange County.",
  keywords: [
    "Pilates",
    "Pilates Lake Forest",
    "Pilates Orange County",
    "mat Pilates",
    "Pilates classes",
    "private Pilates",
    "Neaumix Fit",
    "Mission Viejo Pilates",
    "Laguna Hills Pilates",
    "Laguna Niguel Pilates",
    "Aliso Viejo Pilates",
    "Foothill Ranch Pilates",
    "Rancho Santa Margarita Pilates",
    "Tustin Pilates",
    "Irvine Pilates",
    "Costa Mesa Pilates",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pilates Gremlin | Pilates in Lake Forest & Orange County",
    description:
      "Group mat classes and private Pilates sessions at Neaumix Fit in Lake Forest, serving all of Orange County.",
    url: siteUrl,
    siteName: "Pilates Gremlin",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 1200,
        alt: "Pilates Gremlin, Pilates instructor in Lake Forest, Orange County",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pilates Gremlin | Pilates in Lake Forest & Orange County",
    description:
      "Group mat classes and private Pilates sessions at Neaumix Fit in Lake Forest, serving all of Orange County.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#6D8EC5",
  width: "device-width",
  initialScale: 1,
};

// LocalBusiness structured data. Intentionally omits phone number and street
// address per the brand's privacy preference; areaServed = Orange County.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Pilates Gremlin",
  description:
    "Pilates instruction including group mat classes and private sessions at Neaumix Fit in Lake Forest, CA, serving Orange County.",
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  location: {
    "@type": "Place",
    name: "Neaumix Fit",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lake Forest",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Orange County, California" },
    { "@type": "City", name: "Lake Forest" },
    { "@type": "City", name: "Mission Viejo" },
    { "@type": "City", name: "Laguna Hills" },
    { "@type": "City", name: "Laguna Niguel" },
    { "@type": "City", name: "Aliso Viejo" },
    { "@type": "City", name: "Foothill Ranch" },
    { "@type": "City", name: "Rancho Santa Margarita" },
    { "@type": "City", name: "Tustin" },
    { "@type": "City", name: "Irvine" },
    { "@type": "City", name: "Costa Mesa" },
  ],
  sameAs: [
    "https://www.instagram.com/thepilatesgremlin",
    "https://www.patreon.com/ThePilatesGremlin",
    "https://substack.com/@thepilatesgremlin",
    "https://sweatpals.com/host/The_Pilates_Gremlin",
  ],
  knowsAbout: ["Pilates", "Mat Pilates", "Posture", "Core strength", "Mobility"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink">
        {/* Skip link for keyboard / screen-reader users */}
        <a
          href="#main"
          className="sr-only rounded-lg bg-primary px-4 py-2 text-white shadow-lg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
        >
          Skip to main content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
