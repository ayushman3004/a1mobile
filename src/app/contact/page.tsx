import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageSquare,
  Navigation,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { buildWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us | A1 Mobile Shop Gorakhpur - Store Location, Phone & WhatsApp",
  description:
    "Get in touch with A1 Mobile Shop Gorakhpur. Visit our physical store in Basharatpur, call +91 87269 42338, or chat on WhatsApp for smartphones, buyback inquiries, and repairs.",
};

export default async function ContactPage() {
  const [settings, navigationItems] = await Promise.all([
    getStoreSettings(),
    getNavigationItems(),
  ]);

  const whatsappGeneralUrl = buildWhatsAppLink(
    settings.whatsappNumber,
    "Hello A1 Mobile Shop Gorakhpur! I have an enquiry regarding smartphones / order / device buyback."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E66827]">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#24211E] tracking-tight">
              Contact A1 Mobile Shop
            </h1>
            <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
              Have a question about a phone model, need doorstep pickup for your old device,
              or want to visit our store in Gorakhpur? We are always here to help.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Store Address */}
            <div className="bg-[#EDE6DC] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center text-[#E66827]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#24211E]">Store Location</h3>
              <p className="text-xs text-[#575047] leading-relaxed">
                {settings.address}, {settings.landmark ? `${settings.landmark}, ` : ""}
                {settings.city}, {settings.state} - {settings.pincode}
              </p>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#24211E] hover:text-[#E66827] transition pt-1"
              >
                <span>View on Google Maps</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Phone */}
            <div className="bg-[#EDE6DC] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center text-[#26784F]">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#24211E]">Phone Support</h3>
              <p className="text-xs text-[#575047] leading-relaxed">
                Speak directly with our store team for instant pricing and stock availability.
              </p>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#26784F] hover:underline pt-1"
              >
                <span>{settings.phone}</span>
              </a>
            </div>

            {/* WhatsApp Support */}
            <div className="bg-[#EDE6DC] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center text-[#26784F]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#24211E]">WhatsApp Chat</h3>
              <p className="text-xs text-[#575047] leading-relaxed">
                Fastest response for device buyback quotes, photos of products, and order updates.
              </p>
              <a
                href={whatsappGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#26784F] hover:underline pt-1"
              >
                <span>Chat Now (Instant Reply)</span>
              </a>
            </div>

            {/* Hours & Email */}
            <div className="bg-[#EDE6DC] p-6 rounded-2xl border border-[#DED6CA] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center text-[#24211E]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-[#24211E]">Working Hours</h3>
              <p className="text-xs text-[#575047] leading-relaxed">
                {settings.openingHours}
              </p>
              <div className="text-xs text-[#77716A] pt-1 flex items-center gap-1 truncate">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#24211E] truncate">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact & Inquiry Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7 bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#77716A]">
                  SEND AN ENQUIRY
                </span>
                <h2 className="text-2xl font-black text-[#24211E] mt-1">
                  How Can We Help You Today?
                </h2>
                <p className="text-xs sm:text-sm text-[#575047] mt-1">
                  Fill in your details and our team will call or message you back promptly.
                </p>
              </div>

              <form
                action={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
                method="GET"
                target="_blank"
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#24211E] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs sm:text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#24211E] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs sm:text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#24211E] mb-1">
                    Subject / Area of Interest
                  </label>
                  <select
                    name="subject"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs sm:text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                  >
                    <option value="Buy Smartphone">Buying a New / Pre-Owned Smartphone</option>
                    <option value="Sell Old Phone">Selling Old Phone / Doorstep Buyback</option>
                    <option value="Order Tracking">Existing Order Status</option>
                    <option value="Accessories">Accessories & Earbuds Enquiry</option>
                    <option value="Other">Other Question / Store Visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#24211E] mb-1">
                    Message / Device Model
                  </label>
                  <textarea
                    name="text"
                    rows={4}
                    placeholder="Tell us what device you're interested in, or describe the old phone you want to sell..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs sm:text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs sm:text-sm font-bold hover:bg-[#3D3731] transition text-center shadow-xs"
                  >
                    Send Message via WhatsApp
                  </button>
                  <a
                    href={`tel:${settings.phone}`}
                    className="px-6 py-3 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-[#24211E] text-xs sm:text-sm font-bold hover:bg-[#DED6CA] transition text-center inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-[#26784F]" />
                    <span>Call Store Directly</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Map & Flagship Store Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#26784F]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Flagship Retail Experience</span>
                </div>
                <h3 className="text-xl font-black text-[#24211E]">
                  Come Visit In Person
                </h3>
                <p className="text-xs text-[#575047] leading-relaxed">
                  Our store is conveniently located on Aluminium Factory Road in Basharatpur.
                  Drop in to test any flagship device, compare camera quality, or get an on-the-spot
                  cash offer for your used phone.
                </p>

                <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#E66827] shrink-0 mt-0.5" />
                    <span className="font-medium text-[#24211E]">
                      {settings.address}, Basharatpur, Gorakhpur (UP) - {settings.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#575047]">
                    <Clock className="w-4 h-4 text-[#26784F] shrink-0" />
                    <span>Open 7 Days a Week: 10:00 AM - 09:30 PM</span>
                  </div>
                </div>

                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-[#E66827]" />
                  <span>Open Directions in Google Maps</span>
                </a>
              </div>

              {/* Quick FAQs */}
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#24211E]">
                  <HelpCircle className="w-4 h-4 text-[#E66827]" />
                  <span>Common Questions</span>
                </div>
                <ul className="space-y-2 text-xs text-[#575047]">
                  <li>
                    <strong>Q: Do you offer same-day delivery?</strong>
                    <br />
                    Yes! For orders placed within Gorakhpur city, delivery is typically within 2-4 hours.
                  </li>
                  <li>
                    <strong>Q: Can I sell a phone that isn&apos;t working?</strong>
                    <br />
                    Yes, we buy phones in all conditions (Flawless, Good, Average, or Broken).
                  </li>
                </ul>
                <div className="pt-2">
                  <Link href="/faq" className="text-xs font-bold text-[#26784F] hover:underline">
                    View All FAQs →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
