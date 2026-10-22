import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  BadgePercent,
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | A1 Mobile Shop Gorakhpur - Genuine Smartphones & Buyback",
  description:
    "Learn about A1 Mobile Shop, Gorakhpur's trusted destination for 100% brand-sealed smartphones, verified accessories, and instant doorstep buyback in Basharatpur.",
};

export default async function AboutPage() {
  const [settings, navigationItems] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
  ]);

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsappNumber,
    "Hello A1 Mobile Shop! I'd like to know more about your store, phones, and doorstep services."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#EDE6DC] to-[#F5EFE6] border-b border-[#DED6CA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26784F]/10 text-[#26784F] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                Gorakhpur&apos;s Trusted Smartphone Hub
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#24211E] tracking-tight">
                Authentic Technology. Honest Value.
              </h1>
              <p className="text-sm sm:text-base text-[#575047] leading-relaxed">
                Welcome to <strong className="text-[#24211E]">{settings.storeName}</strong>.
                Located in Basharatpur, Gorakhpur, we are dedicated to providing 100% genuine,
                brand-sealed smartphones, official accessories, and seamless instant cash
                device buybacks with doorstep pickup.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/products"
                  className="px-6 py-2.5 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs sm:text-sm font-bold hover:bg-[#3D3731] transition shadow-sm inline-flex items-center gap-2"
                >
                  <span>Explore Phones</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/sell-old-device"
                  className="px-6 py-2.5 rounded-xl bg-[#26784F] text-white text-xs sm:text-sm font-bold hover:bg-[#1E5D3D] transition shadow-sm inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Sell Old Device</span>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-[#24211E] text-xs sm:text-sm font-bold hover:bg-[#DED6CA] transition inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#26784F]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-10 bg-[#EDE6DC]/60 border-b border-[#DED6CA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA]">
                <div className="text-2xl sm:text-3xl font-black text-[#24211E]">100%</div>
                <div className="text-xs text-[#77716A] font-semibold mt-1">Official Brand Sealed Stock</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA]">
                <div className="text-2xl sm:text-3xl font-black text-[#26784F]">5,000+</div>
                <div className="text-xs text-[#77716A] font-semibold mt-1">Happy Gorakhpur Customers</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA]">
                <div className="text-2xl sm:text-3xl font-black text-[#E66827]">Same Day</div>
                <div className="text-xs text-[#77716A] font-semibold mt-1">Doorstep Local Dispatch</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA]">
                <div className="text-2xl sm:text-3xl font-black text-[#24211E]">Instant</div>
                <div className="text-xs text-[#77716A] font-semibold mt-1">Cash / UPI Buyback Payout</div>
              </div>
            </div>
          </div>
        </section>

        {/* The Story & Mission */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E66827]">
                    OUR COMMITMENT
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
                    Why A1 Mobile Shop Was Built for Gorakhpur
                  </h2>
                </div>
                <p className="text-sm text-[#575047] leading-relaxed">
                  Founded with a vision to eliminate the frustration of counterfeits, inflated online markups,
                  and untrustworthy second-hand phone deals, A1 Mobile Shop stands as Gorakhpur&apos;s physical and
                  digital benchmark for quality electronics.
                </p>
                <p className="text-sm text-[#575047] leading-relaxed">
                  Whether you are upgrading to the latest 5G flagship from <strong>Realme, Samsung, Vivo, Xiaomi, or Apple</strong>,
                  or exchanging your older smartphone for top market cash value, we treat every customer with complete transparency,
                  genuine tax invoices, and local doorstep support.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#26784F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#24211E]">Official Manufacturer Warranties</h4>
                      <p className="text-xs text-[#77716A]">Every brand-new device includes standard manufacturer service center warranty coverage across India.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#26784F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#24211E]">Zero-Hassle Doorstep Device Valuation</h4>
                      <p className="text-xs text-[#77716A]">We come to your doorstep anywhere in Gorakhpur, inspect your old device, and pay you instantly on the spot.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#26784F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-[#24211E]">Certified Data Security Wipe</h4>
                      <p className="text-xs text-[#77716A]">When you trade in an old device, our technicians perform certified data wipes so your privacy is 100% safeguarded.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Storefront Image Card */}
              <div className="lg:col-span-6">
                <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] overflow-hidden shadow-lg p-3">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#DED6CA]">
                    <Image
                      src="/store-real.jpg"
                      alt="A1 Mobile Shop Basharatpur Gorakhpur Storefront"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 600px"
                    />
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#24211E]/90 backdrop-blur-xs text-[#EDE6DC] text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#E66827]" />
                        <span className="font-semibold">Basharatpur Flagship Store</span>
                      </div>
                      <span className="text-[#26784F] font-bold">Open Daily</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 text-xs text-[#575047]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#24211E]">Address:</span>
                      <span>{settings.address}, {settings.city} - {settings.pincode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#24211E]">Hours:</span>
                      <span>{settings.openingHours}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#24211E]">Phone:</span>
                      <a href={`tel:${settings.phone}`} className="text-[#26784F] font-bold hover:underline">
                        {settings.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Trust */}
        <section className="py-16 bg-[#EDE6DC] border-y border-[#DED6CA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#77716A]">
                THE A1 ADVANTAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#24211E] tracking-tight mt-1">
                Our 4 Pillars of Customer Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F5EFE6] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDE6DC] flex items-center justify-center text-[#26784F]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#24211E]">100% Genuine Devices</h3>
                <p className="text-xs text-[#575047] leading-relaxed">
                  Only authentic, brand-sealed phones with Indian GST invoices and full brand warranties.
                </p>
              </div>

              <div className="bg-[#F5EFE6] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDE6DC] flex items-center justify-center text-[#E66827]">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#24211E]">Instant Cash Buyback</h3>
                <p className="text-xs text-[#575047] leading-relaxed">
                  Get the highest trade-in value for your old smartphone with zero negotiation and instant payment.
                </p>
              </div>

              <div className="bg-[#F5EFE6] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDE6DC] flex items-center justify-center text-[#26784F]">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#24211E]">Fast Local Dispatch</h3>
                <p className="text-xs text-[#575047] leading-relaxed">
                  Same-day delivery across Gorakhpur with secure tamper-proof packaging and local support.
                </p>
              </div>

              <div className="bg-[#F5EFE6] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EDE6DC] flex items-center justify-center text-[#E66827]">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#24211E]">Best Price Guarantee</h3>
                <p className="text-xs text-[#575047] leading-relaxed">
                  Competitive pricing matching online deals with the reliability and personal touch of a physical store.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Visit or Contact Banner */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#24211E] text-[#EDE6DC] rounded-3xl p-8 sm:p-12 text-center space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                Have a question or looking for a specific phone?
              </h2>
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#EDE6DC]/80">
                Contact our customer support team directly on WhatsApp or drop by our store on
                Aluminium Factory Road, Basharatpur, Gorakhpur.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#26784F] text-white text-xs sm:text-sm font-bold hover:bg-[#1E5D3D] transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${settings.phone}`}
                  className="px-6 py-3 rounded-xl bg-[#EDE6DC] text-[#24211E] text-xs sm:text-sm font-bold hover:bg-white transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#26784F]" />
                  <span>Call {settings.phone}</span>
                </a>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#3D3731] text-[#EDE6DC] text-xs sm:text-sm font-bold hover:bg-[#575047] transition flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#E66827]" />
                  <span>Get Store Directions</span>
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
