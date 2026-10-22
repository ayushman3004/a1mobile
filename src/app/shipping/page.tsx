import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, ShieldCheck, MapPin } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | A1 Mobile Shop Gorakhpur",
  description:
    "Learn about our same-day local doorstep dispatch in Gorakhpur, tamper-proof packaging, and express regional shipping timelines.",
};

export default async function ShippingPage() {
  const [settings, navigationItems] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#26784F]">
              FAST DISPATCH
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
              Shipping & Delivery Information
            </h1>
            <p className="text-xs text-[#77716A] mt-2">
              Serving Gorakhpur & Eastern Uttar Pradesh with speed and reliability.
            </p>
          </div>

          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#575047] leading-relaxed">
            {/* Quick Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-2">
                <Truck className="w-5 h-5 text-[#26784F]" />
                <div className="font-bold text-[#24211E]">Same-Day Delivery</div>
                <p className="text-xs text-[#77716A]">Within 2 to 4 hours across Gorakhpur city limits for orders placed before 6:00 PM.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#E66827]" />
                <div className="font-bold text-[#24211E]">Tamper-Proof Box</div>
                <p className="text-xs text-[#77716A]">Every shipment is sealed in tamper-evident corrugated boxes with tracking barcodes.</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-2">
                <MapPin className="w-5 h-5 text-[#24211E]" />
                <div className="font-bold text-[#24211E]">Store Pickup (Free)</div>
                <p className="text-xs text-[#77716A]">Pick up your reserved device directly at our Basharatpur store within 30 minutes.</p>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                1. Delivery Timelines
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-xs text-[#575047]">
                <li>
                  <strong>Gorakhpur City (Pincodes 273001, 273004, 273008, 273013, etc.):</strong> Delivered via local store executive on the same day.
                </li>
                <li>
                  <strong>Surrounding Regional Areas (Deoria, Kushinagar, Maharajganj, Basti):</strong> Dispatched within 24 hours, arriving in 1 to 2 business days via express courier.
                </li>
                <li>
                  <strong>Rest of India:</strong> Dispatched via BlueDart / Delhivery Express within 2 to 4 working days.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                2. Shipping Charges
              </h2>
              <p>
                We offer <strong>Free Delivery</strong> across Gorakhpur on all smartphone orders.
                For select low-value accessories under ₹499, a nominal local delivery charge of ₹40 may apply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                3. Open-Box Inspection for Local Deliveries
              </h2>
              <p>
                To provide ultimate peace of mind, our local Gorakhpur delivery executives allow you to verify the outer
                tamper seal of your device box in their presence before completing handover.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                4. Order Tracking & Enquiries
              </h2>
              <p>
                Once your order is dispatched, you will receive real-time SMS and WhatsApp notifications.
                You can also track your order status anytime on our <Link href="/orders" className="text-[#26784F] font-bold underline">Order Tracking Page</Link> or
                by calling <a href={`tel:${settings.phone}`} className="font-bold text-[#24211E]">{settings.phone}</a>.
              </p>
            </section>
          </div>

          <div className="text-center pt-4">
            <Link
              href="/"
              className="text-xs font-bold text-[#24211E] hover:underline"
            >
              ← Return to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
