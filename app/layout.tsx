import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "./components/CursorGlow";

export const metadata: Metadata = {
  title: "CS Night 2026 — A Masquerade Grand Ball",
  description:
    "The most prestigious grand ball of the year for Computer Science students. June 27, 2026. One night. A thousand memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
