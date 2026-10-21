import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";

import { getStoreSettings, getNavigationItems } from "@/services/settings";
import { getCategories, getBrands } from "@/services/categories";
import { getProducts } from "@/services/products";
import Link from "next/link";
import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    search?: string;
    deal?: string;
    featured?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: "price-asc" | "price-desc" | "rating" | "latest";
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const brand = params.brand;
  const search = params.search;
  const isDeal = params.deal === "true";
  const isFeatured = params.featured === "true";
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const sort = params.sort || "latest";
  const page = Number(params.page) || 1;

  const [settings, navigationItems, categories, brands, productResult] =
    await Promise.all([
      getStoreSettings(),
      getNavigationItems(),
      getCategories(),
      getBrands(),
      getProducts({
        category,
        brand,
        search,
        isDeal,
        isFeatured,
        minPrice,
        maxPrice,
        sort,
        page,
        limit: 12,
      }),
    ]);

  const { products, totalCount, totalPages, currentPage } = productResult;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EFE6]">
      <TopBar settings={settings} />
      <Header settings={settings} />
      <Navbar items={navigationItems} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-[#77716A] mb-2 font-medium">
              <Link href="/" className="hover:text-[#24211E]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#24211E] font-bold">Catalog</span>
              {category && (
                <>
                  <span>/</span>
                  <span className="capitalize">{category}</span>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight">
                  {category
                    ? `${category.charAt(0).toUpperCase() + category.slice(1)}`
                    : brand
                    ? `${brand} Devices`
                    : search
                    ? `Results for "${search}"`
                    : "All Smartphone & Electronics Inventory"}
                </h1>
                <p className="text-xs sm:text-sm text-[#575047] mt-1">
                  Showing {products.length} of {totalCount} verified items in stock in Gorakhpur.
                </p>
              </div>

              {/* Sorting Bar */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#77716A] flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  Sort:
                </span>
                <div className="flex flex-wrap gap-1 bg-[#EDE6DC] p-1 rounded-xl border border-[#DED6CA]">
                  {[
                    { label: "Latest", value: "latest" },
                    { label: "Price: Low to High", value: "price-asc" },
                    { label: "Price: High to Low", value: "price-desc" },
                    { label: "Rating", value: "rating" },
                  ].map((s) => (
                    <Link
                      key={s.value}
                      href={`/products?${new URLSearchParams({
                        ...(category && { category }),
                        ...(brand && { brand }),
                        ...(search && { search }),
                        sort: s.value,
                      }).toString()}`}
                      className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                        sort === s.value
                          ? "bg-[#24211E] text-white font-bold"
                          : "text-[#575047] hover:text-[#24211E]"
                      }`}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Layout: Filters Sidebar + Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] p-5 space-y-6">
                <div className="flex items-center justify-between border-b border-[#DED6CA] pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#24211E] flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#E66827]" />
                    Filter Catalog
                  </span>
                  {(category || brand || search || isDeal) && (
                    <Link
                      href="/products"
                      className="text-[11px] font-bold text-red-600 hover:underline"
                    >
                      Reset All
                    </Link>
                  )}
                </div>

                {/* Categories Filter */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-[#575047] mb-2.5">
                    Categories
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li>
                      <Link
                        href="/products"
                        className={`block px-2.5 py-1.5 rounded-lg transition ${
                          !category
                            ? "bg-[#24211E] text-white font-bold"
                            : "text-[#575047] hover:bg-[#DED6CA]"
                        }`}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/products?category=${c.slug}`}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition ${
                            category === c.slug
                              ? "bg-[#24211E] text-white font-bold"
                              : "text-[#575047] hover:bg-[#DED6CA]"
                          }`}
                        >
                          <span>{c.name}</span>
                          <span className="text-[10px] opacity-70">
                            {c.itemCount ? `(${c.itemCount})` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brands Filter */}
                <div>
                  <h4 className="text-xs font-extrabold uppercase text-[#575047] mb-2.5">
                    Brands
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {brands.map((b) => (
                      <Link
                        key={b.slug}
                        href={`/products?brand=${b.name}`}
                        className={`px-2.5 py-1 rounded-lg text-xs transition border ${
                          brand?.toLowerCase() === b.name.toLowerCase()
                            ? "bg-[#24211E] text-white border-[#24211E] font-bold"
                            : "bg-[#F5EFE6] text-[#575047] border-[#DED6CA] hover:bg-[#DED6CA]"
                        }`}
                      >
                        {b.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Deals Filter */}
                <div className="pt-2 border-t border-[#DED6CA]">
                  <Link
                    href="/deals"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold hover:bg-[#3D3731] transition"
                  >
                    <span>⚡ View Discount Deals Only</span>
                    <span className="text-[10px] text-[#E66827]">Up to 60%</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3 space-y-8">
              {products.length === 0 ? (
                <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] p-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE6] flex items-center justify-center mx-auto text-[#77716A]">
                    <SlidersHorizontal className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#24211E]">
                    No devices found matching your criteria
                  </h3>
                  <p className="text-xs text-[#575047] max-w-md mx-auto">
                    Try broadening your filters or search keywords. You can also
                    visit our Gorakhpur store or contact us on WhatsApp for custom
                    device availability.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block px-6 py-2.5 rounded-xl bg-[#24211E] text-[#EDE6DC] text-xs font-bold"
                  >
                    View All Products
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <ProductCard
                      key={p._id || p.slug}
                      product={p}
                      whatsappNumber={settings.whatsappNumber}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Link
                        key={pageNum}
                        href={`/products?${new URLSearchParams({
                          ...(category && { category }),
                          ...(brand && { brand }),
                          ...(search && { search }),
                          ...(sort && { sort }),
                          page: pageNum.toString(),
                        }).toString()}`}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition border ${
                          currentPage === pageNum
                            ? "bg-[#24211E] text-white border-[#24211E]"
                            : "bg-[#EDE6DC] text-[#24211E] border-[#DED6CA] hover:bg-[#DED6CA]"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} />
    </div>
  );
}
