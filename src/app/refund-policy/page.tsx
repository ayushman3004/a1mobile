import type { Metadata } from "next";
import Link from "next/link";
import { RotateCcw, ShieldCheck, CheckCircle2 } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";

export const metadata: Metadata = {
  title: "Return & Refund Policy | A1 Mobile Shop Gorakhpur",
  description:
    "Learn about our 7-day replacement guarantee, return policies, and official manufacturer warranty coverage at A1 Mobile Shop Gorakhpur.",
};

export default async function RefundPolicyPage() {
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
              CUSTOMER PROTECTION
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
              Return, Replacement & Refund Policy
            </h1>
            <p className="text-xs text-[#77716A] mt-2">
              Last revised: October 2026 • A1 Mobile Shop Gorakhpur
            </p>
          </div>

          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#575047] leading-relaxed">
            {/* Highlights Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#26784F]/10 text-[#26784F] flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#24211E]">7-Day Replacement Support</div>
                  <div className="text-xs text-[#77716A]">For verified transit damage or out-of-box defects</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E66827]/10 text-[#E66827] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#24211E]">1-Year Official Warranty</div>
                  <div className="text-xs text-[#77716A]">Brand-authorized service centers nationwide</div>
                </div>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                1. Brand Sealed New Smartphones & Gadgets
              </h2>
              <p>
                Because all smartphones are brand-sealed with official manufacturer tamper stickers, returns cannot be
                accepted for change of mind or subjective preference once the security seal is broken.
              </p>
              <p>
                In the rare case a brand-new device exhibits a hardware malfunction right out of the box (Dead on Arrival / DOA),
                our Gorakhpur store will assist you immediately with a brand service center DOA certificate, which authorizes
                an immediate identical brand-new replacement unit.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                2. Verified Pre-Owned Devices Guarantee
              </h2>
              <p>
                For certified pre-owned phones purchased through A1 Mobile Shop:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#575047]">
                <li>We provide a <strong>7-Day Testing Window</strong>. If any undisclosed functional defect is found, we replace or repair the unit free of cost.</li>
                <li>Devices must be returned in the exact cosmetic condition delivered, with original invoice and accessories.</li>
                <li>Physical damage, water damage, or third-party unauthorized software modifications void this guarantee.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                3. Refund Processing
              </h2>
              <p>
                If an order cannot be fulfilled due to stock shortages or an approved cancellation before dispatch,
                refunds are issued immediately:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#575047]">
                <li><strong>UPI / Google Pay / PhonePe:</strong> Credited within 2 to 24 hours.</li>
                <li><strong>Debit / Credit Cards:</strong> Credited back to bank statement within 3 to 5 business days.</li>
                <li><strong>Cash on Delivery:</strong> Reimbursed via UPI directly to your bank account upon verification.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                4. Need Assistance with a Replacement or Return?
              </h2>
              <p>
                Visit our physical store in Basharatpur or message us directly on WhatsApp with your Order ID and photos:
              </p>
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-[#24211E]">A1 Mobile Support Desk</div>
                  <div className="text-xs text-[#77716A]">Phone / WhatsApp: {settings.phone}</div>
                </div>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#26784F] text-white text-xs font-bold hover:bg-[#1E5D3D] transition"
                >
                  Message Support on WhatsApp
                </a>
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
