"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { IOrder } from "@/types";
import {
  formatPrice,
  buildWhatsAppLink,
  getStoreWhatsAppNumber,
} from "@/lib/utils";


export default function OrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.orders) {
          setOrders(data.orders);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5EFE6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight">
            My Orders & Tracking
          </h1>
          <p className="text-xs sm:text-sm text-[#575047] mt-1">
            Track real-time dispatch and delivery status for orders placed at A1
            Mobile Shop.
          </p>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs font-bold text-[#77716A]">
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center mx-auto text-[#77716A]">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#24211E]">
              No Orders Found Yet
            </h3>
            <p className="text-xs text-[#575047] max-w-sm mx-auto">
              You haven&apos;t placed any orders yet. Check out our latest
              flagship smartphones and accessories.
            </p>
            <Link
              href="/products"
              className="inline-block px-6 py-2.5 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((ord) => (
              <div
                key={ord.orderNumber}
                className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4 shadow-sm"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DED6CA] pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#77716A] tracking-wider block">
                      Order Reference
                    </span>
                    <span className="font-mono font-black text-sm text-[#24211E]">
                      {ord.orderNumber}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        ord.orderStatus === "Delivered"
                          ? "bg-green-100 text-[#26784F]"
                          : ord.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      ● {ord.orderStatus}
                    </span>
                    <span className="text-sm font-black text-[#24211E]">
                      {formatPrice(ord.total)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="divide-y divide-[#DED6CA]/50">
                  {ord.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-[#24211E]">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-[#77716A] ml-2">
                          × {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-[#24211E]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Destination & WhatsApp Action */}
                <div className="text-[11px] text-[#575047] pt-2 border-t border-[#DED6CA] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span>
                    Delivery Address: {ord.shippingAddress.street},{" "}
                    {ord.shippingAddress.area}, {ord.shippingAddress.city} • Mode: {ord.paymentMethod}
                  </span>

                  <a
                    href={buildWhatsAppLink(
                      getStoreWhatsAppNumber(),
                      `Hello A1 Mobile Shop! I would like an update regarding my order #${ord.orderNumber}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#26784F] text-white text-[11px] font-bold hover:bg-[#1E5D3D] transition shrink-0"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
