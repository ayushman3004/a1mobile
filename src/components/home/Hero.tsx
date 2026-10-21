"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { IProduct } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface HeroProps {
  newArrivals: IProduct[];
  currentArrivals: IProduct[];
}

export default function Hero({ newArrivals, currentArrivals }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"new" | "current">("new");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const activeList = activeTab === "new" ? newArrivals : currentArrivals;
  const currentProduct = activeList[currentIndex] || activeList[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activeList.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    if (!currentProduct) return;
    addToCart({
      productId: currentProduct._id || currentProduct.id || currentProduct.slug,
      name: currentProduct.name,
      slug: currentProduct.slug,
      price: currentProduct.price,
      originalPrice: currentProduct.originalPrice,
      image: currentProduct.thumbnail,
      selectedColor: currentProduct.colors[0]?.name,
      selectedVariant: currentProduct.variants[0]?.storage,
    });
  };

  return (
    <section className="bg-[#F5EFE6] pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#575047]">
              <span className="w-2 h-2 rounded-full bg-[#26784F]"></span>
              <span>Gorakhpur Flagship Retail &amp; Doorstep Buyback</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#24211E] tracking-tight leading-[1.08]">
              Upgrade your <br />
              <span className="text-[#575047]">mobile experience</span>
            </h1>

            <p className="text-base sm:text-lg text-[#575047] max-w-xl leading-relaxed">
              Genuine flagship smartphones, verified pre-owned devices, and
              instant cash exchange at your doorstep in Gorakhpur.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/products?category=smartphones"
                className="px-7 py-3.5 rounded-xl bg-[#24211E] text-[#EDE6DC] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#3D3731] transition shadow-md group"
              >
                <span>Shop smartphones</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/sell-old-device"
                className="px-7 py-3.5 rounded-xl bg-[#EDE6DC] text-[#24211E] border border-[#DED6CA] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#DED6CA] transition shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-[#26784F]" />
                <span>Sell your old phone</span>
              </Link>
            </div>

            {/* Trust statement */}
            <div className="pt-4 border-t border-[#DED6CA]/70 flex items-center gap-2.5 text-xs text-[#77716A] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#26784F] shrink-0" />
              <span>
                100% genuine devices, instant doorstep buyback, Gorakhpur store
              </span>
            </div>
          </div>

          {/* Right Column: Large Rounded Product Showcase Card */}
          <div className="lg:col-span-5">
            {currentProduct && (
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between">
                {/* Tabs & Controls */}
                <div className="flex items-center justify-between gap-2 border-b border-[#DED6CA] pb-4 mb-4">
                  <div className="flex items-center gap-1 bg-[#F5EFE6] p-1 rounded-xl border border-[#DED6CA]">
                    <button
                      onClick={() => {
                        setActiveTab("new");
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        activeTab === "new"
                          ? "bg-[#24211E] text-[#EDE6DC]"
                          : "text-[#77716A] hover:text-[#24211E]"
                      }`}
                    >
                      New arrivals
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("current");
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                        activeTab === "current"
                          ? "bg-[#24211E] text-[#EDE6DC]"
                          : "text-[#77716A] hover:text-[#24211E]"
                      }`}
                    >
                      Current arrivals
                    </button>
                  </div>

                  {/* Previous / Next Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#DED6CA] border border-[#DED6CA] text-[#24211E] transition"
                      aria-label="Previous item"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg bg-[#F5EFE6] hover:bg-[#DED6CA] border border-[#DED6CA] text-[#24211E] transition"
                      aria-label="Next item"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Image Stage */}
                <div className="relative aspect-[4/3] w-full bg-[#F5EFE6]/70 rounded-2xl p-4 flex items-center justify-center my-2 border border-[#DED6CA]">
                  {currentProduct.discountPercentage > 0 && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#E66827] text-white text-[11px] font-black uppercase tracking-wider shadow-xs z-10">
                      Save {currentProduct.discountPercentage}%
                    </span>
                  )}

                  <div className="w-full h-full relative">
                    <Image
                      src={currentProduct.thumbnail}
                      alt={currentProduct.name}
                      fill
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                      priority
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </div>
                </div>

                {/* Product Meta */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#77716A]">
                      {currentProduct.brand}
                    </span>
                    <span className="text-[11px] font-semibold text-[#26784F] bg-[#26784F]/10 px-2 py-0.5 rounded-md">
                      Gorakhpur Verified Stock
                    </span>
                  </div>

                  <Link href={currentProduct.slug ? `/products/${currentProduct.slug}` : "/products"}>
                    <h3 className="text-xl sm:text-2xl font-black text-[#24211E] hover:text-[#E66827] transition">
                      {currentProduct.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#575047] line-clamp-2 leading-relaxed">
                    {currentProduct.shortDescription || currentProduct.description}
                  </p>

                  <div className="flex items-baseline justify-between pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#24211E]">
                        {formatPrice(currentProduct.price)}
                      </span>
                      {currentProduct.originalPrice > currentProduct.price && (
                        <span className="text-xs text-[#77716A] line-through">
                          {formatPrice(currentProduct.originalPrice)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="px-4 py-2 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold flex items-center gap-1.5 hover:bg-[#3D3731] transition shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-1.5 pt-4 mt-2 border-t border-[#DED6CA]/50">
                  {activeList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        currentIndex === idx
                          ? "w-6 bg-[#24211E]"
                          : "w-1.5 bg-[#DED6CA] hover:bg-[#77716A]"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
