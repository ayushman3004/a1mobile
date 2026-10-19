"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingBag, MessageSquare, Check, ShieldCheck } from "lucide-react";
import { IProduct } from "@/types";
import { formatPrice, buildWhatsAppLink } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  whatsappNumber,
}: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.storage || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || ""
  );
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const currentVariant =
    product.variants.find((v) => v.storage === selectedVariant) ||
    product.variants[0];
  const price = currentVariant ? currentVariant.price : product.price;
  const originalPrice = currentVariant
    ? currentVariant.originalPrice
    : product.originalPrice;

  const handleAddToCart = () => {
    addToCart({
      productId: product._id || product.id || product.slug,
      name: product.name,
      slug: product.slug,
      price: price,
      originalPrice: originalPrice,
      image: product.thumbnail,
      selectedColor,
      selectedVariant,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappLink = buildWhatsAppLink(
    whatsappNumber,
    `Hi A1 Mobile Shop! I'm inquiring about ${product.name} (${selectedVariant || ""}) priced at ${formatPrice(price)}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-2xl bg-[#F5EFE6] rounded-2xl border border-[#DED6CA] shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#EDE6DC] hover:bg-[#DED6CA] transition text-[#24211E]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="relative aspect-square bg-[#EDE6DC] rounded-xl flex items-center justify-center p-6 border border-[#DED6CA]">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-[#E66827] text-white text-xs font-bold">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#77716A] font-bold">
                {product.brand}
              </span>
              <h3 className="text-xl font-bold text-[#24211E] mt-0.5">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-[#77716A]">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold ml-1 text-[#24211E]">
                    {product.rating}
                  </span>
                </div>
                <span>•</span>
                <span>{product.reviewCount} reviews</span>
                <span>•</span>
                <span className="text-[#26784F] font-semibold">In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-black text-[#24211E]">
                {formatPrice(price)}
              </span>
              {originalPrice > price && (
                <span className="text-sm text-[#77716A] line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {/* Storage Variants */}
            {product.variants.length > 0 && (
              <div>
                <label className="text-xs font-bold text-[#575047] block mb-1.5">
                  Configuration:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.storage}
                      onClick={() => setSelectedVariant(v.storage)}
                      className={`px-3 py-1 text-xs rounded-lg border font-medium transition ${
                        selectedVariant === v.storage
                          ? "bg-[#24211E] text-white border-[#24211E]"
                          : "bg-[#EDE6DC] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                      }`}
                    >
                      {v.storage} {v.ram ? `(${v.ram})` : ""}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <label className="text-xs font-bold text-[#575047] block mb-1.5">
                  Color: {selectedColor}
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full border-2 transition ${
                        selectedColor === c.name
                          ? "border-[#24211E] scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-[#575047] line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#3D3731] transition"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#26784F]" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#26784F] text-white hover:bg-[#1E5D3D] transition"
                title="WhatsApp Enquiry"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#77716A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#26784F]" />
              <span>Official Brand Warranty • 100% Genuine Device</span>
            </div>

            <div className="text-center pt-1">
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="text-xs font-bold text-[#24211E] underline underline-offset-4 hover:text-[#E66827] transition"
              >
                View Full Product Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
