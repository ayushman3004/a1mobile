"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Package,
  RotateCcw,
  Users,
  DollarSign,
  TrendingUp,
  Mail,
  Check,
  AlertCircle,
  Truck,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "buybacks">(
    "overview"
  );
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentBuybacks, setRecentBuybacks] = useState<any[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  // Status update message feedback
  const [updateMsg, setUpdateMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/account/login");
      } else if (!isAdmin) {
        router.push("/account");
      }
    }
  }, [user, isAdmin, isLoading, router]);

  const loadData = () => {
    fetch("/api/admin/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setStats(data.stats);
        setRecentOrders(data.recentOrders || []);
        setRecentBuybacks(data.recentBuybacks || []);
      })
      .catch(() => {})
      .finally(() => setLoadingStats(false));
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setUpdateMsg("Order status updated successfully!");
        setTimeout(() => setUpdateMsg(null), 3000);
        loadData();
      }
    } catch {
      // ignore
    }
  };

  const handleUpdateBuybackStatus = async (
    buybackId: string,
    newStatus: string
  ) => {
    try {
      const res = await fetch(`/api/admin/buyback/${buybackId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setUpdateMsg("Buyback status updated successfully!");
        setTimeout(() => setUpdateMsg(null), 3000);
        loadData();
      }
    } catch {
      // ignore
    }
  };

  if (isLoading || loadingStats) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center text-xs font-bold text-[#77716A]">
        Verifying administrator authorization...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-[#F5EFE6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DED6CA] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E66827] uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4" />
              <span>Administrative Operations Portal</span>
            </div>
            <h1 className="text-3xl font-black text-[#24211E] tracking-tight">
              A1 Mobile Shop Management
            </h1>
            <p className="text-xs sm:text-sm text-[#575047] mt-0.5">
              Basharatpur, Gorakhpur store metrics, inventory, orders, and
              doorstep buyback requests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-xs font-bold text-[#24211E] hover:bg-[#DED6CA] transition"
            >
              Storefront
            </Link>
          </div>
        </div>

        {updateMsg && (
          <div className="p-3.5 rounded-xl bg-green-100 border border-green-300 text-green-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{updateMsg}</span>
          </div>
        )}

        {/* Overview Metric Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#EDE6DC] p-5 rounded-2xl border border-[#DED6CA] space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#77716A] block">
                Total Revenue
              </span>
              <div className="text-2xl font-black text-[#26784F]">
                {formatPrice(stats.totalRevenue)}
              </div>
              <span className="text-[11px] text-[#77716A]">Verified Orders</span>
            </div>

            <div className="bg-[#EDE6DC] p-5 rounded-2xl border border-[#DED6CA] space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#77716A] block">
                Total Orders
              </span>
              <div className="text-2xl font-black text-[#24211E]">
                {stats.totalOrders}
              </div>
              <span className="text-[11px] text-[#77716A]">Retail Transactions</span>
            </div>

            <div className="bg-[#EDE6DC] p-5 rounded-2xl border border-[#DED6CA] space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#77716A] block">
                Buyback Pickups
              </span>
              <div className="text-2xl font-black text-[#E66827]">
                {stats.totalBuybacks}
              </div>
              <span className="text-[11px] text-[#77716A]">Doorstep Valuations</span>
            </div>

            <div className="bg-[#EDE6DC] p-5 rounded-2xl border border-[#DED6CA] space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#77716A] block">
                Catalog Inventory
              </span>
              <div className="text-2xl font-black text-[#24211E]">
                {stats.totalProducts}
              </div>
              <span className="text-[11px] text-[#77716A]">Active Products</span>
            </div>
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex items-center gap-2 border-b border-[#DED6CA] pb-2">
          {[
            { id: "overview", label: "Overview & Recents" },
            { id: "orders", label: `Orders (${recentOrders.length})` },
            {
              id: "buybacks",
              label: `Buyback Pipeline (${recentBuybacks.length})`,
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === t.id
                  ? "bg-[#24211E] text-white shadow-xs"
                  : "bg-[#EDE6DC] text-[#575047] hover:bg-[#DED6CA]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ORDERS MANAGEMENT TABLE */}
        {(activeTab === "overview" || activeTab === "orders") && (
          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4">
            <h3 className="text-base font-bold text-[#24211E] flex items-center justify-between">
              <span>Customer Orders</span>
              <span className="text-xs font-normal text-[#77716A]">
                Real-time MongoDB Records
              </span>
            </h3>

            {recentOrders.length === 0 ? (
              <p className="text-xs text-[#77716A] py-6 text-center">
                No orders registered yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DED6CA] text-[#77716A] font-extrabold uppercase">
                      <th className="py-2.5 px-3">Order Number</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Items</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED6CA]/60 text-[#24211E]">
                    {recentOrders.map((ord) => (
                      <tr key={ord._id} className="hover:bg-[#F5EFE6]/60">
                        <td className="py-3 px-3 font-mono font-bold">
                          {ord.orderNumber}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold">{ord.customerName}</p>
                          <p className="text-[10px] text-[#77716A]">
                            {ord.customerPhone}
                          </p>
                        </td>
                        <td className="py-3 px-3">
                          {ord.items.map((i: any) => i.name).join(", ")}
                        </td>
                        <td className="py-3 px-3 font-bold">
                          {formatPrice(ord.total)}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-[#F5EFE6] text-[#24211E] border border-[#DED6CA]">
                            {ord.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) =>
                              handleUpdateOrderStatus(ord._id, e.target.value)
                            }
                            className="px-2 py-1 rounded-lg bg-[#F5EFE6] border border-[#DED6CA] text-xs font-semibold focus:outline-none"
                          >
                            <option value="Placed">Placed</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">
                              Out for Delivery
                            </option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* BUYBACK REQUESTS TABLE */}
        {(activeTab === "overview" || activeTab === "buybacks") && (
          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4">
            <h3 className="text-base font-bold text-[#24211E] flex items-center justify-between">
              <span>Device Buyback & Pickup Schedule</span>
              <span className="text-xs font-normal text-[#77716A]">
                Doorstep Inspections in Gorakhpur
              </span>
            </h3>

            {recentBuybacks.length === 0 ? (
              <p className="text-xs text-[#77716A] py-6 text-center">
                No buyback requests submitted yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DED6CA] text-[#77716A] font-extrabold uppercase">
                      <th className="py-2.5 px-3">Reference</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Device & Model</th>
                      <th className="py-2.5 px-3">Pickup Slot</th>
                      <th className="py-2.5 px-3">Estimated Quote</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DED6CA]/60 text-[#24211E]">
                    {recentBuybacks.map((bb) => (
                      <tr key={bb._id} className="hover:bg-[#F5EFE6]/60">
                        <td className="py-3 px-3 font-mono font-bold">
                          {bb.referenceNumber}
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold">{bb.customerName}</p>
                          <p className="text-[10px] text-[#77716A]">{bb.phone}</p>
                          <p className="text-[10px] text-[#77716A] truncate max-w-[150px]">
                            {bb.pickupAddress?.street}, {bb.pickupAddress?.area}
                          </p>
                        </td>
                        <td className="py-3 px-3">
                          <p className="font-bold">
                            {bb.brand} {bb.model}
                          </p>
                          <p className="text-[10px] text-[#77716A]">
                            Cond: {bb.condition} • {bb.configuration}
                          </p>
                        </td>
                        <td className="py-3 px-3">
                          <p>{bb.pickupDate}</p>
                          <p className="text-[10px] text-[#77716A]">
                            {bb.pickupTimeSlot}
                          </p>
                        </td>
                        <td className="py-3 px-3 font-black text-[#26784F]">
                          {formatPrice(bb.estimatedValue)}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-md font-bold bg-[#F5EFE6] text-[#E66827] border border-[#DED6CA]">
                            {bb.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={bb.status}
                            onChange={(e) =>
                              handleUpdateBuybackStatus(bb._id, e.target.value)
                            }
                            className="px-2 py-1 rounded-lg bg-[#F5EFE6] border border-[#DED6CA] text-xs font-semibold focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Quote Generated">Quote Generated</option>
                            <option value="Pickup Scheduled">
                              Pickup Scheduled
                            </option>
                            <option value="Inspection Completed">
                              Inspection Completed
                            </option>
                            <option value="Offer Accepted">Offer Accepted</option>
                            <option value="Payment Pending">Payment Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
