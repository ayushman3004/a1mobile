import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import TrustBenefits from "@/components/home/TrustBenefits";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedDevices from "@/components/home/FeaturedDevices";
import BestDeals from "@/components/home/BestDeals";
import WhyChooseA1 from "@/components/home/WhyChooseA1";
import HowToBuy from "@/components/home/HowToBuy";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import PhysicalStore from "@/components/home/PhysicalStore";
import Newsletter from "@/components/home/Newsletter";

import {
  getStoreSettings,
  getNavigationItems,
  getTrustBenefits,
  getPromotionalBanner,
  getTestimonials,
} from "@/services/settings";
import { getCategories } from "@/services/categories";
import {
  getFeaturedProducts,
  getNewArrivals,
  getCurrentArrivals,
  getBestDeals,
} from "@/services/products";

// Force dynamic rendering so newly updated products immediately appear first
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [
    settings,
    navigationItems,
    trustBenefits,
    categories,
    featuredProducts,
    newArrivals,
    currentArrivals,
    bestDeals,
    promotionalBanner,
    testimonials,
  ] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
    getTrustBenefits(),
    getCategories(),
    getFeaturedProducts(8),
    getNewArrivals(6),
    getCurrentArrivals(6),
    getBestDeals(8),
    getPromotionalBanner(),
    getTestimonials(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      {/* Top Announcement Bar */}
      <TopBar settings={settings} />

      {/* Main Brand & Action Header */}
      <Header settings={settings} />

      {/* Primary Navigation Bar */}
      <Navbar items={navigationItems} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Section A: Hero */}
        <Hero newArrivals={newArrivals} currentArrivals={currentArrivals} />

        {/* Section B: Trust Benefits */}
        <TrustBenefits benefits={trustBenefits} />

        {/* Section C: Explore Our Categories */}
        <CategoryGrid categories={categories} />

        {/* Section D: Featured Devices */}
        <FeaturedDevices
          products={featuredProducts}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* Section E: Best Deals */}
        <BestDeals
          deals={bestDeals}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* Section F: Why Choose A1 */}
        <WhyChooseA1 />

        {/* Section G: How to Buy From A1 (Dark Brown) */}
        <HowToBuy />

        {/* Section H: Promotional Mega Sale Banner */}
        <PromoBanner banner={promotionalBanner} />

        {/* Section I: Customer Testimonials */}
        <Testimonials testimonials={testimonials} />

        {/* Section J: Physical Store Information */}
        <PhysicalStore settings={settings} />

        {/* Section K: Newsletter Subscription */}
        <Newsletter />
      </main>

      {/* Section L: Footer */}
      <Footer settings={settings} />
    </div>
  );
}
