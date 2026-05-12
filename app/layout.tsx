import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "./components/CursorGlow";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CS Night 2026 — A Masquerade Grand Ball",
  description:
    "The most prestigious grand ball of the year for Computer Science students. June 27, 2026. One night. A thousand memories.",
  openGraph: {
    title: "CS Night 2026 — A Masquerade Grand Ball",
    description:
      "The most prestigious grand ball of the year for Computer Science students. June 27, 2026. One night. A thousand memories.",
    images: [
      {
        url: "/cs-night.jpg",
        width: 1080,
        height: 1080,
        alt: "CS Night 2026 — A Masquerade Grand Ball",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Night 2026 — A Masquerade Grand Ball",
    description:
      "The most prestigious grand ball of the year for Computer Science students. June 27, 2026. One night. A thousand memories.",
    images: ["/cs-night.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/hero.css" />
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
