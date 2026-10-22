import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronRight, MessageSquare, Phone } from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | A1 Mobile Shop Gorakhpur",
  description:
    "Find answers to frequently asked questions about buying smartphones, doorstep device buyback, warranties, and store visits at A1 Mobile Shop Gorakhpur.",
};

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: "Buying Smartphones",
    q: "Are the smartphones sold on A1 Mobile 100% brand new and genuine?",
    a: "Yes, absolutely. Every new device sold by A1 Mobile Shop is 100% brand-sealed with genuine manufacturer holographic seals, official Indian GST tax invoices, and full manufacturer warranties valid at authorized service centers across India.",
  },
  {
    category: "Buying Smartphones",
    q: "Can I pay cash on delivery (COD)?",
    a: "Yes, we support Cash on Delivery (COD) for addresses across Gorakhpur city. We also accept UPI (Google Pay, PhonePe, Paytm), Net Banking, and Credit/Debit Cards.",
  },
  {
    category: "Buying Smartphones",
    q: "How fast is delivery within Gorakhpur?",
    a: "Orders placed within Gorakhpur are fulfilled directly from our Basharatpur flagship store and typically delivered to your doorstep within 2 to 4 hours.",
  },
  {
    category: "Sell Old Device (Buyback)",
    q: "How does the doorstep device buyback work?",
    a: "It's simple: 1) Select your phone model and answer a few quick condition questions on our Sell Old Device page. 2) Schedule a convenient doorstep pickup in Gorakhpur. 3) Our technician inspects your device and pays you instantly via UPI or cash on the spot.",
  },
  {
    category: "Sell Old Device (Buyback)",
    q: "What documents are required to sell an old phone?",
    a: "You need a valid Government Photo ID (Aadhaar Card, Voter ID, or Driving License). If available, having the original box, bill, and charger fetches a higher valuation.",
  },
  {
    category: "Sell Old Device (Buyback)",
    q: "Is my personal data safe when I sell my device?",
    a: "Yes, 100%. We require all personal accounts (Google, Apple ID, Mi/Samsung accounts) to be signed out, and our certified technician performs a full factory data wipe before completing the buyback.",
  },
  {
    category: "Warranty & Support",
    q: "Where do I get warranty support if my phone has an issue?",
    a: "Since all new phones are authorized Indian units, you can visit any authorized brand service center (Samsung, Realme, Vivo, Xiaomi, Apple) across Gorakhpur or India with your A1 Mobile invoice.",
  },
  {
    category: "Physical Store",
    q: "Can I visit your physical store in Gorakhpur?",
    a: "Yes! We encourage customers to visit us in person. Our flagship store is located on Aluminium Factory Road, Basharatpur, Gorakhpur. We are open Monday to Sunday from 10:00 AM to 09:30 PM.",
  },
];

export default async function FAQPage() {
  const [settings, navigationItems] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
  ]);

  const whatsappUrl = buildWhatsAppLink(
    settings.whatsappNumber,
    "Hello A1 Mobile Shop! I have a question that isn't answered in your FAQ."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#E66827]">
              <HelpCircle className="w-4 h-4" />
              <span>HELP & SUPPORT</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#24211E] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
              Find instant answers to common questions about buying phones, doorstep device buybacks,
              delivery times, and store visits in Gorakhpur.
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] p-5 sm:p-6 space-y-2 hover:border-[#24211E]/30 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5EFE6] text-[#77716A]">
                    {faq.category}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#24211E]">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#575047] leading-relaxed pt-1">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Need more help */}
          <div className="bg-[#24211E] text-[#EDE6DC] rounded-3xl p-6 sm:p-10 text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Still have a question?</h2>
            <p className="text-xs sm:text-sm text-[#EDE6DC]/80 max-w-lg mx-auto">
              Our Gorakhpur store support team is available 7 days a week on WhatsApp and direct phone calls.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#26784F] text-white text-xs font-bold hover:bg-[#1E5D3D] transition flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="px-5 py-2.5 rounded-xl bg-[#EDE6DC] text-[#24211E] text-xs font-bold hover:bg-white transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#26784F]" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
