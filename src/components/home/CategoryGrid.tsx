import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ICategory } from "@/types";

export default function CategoryGrid({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#77716A] mb-1">
              <span>Catalog Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#24211E] tracking-tight">
              Explore Our Categories
            </h2>
            <p className="text-sm text-[#575047] mt-1.5">
              Everything you need for your connected lifestyle.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#24211E] hover:text-[#E66827] transition group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat._id || cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] overflow-hidden p-6 flex flex-col justify-between hover:shadow-md hover:border-[#575047]/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#24211E] group-hover:text-[#E66827] transition">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#575047] line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Category Image Stage */}
              <div className="relative aspect-[16/10] w-full bg-[#F5EFE6] rounded-xl my-4 overflow-hidden border border-[#DED6CA]/60 flex items-center justify-center">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                />
              </div>

              {/* Footer CTA */}
              <div className="flex items-center justify-between text-xs font-bold text-[#24211E] pt-2 border-t border-[#DED6CA]/50 group-hover:text-[#E66827] transition">
                <span>Explore {cat.name}</span>
                <div className="w-7 h-7 rounded-lg bg-[#F5EFE6] flex items-center justify-center border border-[#DED6CA] group-hover:bg-[#24211E] group-hover:text-white transition">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
