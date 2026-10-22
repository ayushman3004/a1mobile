import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";

export const metadata: Metadata = {
  title: "Terms & Conditions | A1 Mobile Shop Gorakhpur",
  description:
    "Review the terms and conditions of A1 Mobile Shop Gorakhpur regarding product sales, device buyback, warranties, and orders.",
};

export default async function TermsPage() {
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#E66827]">
              LEGAL TERMS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#77716A] mt-2">
              Last updated: October 2026 • A1 Mobile Shop, Basharatpur, Gorakhpur
            </p>
          </div>

          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#575047] leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                1. Overview & Store Ownership
              </h2>
              <p>
                Welcome to A1 Mobile Shop (accessible via <strong>a1mobile.store</strong>). Throughout the site,
                the terms &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo; refer to A1 Mobile Shop, registered and operating from
                Aluminium Factory Road, Basharatpur, Gorakhpur, Uttar Pradesh 273004.
              </p>
              <p>
                By visiting our site, placing an order, or utilizing our doorstep buyback service, you engage in our
                &ldquo;Service&rdquo; and agree to be bound by the following terms and conditions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                2. Product Authenticity & Manufacturer Warranty
              </h2>
              <p>
                All brand-new smartphones, audio gear, and accessories sold by A1 Mobile Shop are 100% genuine,
                official Indian retail units backed by valid manufacturer warranties and Indian GST tax invoices.
              </p>
              <p>
                Warranty claims for manufacturing defects after unboxing must be serviced at the respective brand&apos;s
                authorized service centers (e.g., Realme, Samsung, Vivo, Xiaomi, Apple). We assist our local customers
                with invoice copies and service center guidance whenever needed.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                3. Device Buyback & Doorstep Trade-Ins
              </h2>
              <p>
                Our buyback calculator provides estimated valuations based on the conditions selected by you.
                Upon physical inspection by our authorized Gorakhpur representative:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#575047]">
                <li>You must be the rightful owner of the device and present valid government ID (Aadhaar/Voter ID/Driving License).</li>
                <li>The device must be completely unlinked from personal iCloud/Google/Mi accounts before hand-off.</li>
                <li>Stolen, blacklisted, or IMEI-tampered devices will NOT be accepted under any circumstances.</li>
                <li>Final cash / UPI payment is disbursed instantly upon biometric or physical verification and agreement.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                4. Pricing, Stock & Payment Terms
              </h2>
              <p>
                We strive for real-time accuracy regarding prices and stock. In the rare event an item is mispriced or
                temporarily out of stock due to sudden in-store purchases in Gorakhpur, we reserve the right to contact
                you to suggest an equivalent device or issue an immediate full refund.
              </p>
              <p>
                We accept UPI, Net Banking, Debit/Credit Cards, Cash on Delivery (COD) for eligible local Gorakhpur pincodes,
                and in-store POS card payments.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                5. Contact Information
              </h2>
              <p>
                Questions about our Terms & Conditions should be directed to our customer desk at:
              </p>
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] space-y-1 font-medium text-xs text-[#24211E]">
                <div>Email: {settings.email}</div>
                <div>Phone / WhatsApp: {settings.phone}</div>
                <div>Address: {settings.address}, Basharatpur, Gorakhpur - {settings.pincode}</div>
              </div>
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
