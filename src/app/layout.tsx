import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { identity } from "@/data/site";
import { siteOrigin, siteTitle, siteDescription, socialImage } from "@/lib/seo";
import { motionStyles } from "@/lib/motion";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  icons: { icon: "/icon.svg" },
  title: siteTitle,
  description: siteDescription,
  authors: [{ name: identity.fullName, url: siteOrigin }],
  creator: identity.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: identity.fullName,
    url: siteOrigin,
    locale: "en_IN",
    images: [socialImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImage.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#d4b89d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={motionStyles}
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{let p;try{p=localStorage.getItem("portfolio-motion-v1")}catch{}document.documentElement.dataset.motion=p==="reduce"||p!=="full"&&matchMedia("(prefers-reduced-motion: reduce)").matches?"reduce":"full"})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-ink">{children}</body>
    </html>
  );
}
