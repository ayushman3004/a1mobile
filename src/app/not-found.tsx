import Link from "next/link";
import { Search, Home, Smartphone, RotateCcw, MessageSquare, PhoneCall, ArrowRight } from "lucide-react";
import Logo from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6] text-[#24211E]">
      {/* Top minimal header */}
      <header className="border-b border-[#DED6CA] bg-[#F5EFE6] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Logo variant="header" withLink />
          <Link
            href="/"
            className="text-xs font-bold text-[#575047] hover:text-[#24211E] transition flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#E66827]/10 text-[#E66827] text-xs font-black tracking-widest uppercase">
              PAGE NOT FOUND • 404
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#24211E] tracking-tight">
              Looking for Something in Gorakhpur?
            </h1>
            <p className="text-sm sm:text-base text-[#575047] max-w-lg mx-auto leading-relaxed">
              The page or device link you clicked may have moved or been updated.
              Don&apos;t worry — all our phones, buyback services, and store details are right here.
            </p>
          </div>

          {/* Quick Search */}
          <div className="max-w-md mx-auto">
            <form action="/products" method="GET" className="relative flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search smartphones, 5G devices, earbuds..."
                className="w-full pl-10 pr-24 py-3 rounded-2xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] placeholder-[#77716A] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-2 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
              >
                Search
              </button>
            </form>
          </div>

          {/* Helpful Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <Link
              href="/products?category=smartphones"
              className="p-4 rounded-2xl bg-[#EDE6DC] border border-[#DED6CA] hover:border-[#24211E] transition space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] flex items-center justify-center text-[#24211E]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#24211E] group-hover:text-[#E66827] transition flex items-center justify-between">
                <span>Browse Phones</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-[#77716A]">100% brand sealed models with warranty</p>
            </Link>

            <Link
              href="/sell-old-device"
              className="p-4 rounded-2xl bg-[#EDE6DC] border border-[#DED6CA] hover:border-[#26784F] transition space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] flex items-center justify-center text-[#26784F]">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#24211E] group-hover:text-[#26784F] transition flex items-center justify-between">
                <span>Sell Old Device</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-[#77716A]">Instant cash payout & doorstep pickup</p>
            </Link>

            <Link
              href="/about"
              className="p-4 rounded-2xl bg-[#EDE6DC] border border-[#DED6CA] hover:border-[#24211E] transition space-y-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] flex items-center justify-center text-[#E66827]">
                <Home className="w-4 h-4" />
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#24211E] group-hover:text-[#E66827] transition flex items-center justify-between">
                <span>About Our Store</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-[11px] text-[#77716A]">Basharatpur Gorakhpur flagship location</p>
            </Link>
          </div>

          {/* Direct WhatsApp help */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/918726942338?text=Hello%20A1%20Mobile%20Shop!%20I%20was%20looking%20for%20a%20page%20on%20your%20site%20and%20could%20not%20find%20it."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#26784F] text-white text-xs font-bold hover:bg-[#1E5D3D] transition inline-flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
            <a
              href="tel:+918726942338"
              className="px-5 py-2.5 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-[#24211E] text-xs font-bold hover:bg-[#DED6CA] transition inline-flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-[#26784F]" />
              <span>Call +91 87269 42338</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="border-t border-[#DED6CA] bg-[#EDE6DC] py-4 text-center text-xs text-[#77716A]">
        © {new Date().getFullYear()} A1 Mobile Shop. Basharatpur, Gorakhpur.
      </footer>
    </div>
  );
}
