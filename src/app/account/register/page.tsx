"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Smartphone, Lock, Mail, User, Phone, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await register(name, email, password, phone);
    setLoading(false);

    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "Failed to register account");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 flex items-center justify-center bg-[#F5EFE6]">
      <div className="w-full max-w-md bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-8 sm:p-10 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#24211E] text-white flex items-center justify-center mx-auto shadow-md">
            <Smartphone className="w-6 h-6 text-[#E66827]" />
          </div>
          <h1 className="text-2xl font-black text-[#24211E] tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs text-[#575047]">
            Join A1 Mobile Shop Gorakhpur for fast checkout & buyback quotes.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#24211E] block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#24211E] block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rohan@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#24211E] block mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#24211E] block mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-[#24211E] text-[#EDE6DC] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#3D3731] transition shadow-md disabled:opacity-50"
          >
            {loading ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#DED6CA] text-xs text-[#575047]">
          Already have an account?{" "}
          <Link
            href="/account/login"
            className="font-bold text-[#24211E] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
