"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Sparkles,
  Flame,
} from "lucide-react";
import { IProduct } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface HeroProps {
  newArrivals: IProduct[];
  currentArrivals: IProduct[];
}

export default function Hero({ newArrivals, currentArrivals }: HeroProps) {
  // Sort helper to ensure most recently updated product is always first
  const sortByLatest = useCallback((items: IProduct[]) => {
    return [...items].sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  }, []);

  const [activeTab, setActiveTab] = useState<"new" | "current">("new");
  const [newList, setNewList] = useState<IProduct[]>(() => sortByLatest(newArrivals));
  const [currentList, setCurrentList] = useState<IProduct[]>(() => sortByLatest(currentArrivals));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { addToCart } = useCart();

  const activeList = activeTab === "new" ? newList : currentList;
  const currentProduct = activeList[currentIndex] || activeList[0];

  // Dynamic slideshow timer: auto-advances smoothly every 2.5 seconds
  const SLIDE_DURATION = 2500;

  useEffect(() => {
    if (isPaused || !activeList || activeList.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeList.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, activeList]);

  // Live polling: every 5 seconds check for newly updated products so any update immediately jumps to position 0
  useEffect(() => {
    const checkLatestUpdates = async () => {
      try {
        const res = await fetch("/api/products?sort=latest&limit=10", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data?.products && data.products.length > 0) {
          const sorted = sortByLatest(data.products);
          // If the top product has updated, update state and show it first
          const currentTopId = newList[0]?._id || newList[0]?.slug;
          const freshTopId = sorted[0]?._id || sorted[0]?.slug;
          if (currentTopId !== freshTopId) {
            setNewList(sorted);
            setCurrentIndex(0); // Immediately jump to show updated product first
          }
        }
      } catch {
        // Keep existing list on network glitch
      }
    };

    const interval = setInterval(checkLatestUpdates, 5000);
    return () => clearInterval(interval);
  }, [newList, sortByLatest]);

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
      selectedColor: currentProduct.colors?.[0]?.name,
      selectedVariant: currentProduct.variants?.[0]?.storage,
    });
  };

  // Check if current item is the top updated product
  const isTopUpdated = currentIndex === 0;

  return (
    <section className="bg-[#F5EFE6] pt-8 sm:pt-14 pb-12 sm:pb-16 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#575047]">
              <span className="w-2 h-2 rounded-full bg-[#26784F] animate-pulse"></span>
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

            {/* Action Buttons */}
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

            {/* Trust Statement */}
            <div className="pt-4 border-t border-[#DED6CA]/70 flex items-center gap-2.5 text-xs text-[#77716A] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#26784F] shrink-0" />
              <span>
                100% genuine devices, instant doorstep buyback, Gorakhpur store
              </span>
            </div>
          </div>

          {/* Right Column: Moving Dynamic Product Gallery Card */}
          <div className="lg:col-span-5">
            {currentProduct && (
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col justify-between transition-shadow hover:shadow-xl group"
              >
                {/* Dynamic Auto-Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#DED6CA]/50 overflow-hidden">
                  <div
                    key={`${currentIndex}-${isPaused}`}
                    className={`h-full bg-gradient-to-r from-[#26784F] to-[#E66827] transition-all ${
                      isPaused ? "opacity-50" : "animate-progress"
                    }`}
                    style={{
                      animation: isPaused
                        ? "none"
                        : `progressBar ${SLIDE_DURATION}ms linear infinite`,
                    }}
                  />
                </div>

                {/* Top Tabs & Gallery Controls */}
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

                  {/* Nav Arrows */}
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

                {/* Animated Product Showcase Stage */}
                <div className="relative aspect-[4/3] w-full bg-[#F5EFE6]/70 rounded-2xl p-4 flex items-center justify-center my-2 border border-[#DED6CA] overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                    {isTopUpdated && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#26784F] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3 fill-current" />
                        <span>Recently Updated</span>
                      </span>
                    )}
                    {currentProduct.discountPercentage > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#E66827] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                        <Flame className="w-3 h-3 fill-current" />
                        <span>Save {currentProduct.discountPercentage}%</span>
                      </span>
                    )}
                  </div>

                  {/* Animated Image Slide */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentProduct._id || currentProduct.slug || currentIndex}
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={currentProduct.thumbnail}
                        alt={currentProduct.name}
                        fill
                        className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 768px) 100vw, 450px"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Product Metadata */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`meta-${currentProduct._id || currentProduct.slug || currentIndex}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="pt-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase font-extrabold tracking-wider text-[#77716A]">
                        {currentProduct.brand}
                      </span>
                      <span className="text-[11px] font-semibold text-[#26784F] bg-[#26784F]/10 px-2 py-0.5 rounded-md">
                        Gorakhpur Verified Stock
                      </span>
                    </div>

                    <Link
                      href={
                        currentProduct.slug
                          ? `/products/${currentProduct.slug}`
                          : "/products"
                      }
                    >
                      <h3 className="text-xl sm:text-2xl font-black text-[#24211E] hover:text-[#E66827] transition line-clamp-1">
                        {currentProduct.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-[#575047] line-clamp-2 leading-relaxed min-h-[32px]">
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
                        className="px-4 py-2 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold flex items-center gap-1.5 hover:bg-[#3D3731] transition shadow-xs active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Order Now</span>
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dynamic Pagination Indicator & Dots */}
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#DED6CA]/50">
                  <div className="flex items-center gap-1.5">
                    {activeList.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentIndex === idx
                            ? "w-6 bg-[#24211E]"
                            : "w-1.5 bg-[#DED6CA] hover:bg-[#77716A]"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-[#77716A]">
                    {currentIndex + 1} / {activeList.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar Animation Styles */}
      <style jsx>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
