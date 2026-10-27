"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getStoreWhatsAppNumber, buildWhatsAppLink } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(identifier.trim(), password);
    setLoading(false);

    if (result.success) {
      const redirectTarget =
        (typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("redirect")) ||
        "/account";
      router.push(redirectTarget);
    } else {
      setError(result.error || "Invalid email, mobile number, or password");
    }
  };

  const storePhone = getStoreWhatsAppNumber();
  const forgotPasswordWhatsApp = buildWhatsAppLink(
    storePhone,
    `Hello A1 Mobile Shop! I need help recovering the password for my account (${identifier || "registered account"}).`
  );

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#24211E] py-8 px-4 flex flex-col justify-center items-center">
      {/* Back to Store link */}
      <div className="w-full max-w-[680px] mb-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#575047] hover:text-[#24211E] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Store</span>
        </Link>
      </div>

      {/* Compact Main Card with Clear Simple Shop Image */}
      <div className="w-full max-w-[680px] bg-[#EDE6DC] rounded-2xl sm:rounded-3xl border border-[#DED6CA] shadow-xl overflow-hidden flex flex-col sm:flex-row">
        {/* Left: Clear, Simple Shop Image (No overlays, pure photograph) */}
        <div className="w-full sm:w-[260px] md:w-[280px] shrink-0 h-52 sm:h-auto relative bg-[#E4DDD3]">
          <Image
            src="/shop-front.png"
            alt="A1 Mobile Shop Storefront Gorakhpur"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 280px"
          />
        </div>

        {/* Right: Clean, Focused Login Form */}
        <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            {/* Header: Logo & Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 shadow-xs border border-[#DED6CA] bg-white shrink-0">
                <Image
                  src="/logo-icon.png"
                  alt="A1 Mobile"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-black text-[#24211E] tracking-tight leading-none">
                  Sign In to A1 Mobile
                </h1>
                <p className="text-[11px] text-[#575047] mt-1">
                  Access your orders, sell quotes & wishlist.
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#24211E] block mb-1">
                  Email Address or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9369554806 or name@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] placeholder:text-[#A8A199] focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-[#24211E]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-[11px] text-[#575047] hover:text-[#24211E] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium text-[#24211E] placeholder:text-[#A8A199] focus:outline-none focus:ring-1 focus:ring-[#24211E]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#77716A] hover:text-[#24211E]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-3.5 h-3.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-[#DED6CA] text-[#24211E] focus:ring-[#24211E] accent-[#24211E]"
                  />
                  <span className="text-[11px] text-[#575047]">
                    Keep me signed in on this device
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3D3731] transition shadow-md disabled:opacity-50 cursor-pointer mt-1"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer: Register link */}
          <div className="pt-3 border-t border-[#DED6CA] text-center text-xs text-[#575047]">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/account/register"
              className="font-bold text-[#24211E] hover:underline"
            >
              Create an Account →
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#24211E]">
                Reset Password
              </h3>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-[#77716A] hover:text-[#24211E] text-lg font-bold leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-[#575047]">
              Contact our Gorakhpur store support on WhatsApp to instantly verify your account and reset your password:
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <a
                href={forgotPasswordWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message Store on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="w-full py-2 px-3 rounded-xl bg-[#DED6CA] hover:bg-[#D4CABA] text-[#24211E] text-xs font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
