import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { IProduct } from "@/types";
import ProductCard from "@/components/products/ProductCard";

interface BestDealsProps {
  deals: IProduct[];
  whatsappNumber?: string;
}

export default function BestDeals({ deals, whatsappNumber }: BestDealsProps) {
  if (!deals || deals.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-[#EEE7DC] border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E66827] mb-1">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Special Reductions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#24211E] tracking-tight">
              Best Deals
            </h2>
            <p className="text-sm text-[#575047] mt-1.5">
              Limited-time offers on top devices in Gorakhpur.
            </p>
          </div>

          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#24211E] hover:text-[#E66827] transition group shrink-0"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
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
