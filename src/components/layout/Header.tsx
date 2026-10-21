"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  PhoneCall,
  Heart,
  ShoppingBag,
  User as UserIcon,
  ChevronDown,
  LogOut,
  Shield,
  Package,
  RotateCcw,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { IStoreSettings } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function Header({ settings }: { settings: IStoreSettings }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { cartCount, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, isAdmin } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-[#F5EFE6] border-b border-[#DED6CA] sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
          {/* Left: Brand Identity */}
          <Logo variant="header" withLink />

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search smartphones, 5G devices, audio, accessories..."
                  className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-[#EDE6DC]/70 border border-[#DED6CA] text-sm text-[#24211E] placeholder-[#77716A] focus:outline-none focus:ring-2 focus:ring-[#24211E] focus:bg-[#EDE6DC] transition"
                />
              </div>
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 rounded-lg bg-[#24211E] text-[#EDE6DC] text-xs font-medium hover:bg-[#3D3731] transition shadow-xs"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right: Actions & Contacts */}
          <div className="flex items-center gap-1.5 sm:gap-4 lg:gap-6 shrink-0">
            {/* Call Store */}
            <a
              href={`tel:${settings.phone.replace(/\s+/g, "")}`}
              className="hidden lg:flex items-center gap-2 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] flex items-center justify-center text-[#24211E] group-hover:bg-[#24211E] group-hover:text-white transition">
                <PhoneCall className="w-4 h-4 text-[#26784F]" />
              </div>
              <div className="leading-tight">
                <span className="text-[10px] text-[#77716A] block font-medium uppercase tracking-wider">
                  Call Us
                </span>
                <span className="text-xs font-bold text-[#24211E]">
                  {settings.phone}
                </span>
              </div>
            </a>

            {/* User Account Dropdown */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] hover:bg-[#DED6CA] transition text-[#24211E]"
                  >
                    <UserIcon className="w-4 h-4 text-[#24211E]" />
                    <span className="max-w-[80px] truncate hidden sm:inline">
                      {user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#77716A]" />
                  </button>

                  {isAccountOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] shadow-lg py-2 z-50 text-xs font-medium text-[#24211E]"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <div className="px-3 py-1.5 border-b border-[#DED6CA] mb-1">
                        <p className="font-bold truncate">{user.name}</p>
                        <p className="text-[11px] text-[#77716A] truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#DED6CA] transition"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>My Account</span>
                      </Link>

                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#DED6CA] transition"
                      >
                        <Package className="w-3.5 h-3.5" />
                        <span>Order History</span>
                      </Link>

                      <Link
                        href="/account#buybacks"
                        className="flex items-center gap-2 px-3 py-2 hover:bg-[#DED6CA] transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Sell Requests</span>
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-[#E66827] font-bold hover:bg-[#DED6CA] transition"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          <span>Admin Portal</span>
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-[#DED6CA] transition border-t border-[#DED6CA] mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/account/login"
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] hover:bg-[#24211E] hover:text-white transition text-[#24211E]"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>

            {/* Wishlist */}
            <Link
              href="/account#wishlist"
              className="relative p-1.5 sm:p-2 rounded-lg hover:bg-[#EDE6DC] transition text-[#24211E]"
              title="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#24211E]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E66827] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#24211E] text-[#EDE6DC] hover:bg-[#3D3731] transition shadow-xs group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#26784F] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden sm:inline">
                {formatPrice(subtotal)}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 block md:hidden">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search smartphones, 5G..."
              className="w-full pl-9 pr-20 py-2 rounded-xl bg-[#EDE6DC]/70 border border-[#DED6CA] text-xs text-[#24211E] placeholder-[#77716A] focus:outline-none focus:ring-1 focus:ring-[#24211E]"
            />
            <button
              type="submit"
              className="absolute right-1 px-3 py-1 rounded-lg bg-[#24211E] text-[#EDE6DC] text-[11px] font-medium"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
