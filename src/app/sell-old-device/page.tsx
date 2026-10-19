import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BuybackWizard from "@/components/buyback/BuybackWizard";

import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { getBuybackCategories } from "@/services/buyback";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  RotateCcw,
  BadgeCheck,
  CheckCircle,
  Truck,
  ArrowRight,
} from "lucide-react";

interface SellPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function SellOldDevicePage({
  searchParams,
}: SellPageProps) {
  const params = await searchParams;
  const selectedCat = params.category || "phone";

  const [settings, navigationItems, buybackCategories] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
    getBuybackCategories(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#EEE7DC] border-b border-[#DED6CA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE6DC] border border-[#26784F]/30 text-xs font-black tracking-widest text-[#26784F] uppercase">
                  <Zap className="w-3.5 h-3.5" />
                  <span>INSTANT CASH • FREE DOORSTEP PICKUP</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#24211E] tracking-tight leading-[1.08]">
                  Sell Your Old Phone. <br />
                  <span className="text-[#26784F]">Get the Best Value.</span>
                </h1>

                <p className="text-base sm:text-lg text-[#575047] max-w-xl leading-relaxed">
                  Turn your old smartphone into instant cash. Get a quick quote,
                  schedule a free pickup and receive secure payment directly in
                  your bank account or UPI.
                </p>

                <div className="pt-2">
                  <a
                    href="#valuation-wizard"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#24211E] text-[#EDE6DC] font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-[#3D3731] transition shadow-lg group"
                  >
                    <span>SELL YOUR PHONE</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>

                {/* 3 Trust Indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#DED6CA]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#24211E]">
                    <BadgeCheck className="w-4 h-4 text-[#26784F] shrink-0" />
                    <span>Guaranteed Best Price</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#24211E]">
                    <ShieldCheck className="w-4 h-4 text-[#26784F] shrink-0" />
                    <span>100% Safe Data Wipe</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#24211E]">
                    <Zap className="w-4 h-4 text-[#E66827] shrink-0" />
                    <span>Instant UPI Payment</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Promotional Hero Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-[#EDE6DC] border border-[#DED6CA] shadow-xl p-6 flex items-center justify-center">
                  <Image
                    src="https://images.unsplash.com/photo-1556742049-0a67e557224f?auto=format&fit=crop&w=1000&q=80"
                    alt="Doorstep Device Buyback Service in Gorakhpur"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 450px"
                  />
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-[#24211E]/90 backdrop-blur-xs text-[#EDE6DC] border border-[#3D3731] shadow-lg">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#26784F] block">
                      Gorakhpur Direct Executive
                    </span>
                    <p className="text-xs font-bold mt-0.5">
                      Free Doorstep Evaluation Across All Gorakhpur Localities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (3 STEPS) */}
        <section className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#DED6CA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#77716A]">
                THREE EASY STEPS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
                How It Works
              </h2>
              <p className="text-sm text-[#575047] mt-2">
                Sell your old smartphone or gadget in minutes with transparent
                pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  num: "01",
                  title: "Enter Device Details",
                  desc: "Select your device category, brand, model, specifications, and physical condition.",
                  icon: <RotateCcw className="w-5 h-5 text-[#E66827]" />,
                },
                {
                  num: "02",
                  title: "Free Doorstep Pickup",
                  desc: "Schedule a convenient date and time slot. Our representative collects the device from your address in Gorakhpur.",
                  icon: <Truck className="w-5 h-5 text-[#26784F]" />,
                },
                {
                  num: "03",
                  title: "Get Instant Payment",
                  desc: "After physical inspection at your doorstep, receive payment via UPI or bank transfer.",
                  icon: <Zap className="w-5 h-5 text-[#24211E]" />,
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-8 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-4xl font-black text-[#575047]/50">
                        {step.num}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#24211E] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEVICE CATEGORY SELECTION */}
        <section className="py-14 sm:py-20 bg-[#EEE7DC] border-b border-[#DED6CA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#77716A]">
                SELECT DEVICE TYPE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
                Sell By Category
              </h2>
              <p className="text-sm text-[#575047] mt-2">
                We buy all categories of pre-owned electronics at competitive
                Gorakhpur rates.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {buybackCategories.map((bCat) => (
                <div
                  key={bCat.slug}
                  className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] overflow-hidden p-6 flex flex-col justify-between hover:shadow-md transition group"
                >
                  <div>
                    <div className="relative aspect-4/3 w-full bg-[#F5EFE6] rounded-xl overflow-hidden mb-4 border border-[#DED6CA]">
                      <Image
                        src={bCat.image}
                        alt={bCat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-base font-bold text-[#24211E] mb-1">
                      {bCat.name}
                    </h3>
                    <p className="text-xs text-[#575047] line-clamp-2 leading-relaxed">
                      {bCat.description}
                    </p>
                  </div>

                  <a
                    href="#valuation-wizard"
                    className="mt-4 w-full py-2.5 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold text-center block hover:bg-[#3D3731] transition"
                  >
                    {bCat.ctaText || "Get Quote"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SELLING FLOW: 12-STEP QUOTATION FORM */}
        <section
          id="valuation-wizard"
          className="py-16 sm:py-24 bg-[#F5EFE6] border-b border-[#DED6CA]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#26784F]">
                INSTANT VALUATION CALCULATOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
                Get an Exact Price For Your Device
              </h2>
              <p className="text-sm text-[#575047] mt-2">
                Follow the steps below to calculate your estimated cash payout
                and book a free doorstep pickup in Gorakhpur.
              </p>
            </div>

            <BuybackWizard initialCategory={selectedCat} />
          </div>
        </section>

        {/* CORPORATE BUYBACK SECTION */}
        <section
          id="corporate"
          className="py-14 sm:py-16 bg-[#24211E] text-[#EDE6DC]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#2D2925] border border-[#3D3731] rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E66827]">
                  B2B & ENTERPRISE
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Corporate IT & Smartphone Buyback
                </h3>
                <p className="text-xs sm:text-sm text-[#EDE6DC]/80 leading-relaxed">
                  Upgrading office laptops, executive phones, or tablet fleets?
                  We provide bulk asset valuation, certified data destruction,
                  and GST invoicing for businesses in Gorakhpur and Eastern UP.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href={`tel:${settings.phone}`}
                  className="px-6 py-3.5 rounded-full bg-[#E66827] text-white text-xs font-bold text-center hover:bg-[#d55819] transition"
                >
                  Call Commercial Desk
                </a>
                <a
                  href={`https://wa.me/91${settings.whatsappNumber.replace(
                    /\D/g,
                    ""
                  )}?text=Hello%20A1%20Mobile!%20We%20need%20a%20corporate%20bulk%20device%20buyback%20quote.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#3D3731] text-[#EDE6DC] text-xs font-bold text-center hover:bg-[#575047] transition"
                >
                  WhatsApp Corporate Enquiry
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
