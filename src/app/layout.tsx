import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://a1mobile.store"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "A1 Mobile Shop Gorakhpur | Flagship Phones, Verified Pre-Owned & Instant Buyback",
    template: "%s | A1 Mobile Shop Gorakhpur",
  },
  description:
    "Official store of A1 Mobile Shop located in Basharatpur, Gorakhpur. Genuine smartphones, accessories, verified pre-owned devices, and instant cash buyback at your doorstep.",
  keywords: [
    "A1 Mobile Shop",
    "A1 Mobile Gorakhpur",
    "Buy smartphones Gorakhpur",
    "Sell old phone Gorakhpur",
    "Basharatpur mobile store",
    "Redmi 15A 5G",
    "Samsung Galaxy A17 5G",
    "Vivo 5G mobile",
    "Instant cash buyback Gorakhpur",
  ],
  authors: [{ name: "A1 Mobile Shop Gorakhpur" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "A1 Mobile Shop Gorakhpur | Smartphones & Instant Buyback",
    description:
      "Genuine flagship smartphones, verified pre-owned devices, and instant cash exchange at your doorstep in Gorakhpur.",
    url: "https://a1mobile.store",
    siteName: "A1 Mobile Shop",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

import AppProviders from "@/components/providers/AppProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F5EFE6] text-[#24211E]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
