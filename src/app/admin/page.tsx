"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Package,
  RotateCcw,
  DollarSign,
  Users,
  CheckCircle2,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  Layers,
  ImagePlus,
  Loader2,
  ExternalLink,
  Star,
  Tag,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";

type Tab = "storefront" | "orders" | "inventory";

// ─── Cloudinary direct-upload helper ──────────────────────────────────────────
async function uploadImageToCloudinary(file: File): Promise<string> {
  // 1. Get a signed upload signature from our server
  const sigRes = await fetch("/api/admin/upload-signature", { method: "POST" });
  if (!sigRes.ok) throw new Error("Failed to get upload signature");
  const { signature, timestamp, folder, cloudName, apiKey } = await sigRes.json();

  // 2. Upload directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  if (!uploadRes.ok) {
    const err = await uploadRes.json();
    throw new Error(err.error?.message || "Image upload failed");
  }
  const data = await uploadRes.json();
  return data.secure_url as string;
}

// ─── Image Upload Button ───────────────────────────────────────────────────────
function ImageUploader({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10 MB");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImageToCloudinary(file);
      onChange(url);
    } catch (e: any) {
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
        Product Image *
      </label>

      {/* Preview or Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border-2 border-dashed border-[#DED6CA] rounded-2xl bg-[#F5EFE6] overflow-hidden"
      >
        {value ? (
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Product thumbnail"
              className="w-full h-40 object-contain p-4"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-[#24211E] flex items-center gap-1"
              >
                <ImagePlus className="w-3 h-3" /> Change
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full h-40 flex flex-col items-center justify-center gap-2 text-[#77716A] hover:text-[#24211E] hover:bg-[#EDE6DC] transition"
          >
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin text-[#E66827]" />
                <span className="text-xs font-semibold">Uploading...</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-7 h-7" />
                <div className="text-xs font-semibold text-center px-4">
                  Click to upload or drag & drop
                  <br />
                  <span className="text-[10px] font-normal text-[#77716A]">
                    JPG, PNG, WEBP • Max 10 MB
                  </span>
                </div>
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-600 font-semibold flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 shrink-0" />
          {error}
        </p>
      )}

      {/* URL fallback */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-[#DED6CA]" />
        <span className="text-[10px] text-[#77716A] font-medium">or paste URL</span>
        <div className="h-px flex-1 bg-[#DED6CA]" />
      </div>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://res.cloudinary.com/..."
        className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-xs text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ─── Product Form Modal ────────────────────────────────────────────────────────
function ProductModal({
  product,
  onClose,
  onSaved,
}: {
  product: any | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || "",
    brand: product?.brand || "",
    category: product?.category || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    stock: product?.stock ?? 10,
    thumbnail: product?.thumbnail || "",
    shortDescription: product?.shortDescription || "",
    description: product?.description || "",
    isFeatured: product?.isFeatured || false,
    isDeal: product?.isDeal || false,
    isNewArrival: product?.isNewArrival || false,
    isActive: product?.isActive ?? true,
    warranty: product?.warranty || "1 Year Official Brand Warranty",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: string, val: unknown) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    set(name, type === "checkbox" ? (e.target as HTMLInputElement).checked : value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.thumbnail) {
      setError("Please upload or provide a product image URL");
      return;
    }
    setSaving(true);
    setError(null);

    // Auto-calc discount %
    const price = Number(form.price);
    const originalPrice = Number(form.originalPrice);
    const discountPercentage =
      originalPrice > price
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    const payload = {
      ...form,
      price,
      originalPrice,
      discountPercentage,
      stock: Number(form.stock),
    };

    try {
      const url = isEdit
        ? `/api/admin/inventory/${product._id}`
        : "/api/admin/inventory";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Save failed");
      }
      onSaved();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-6 px-3">
      <div className="w-full max-w-xl bg-[#F5EFE6] rounded-3xl border border-[#DED6CA] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DED6CA]">
          <h2 className="text-sm font-black text-[#24211E] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#E66827]" />
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#DED6CA] transition text-[#575047]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-xs text-red-700 font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Image Upload */}
          <ImageUploader
            value={form.thumbnail}
            onChange={(url) => set("thumbnail", url)}
          />

          {/* Name & Brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                Product Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Samsung Galaxy S24 Ultra"
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                Brand *
              </label>
              <input
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                placeholder="e.g. Samsung"
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>
          </div>

          {/* Category & Warranty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              >
                <option value="">Select category</option>
                <option value="smartphones">Smartphones</option>
                <option value="accessories">Accessories</option>
                <option value="smartwatches">Smartwatches</option>
                <option value="tablets">Tablets</option>
                <option value="audio">Audio</option>
                <option value="laptops">Laptops</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                Warranty
              </label>
              <input
                name="warranty"
                value={form.warranty}
                onChange={handleChange}
                placeholder="1 Year Official Brand Warranty"
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>
          </div>

          {/* Price, MRP, Stock */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                Price (₹) *
              </label>
              <input
                name="price"
                type="number"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
                placeholder="0"
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                MRP (₹) *
              </label>
              <input
                name="originalPrice"
                type="number"
                min="0"
                value={form.originalPrice}
                onChange={handleChange}
                required
                placeholder="0"
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
                Stock Qty
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
              Short Description
            </label>
            <input
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="One-liner tagline shown on product card"
              className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#77716A] mb-1">
              Full Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Detailed product description..."
              className="w-full px-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-sm text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E] resize-none"
            />
          </div>

          {/* Flags */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
            {(
              [
                { key: "isActive", label: "Active (visible on store)" },
                { key: "isFeatured", label: "Featured" },
                { key: "isDeal", label: "Mark as Deal" },
                { key: "isNewArrival", label: "New Arrival" },
              ] as { key: keyof typeof form; label: string }[]
            ).map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <button
                  type="button"
                  onClick={() => set(key, !form[key])}
                  className="shrink-0"
                >
                  {form[key] ? (
                    <ToggleRight className="w-5 h-5 text-[#26784F]" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-[#77716A]" />
                  )}
                </button>
                <span className="text-xs font-semibold text-[#575047]">
                  {label}
                </span>
              </label>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#DED6CA]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-xs font-bold text-[#575047] hover:bg-[#DED6CA] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition disabled:opacity-50 flex items-center gap-1.5"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {isEdit ? "Save Changes" : "Add Product"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({
  name,
  onConfirm,
  onClose,
}: {
  name: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xs bg-[#F5EFE6] rounded-3xl border border-[#DED6CA] shadow-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-black text-[#24211E]">Delete product?</p>
            <p className="text-xs text-[#77716A] mt-0.5 line-clamp-1">{name}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-xs font-bold text-[#575047] hover:bg-[#DED6CA] transition"
          >
            Cancel
          </button>
          <button
            disabled={deleting}
            onClick={async () => {
              setDeleting(true);
              await onConfirm();
              setDeleting(false);
            }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Inventory Section ─────────────────────────────────────────────────────────
function InventorySection() {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const limit = 10;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/inventory?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleActive = async (p: any) => {
    await fetch(`/api/admin/inventory/${p._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !p.isActive }),
    });
    showToast(`${p.name} ${!p.isActive ? "activated" : "deactivated"}`);
    load();
  };

  const deleteProduct = async (p: any) => {
    await fetch(`/api/admin/inventory/${p._id}`, { method: "DELETE" });
    showToast("Product deleted");
    setDeleteTarget(null);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-4">
      {toast && (
        <div className="p-3 rounded-xl bg-green-100 border border-green-300 text-green-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setSearch(searchInput);
          }}
          className="flex gap-2 flex-1"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#77716A]" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, brand, category..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-xs text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
          >
            Search
          </button>
        </form>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#26784F] text-white text-xs font-bold hover:bg-[#1E5D3D] transition shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </button>
      </div>

      <p className="text-xs text-[#77716A]">
        {total} product{total !== 1 ? "s" : ""} in catalog
        {search ? ` · matching "${search}"` : ""}
      </p>

      {/* Product grid / table */}
      {loading ? (
        <div className="py-16 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#77716A] mx-auto" />
        </div>
      ) : products.length === 0 ? (
        <div className="py-16 text-center space-y-2">
          <Package className="w-8 h-8 text-[#DED6CA] mx-auto" />
          <p className="text-xs text-[#77716A]">
            No products yet.{" "}
            <button
              onClick={() => setShowAdd(true)}
              className="text-[#E66827] font-bold underline"
            >
              Add your first product
            </button>
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#DED6CA]">
          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="bg-[#EDE6DC] border-b border-[#DED6CA] text-[#77716A] font-extrabold uppercase text-[10px]">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED6CA]/50 bg-[#F5EFE6]">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-[#EDE6DC]/60 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      {p.thumbnail ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.thumbnail}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-contain bg-white border border-[#DED6CA] shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] flex items-center justify-center shrink-0">
                          <Package className="w-4 h-4 text-[#77716A]" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-[#24211E] truncate max-w-[200px]">
                          {p.name}
                        </p>
                        <p className="text-[10px] text-[#77716A]">
                          {p.brand} · {p.category}
                        </p>
                        <div className="flex gap-1 mt-0.5">
                          {p.isFeatured && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700">
                              <Star className="w-2 h-2" /> Featured
                            </span>
                          )}
                          {p.isDeal && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-orange-100 text-orange-700">
                              <Tag className="w-2 h-2" /> Deal
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <p className="font-black text-[#24211E]">{formatPrice(p.price)}</p>
                    {p.originalPrice > p.price && (
                      <p className="text-[10px] text-[#77716A] line-through">
                        {formatPrice(p.originalPrice)}
                      </p>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-black ${
                        p.stock === 0
                          ? "text-red-600"
                          : p.stock <= 3
                          ? "text-[#E66827]"
                          : "text-[#26784F]"
                      }`}
                    >
                      {p.stock}
                    </span>
                    {p.stock === 0 && (
                      <span className="ml-1 text-[9px] font-bold bg-red-100 text-red-600 px-1 py-0.5 rounded">
                        OOS
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleActive(p)}
                      className="flex items-center gap-1.5"
                    >
                      {p.isActive ? (
                        <>
                          <ToggleRight className="w-5 h-5 text-[#26784F]" />
                          <span className="text-[10px] font-bold text-[#26784F]">
                            Live
                          </span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 text-[#77716A]" />
                          <span className="text-[10px] font-bold text-[#77716A]">
                            Hidden
                          </span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditProduct(p)}
                        className="p-1.5 rounded-lg hover:bg-[#DED6CA] transition text-[#575047]"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-1.5 rounded-lg hover:bg-red-100 transition text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-[#77716A] pt-1">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] font-bold disabled:opacity-40 hover:bg-[#DED6CA] transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] font-bold disabled:opacity-40 hover:bg-[#DED6CA] transition"
            >
              Next <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAdd && (
        <ProductModal
          product={null}
          onClose={() => setShowAdd(false)}
          onSaved={() => {
            showToast("Product added successfully!");
            load();
          }}
        />
      )}
      {editProduct && (
        <ProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSaved={() => {
            showToast("Product updated!");
            load();
          }}
        />
      )}
      {deleteTarget && (
        <DeleteConfirm
          name={deleteTarget.name}
          onConfirm={() => deleteProduct(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("storefront");
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [buybacks, setBuybacks] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [orderToast, setOrderToast] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push("/account/login");
      else if (!isAdmin) router.push("/account");
    }
  }, [user, isAdmin, isLoading, router]);

  const loadData = useCallback(() => {
    setDataLoading(true);
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => {
        setStats(d.stats);
        setOrders(d.recentOrders || []);
        setBuybacks(d.recentBuybacks || []);
      })
      .catch(() => {})
      .finally(() => setDataLoading(false));
  }, []);

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin, loadData]);

  const updateOrderStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrderToast("Order status updated!");
    setTimeout(() => setOrderToast(null), 3000);
    loadData();
  };

  const updateBuybackStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/buyback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrderToast("Buyback status updated!");
    setTimeout(() => setOrderToast(null), 3000);
    loadData();
  };

  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EFE6]">
        <Loader2 className="w-6 h-6 animate-spin text-[#77716A]" />
      </div>
    );
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "storefront",
      label: "Storefront",
      icon: <ExternalLink className="w-3.5 h-3.5" />,
    },
    {
      id: "orders",
      label: `Orders & Buybacks`,
      icon: <ShoppingBag className="w-3.5 h-3.5" />,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <Layers className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      {/* ── Top bar ── */}
      <div className="bg-[#24211E] text-[#EDE6DC] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#E66827]" />
          <span className="text-xs font-black tracking-wide">
            A1 Admin Portal
          </span>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 text-[10px] font-semibold text-[#EDE6DC]/70 hover:text-white transition"
        >
          <ExternalLink className="w-3 h-3" />
          View Storefront
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        {/* ── Stat cards ── */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: <DollarSign className="w-4 h-4" />,
                label: "Revenue",
                value: formatPrice(stats.totalRevenue),
                color: "text-[#26784F]",
                bg: "bg-[#26784F]/10",
              },
              {
                icon: <ShoppingBag className="w-4 h-4" />,
                label: "Orders",
                value: stats.totalOrders,
                color: "text-[#24211E]",
                bg: "bg-[#EDE6DC]",
              },
              {
                icon: <RotateCcw className="w-4 h-4" />,
                label: "Buybacks",
                value: stats.totalBuybacks,
                color: "text-[#E66827]",
                bg: "bg-[#E66827]/10",
              },
              {
                icon: <Layers className="w-4 h-4" />,
                label: "Products",
                value: stats.totalProducts,
                color: "text-[#24211E]",
                bg: "bg-[#EDE6DC]",
              },
            ].map((m) => (
              <div
                key={m.label}
                className={`${m.bg} rounded-2xl border border-[#DED6CA] p-4 flex items-center gap-3`}
              >
                <div className={`${m.color} shrink-0`}>{m.icon}</div>
                <div>
                  <p className="text-[10px] font-bold text-[#77716A] uppercase tracking-wider">
                    {m.label}
                  </p>
                  <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tab bar ── */}
        <div className="flex gap-1 bg-[#EDE6DC] p-1 rounded-2xl border border-[#DED6CA]">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                tab === t.id
                  ? "bg-[#24211E] text-[#EDE6DC] shadow"
                  : "text-[#575047] hover:bg-[#DED6CA]"
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">
                {t.id === "storefront"
                  ? "Store"
                  : t.id === "orders"
                  ? "Orders"
                  : "Stock"}
              </span>
            </button>
          ))}
        </div>

        {/* ── STOREFRONT TAB ── */}
        {tab === "storefront" && (
          <div className="space-y-4">
            <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-4">
              <h2 className="text-sm font-black text-[#24211E] flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#E66827]" />
                Storefront Quick Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    href: "/",
                    label: "Home Page",
                    desc: "View your live storefront",
                    icon: "🏠",
                  },
                  {
                    href: "/products",
                    label: "Products Page",
                    desc: "Browse all listed products",
                    icon: "📱",
                  },
                  {
                    href: "/deals",
                    label: "Deals Page",
                    desc: "View active deals & discounts",
                    icon: "🏷️",
                  },
                  {
                    href: "/sell-old-device",
                    label: "Sell Old Device",
                    desc: "Buyback form for customers",
                    icon: "♻️",
                  },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    className="flex items-center gap-3 p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] hover:border-[#24211E] hover:bg-[#EDE6DC] transition group"
                  >
                    <span className="text-2xl">{l.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-[#24211E] group-hover:text-[#E66827] transition">
                        {l.label}
                      </p>
                      <p className="text-[10px] text-[#77716A]">{l.desc}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#77716A] ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Store stats summary */}
            {stats && (
              <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 space-y-3">
                <h2 className="text-sm font-black text-[#24211E] flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#E66827]" />
                  Store Summary
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  {[
                    { label: "Total Users", value: stats.totalUsers || 0 },
                    {
                      label: "Newsletter Subscribers",
                      value: stats.totalSubscribers || 0,
                    },
                    { label: "Active Products", value: stats.totalProducts },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-[#F5EFE6] rounded-2xl border border-[#DED6CA] p-4"
                    >
                      <p className="text-2xl font-black text-[#24211E]">
                        {s.value}
                      </p>
                      <p className="text-[10px] text-[#77716A] font-semibold mt-0.5">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS & BUYBACKS TAB ── */}
        {tab === "orders" && (
          <div className="space-y-6">
            {orderToast && (
              <div className="p-3 rounded-xl bg-green-100 border border-green-300 text-green-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {orderToast}
              </div>
            )}

            {/* Orders */}
            <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-5 space-y-4">
              <h2 className="text-sm font-black text-[#24211E] flex items-center gap-2">
                <Package className="w-4 h-4 text-[#E66827]" />
                Customer Orders
              </h2>
              {orders.length === 0 ? (
                <p className="text-xs text-[#77716A] py-8 text-center">
                  No orders yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord._id}
                      className="bg-[#F5EFE6] rounded-2xl border border-[#DED6CA] p-4"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-xs font-black text-[#24211E]">
                            {ord.customerName}
                          </p>
                          <p className="text-[10px] text-[#77716A]">
                            {ord.customerPhone} ·{" "}
                            <span className="font-mono">{ord.orderNumber}</span>
                          </p>
                          <p className="text-[10px] text-[#575047] mt-1 line-clamp-1">
                            {ord.items?.map((i: any) => i.name).join(", ")}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black text-[#24211E]">
                            {formatPrice(ord.total)}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#EDE6DC] border border-[#DED6CA] text-[#24211E]">
                            {ord.orderStatus}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <label className="text-[10px] font-bold text-[#77716A] whitespace-nowrap">
                          Update status:
                        </label>
                        <select
                          value={ord.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(ord._id, e.target.value)
                          }
                          className="flex-1 px-2 py-1.5 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] text-xs font-semibold focus:outline-none"
                        >
                          {[
                            "Placed",
                            "Confirmed",
                            "Processing",
                            "Shipped",
                            "Out for Delivery",
                            "Delivered",
                            "Cancelled",
                          ].map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Buybacks */}
            <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-5 space-y-4">
              <h2 className="text-sm font-black text-[#24211E] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#E66827]" />
                Buyback Requests
              </h2>
              {buybacks.length === 0 ? (
                <p className="text-xs text-[#77716A] py-8 text-center">
                  No buyback requests yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {buybacks.map((bb) => (
                    <div
                      key={bb._id}
                      className="bg-[#F5EFE6] rounded-2xl border border-[#DED6CA] p-4"
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <p className="text-xs font-black text-[#24211E]">
                            {bb.customerName}
                          </p>
                          <p className="text-[10px] text-[#77716A]">
                            {bb.phone} ·{" "}
                            <span className="font-mono">
                              {bb.referenceNumber}
                            </span>
                          </p>
                          <p className="text-[10px] text-[#575047] mt-1">
                            {bb.brand} {bb.model} · {bb.condition}
                          </p>
                          <p className="text-[10px] text-[#77716A]">
                            Pickup: {bb.pickupDate} · {bb.pickupTimeSlot}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black text-[#26784F]">
                            {formatPrice(bb.estimatedValue)}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-100 text-[#E66827] border border-orange-200">
                            {bb.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <label className="text-[10px] font-bold text-[#77716A] whitespace-nowrap">
                          Update status:
                        </label>
                        <select
                          value={bb.status}
                          onChange={(e) =>
                            updateBuybackStatus(bb._id, e.target.value)
                          }
                          className="flex-1 px-2 py-1.5 rounded-lg bg-[#EDE6DC] border border-[#DED6CA] text-xs font-semibold focus:outline-none"
                        >
                          {[
                            "Pending",
                            "Quote Generated",
                            "Pickup Scheduled",
                            "Inspection Completed",
                            "Offer Accepted",
                            "Payment Pending",
                            "Paid",
                            "Cancelled",
                          ].map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── INVENTORY TAB ── */}
        {tab === "inventory" && (
          <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-5">
            <h2 className="text-sm font-black text-[#24211E] flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-[#E66827]" />
              Inventory Management
            </h2>
            <InventorySection />
          </div>
        )}
      </div>
    </div>
  );
}
