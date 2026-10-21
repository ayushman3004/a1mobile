"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  MessageSquare,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  formatPrice,
  buildWhatsAppLink,
  getStoreWhatsAppNumber,
} from "@/lib/utils";


export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();

    if (code === "A1WELCOME") {
      const disc = Math.min(1500, Math.round(subtotal * 0.1));
      setDiscountAmount(disc);
      setAppliedCode(code);
    } else if (code === "GORAKHPUR500") {
      const disc = Math.min(500, Math.round(subtotal * 0.05));
      setDiscountAmount(disc);
      setAppliedCode(code);
    } else if (code === "A1MEGA") {
      const disc = Math.min(3000, Math.round(subtotal * 0.15));
      setDiscountAmount(disc);
      setAppliedCode(code);
    } else {
      setCouponError("Invalid coupon code. Try A1WELCOME for 10% off!");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-8 sm:p-12 text-center max-w-md w-full space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#F5EFE6] text-[#77716A] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#24211E]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#575047] leading-relaxed">
            Explore our curated inventory of flagship 5G smartphones, genuine
            adapters, and audio gear in Gorakhpur.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight">
            Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
          </h1>
          <p className="text-xs sm:text-sm text-[#575047] mt-1">
            Review your selected devices and choose delivery options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.selectedVariant || ""}-${
                  item.selectedColor || ""
                }`}
                className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Image & Basic Details */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-[#F5EFE6] rounded-xl border border-[#DED6CA] overflow-hidden shrink-0 flex items-center justify-center p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-bold text-sm text-[#24211E] hover:text-[#E66827] transition line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#77716A]">
                      {item.selectedVariant && (
                        <span>Config: {item.selectedVariant}</span>
                      )}
                      {item.selectedColor && (
                        <span>• Color: {item.selectedColor}</span>
                      )}
                    </div>
                    <div className="text-sm font-black text-[#24211E]">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-[#DED6CA]">
                  <div className="flex items-center bg-[#F5EFE6] rounded-xl border border-[#DED6CA] p-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.selectedVariant
                        )
                      }
                      className="p-1 rounded-lg hover:bg-[#DED6CA] transition text-[#24211E]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#24211E]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.selectedVariant
                        )
                      }
                      className="p-1 rounded-lg hover:bg-[#DED6CA] transition text-[#24211E]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="text-sm font-black text-[#24211E] w-20 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </span>

                  <button
                    onClick={() =>
                      removeFromCart(item.productId, item.selectedVariant)
                    }
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Trust note */}
            <div className="p-4 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] flex items-center gap-3 text-xs text-[#575047]">
              <ShieldCheck className="w-5 h-5 text-[#26784F] shrink-0" />
              <span>
                All devices are backed by official brand warranty and safe
                packaging from our Gorakhpur store.
              </span>
            </div>
          </div>

          {/* Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-5 shadow-sm">
              <h3 className="text-base font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                Order Summary
              </h3>

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-[11px] font-extrabold uppercase text-[#77716A] block">
                  Discount Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. A1WELCOME"
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs uppercase font-bold text-[#24211E] focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
                  >
                    Apply
                  </button>
                </div>

                {appliedCode && (
                  <p className="text-[11px] text-[#26784F] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Code {appliedCode} applied
                    successfully!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-medium">
                    {couponError}
                  </p>
                )}
              </form>

              {/* Calculation Rows */}
              <div className="space-y-2.5 text-xs text-[#575047] pt-2 border-t border-[#DED6CA]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#24211E]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-[#26784F] font-bold">
                    <span>Discount Code</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Gorakhpur Delivery</span>
                  <span>
                    {deliveryCharge === 0 ? (
                      <span className="text-[#26784F] font-bold">FREE</span>
                    ) : (
                      formatPrice(deliveryCharge)
                    )}
                  </span>
                </div>

                <div className="flex items-baseline justify-between pt-3 border-t border-[#DED6CA] text-base font-black text-[#24211E]">
                  <span>Total Amount</span>
                  <span className="text-xl sm:text-2xl text-[#24211E]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-3.5 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3D3731] transition shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Order via WhatsApp */}
              <a
                href={buildWhatsAppLink(
                  getStoreWhatsAppNumber(),
                  `👋 *Hello A1 Mobile Shop Gorakhpur!*
I would like to order my cart items directly via WhatsApp:
${cart.map((i, idx) => `${idx + 1}. *${i.name}*${i.selectedVariant ? ` (${i.selectedVariant})` : ""} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`).join("\n")}

• Subtotal: ${formatPrice(subtotal)}
• Gorakhpur Delivery: ${deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
• *Total Payable:* ${formatPrice(finalTotal)}

Please confirm item availability and arrange delivery.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-[#26784F] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1E5D3D] transition shadow-xs"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Order Directly on WhatsApp</span>
              </a>


              <div className="text-center">
                <Link
                  href="/products"
                  className="text-xs font-bold text-[#77716A] hover:text-[#24211E] underline transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
