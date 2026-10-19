import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { IProduct } from "@/types";
import ProductCard from "@/components/products/ProductCard";

interface FeaturedDevicesProps {
  products: IProduct[];
  whatsappNumber?: string;
}

export default function FeaturedDevices({
  products,
  whatsappNumber,
}: FeaturedDevicesProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#26784F] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handpicked Flagships</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#24211E] tracking-tight">
              Featured Devices
            </h2>
            <p className="text-sm text-[#575047] mt-1.5">
              Verified inventory in stock at our Gorakhpur store.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#24211E] hover:text-[#E66827] transition group shrink-0"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id || product.slug}
              product={product}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
