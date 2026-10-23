import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Inter_Tight,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { identity } from "@/data/site";
import { siteOrigin, siteTitle, siteDescription, socialImage } from "@/lib/seo";
import { motionStyles } from "@/lib/motion";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
  themeColor: "#fff8e7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      style={motionStyles}
      suppressHydrationWarning
      className={`${bricolage.variable} ${interTight.variable} ${instrumentSerif.variable} antialiased`}
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
