import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";

import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { getBestDeals } from "@/services/products";
import { Flame } from "lucide-react";
import Link from "next/link";

export default async function DealsPage() {
  const [settings, navigationItems, deals] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
    getBestDeals(20),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E66827]/15 text-[#E66827] text-xs font-black uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-current" />
              <span>Limited-Time Price Cuts</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#24211E] tracking-tight">
              Best Deals in Gorakhpur
            </h1>
            <p className="text-xs sm:text-sm text-[#575047]">
              Exclusive discounted prices on flagship smartphones, genuine fast
              chargers, smartwatches, and premium accessories.
            </p>
          </div>

          {/* Deals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((deal) => (
              <ProductCard
                key={deal._id || deal.slug}
                product={deal}
                whatsappNumber={settings.whatsappNumber}
              />
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/products"
              className="inline-block px-7 py-3 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
            >
              Browse Complete Catalog →
            </Link>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
