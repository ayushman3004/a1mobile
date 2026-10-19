"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Smartphone,
  RotateCcw,
  Headphones,
  Tag,
  Layers,
  Briefcase,
  PhoneCall,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { INavigationItem } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-4 h-4" />,
  RotateCcw: <RotateCcw className="w-4 h-4" />,
  Headphones: <Headphones className="w-4 h-4" />,
  Tag: <Tag className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  PhoneCall: <PhoneCall className="w-4 h-4" />,
};

export default function Navbar({ items }: { items: INavigationItem[] }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#EEE7DC] border-b border-[#DED6CA] sticky top-[69px] sm:top-[77px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {items.map((item) => {
              const isActive = pathname === item.href;
              const hasBadge = !!item.badge;

              return (
                <Link
                  key={item._id || item.title}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${
                    isActive
                      ? "text-[#24211E] bg-[#EDE6DC] shadow-2xs font-bold"
                      : "text-[#575047] hover:text-[#24211E] hover:bg-[#EDE6DC]/60"
                  }`}
                >
                  {item.iconName && iconMap[item.iconName]}
                  <span>{item.title}</span>

                  {hasBadge && (
                    <span className="ml-1 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#26784F] text-white uppercase tracking-wider animate-pulse">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Doorstep CTA (Desktop) */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/sell-old-device"
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[#EDE6DC] border border-[#26784F]/30 text-[#26784F] hover:bg-[#26784F] hover:text-white transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Doorstep Pickup in Gorakhpur</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <span className="text-xs font-bold text-[#575047] uppercase tracking-wider">
              Explore Store Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-[#24211E] hover:bg-[#EDE6DC] transition"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-[#DED6CA] space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item._id || item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "bg-[#EDE6DC] text-[#24211E] font-bold"
                      : "text-[#575047] hover:bg-[#EDE6DC]/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item.iconName && iconMap[item.iconName]}
                    <span>{item.title}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#26784F] text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
