"use client";

import React, { useState } from "react";
import { Mail, Check, AlertCircle, Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe at this moment. Please check network.");
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#24211E] text-[#EDE6DC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-[#3D3731] border border-[#575047] flex items-center justify-center mx-auto text-[#E66827]">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Stay Updated With A1
        </h2>

        <p className="text-sm sm:text-base text-[#EDE6DC]/80 max-w-lg mx-auto leading-relaxed">
          Get new arrivals, exclusive deals and exchange offers directly on your
          phone.
        </p>

        {/* Subscribe Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5 pt-2"
        >
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 rounded-full bg-[#2D2925] border border-[#575047] text-sm text-white placeholder-[#EDE6DC]/50 focus:outline-none focus:ring-2 focus:ring-[#E66827] transition"
              disabled={status === "loading"}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-3.5 rounded-full bg-[#E66827] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#d55819] transition flex items-center justify-center gap-2 shadow-md shrink-0 disabled:opacity-50"
          >
            {status === "loading" ? (
              <span>Subscribing...</span>
            ) : (
              <>
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Status Feedback */}
        {status === "success" && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#26784F]/20 text-[#26784F] text-xs font-semibold">
            <Check className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 text-xs font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-[11px] text-[#EDE6DC]/50 pt-2">
          No spam, ever. Unsubscribe anytime with a single click.
        </p>
      </div>
    </section>
  );
}
