import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorGlow from "./components/CursorGlow";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import { StructuredData } from "./components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "CS Night 2026 — A Masquerade Grand Ball",
  description:
    "FEU Tech ACM's most prestigious grand ball for CS students. June 27, 2026 · FEU Tech 17th Floor Gymnasium, Manila. A Masquerade Grand Ball celebrating excellence and community.",
  keywords: [
    "CS Night",
    "CS Night 2026",
    "csnight",
    "FEU Tech ACM",
    "masquerade ball",
    "CS Night FEU Tech",
    "Computer Science Night",
    "FEU Tech grand ball",
    "ACM CS Night",
  ],
  applicationName: "CS Night 2026",
  authors: [{ name: "FEU Tech ACM Student Chapter" }],
  creator: "FEU Tech ACM Student Chapter",
  publisher: "FEU Tech ACM Student Chapter",
  category: "event",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: { google: "CvsQ4yAhXm6HhYEL-IVoz0AYwERBiCpu-zmEocasdFQ" },
  openGraph: {
    title: "CS Night 2026 — A Masquerade Grand Ball",
    description:
      "FEU Tech ACM's most prestigious grand ball for CS students. June 27, 2026 · FEU Tech, Manila.",
    url: SITE_URL,
    siteName: "CS Night 2026",
    locale: "en_PH",
    type: "website",
    // Dynamic opengraph-image.tsx auto-wires here (no static image entry needed)
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Night 2026 — A Masquerade Grand Ball",
    description:
      "FEU Tech ACM's most prestigious grand ball for CS students. June 27, 2026 · FEU Tech, Manila.",
    // Dynamic opengraph-image.tsx auto-wires here too
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A1628",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PH">
      <head>
        <link rel="stylesheet" href="/hero.css" />
        <StructuredData />
      </head>
      <body>
        <CursorGlow />
        {children}
        <Analytics />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
