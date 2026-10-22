import type { Metadata } from "next";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";

export const metadata: Metadata = {
  title: "Privacy Policy | A1 Mobile Shop Gorakhpur",
  description:
    "Read how A1 Mobile Shop Gorakhpur protects your personal data, handles delivery details, and ensures 100% data wiping on buyback devices.",
};

export default async function PrivacyPage() {
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
              CUSTOMER PRIVACY
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#77716A] mt-2">
              Effective Date: October 2026 • A1 Mobile Shop Gorakhpur
            </p>
          </div>

          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-[#575047] leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                1. Our Commitment to Your Privacy
              </h2>
              <p>
                At A1 Mobile Shop (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we value the trust you place in us when sharing
                your personal information. We operate with strict confidentiality regarding customer contact numbers,
                delivery addresses, and device data. We never sell, lease, or rent customer lists to third-party telemarketers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                2. Information We Collect
              </h2>
              <p>
                When you browse our storefront, order a smartphone, or submit a device buyback inquiry, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#575047]">
                <li><strong>Contact Details:</strong> Your name, phone number, email address, and Gorakhpur delivery address.</li>
                <li><strong>Order Information:</strong> Products purchased, payment method (COD or online), and invoice details.</li>
                <li><strong>Buyback Device Details:</strong> Model, condition, IMEI/serial number, and government-mandated proof of ownership for trade-ins.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                3. Buyback 100% Data-Wiping Guarantee
              </h2>
              <p>
                Your privacy on traded-in devices is of paramount importance. Every smartphone, tablet, or smartwatch
                received through our buyback service undergoes certified factory data-reset procedures. We recommend that
                customers back up their data and sign out of personal accounts before pickup; our technicians will also
                physically verify that all accounts (Google, Apple ID, Samsung Account) are cleared.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                4. Payment & Transaction Security
              </h2>
              <p>
                Online payments are processed securely through certified payment gateways. We do not store your credit card,
                debit card, or bank credentials on our local servers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-[#24211E]">
                5. Contacting Our Data Officer
              </h2>
              <p>
                If you have questions about your personal data or wish to have your account details updated or deleted,
                reach out directly to:
              </p>
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] space-y-1 font-medium text-xs text-[#24211E]">
                <div>Email: {settings.email}</div>
                <div>Phone: {settings.phone}</div>
                <div>Physical Store: {settings.address}, Basharatpur, Gorakhpur (UP) - {settings.pincode}</div>
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
