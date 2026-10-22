import Link from "next/link";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { InstagramIcon } from "@/components/shared/Icons";
import Logo from "@/components/shared/Logo";
import { IStoreSettings } from "@/types";
import { buildWhatsAppLink } from "@/lib/utils";

export default function Footer({ settings }: { settings: IStoreSettings }) {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppLink(
    settings.whatsappNumber,
    "Hello A1 Mobile Shop Gorakhpur! I have an enquiry regarding smartphones / device buyback."
  );

  return (
    <footer className="bg-[#24211E] text-[#EDE6DC] pt-16 pb-12 border-t border-[#3D3731]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#3D3731]">
          {/* Column 1: Store Info & Direct Support */}
          <div className="lg:col-span-1 space-y-4">
            <Logo variant="footer" withLink />

            <p className="text-xs text-[#EDE6DC]/80 leading-relaxed">
              {settings.tagline}. Authentic smartphones, official accessories,
              and instant cash exchange at your doorstep in Gorakhpur.
            </p>

            <div className="space-y-2 text-xs text-[#EDE6DC]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E66827] shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} -{" "}
                  {settings.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#26784F] shrink-0" />
                <a
                  href={`tel:${settings.phone}`}
                  className="hover:text-white transition"
                >
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#EDE6DC]/60 shrink-0" />
                <span>{settings.openingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#EDE6DC]/60 shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:text-white transition truncate"
                >
                  {settings.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#26784F] text-white text-xs font-bold hover:bg-[#1E5D3D] transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Support</span>
              </a>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#3D3731] text-[#EDE6DC] text-xs font-medium hover:bg-[#575047] transition"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>{settings.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Column 2: SHOP PRODUCTS */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EDE6DC]/60 mb-4">
              SHOP PRODUCTS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EDE6DC]/80">
              <li>
                <Link
                  href="/products?category=smartphones"
                  className="hover:text-white transition"
                >
                  Flagship Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=accessories"
                  className="hover:text-white transition"
                >
                  Audio & Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=smartwatches"
                  className="hover:text-white transition"
                >
                  Smartwatches
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=tablets"
                  className="hover:text-white transition"
                >
                  Tablets & iPads
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="hover:text-[#E66827] font-semibold transition"
                >
                  Deals & Discounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: SELL OLD DEVICE */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EDE6DC]/60 mb-4">
              SELL OLD DEVICE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EDE6DC]/80">
              <li>
                <Link
                  href="/sell-old-device"
                  className="hover:text-[#26784F] font-semibold transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26784F]"></span>
                  Sell Device via WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-old-device?category=phone"
                  className="hover:text-white transition"
                >
                  Sell Old Smartphone
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-old-device"
                  className="hover:text-white transition"
                >
                  Doorstep Free Pickup
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-old-device"
                  className="hover:text-white transition"
                >
                  Instant UPI / Bank Transfer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CUSTOMER CARE */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EDE6DC]/60 mb-4">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EDE6DC]/80">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition"
                >
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-white transition"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-white transition"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: STORE & TRUST */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#EDE6DC]/60 mb-4">
              STORE & TRUST
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EDE6DC]/80">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition font-medium"
                >
                  About A1 Mobile Shop
                </Link>
              </li>
              <li>
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  Gorakhpur Flagship Store
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-[#EDE6DC]/90">
                <ShieldCheck className="w-3.5 h-3.5 text-[#26784F]" />
                <span>Brand Seal Guarantee</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#EDE6DC]/90">
                <Truck className="w-3.5 h-3.5 text-[#E66827]" />
                <span>Official Warranty Assured</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#EDE6DC]/90">
                <RotateCcw className="w-3.5 h-3.5 text-[#26784F]" />
                <span>Safe 100% Data Wipe</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Policy Quick Links */}
        <div className="py-4 border-b border-[#3D3731] flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[11px] text-[#EDE6DC]/60">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition">Contact</Link>
            <span>•</span>
            <Link href="/faq" className="hover:text-white transition">FAQ</Link>
            <span>•</span>
            <Link href="/categories" className="hover:text-white transition">Categories</Link>
            <span>•</span>
            <Link href="/brands" className="hover:text-white transition">Brands</Link>
            <span>•</span>
            <Link href="/shipping" className="hover:text-white transition">Shipping</Link>
            <span>•</span>
            <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          </div>
          <div className="text-[11px] text-[#EDE6DC]/60">
            Registered Store • Gorakhpur, UP
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location Badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EDE6DC]/60">
          <div>
            © {currentYear} A1 Mobile Shop. All rights reserved. Basharatpur,
            Gorakhpur, Uttar Pradesh, India.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#26784F]"></span>
              Gorakhpur Hub Active
            </span>
            <span>•</span>
            <span>Fast Dispatch within 24 Hours</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
