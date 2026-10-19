"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Smartphone, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push("/account");
    } else {
      setError(result.error || "Invalid email or password");
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
            Sign In to A1 Mobile
          </h1>
          <p className="text-xs text-[#575047]">
            Access your orders, sell quotes, and wishlist.
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
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#24211E]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#24211E] block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#77716A]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#DED6CA] text-xs text-[#575047]">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/account/register"
            className="font-bold text-[#24211E] hover:underline"
          >
            Create an Account
          </Link>
        </div>

        <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] text-[11px] text-[#77716A] text-center">
          Admin demo credentials: <strong>admin@a1mobileshop.com</strong> /{" "}
          <strong>AdminPassword123!</strong>
        </div>
      </div>
    </div>
  );
}
