import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { IPromotionalBanner } from "@/types";

export default function PromoBanner({
  banner,
}: {
  banner: IPromotionalBanner | null;
}) {
  if (!banner || !banner.isActive) return null;

  return (
    <section className="py-12 sm:py-16 bg-[#F5EFE6] border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#24211E] text-[#EDE6DC] rounded-3xl border border-[#3D3731] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D3731] border border-[#575047] text-[11px] font-black tracking-widest text-[#E66827] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{banner.tag}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {banner.title}
              </h2>

              <p className="text-sm sm:text-base text-[#EDE6DC]/80 max-w-xl leading-relaxed">
                {banner.description}
              </p>

              {banner.bonusText && (
                <div className="inline-block px-4 py-2 rounded-xl bg-[#26784F]/20 border border-[#26784F]/40 text-[#26784F] text-xs sm:text-sm font-bold">
                  ✨ {banner.bonusText}
                </div>
              )}

              <div className="pt-2">
                <Link
                  href={banner.buttonLink}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E66827] text-white font-black text-sm uppercase tracking-wider hover:bg-[#d55819] transition shadow-lg group"
                >
                  <span>{banner.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Image Stage */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-sm rounded-2xl overflow-hidden border border-[#575047]/40 shadow-2xl">
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                {banner.discountBadge && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#E66827] text-white text-xs font-black shadow-lg">
                    {banner.discountBadge}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#E66827]/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
