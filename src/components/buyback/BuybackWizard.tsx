"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  ShieldCheck,
  Check,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface BuybackWizardProps {
  initialCategory?: string;
  onSuccess?: (ref: string) => void;
}

export default function BuybackWizard({
  initialCategory = "phone",
}: BuybackWizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    deviceCategory: initialCategory,
    brand: "Xiaomi",
    model: "Redmi 15A 5G",
    configuration: "128GB / 6GB",
    condition: "Good" as "Flawless" | "Good" | "Average" | "Below Average",
    functionalIssues: [] as string[],
    accessoriesIncluded: ["Original Box & Charger", "Original Bill"] as string[],
    estimatedValue: 8075,
    customerName: "",
    phone: "",
    email: "",
    pickupDate: "Tomorrow",
    pickupTimeSlot: "11:00 AM - 02:00 PM",
    street: "",
    area: "Basharatpur",
    city: "Gorakhpur",
    pincode: "273004",
    landmark: "",
    paymentPreference: "UPI" as "UPI" | "Bank Transfer" | "Cash on Inspection",
    upiId: "",
  });

  const brandsMap: Record<string, string[]> = {
    phone: ["Xiaomi", "Vivo", "Samsung", "Apple", "OnePlus"],
    laptop: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
    tablet: ["Apple", "Samsung", "OnePlus", "Lenovo"],
    smartwatch: ["Apple", "Samsung", "Noise", "boAt"],
  };

  const modelsMap: Record<string, Record<string, string[]>> = {
    phone: {
      Xiaomi: ["Redmi 15A 5G", "Redmi Note 13 Pro 5G", "Xiaomi 14"],
      Vivo: ["Vivo Y21 5G", "Vivo V29 5G", "Vivo X100 Pro"],
      Samsung: ["Samsung Galaxy A17 5G", "Samsung Galaxy F17 5G", "Galaxy S24 Ultra"],
      Apple: ["Apple iPhone 15 Pro", "iPhone 14", "iPhone 13", "iPhone 12"],
      OnePlus: ["OnePlus Nord CE4 5G", "OnePlus 12R", "OnePlus 12"],
    },
    laptop: {
      Apple: ["MacBook Air M2", "MacBook Pro M3", "MacBook Air M1"],
      Dell: ["Dell XPS 13", "Dell Inspiron 15"],
      HP: ["HP Pavilion 15", "HP Spectre x360"],
      Lenovo: ["IdeaPad Slim 3", "ThinkPad E14"],
      Asus: ["ZenBook 14", "TUF Gaming F15"],
    },
    tablet: {
      Apple: ["Apple iPad 10th Gen", "iPad Air 5th Gen", "iPad Pro 11"],
      Samsung: ["Galaxy Tab S9 FE", "Galaxy Tab A9+"],
      OnePlus: ["OnePlus Pad Go 11.35 2.4K", "OnePlus Pad 2"],
      Lenovo: ["Lenovo Tab M11", "Lenovo Tab P12"],
    },
    smartwatch: {
      Apple: ["Apple Watch Series 9", "Apple Watch SE 2"],
      Samsung: ["Samsung Galaxy Watch 6 BT", "Galaxy Watch 5 Pro"],
      Noise: ["Noise ColorFit Pulse 3 AMOLED", "ColorFit Pro 5"],
      boAt: ["boAt Wave Call 2", "boAt Lunar Mirage"],
    },
  };

  const conditionOptions = [
    {
      name: "Flawless",
      desc: "Like new, zero scratches or dents, 100% functional, never opened or repaired.",
    },
    {
      name: "Good",
      desc: "Minor signs of normal use, light hairline scratches, fully functional display and battery.",
    },
    {
      name: "Average",
      desc: "Visible scratches or small body dings, screen intact, all buttons work normally.",
    },
    {
      name: "Below Average",
      desc: "Heavy scratches, chipped paint or slight body dent, but device powers on and works.",
    },
  ];

  const commonIssues = [
    "Screen Scratched / Cracked",
    "Body Scratches / Dents",
    "Battery Backup Issue",
    "Camera / Speaker Fault",
  ];

  const accessoriesOptions = [
    "Original Box & Charger",
    "Original Bill",
    "Earphones / Extra Straps",
  ];

  // Recalculate valuation when relevant fields change
  const fetchQuote = async (
    cat: string,
    brand: string,
    model: string,
    cond: any,
    issues: string[],
    acc: string[]
  ) => {
    try {
      const res = await fetch("/api/buyback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "calculate",
          deviceCategory: cat,
          brand,
          model,
          condition: cond,
          functionalIssues: issues,
          accessoriesIncluded: acc,
        }),
      });
      const data = await res.json();
      if (data && data.quote) {
        setFormData((prev) => ({
          ...prev,
          estimatedValue: data.quote.estimatedValue,
        }));
      }
    } catch {
      // fallback
    }
  };

  const handleNext = () => {
    setErrorMsg(null);
    if (step === 8) {
      if (!formData.customerName.trim() || !formData.phone.trim()) {
        setErrorMsg("Please enter your name and 10-digit mobile number.");
        return;
      }
    }
    if (step === 10) {
      if (!formData.street.trim() || !formData.pincode.trim()) {
        setErrorMsg("Please enter your street address and postal code in Gorakhpur.");
        return;
      }
    }
    if (step === 11) {
      if (formData.paymentPreference === "UPI" && !formData.upiId.trim()) {
        setErrorMsg("Please provide your UPI ID (e.g. name@okhdfcbank or 9876543210@paytm).");
        return;
      }
    }
    setStep((prev) => Math.min(12, prev + 1));
  };

  const handlePrev = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        action: "submit",
        requestData: {
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          deviceCategory: formData.deviceCategory,
          brand: formData.brand,
          model: formData.model,
          configuration: formData.configuration,
          condition: formData.condition,
          functionalIssues: formData.functionalIssues,
          accessoriesIncluded: formData.accessoriesIncluded,
          estimatedValue: formData.estimatedValue,
          pickupAddress: {
            street: formData.street,
            area: formData.area,
            city: formData.city,
            pincode: formData.pincode,
            landmark: formData.landmark,
          },
          pickupDate: formData.pickupDate,
          pickupTimeSlot: formData.pickupTimeSlot,
          paymentPreference: formData.paymentPreference,
          upiId: formData.upiId,
        },
      };

      const res = await fetch("/api/buyback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.request) {
        setReferenceNumber(data.request.referenceNumber);
      } else {
        setErrorMsg(data.error || "Failed to submit request.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (referenceNumber) {
    return (
      <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-[#26784F] text-white flex items-center justify-center mx-auto shadow-md">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        <div>
          <span className="text-xs font-bold text-[#26784F] uppercase tracking-wider block">
            Pickup Request Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#24211E] mt-1">
            Doorstep Inspection Scheduled!
          </h2>
          <p className="text-xs sm:text-sm text-[#575047] mt-2">
            Our representative in Gorakhpur will visit your address to inspect
            the device and provide instant payment.
          </p>
        </div>

        {/* Reference Number Card */}
        <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#DED6CA] space-y-3">
          <span className="text-xs font-bold text-[#77716A] uppercase tracking-widest block">
            Your Booking Reference
          </span>
          <p className="text-2xl sm:text-3xl font-mono font-black text-[#24211E]">
            {referenceNumber}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#575047] pt-2 border-t border-[#DED6CA]">
            <span>Device: {formData.model}</span>
            <span>•</span>
            <span className="text-[#26784F]">
              Estimated Quote: {formatPrice(formData.estimatedValue)}
            </span>
          </div>
        </div>

        <div className="text-xs text-[#77716A] space-y-1">
          <p>
            📅 Scheduled for <strong>{formData.pickupDate}</strong> during{" "}
            <strong>{formData.pickupTimeSlot}</strong>
          </p>
          <p>
            📍 Address: {formData.street}, {formData.area}, {formData.city} (
            {formData.pincode})
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left">
          <strong>Important Note:</strong> The estimated quote is based on the
          details provided. Final cash transfer takes place immediately after
          onsite physical testing and verification by our certified executive.
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              setReferenceNumber(null);
              setStep(1);
            }}
            className="px-8 py-3 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
          >
            Submit Another Device
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-6 sm:p-10 shadow-xl max-w-3xl mx-auto">
      {/* Progress Bar & Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-[#77716A] mb-2">
          <span>STEP {step} OF 12</span>
          <span>{Math.round((step / 12) * 100)}% COMPLETED</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#DED6CA] overflow-hidden">
          <div
            className="h-full bg-[#26784F] transition-all duration-300"
            style={{ width: `${(step / 12) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Device Category */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              What type of device do you want to sell?
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Select device category to see accurate Gorakhpur resale rates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "phone", label: "Smartphone", icon: "📱" },
              { id: "laptop", label: "Laptop", icon: "💻" },
              { id: "tablet", label: "Tablet / iPad", icon: "📟" },
              { id: "smartwatch", label: "Smartwatch", icon: "⌚" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    deviceCategory: cat.id,
                    brand: brandsMap[cat.id][0],
                    model: modelsMap[cat.id][brandsMap[cat.id][0]][0],
                  }));
                }}
                className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2 ${
                  formData.deviceCategory === cat.id
                    ? "bg-[#24211E] text-white border-[#24211E] shadow-md scale-105"
                    : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                }`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-bold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Select Brand */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Select Brand
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Choose the manufacturer of your {formData.deviceCategory}.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {brandsMap[formData.deviceCategory]?.map((b) => (
              <button
                key={b}
                onClick={() => {
                  const firstModel = modelsMap[formData.deviceCategory][b]?.[0] || "";
                  setFormData((prev) => ({ ...prev, brand: b, model: firstModel }));
                  fetchQuote(
                    formData.deviceCategory,
                    b,
                    firstModel,
                    formData.condition,
                    formData.functionalIssues,
                    formData.accessoriesIncluded
                  );
                }}
                className={`py-4 px-4 rounded-xl border text-xs font-bold transition text-center ${
                  formData.brand === b
                    ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                    : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Select Model */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Select Model
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Select your specific {formData.brand} model.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {modelsMap[formData.deviceCategory][formData.brand]?.map((m) => (
              <button
                key={m}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, model: m }));
                  fetchQuote(
                    formData.deviceCategory,
                    formData.brand,
                    m,
                    formData.condition,
                    formData.functionalIssues,
                    formData.accessoriesIncluded
                  );
                }}
                className={`p-4 rounded-xl border text-xs font-bold text-left transition ${
                  formData.model === m
                    ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                    : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 4: Configuration */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Select Storage & RAM
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Select the variant specified in your phone settings or box.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              "64GB / 4GB",
              "128GB / 6GB",
              "128GB / 8GB",
              "256GB / 8GB",
              "256GB / 12GB",
              "512GB / 12GB",
            ].map((cfg) => (
              <button
                key={cfg}
                onClick={() => setFormData((prev) => ({ ...prev, configuration: cfg }))}
                className={`p-4 rounded-xl border text-xs font-bold text-center transition ${
                  formData.configuration === cfg
                    ? "bg-[#24211E] text-white border-[#24211E]"
                    : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                }`}
              >
                {cfg}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 5: Physical Condition */}
      {step === 5 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Physical Condition
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              How would you describe the external condition of your phone?
            </p>
          </div>

          <div className="space-y-3">
            {conditionOptions.map((cond) => (
              <button
                key={cond.name}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    condition: cond.name as any,
                  }));
                  fetchQuote(
                    formData.deviceCategory,
                    formData.brand,
                    formData.model,
                    cond.name,
                    formData.functionalIssues,
                    formData.accessoriesIncluded
                  );
                }}
                className={`w-full p-4 rounded-xl border text-left transition flex items-start justify-between gap-4 ${
                  formData.condition === cond.name
                    ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                    : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    {cond.name}
                  </h4>
                  <p className="text-[11px] opacity-80 mt-1 leading-relaxed">
                    {cond.desc}
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    formData.condition === cond.name
                      ? "border-white bg-[#26784F]"
                      : "border-[#77716A]"
                  }`}
                >
                  {formData.condition === cond.name && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 6: Condition Questions / Functional Issues */}
      {step === 6 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Condition Checklist
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Select any existing defects or available accessories.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#575047] block mb-2">
                Defects / Functional Flaws (if any):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {commonIssues.map((issue) => {
                  const checked = formData.functionalIssues.includes(issue);
                  return (
                    <button
                      key={issue}
                      onClick={() => {
                        const updated = checked
                          ? formData.functionalIssues.filter((i) => i !== issue)
                          : [...formData.functionalIssues, issue];
                        setFormData((prev) => ({
                          ...prev,
                          functionalIssues: updated,
                        }));
                        fetchQuote(
                          formData.deviceCategory,
                          formData.brand,
                          formData.model,
                          formData.condition,
                          updated,
                          formData.accessoriesIncluded
                        );
                      }}
                      className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                        checked
                          ? "bg-amber-100 border-amber-300 text-amber-900"
                          : "bg-[#F5EFE6] border-[#DED6CA] text-[#24211E]"
                      }`}
                    >
                      <span>{issue}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          checked
                            ? "bg-[#24211E] border-[#24211E] text-white"
                            : "border-[#77716A]"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#575047] block mb-2">
                Accessories available:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {accessoriesOptions.map((acc) => {
                  const checked = formData.accessoriesIncluded.includes(acc);
                  return (
                    <button
                      key={acc}
                      onClick={() => {
                        const updated = checked
                          ? formData.accessoriesIncluded.filter((i) => i !== acc)
                          : [...formData.accessoriesIncluded, acc];
                        setFormData((prev) => ({
                          ...prev,
                          accessoriesIncluded: updated,
                        }));
                        fetchQuote(
                          formData.deviceCategory,
                          formData.brand,
                          formData.model,
                          formData.condition,
                          formData.functionalIssues,
                          updated
                        );
                      }}
                      className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition ${
                        checked
                          ? "bg-green-100 border-green-300 text-green-900"
                          : "bg-[#F5EFE6] border-[#DED6CA] text-[#24211E]"
                      }`}
                    >
                      <span>{acc}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          checked
                            ? "bg-[#26784F] border-[#26784F] text-white"
                            : "border-[#77716A]"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: Estimated Resale Value Display */}
      {step === 7 && (
        <div className="space-y-6 text-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#26784F]">
              VALUATION GENERATED
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#24211E] mt-1">
              Estimated Instant Cash Value
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Calculated using live Gorakhpur market exchange metrics.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#F5EFE6] border border-[#DED6CA] max-w-md mx-auto space-y-4">
            <span className="text-xs font-bold text-[#77716A] uppercase tracking-wider block">
              {formData.brand} • {formData.model} ({formData.configuration})
            </span>

            <div className="text-4xl sm:text-5xl font-black text-[#26784F]">
              {formatPrice(formData.estimatedValue)}
            </div>

            <div className="text-xs text-[#575047] space-y-1 pt-2 border-t border-[#DED6CA]">
              <p>Condition: {formData.condition}</p>
              <p>Free doorstep pickup included in Gorakhpur</p>
            </div>
          </div>

          <div className="text-xs text-[#77716A] max-w-md mx-auto leading-relaxed">
            *Final valuation is confirmed after physical inspection of screen,
            battery, and components by our representative at your address.
          </div>
        </div>
      )}

      {/* STEP 8: Contact Details */}
      {step === 8 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Your Contact Details
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Who should our executive contact for pickup?
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#24211E] block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, customerName: e.target.value }))
                }
                placeholder="e.g. Ramesh Chandra"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#24211E] block mb-1">
                Mobile Number (WhatsApp Preferred) *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#24211E] block mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="e.g. ramesh@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 9: Pickup Date & Slot */}
      {step === 9 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Schedule Free Pickup
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Select your preferred day and time slot in Gorakhpur.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#575047] block mb-2">
                Pickup Date:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["Today", "Tomorrow", "Day After Tomorrow"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setFormData((prev) => ({ ...prev, pickupDate: d }))}
                    className={`py-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      formData.pickupDate === d
                        ? "bg-[#24211E] text-white border-[#24211E]"
                        : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{d}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#575047] block mb-2">
                Available Time Slot:
              </label>
              <div className="space-y-2">
                {[
                  "10:00 AM - 01:00 PM (Morning)",
                  "01:00 PM - 04:00 PM (Afternoon)",
                  "04:00 PM - 07:30 PM (Evening)",
                ].map((slot) => (
                  <button
                    key={slot}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, pickupTimeSlot: slot }))
                    }
                    className={`w-full p-3 rounded-xl border text-xs font-bold text-left transition flex items-center justify-between ${
                      formData.pickupTimeSlot === slot
                        ? "bg-[#24211E] text-white border-[#24211E]"
                        : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#E66827]" />
                      <span>{slot}</span>
                    </div>
                    {formData.pickupTimeSlot === slot && (
                      <Check className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 10: Pickup Address */}
      {step === 10 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Doorstep Pickup Address
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Where in Gorakhpur should we collect the device?
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#24211E] block mb-1">
                House / Street Address *
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, street: e.target.value }))
                }
                placeholder="e.g. Flat 302, Green Enclave, Medical College Road"
                className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#24211E] block mb-1">
                  Area / Locality *
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, area: e.target.value }))
                  }
                  placeholder="e.g. Basharatpur"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#24211E] block mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl bg-[#DED6CA]/50 border border-[#DED6CA] text-xs font-bold text-[#575047]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#24211E] block mb-1">
                  Gorakhpur Pincode *
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, pincode: e.target.value }))
                  }
                  placeholder="273004"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#24211E] block mb-1">
                  Nearby Landmark
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, landmark: e.target.value }))
                  }
                  placeholder="e.g. Near City Hospital"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 11: Payment Preference */}
      {step === 11 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Payment Preference
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              How would you like to receive the cash after inspection?
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: "UPI",
                label: "Instant UPI Transfer (Recommended)",
                desc: "Instant transfer to GPay, PhonePe, Paytm or BHIM at your doorstep.",
              },
              {
                id: "Bank Transfer",
                label: "IMPS / NEFT Bank Transfer",
                desc: "Direct bank transfer within 15 minutes of verification.",
              },
              {
                id: "Cash on Inspection",
                label: "Cash On Inspection",
                desc: "Direct cash handed over in-person by our executive.",
              },
            ].map((pm) => (
              <button
                key={pm.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentPreference: pm.id as any,
                  }))
                }
                className={`w-full p-4 rounded-xl border text-left transition flex items-start justify-between gap-4 ${
                  formData.paymentPreference === pm.id
                    ? "bg-[#24211E] text-white border-[#24211E] shadow-sm"
                    : "bg-[#F5EFE6] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold">{pm.label}</h4>
                  <p className="text-[11px] opacity-80 mt-1">{pm.desc}</p>
                </div>
                {formData.paymentPreference === pm.id && (
                  <Check className="w-4 h-4 text-[#26784F]" />
                )}
              </button>
            ))}

            {formData.paymentPreference === "UPI" && (
              <div className="pt-2">
                <label className="text-xs font-bold text-[#24211E] block mb-1">
                  Your UPI ID *
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, upiId: e.target.value }))
                  }
                  placeholder="e.g. yourname@okaxis or 9876543210@paytm"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 12: Final Review & Submit */}
      {step === 12 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#24211E]">
              Confirm Buyback Request
            </h3>
            <p className="text-xs sm:text-sm text-[#575047] mt-1">
              Please review your quote and pickup details before submitting.
            </p>
          </div>

          <div className="space-y-4 bg-[#F5EFE6] p-6 rounded-2xl border border-[#DED6CA] text-xs text-[#575047]">
            <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
              <span className="font-bold text-[#24211E]">Device:</span>
              <span className="font-bold text-sm text-[#24211E]">
                {formData.brand} {formData.model} ({formData.configuration})
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
              <span className="font-bold text-[#24211E]">Condition:</span>
              <span>{formData.condition}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
              <span className="font-bold text-[#24211E]">Estimated Value:</span>
              <span className="text-lg font-black text-[#26784F]">
                {formatPrice(formData.estimatedValue)}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
              <span className="font-bold text-[#24211E]">Pickup Contact:</span>
              <span>
                {formData.customerName} ({formData.phone})
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
              <span className="font-bold text-[#24211E]">Schedule:</span>
              <span>
                {formData.pickupDate} • {formData.pickupTimeSlot}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
              <span className="font-bold text-[#24211E]">Pickup Address:</span>
              <span className="text-right">
                {formData.street}, {formData.area}, {formData.city} (
                {formData.pincode})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-[#24211E]">Payment Mode:</span>
              <span className="font-bold text-[#26784F]">
                {formData.paymentPreference}{" "}
                {formData.upiId ? `(${formData.upiId})` : ""}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] text-[11px] text-[#77716A]">
            🛡️ <strong>Safety Guarantee:</strong> Our executive will assist in
            performing a 100% factory data reset and Google account sign-out in
            front of you before sealing the package.
          </div>
        </div>
      )}

      {/* Error feedback */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-[#DED6CA]">
        {step > 1 ? (
          <button
            onClick={handlePrev}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-full bg-[#F5EFE6] text-[#24211E] border border-[#DED6CA] text-xs font-bold flex items-center gap-1.5 hover:bg-[#DED6CA] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {step < 12 ? (
          <button
            onClick={handleNext}
            className="px-7 py-3 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold flex items-center gap-2 hover:bg-[#3D3731] transition shadow-md"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-full bg-[#26784F] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:bg-[#1E5D3D] transition shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Submitting Request...</span>
            ) : (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Confirm & Schedule Free Pickup</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
