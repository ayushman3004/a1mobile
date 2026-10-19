"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ShoppingBag,
  MessageSquare,
  Eye,
  Check,
} from "lucide-react";
import { IProduct } from "@/types";
import {
  formatPrice,
  buildWhatsAppLink,
  formatProductEnquiryMessage,
} from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: IProduct;
  whatsappNumber?: string;
}

export default function ProductCard({
  product,
  whatsappNumber = "+919876543210",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const productId = product._id || product.id || product.slug;
  const wishlisted = isInWishlist(productId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      productId,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.thumbnail,
      selectedColor: product.colors[0]?.name,
      selectedVariant: product.variants[0]?.storage,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const whatsappMessage = formatProductEnquiryMessage({
    name: product.name,
    price: product.price,
    slug: product.slug,
  });
  const whatsappUrl = buildWhatsAppLink(whatsappNumber, whatsappMessage);

  // Extract a highlight spec badge if available
  const specBadge =
    product.specifications?.Display?.includes("AMOLED")
      ? "AMOLED"
      : product.tags?.includes("5G")
      ? "5G Ready"
      : undefined;

  return (
    <>
      <div className="group relative bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#575047]/30 transition-all duration-300">
        {/* Top Badges & Wishlist */}
        <div className="relative aspect-[4/3] bg-[#F5EFE6]/60 p-4 flex items-center justify-center overflow-hidden">
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
            {product.discountPercentage > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#E66827] text-white text-[11px] font-extrabold tracking-wide shadow-2xs">
                -{product.discountPercentage}%
              </span>
            )}
            {specBadge && (
              <span className="px-2 py-0.5 rounded-full bg-[#24211E] text-[#EDE6DC] text-[10px] font-bold tracking-wider">
                {specBadge}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-xs transition ${
              wishlisted
                ? "bg-red-50 text-red-500 shadow-xs"
                : "bg-white/70 text-[#24211E] hover:bg-white"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`}
            />
          </button>

          {/* Product Image */}
          <Link
            href={`/products/${product.slug}`}
            className="w-full h-full relative flex items-center justify-center"
          >
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            />
          </Link>

          {/* Quick View Hover Trigger */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <button
              onClick={handleQuickView}
              className="px-3 py-1.5 rounded-full bg-[#24211E]/90 text-white text-xs font-semibold flex items-center gap-1.5 backdrop-blur-xs hover:bg-[#24211E] transition shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Brand & Rating */}
            <div className="flex items-center justify-between text-xs text-[#77716A] mb-1">
              <span className="font-bold uppercase tracking-wider text-[11px] text-[#575047]">
                {product.brand}
              </span>
              <div className="flex items-center text-amber-500 gap-1 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-[#77716A] font-normal text-[11px]">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Product Title */}
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-bold text-[#24211E] text-sm line-clamp-1 hover:text-[#E66827] transition">
                {product.name}
              </h3>
            </Link>

            {/* Available Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] text-[#77716A]">Colors:</span>
                <div className="flex items-center gap-1">
                  {product.colors.map((c) => (
                    <span
                      key={c.name}
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 mt-3 border-t border-[#DED6CA]/60">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-extrabold text-[#24211E] text-base sm:text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#77716A] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Bottom Button Row */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 px-3 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#3D3731] transition"
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#26784F]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-[#26784F] text-white hover:bg-[#1E5D3D] transition shrink-0"
                title="WhatsApp Enquiry"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
