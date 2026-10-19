import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A1 Mobile Shop Gorakhpur | Flagship Phones, Verified Pre-Owned & Instant Buyback",
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
  openGraph: {
    title: "A1 Mobile Shop Gorakhpur | Smartphones & Instant Buyback",
    description:
      "Genuine flagship smartphones, verified pre-owned devices, and instant cash exchange at your doorstep in Gorakhpur.",
    type: "website",
    locale: "en_IN",
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
