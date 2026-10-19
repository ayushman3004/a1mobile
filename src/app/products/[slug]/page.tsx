import { notFound } from "next/navigation";
import Link from "next/link";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import ProductCard from "@/components/products/ProductCard";

import { getProductBySlug, getRelatedProducts } from "@/services/products";
import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found | A1 Mobile Shop Gorakhpur" };
  }

  return {
    title: `${product.name} | A1 Mobile Shop Gorakhpur`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | A1 Mobile Shop Gorakhpur`,
      description: product.shortDescription || product.description,
      images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const [product, settings, navigationItems] = await Promise.all([
    getProductBySlug(slug),
    getStoreSettings(),
    getNavigationItems(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product._id || product.id || product.slug,
    4
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#77716A] font-medium">
            <Link href="/" className="hover:text-[#24211E]">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#24211E]">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="capitalize hover:text-[#24211E]"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#24211E] font-bold truncate max-w-xs">
              {product.name}
            </span>
          </div>

          {/* Interactive Hero / Gallery & Buy Actions */}
          <ProductDetailClient
            product={product}
            whatsappNumber={settings.whatsappNumber}
          />

          {/* Description & Technical Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-[#DED6CA]">
            {/* Description */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#24211E] tracking-tight">
                Product Overview
              </h2>
              <div className="text-sm text-[#575047] leading-relaxed space-y-3 bg-[#EDE6DC] p-6 rounded-2xl border border-[#DED6CA]">
                <p>{product.description}</p>
                <div className="pt-3 border-t border-[#DED6CA] space-y-2 text-xs font-semibold text-[#24211E]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#26784F]" />
                    <span>Brand New Sealed Box with IMEI verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#26784F]" />
                    <span>Eligible for Gorakhpur Doorstep Exchange Buyback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#26784F]" />
                    <span>Valid GST Invoice included for Tax Benefit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#24211E] tracking-tight">
                Technical Specifications
              </h2>
              <div className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] overflow-hidden">
                <div className="divide-y divide-[#DED6CA]">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div
                        key={key}
                        className="grid grid-cols-3 px-5 py-3.5 text-xs"
                      >
                        <span className="font-bold text-[#24211E] uppercase tracking-wider">
                          {key}
                        </span>
                        <span className="col-span-2 text-[#575047]">{val}</span>
                      </div>
                    ))}
                  <div className="grid grid-cols-3 px-5 py-3.5 text-xs bg-[#F5EFE6]">
                    <span className="font-bold text-[#24211E] uppercase tracking-wider">
                      Warranty
                    </span>
                    <span className="col-span-2 text-[#26784F] font-bold">
                      {product.warranty || "1 Year Official Brand Warranty"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="space-y-6 pt-8 border-t border-[#DED6CA]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#24211E] tracking-tight">
                  Verified Customer Reviews
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#77716A]">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span>{product.rating} out of 5</span>
                  </div>
                  <span>•</span>
                  <span>Based on {product.reviewCount} customer ratings</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#EDE6DC] p-5 rounded-2xl border border-[#DED6CA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#24211E]">
                    Vikas Srivastava (Gorakhpur)
                  </span>
                  <span className="text-[10px] font-bold text-[#26784F] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified In-Store Purchase
                  </span>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#575047] leading-relaxed">
                  &ldquo;Purchased from Basharatpur shop directly. Clean sealed
                  box, phone is blistering fast, and they also gave a free
                  tempered glass screen protector installation.&rdquo;
                </p>
              </div>

              <div className="bg-[#EDE6DC] p-5 rounded-2xl border border-[#DED6CA] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#24211E]">
                    Pooja Verma (Medical College Road)
                  </span>
                  <span className="text-[10px] font-bold text-[#26784F] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Purchase
                  </span>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#575047] leading-relaxed">
                  &ldquo;Delivered to my doorstep within 3 hours. Great customer
                  service and genuine invoice. Highly recommended in
                  Gorakhpur!&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="space-y-6 pt-8 border-t border-[#DED6CA]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-black text-[#24211E] tracking-tight">
                  Related Devices & Accessories
                </h2>
                <Link
                  href={`/products?category=${product.category}`}
                  className="text-xs font-bold text-[#E66827] hover:underline"
                >
                  View More in {product.category} →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard
                    key={rel._id || rel.slug}
                    product={rel}
                    whatsappNumber={settings.whatsappNumber}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
