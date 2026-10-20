import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "icon" | "full" | "header" | "footer";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  withLink?: boolean;
}

export default function Logo({
  variant = "header",
  size = "md",
  className = "",
  withLink = false,
}: LogoProps) {
  // Dimensions map for icon
  const iconDimensions = {
    sm: { width: 32, height: 32, class: "w-8 h-8" },
    md: { width: 44, height: 44, class: "w-11 h-11" },
    lg: { width: 56, height: 56, class: "w-14 h-14" },
    xl: { width: 80, height: 80, class: "w-20 h-20" },
  };

  // Dimensions map for full logo
  const fullDimensions = {
    sm: { width: 120, height: 120, class: "w-24 h-24" },
    md: { width: 160, height: 160, class: "w-32 h-32" },
    lg: { width: 220, height: 220, class: "w-44 h-44" },
    xl: { width: 300, height: 300, class: "w-60 h-60" },
  };

  const dim = variant === "full" ? fullDimensions[size] : iconDimensions[size];

  const content = (() => {
    if (variant === "full") {
      return (
        <div className={`relative ${dim.class} ${className}`}>
          <Image
            src="/logo.png"
            alt="A1 Mobile Shop Logo"
            width={dim.width}
            height={dim.height}
            className="w-full h-full object-contain drop-shadow-sm"
            priority
          />
        </div>
      );
    }

    if (variant === "footer") {
      return (
        <div className={`flex items-center gap-3 ${className}`}>
          <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-md shrink-0 bg-white/5 ring-1 ring-white/10">
            <Image
              src="/logo-icon.png"
              alt="A1 Mobile Shop Logo"
              fill
              sizes="40px"
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight block leading-tight text-[#EDE6DC]">
              A1 MOBILE
            </span>
            <span className="text-[10px] text-[#EDE6DC]/70 tracking-widest uppercase font-semibold block">
              SHOP GORAKHPUR
            </span>
          </div>
        </div>
      );
    }

    if (variant === "header") {
      return (
        <div className={`flex items-center gap-3 shrink-0 group ${className}`}>
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm group-hover:scale-105 transition-transform shrink-0 ring-1 ring-[#DED6CA]/50 bg-white/40">
            <Image
              src="/logo-icon.png"
              alt="A1 Mobile Shop Logo"
              fill
              sizes="44px"
              priority
              className="object-contain p-0.5"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#24211E]">
                A1 MOBILE
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#77716A] uppercase block mt-0.5">
              SHOP GORAKHPUR
            </span>
          </div>
        </div>
      );
    }

    // Default icon only
    return (
      <div
        className={`relative ${dim.class} rounded-full overflow-hidden shadow-sm shrink-0 ${className}`}
      >
        <Image
          src="/logo-icon.png"
          alt="A1 Mobile Shop Logo"
          fill
          sizes={`${dim.width}px`}
          className="object-contain"
        />
      </div>
    );
  })();

  if (withLink) {
    return (
      <Link href="/" className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
