"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  AlertCircle,
  Package,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  formatPrice,
  formatOrderPlacedWhatsAppMessage,
  buildWhatsAppLink,
  getStoreWhatsAppNumber,
  generateOrderNumber,
} from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || "");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "");

  const [street, setStreet] = useState("");
  const [area, setArea] = useState("Basharatpur");
  const [city] = useState("Gorakhpur");
  const [pincode, setPincode] = useState("273004");
  const [landmark, setLandmark] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName || !customerEmail || !customerPhone) {
      setErrorMessage("Please complete your contact details.");
      return;
    }

    if (!street || !pincode) {
      setErrorMessage("Please complete your Gorakhpur delivery address.");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName,
        customerEmail,
        customerPhone,
        items: cart.map((i) => ({
          productId: i.productId,
          name: i.name,
          slug: i.slug,
          price: i.price,
          quantity: i.quantity,
          color: i.selectedColor,
          variant: i.selectedVariant,
          image: i.image,
        })),
        shippingAddress: {
          street,
          area,
          city,
          pincode,
          landmark,
        },
        paymentMethod,
        discount: 0,
        deliveryCharge,
        notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      let placedOrder = data?.order;

      // If backend succeeded or returned an order
      if (!placedOrder) {
        // Fallback resilient order object for immediate WhatsApp dispatch
        placedOrder = {
          orderNumber: generateOrderNumber(),
          customerName,
          customerEmail,
          customerPhone,
          items: orderPayload.items,
          shippingAddress: orderPayload.shippingAddress,
          paymentMethod,
          subtotal,
          deliveryCharge,
          total,
          notes,
        };
      }

      setConfirmedOrder(placedOrder);
      clearCart();

      // Build WhatsApp message and link
      const storeNumber = getStoreWhatsAppNumber();
      const message = formatOrderPlacedWhatsAppMessage(placedOrder);
      const wpLink = buildWhatsAppLink(storeNumber, message);
      setWhatsappUrl(wpLink);

      // Auto-redirect to WhatsApp
      try {
        window.open(wpLink, "_blank");
      } catch {
        // Fallback handled by user clicking WhatsApp CTA button
      }
    } catch {
      // In case of network failure, still create order object and redirect to WhatsApp
      const fallbackOrder = {
        orderNumber: generateOrderNumber(),
        customerName,
        customerEmail,
        customerPhone,
        items: cart.map((i) => ({
          productId: i.productId,
          name: i.name,
          slug: i.slug,
          price: i.price,
          quantity: i.quantity,
          color: i.selectedColor,
          variant: i.selectedVariant,
          image: i.image,
        })),
        shippingAddress: {
          street,
          area,
          city,
          pincode,
          landmark,
        },
        paymentMethod,
        subtotal,
        deliveryCharge,
        total,
        notes,
      };

      setConfirmedOrder(fallbackOrder);
      clearCart();

      const storeNumber = getStoreWhatsAppNumber();
      const message = formatOrderPlacedWhatsAppMessage(fallbackOrder);
      const wpLink = buildWhatsAppLink(storeNumber, message);
      setWhatsappUrl(wpLink);

      try {
        window.open(wpLink, "_blank");
      } catch {
        // user clicks button
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedOrder) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-[#F5EFE6]">
        <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-8 sm:p-12 text-center max-w-lg w-full space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#26784F] text-white flex items-center justify-center mx-auto shadow-md">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <div>
            <span className="text-xs font-bold text-[#26784F] uppercase tracking-wider block">
              Order Placed Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#24211E] mt-1">
              Thank You For Your Order!
            </h2>
            <p className="text-xs sm:text-sm text-[#575047] mt-2">
              Your device order has been registered and sent to our Gorakhpur dispatch desk.
            </p>
          </div>

          {/* WhatsApp Direct Notification & Action Card */}
          {whatsappUrl && (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#26784F]/10 border border-[#26784F]/30 text-left space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#26784F] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#24211E]">
                    Confirming on WhatsApp
                  </h4>
                  <p className="text-[11px] text-[#575047] mt-0.5">
                    We’ve prepared a WhatsApp message with your order details. If WhatsApp did not open automatically, click the button below to confirm with our team:
                  </p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#26784F] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#1E5D3D] transition shadow-md group"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Open WhatsApp (Order #{confirmedOrder.orderNumber})</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-2 text-left text-xs">
            <div className="flex justify-between border-b border-[#DED6CA] pb-2">
              <span className="font-bold text-[#77716A]">Order Number:</span>
              <span className="font-mono font-black text-[#24211E]">
                {confirmedOrder.orderNumber}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#DED6CA] pb-2">
              <span className="font-bold text-[#77716A]">Total Amount:</span>
              <span className="font-bold text-[#26784F]">
                {formatPrice(confirmedOrder.total)}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#DED6CA] pb-2">
              <span className="font-bold text-[#77716A]">Payment Mode:</span>
              <span className="font-bold text-[#24211E]">
                {confirmedOrder.paymentMethod === "COD"
                  ? "Cash on Delivery"
                  : "UPI Online"}
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="font-bold text-[#77716A]">Delivery to:</span>
              <span className="font-medium text-right max-w-[200px]">
                {confirmedOrder.shippingAddress?.street},{" "}
                {confirmedOrder.shippingAddress?.area},{" "}
                {confirmedOrder.shippingAddress?.city}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/orders"
              className="flex-1 py-3 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
            >
              Track Order Status
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 rounded-full bg-[#F5EFE6] text-[#24211E] border border-[#DED6CA] text-xs font-bold hover:bg-[#DED6CA] transition"
            >
              Return Home
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
            Checkout & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-[#575047] mt-1">
            Complete your shipping address and payment method in Gorakhpur.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Fields (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Contact Information */}
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  1. Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#24211E] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aditya Singh"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#24211E] block mb-1">
                      Phone Number (For Delivery SMS / Call) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-[#24211E] block mb-1">
                      Email Address (For Tax Invoice & Warranty Card) *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. aditya@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  2. Gorakhpur Shipping Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#24211E] block mb-1">
                      Street / Flat / House Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="e.g. House No. 45, Near Basharatpur Crossing"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#24211E] block mb-1">
                        Locality / Area *
                      </label>
                      <input
                        type="text"
                        required
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g. Medical College Road"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#24211E] block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={city}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#DED6CA]/50 border border-[#DED6CA] text-xs font-bold text-[#575047]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#24211E] block mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="273004"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#24211E] block mb-1">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="e.g. Opp. City Hospital"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4">
                <h2 className="text-base font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  3. Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                      paymentMethod === "COD"
                        ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                        : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#26784F] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold">Cash on Delivery</h4>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        Pay cash or UPI to our courier at your doorstep upon
                        delivery.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    className={`p-4 rounded-2xl border text-left transition flex items-start gap-3 ${
                      paymentMethod === "UPI"
                        ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                        : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#E66827] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold">UPI / Instant Pay</h4>
                      <p className="text-[11px] opacity-80 mt-0.5">
                        Pay via Google Pay, PhonePe, Paytm QR code.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  Order Summary
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedVariant || ""}`}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative w-10 h-10 bg-[#F5EFE6] rounded-lg border border-[#DED6CA] overflow-hidden shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-[#24211E] line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-[#77716A]">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#24211E]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Costs */}
                <div className="space-y-2 text-xs text-[#575047] pt-3 border-t border-[#DED6CA]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#24211E]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-bold text-[#26784F]">
                      {deliveryCharge === 0 ? "FREE" : formatPrice(deliveryCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#DED6CA] text-base font-black text-[#24211E]">
                    <span>Total</span>
                    <span className="text-xl text-[#24211E]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/15 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold uppercase tracking-wider hover:bg-[#3D3731] transition shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <span>Confirm Order ({formatPrice(total)})</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
