import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AgeGate } from "@/components/AgeGate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hentaiki.app"),
  title: {
    default: "hentaiki — adult anime, streaming",
    template: "%s · hentaiki",
  },
  description:
    "hentaiki streams adult animation in HD. New episodes weekly, hand-picked simulcasts, full series, sub and dub.",
  applicationName: "hentaiki",
  authors: [{ name: "hentaiki" }],
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a0e0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--bg-1)] focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <AgeGate />
      </body>
    </html>
  );
}
