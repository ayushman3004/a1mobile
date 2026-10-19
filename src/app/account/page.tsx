"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  RotateCcw,
  Heart,
  LogOut,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/products/ProductCard";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const { wishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<
    "profile" | "orders" | "buybacks" | "wishlist"
  >("profile");
  const [orders, setOrders] = useState<any[]>([]);
  const [buybacks, setBuybacks] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.orders) setOrders(data.orders);
        })
        .catch(() => {});

      fetch("/api/buyback")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.requests) setBuybacks(data.requests);
        })
        .catch(() => {});
    }
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center text-xs font-bold text-[#77716A]">
        Loading your account...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 sm:py-14 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#24211E] tracking-tight">
              Welcome, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Manage your personal details, order status, and buyback requests.
            </p>
          </div>

          <button
            onClick={logout}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#EDE6DC] text-red-600 border border-[#DED6CA] text-xs font-bold flex items-center gap-1.5 hover:bg-red-50 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-2 bg-[#EDE6DC] p-3 rounded-2xl border border-[#DED6CA]">
            {[
              { id: "profile", label: "My Profile", icon: User },
              {
                id: "orders",
                label: `Orders (${orders.length})`,
                icon: Package,
              },
              {
                id: "buybacks",
                label: `Sell Requests (${buybacks.length})`,
                icon: RotateCcw,
              },
              {
                id: "wishlist",
                label: `Wishlist (${wishlist.length})`,
                icon: Heart,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition text-left ${
                    activeTab === tab.id
                      ? "bg-[#24211E] text-white shadow-xs"
                      : "text-[#575047] hover:bg-[#DED6CA]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Main Tab Panel (9 cols) */}
          <div className="lg:col-span-9 bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-8 shadow-sm">
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  Account Details
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA]">
                    <span className="text-[#77716A] block font-bold mb-1">
                      Full Name
                    </span>
                    <span className="font-extrabold text-sm text-[#24211E]">
                      {user.name}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA]">
                    <span className="text-[#77716A] block font-bold mb-1">
                      Email Address
                    </span>
                    <span className="font-extrabold text-sm text-[#24211E]">
                      {user.email}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA]">
                    <span className="text-[#77716A] block font-bold mb-1">
                      Phone Number
                    </span>
                    <span className="font-extrabold text-sm text-[#24211E]">
                      {user.phone || "Not specified"}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA]">
                    <span className="text-[#77716A] block font-bold mb-1">
                      Account Role
                    </span>
                    <span className="font-extrabold text-sm capitalize text-[#26784F]">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DED6CA]">
                  <h3 className="text-sm font-bold text-[#24211E] mb-3">
                    Default Gorakhpur Delivery Address
                  </h3>
                  <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs text-[#575047] flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#E66827] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#24211E] block">
                        Saved Home Address
                      </span>
                      <span>
                        Near Basharatpur Crossing, Medical College Road,
                        Gorakhpur, Uttar Pradesh - 273004
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  My Orders
                </h2>

                {orders.length === 0 ? (
                  <p className="text-xs text-[#77716A] py-8 text-center">
                    You have no active or completed orders.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderNumber}
                        className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-3"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono font-bold text-[#24211E]">
                            {ord.orderNumber}
                          </span>
                          <span className="font-bold text-[#26784F]">
                            {ord.orderStatus}
                          </span>
                        </div>
                        <div className="text-xs text-[#575047]">
                          {ord.items.map((i: any, idx: number) => (
                            <span key={idx}>
                              {i.name} (Qty: {i.quantity})
                              {idx < ord.items.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-baseline pt-2 border-t border-[#DED6CA] text-xs">
                          <span>Total Amount</span>
                          <span className="font-bold text-sm text-[#24211E]">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BUYBACKS TAB */}
            {activeTab === "buybacks" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  Sell Old Device Requests
                </h2>

                {buybacks.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-xs text-[#77716A]">
                      You have not scheduled any device buyback pickups yet.
                    </p>
                    <Link
                      href="/sell-old-device"
                      className="inline-block px-5 py-2.5 rounded-full bg-[#24211E] text-white text-xs font-bold"
                    >
                      Get Buyback Quote Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {buybacks.map((bb) => (
                      <div
                        key={bb.referenceNumber}
                        className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-3"
                      >
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-mono font-bold text-[#24211E]">
                            {bb.referenceNumber}
                          </span>
                          <span className="font-bold text-[#E66827]">
                            ● {bb.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#575047] space-y-1">
                          <p className="font-bold text-[#24211E]">
                            {bb.brand} {bb.model} ({bb.configuration})
                          </p>
                          <p>Condition: {bb.condition}</p>
                          <p>
                            Pickup: {bb.pickupDate} ({bb.pickupTimeSlot})
                          </p>
                        </div>
                        <div className="flex justify-between items-baseline pt-2 border-t border-[#DED6CA] text-xs">
                          <span>Estimated Payout</span>
                          <span className="font-bold text-sm text-[#26784F]">
                            {formatPrice(bb.estimatedValue)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === "wishlist" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#24211E] border-b border-[#DED6CA] pb-3">
                  Saved Wishlist
                </h2>

                {wishlist.length === 0 ? (
                  <p className="text-xs text-[#77716A] py-8 text-center">
                    Your wishlist is currently empty.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((prod) => (
                      <ProductCard
                        key={prod._id || prod.slug}
                        product={prod}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
