import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { getCategories } from "@/services/categories";

export const metadata: Metadata = {
  title: "Product Categories | A1 Mobile Shop Gorakhpur",
  description:
    "Explore categories of smartphones, audio gear, smartwatches, tablets, and accessories at A1 Mobile Shop Gorakhpur.",
};

export default async function CategoriesIndexPage() {
  const [settings, navigationItems, categories] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E66827]">
              <Layers className="w-4 h-4" />
              <span>SHOP BY CATEGORY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#24211E] tracking-tight">
              Browse All Categories
            </h1>
            <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
              Explore 100% brand-sealed electronics, certified accessories, and audio gear
              available with same-day doorstep dispatch in Gorakhpur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] overflow-hidden hover:border-[#24211E] transition-all hover:shadow-lg flex flex-col"
              >
                <div className="relative aspect-[16/10] bg-[#DED6CA] overflow-hidden">
                  <Image
                    src={cat.image || "/store-real.jpg"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#24211E]/80 backdrop-blur-xs text-white text-[10px] font-bold">
                    {cat.itemCount || "Browse"} Products
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#24211E] group-hover:text-[#E66827] transition">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-[#575047] mt-1 line-clamp-2 leading-relaxed">
                      {cat.description || `Browse authentic ${cat.name} with official warranty.`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-[#24211E] pt-2 border-t border-[#DED6CA]">
                    <span>View Collection</span>
                    <ArrowRight className="w-4 h-4 text-[#E66827] group-hover:translate-x-1 transition-transform" />
                  </div>
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
