"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  MessageSquare,
  Heart,
  Plus,
  Minus,
  Check,
  Zap,
} from "lucide-react";
import { IProduct } from "@/types";
import {
  formatPrice,
  buildWhatsAppLink,
  formatProductEnquiryMessage,
} from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductDetailClientProps {
  product: IProduct;
  whatsappNumber: string;
}

export default function ProductDetailClient({
  product,
  whatsappNumber,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]?.url || product.thumbnail
  );
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.storage || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const currentVariant =
    product.variants.find((v) => v.storage === selectedVariant) ||
    product.variants[0];

  const price = currentVariant ? currentVariant.price : product.price;
  const originalPrice = currentVariant
    ? currentVariant.originalPrice
    : product.originalPrice;

  const productId = product._id || product.id || product.slug;
  const wishlisted = isInWishlist(productId);

  const handleAddToCart = () => {
    addToCart(
      {
        productId,
        name: product.name,
        slug: product.slug,
        price,
        originalPrice,
        image: product.thumbnail,
        selectedColor,
        selectedVariant,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        productId,
        name: product.name,
        slug: product.slug,
        price,
        originalPrice,
        image: product.thumbnail,
        selectedColor,
        selectedVariant,
      },
      quantity
    );
    router.push("/checkout");
  };

  const whatsappMessage = formatProductEnquiryMessage({
    name: product.name,
    price,
    variant: selectedVariant,
    color: selectedColor,
    slug: product.slug,
  });
  const whatsappUrl = buildWhatsAppLink(whatsappNumber, whatsappMessage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Left: Gallery (5 cols) */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Image Stage */}
        <div className="relative aspect-square bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-8 flex items-center justify-center overflow-hidden shadow-sm">
          {product.discountPercentage > 0 && (
            <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#E66827] text-white text-xs font-black shadow-xs z-10">
              Save {product.discountPercentage}%
            </span>
          )}

          <button
            onClick={() => toggleWishlist(product)}
            className={`absolute top-4 right-4 z-10 p-2.5 rounded-xl backdrop-blur-xs transition ${
              wishlisted
                ? "bg-red-50 text-red-500 shadow-sm"
                : "bg-white/80 text-[#24211E] hover:bg-white"
            }`}
            title="Wishlist"
          >
            <Heart
              className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`}
            />
          </button>

          <div className="relative w-full h-full">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain p-4 hover:scale-105 transition-transform duration-500"
              priority
              sizes="(max-width: 1024px) 100vw, 550px"
            />
          </div>
        </div>

        {/* Thumbnail Carousel */}
        {product.images && product.images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img.url)}
                className={`relative w-20 h-20 rounded-xl bg-[#EDE6DC] border-2 overflow-hidden shrink-0 transition ${
                  selectedImage === img.url
                    ? "border-[#24211E] scale-105"
                    : "border-[#DED6CA] hover:border-[#77716A]"
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.alt || product.name}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Product Details & Controls (7 cols) */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#77716A]">
              {product.brand}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#26784F]/10 text-[#26784F] text-xs font-bold">
              ✓ In Stock (Gorakhpur Store)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#24211E] tracking-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-2 text-xs text-[#77716A]">
            <div className="flex items-center text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span>{product.rating}</span>
            </div>
            <span>•</span>
            <span className="font-medium">{product.reviewCount} customer reviews</span>
            <span>•</span>
            <span className="text-[#26784F] font-bold">Brand Sealed Pack</span>
          </div>
        </div>

        {/* Price Display */}
        <div className="p-4 rounded-2xl bg-[#EDE6DC] border border-[#DED6CA] flex items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-black text-[#24211E]">
              {formatPrice(price)}
            </span>
            {originalPrice > price && (
              <span className="text-base text-[#77716A] line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-[#26784F]">
            Inclusive of all GST taxes
          </span>
        </div>

        {/* Storage / Variant Selection */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#24211E] uppercase tracking-wider block">
              Select Configuration:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {product.variants.map((v) => (
                <button
                  key={v.storage}
                  onClick={() => setSelectedVariant(v.storage)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                    selectedVariant === v.storage
                      ? "bg-[#24211E] text-white border-[#24211E] shadow-xs"
                      : "bg-[#EDE6DC] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                  }`}
                >
                  <span>{v.storage}</span>
                  {v.ram && <span className="ml-1 opacity-80">({v.ram})</span>}
                  <span className="ml-2 font-normal">
                    {formatPrice(v.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#24211E] uppercase tracking-wider block">
              Color: <span className="font-normal text-[#575047]">{selectedColor}</span>
            </label>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition ${
                    selectedColor === c.name
                      ? "bg-[#EDE6DC] border-[#24211E] font-bold"
                      : "bg-[#F5EFE6] border-[#DED6CA]"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 pt-2">
          <span className="text-xs font-bold text-[#24211E]">Quantity:</span>
          <div className="flex items-center rounded-xl bg-[#EDE6DC] border border-[#DED6CA] p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 rounded-lg hover:bg-[#DED6CA] text-[#24211E] transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-xs font-bold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg hover:bg-[#DED6CA] text-[#24211E] transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#24211E] text-[#EDE6DC] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#3D3731] transition shadow-md"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-[#26784F]" />
                <span>Added to Shopping Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </>
            )}
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#E66827] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#d55819] transition shadow-md"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Instant Buy Now</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-5 rounded-2xl bg-[#26784F] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E5D3D] transition shadow-md shrink-0"
            title="Chat with Store on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>


        {/* Trust & Guarantee Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#DED6CA]">
          <div className="p-3 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#26784F] shrink-0" />
            <span className="text-[11px] font-bold text-[#24211E] leading-tight">
              {product.warranty || "1 Year Official Brand Warranty"}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] flex items-center gap-2.5">
            <Truck className="w-5 h-5 text-[#E66827] shrink-0" />
            <span className="text-[11px] font-bold text-[#24211E] leading-tight">
              Gorakhpur Same Day Dispatch
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] flex items-center gap-2.5">
            <RotateCcw className="w-5 h-5 text-[#24211E] shrink-0" />
            <span className="text-[11px] font-bold text-[#24211E] leading-tight">
              7 Days Return / Exchange
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
