"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  CheckCircle2,
  MessageSquare,
  Copy,
  Check,
  Send,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  MapPin,
  User,
  Phone,
  AlertCircle,
} from "lucide-react";
import {
  formatBuybackWhatsAppMessage,
  buildWhatsAppLink,
  getStoreWhatsAppNumber,
  generateBuybackReference,
} from "@/lib/utils";

interface BuybackWizardProps {
  initialCategory?: string;
  whatsappNumber?: string;
}

export default function BuybackWizard({
  initialCategory = "phone",
  whatsappNumber,
}: BuybackWizardProps) {
  const targetWhatsApp = getStoreWhatsAppNumber(whatsappNumber);

  // Form State
  const [deviceCategory, setDeviceCategory] = useState<string>(initialCategory);
  const [brand, setBrand] = useState("Apple");
  const [customBrand, setCustomBrand] = useState("");
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("128GB");
  const [customStorage, setCustomStorage] = useState("");
  const [condition, setCondition] = useState<
    "Like New / Flawless" | "Good" | "Average" | "Damaged / Screen Issue"
  >("Good");
  const [accessories, setAccessories] = useState<string[]>([
    "Original Box",
    "Original Charger",
  ]);
  const [remarks, setRemarks] = useState("");

  // Customer Basic Info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [location, setLocation] = useState("");

  // UI state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");

  const categories = [
    { id: "phone", label: "Smartphone", icon: Smartphone },
    { id: "tablet", label: "Tablet / iPad", icon: Tablet },
    { id: "laptop", label: "Laptop", icon: Laptop },
    { id: "smartwatch", label: "Smartwatch", icon: Watch },
    { id: "other", label: "Other Gadget", icon: Headphones },
  ];

  const brandOptions: Record<string, string[]> = {
    phone: ["Apple", "Samsung", "Xiaomi / Redmi", "Vivo", "Realme", "OnePlus", "Oppo", "Motorola", "Other"],
    tablet: ["Apple", "Samsung", "Lenovo", "OnePlus", "Xiaomi", "Other"],
    laptop: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "Other"],
    smartwatch: ["Apple", "Samsung", "Noise", "boAt", "Fire-Boltt", "Other"],
    other: ["Sony", "JBL", "Marshall", "Bose", "Other"],
  };

  const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB", "Other"];

  const conditionOptions = [
    {
      value: "Like New / Flawless",
      label: "Like New / Flawless",
      desc: "Zero scratches, 100% mint showroom condition with no issues",
      badge: "Highest Value",
    },
    {
      value: "Good",
      label: "Good (Normal Use)",
      desc: "Minor normal wear, clean display, fully working hardware",
      badge: "Popular",
    },
    {
      value: "Average",
      label: "Average Condition",
      desc: "Visible scratches, minor dents on body, fully functional",
      badge: "Fair Price",
    },
    {
      value: "Damaged / Screen Issue",
      label: "Damaged or Faulty",
      desc: "Cracked glass, line on display, battery or speaker issue",
      badge: "Needs Review",
    },
  ];

  const accessoryOptions = [
    "Original Box",
    "Original Charger",
    "Charging Cable",
    "Original Purchase Bill / Invoice",
  ];

  const toggleAccessory = (acc: string) => {
    if (accessories.includes(acc)) {
      setAccessories(accessories.filter((a) => a !== acc));
    } else {
      setAccessories([...accessories, acc]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const activeBrand = brand === "Other" ? customBrand.trim() : brand;
    const activeStorage = storage === "Other" ? customStorage.trim() : storage;

    if (!model.trim()) {
      setErrorMsg("Please enter the exact device model name (e.g. iPhone 13, Vivo V29).");
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile / WhatsApp number.");
      return;
    }

    const ref = generateBuybackReference();
    setReferenceId(ref);

    const message = formatBuybackWhatsAppMessage({
      referenceNumber: ref,
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      location: location.trim() || "Gorakhpur",
      deviceCategory,
      brand: activeBrand || "Device",
      model: model.trim(),
      configuration: activeStorage,
      condition,
      accessoriesIncluded: accessories,
      remarks: remarks.trim() || undefined,
    });

    setGeneratedMessage(message);

    const waLink = buildWhatsAppLink(targetWhatsApp, message);
    setGeneratedWhatsAppUrl(waLink);

    // Save inquiry to backend asynchronously (non-blocking)
    try {
      fetch("/api/buyback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          requestData: {
            referenceNumber: ref,
            customerName: customerName.trim(),
            phone: customerPhone.trim(),
            deviceCategory,
            brand: activeBrand || "Device",
            model: model.trim(),
            configuration: activeStorage || "Standard",
            condition,
            accessoriesIncluded: accessories,
            estimatedValue: 0,
            pickupAddress: {
              street: location.trim() || "Gorakhpur",
              area: "Gorakhpur",
              city: "Gorakhpur",
              pincode: "273004",
            },
            pickupDate: "Immediate",
            pickupTimeSlot: "WhatsApp Inquiry",
            paymentPreference: "UPI",
          },
        }),
      }).catch(() => {});
    } catch {
      // non-blocking
    }

    setIsSubmitted(true);

    // Open WhatsApp
    if (typeof window !== "undefined") {
      window.open(waLink, "_blank");
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && generatedMessage) {
      navigator.clipboard.writeText(generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setModel("");
    setRemarks("");
  };

  if (isSubmitted) {
    return (
      <div
        id="sell-device-form"
        className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 shadow-xl max-w-2xl mx-auto text-center space-y-6 animate-in fade-in zoom-in-95 duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-[#26784F]/15 text-[#26784F] flex items-center justify-center mx-auto ring-8 ring-[#26784F]/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold tracking-widest text-[#26784F] uppercase block mb-1">
            INQUIRY GENERATED #{referenceId}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#24211E]">
            Device Details Ready on WhatsApp!
          </h3>
          <p className="text-xs sm:text-sm text-[#575047] mt-2 max-w-md mx-auto leading-relaxed">
            We have prepared your device information. If WhatsApp did not open
            automatically, click the green button below to chat directly with A1
            Mobile Shop.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] text-left text-xs space-y-1.5 font-mono text-[#24211E] max-h-48 overflow-y-auto whitespace-pre-wrap">
          {generatedMessage}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={generatedWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#26784F] hover:bg-[#1E5D3D] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open WhatsApp Chat Now</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-[#24211E] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#DED6CA] transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#26784F]" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#77716A]" />
                <span>Copy Message</span>
              </>
            )}
          </button>
        </div>

        <div className="pt-4 border-t border-[#DED6CA]">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#77716A] hover:text-[#24211E] font-semibold underline underline-offset-4"
          >
            Submit details for another device
          </button>
        </div>
      </div>
    );
  }

  const currentBrands = brandOptions[deviceCategory] || brandOptions.phone;

  return (
    <div
      id="sell-device-form"
      className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 shadow-xl max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* STEP 1: CATEGORY SELECTION */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-widest text-[#77716A] mb-3">
            1. Select Device Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = deviceCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setDeviceCategory(cat.id);
                    setBrand(brandOptions[cat.id]?.[0] || "Other");
                  }}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border text-center transition ${
                    isSelected
                      ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                      : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:border-[#77716A]"
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? "text-[#E66827]" : "text-[#77716A]"}`} />
                  <span className="text-xs font-bold leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: BRAND & MODEL */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-widest text-[#77716A] mb-2.5">
              2. Select Brand
            </label>
            <div className="flex flex-wrap gap-2">
              {currentBrands.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setBrand(b)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                    brand === b
                      ? "bg-[#24211E] text-white border-[#24211E] shadow-xs"
                      : "bg-[#F5EFE6] text-[#575047] border-[#DED6CA] hover:bg-[#DED6CA]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {brand === "Other" && (
              <input
                type="text"
                placeholder="Enter Brand Name (e.g. Poco, Google Pixel, Nothing)"
                value={customBrand}
                onChange={(e) => setCustomBrand(e.target.value)}
                className="mt-2.5 w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#24211E] mb-1.5">
                Exact Model Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. iPhone 13 / Redmi Note 12 / Vivo V29"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] placeholder-[#77716A] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24211E] mb-1.5">
                Storage / RAM Variant
              </label>
              <div className="flex gap-2">
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="flex-1 px-3 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-bold text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                >
                  {storageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {storage === "Other" && (
                  <input
                    type="text"
                    placeholder="e.g. 12GB / 256GB"
                    value={customStorage}
                    onChange={(e) => setCustomStorage(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: CONDITION */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-widest text-[#77716A] mb-2.5">
            3. Overall Physical Condition
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conditionOptions.map((opt) => {
              const isSelected = condition === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => setCondition(opt.value as any)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start justify-between ${
                    isSelected
                      ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                      : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:border-[#77716A]"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-xs font-extrabold block">
                      {opt.label}
                    </span>
                    <span
                      className={`text-[11px] block leading-tight ${
                        isSelected ? "text-white/80" : "text-[#575047]"
                      }`}
                    >
                      {opt.desc}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                      isSelected
                        ? "bg-[#E66827] text-white"
                        : "bg-[#DED6CA] text-[#575047]"
                    }`}
                  >
                    {opt.badge}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 4: ACCESSORIES & REMARKS */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-widest text-[#77716A] mb-2.5">
              4. Available Accessories
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {accessoryOptions.map((acc) => {
                const checked = accessories.includes(acc);
                return (
                  <button
                    type="button"
                    key={acc}
                    onClick={() => toggleAccessory(acc)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition ${
                      checked
                        ? "bg-[#26784F]/10 border-[#26784F] text-[#26784F]"
                        : "bg-[#F5EFE6] border-[#DED6CA] text-[#575047] hover:bg-[#DED6CA]"
                    }`}
                  >
                    <span className="truncate">{acc}</span>
                    {checked && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#24211E] mb-1.5">
              Any Specific Issues, Battery Health, or Remarks (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Battery health 86%, all cameras and touch working, minor scratch on back panel"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] placeholder-[#77716A] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
            />
          </div>
        </div>

        {/* STEP 5: CUSTOMER BASIC INFO */}
        <div className="pt-4 border-t border-[#DED6CA] space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#26784F]"></span>
            <label className="text-xs font-extrabold uppercase tracking-widest text-[#24211E]">
              5. Your Contact Information
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-[#24211E] mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#77716A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24211E] mb-1">
                WhatsApp / Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#26784F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 8726942338"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#24211E] mb-1">
                Area / Locality in Gorakhpur
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#E66827] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Basharatpur, Medical Road"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] focus:outline-none focus:ring-2 focus:ring-[#24211E]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ERROR DISPLAY */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#26784F] hover:bg-[#1E5D3D] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition transform active:scale-[0.99]"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Send Details to WhatsApp for Best Cash Offer</span>
          </button>
          <p className="text-center text-[11px] text-[#77716A] mt-2.5 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#26784F]" />
            <span>
              Direct conversation with A1 Mobile Shop team • Free doorstep inspection & instant cash
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
