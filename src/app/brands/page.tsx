import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { getBrands } from "@/services/categories";

export const metadata: Metadata = {
  title: "Official Brands | A1 Mobile Shop Gorakhpur",
  description:
    "Shop authorized smartphones & electronics by brand: Realme, Samsung, Vivo, Xiaomi, Apple, OnePlus, boAt and more at A1 Mobile Shop Gorakhpur.",
};

export default async function BrandsIndexPage() {
  const [settings, navigationItems, brands] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
    getBrands(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#26784F]">
              <Sparkles className="w-4 h-4" />
              <span>AUTHORIZED PARTNERS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#24211E] tracking-tight">
              Shop by Brand
            </h1>
            <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
              We carry only official Indian retail inventory from leading smartphone and accessories
              manufacturers, covered by national brand warranty centers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 hover:border-[#24211E] transition-all hover:shadow-lg flex flex-col justify-between space-y-6 text-center"
              >
                <div className="space-y-2">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center font-black text-xl text-[#24211E] group-hover:scale-110 transition-transform">
                    {brand.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h2 className="text-lg font-black text-[#24211E] group-hover:text-[#E66827] transition">
                    {brand.name}
                  </h2>
                  <p className="text-xs text-[#77716A]">
                    Official Warranty Products
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-xs font-bold text-[#24211E] group-hover:text-[#E66827] transition pt-2 border-t border-[#DED6CA]">
                  <span>Explore Devices</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
