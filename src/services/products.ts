import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { IProduct } from "@/types";
import { FALLBACK_PRODUCTS } from "@/lib/fallbackProducts";

export interface ProductFilterParams {
  category?: string;
  brand?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isDeal?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  sort?: "price-asc" | "price-desc" | "rating" | "latest";
  page?: number;
  limit?: number;
}

function filterFallbackProducts(params: ProductFilterParams = {}) {
  let list = [...FALLBACK_PRODUCTS];

  if (params.category) {
    list = list.filter(
      (p) => p.category.toLowerCase() === params.category!.toLowerCase()
    );
  }
  if (params.brand) {
    list = list.filter(
      (p) => p.brand.toLowerCase() === params.brand!.toLowerCase()
    );
  }
  if (params.isDeal) {
    list = list.filter((p) => p.isDeal);
  }
  if (params.isFeatured) {
    list = list.filter((p) => p.isFeatured);
  }
  if (params.isNewArrival) {
    list = list.filter((p) => p.isNewArrival);
  }
  if (params.minPrice !== undefined) {
    list = list.filter((p) => p.price >= params.minPrice!);
  }
  if (params.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= params.maxPrice!);
  }
  if (params.search && params.search.trim()) {
    const s = params.search.trim().toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.tags.some((t) => t.toLowerCase().includes(s))
    );
  }

  if (params.sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (params.sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (params.sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  }

  const page = params.page || 1;
  const limit = params.limit || 20;
  const totalCount = list.length;
  const skip = (page - 1) * limit;
  const paginated = list.slice(skip, skip + limit);

  return {
    products: paginated,
    totalCount,
    totalPages: Math.ceil(totalCount / limit) || 1,
    currentPage: page,
  };
}

export async function getProducts(params: ProductFilterParams = {}) {
  try {
    await connectToDatabase();

    const {
      category,
      brand,
      search,
      minPrice,
      maxPrice,
      isDeal,
      isFeatured,
      isNewArrival,
      sort = "latest",
      page = 1,
      limit = 20,
    } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { isActive: true };

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (brand) {
      query.brand = { $regex: new RegExp(`^${brand}$`, "i") };
    }

    if (isDeal) {
      query.isDeal = true;
    }

    if (isFeatured) {
      query.isFeatured = true;
    }

    if (isNewArrival) {
      query.isNewArrival = true;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined) query.price.$gte = minPrice;
      if (maxPrice !== undefined) query.price.$lte = maxPrice;
    }

    if (search && search.trim()) {
      const s = search.trim();
      query.$or = [
        { name: { $regex: s, $options: "i" } },
        { brand: { $regex: s, $options: "i" } },
        { category: { $regex: s, $options: "i" } },
        { tags: { $in: [new RegExp(s, "i")] } },
      ];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let sortOption: Record<string, any> = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Product.countDocuments(query),
    ]);

    if (!products || products.length === 0) {
      return filterFallbackProducts(params);
    }

    return {
      products: JSON.parse(JSON.stringify(products)) as IProduct[],
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  } catch {
    return filterFallbackProducts(params);
  }
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug, isActive: true }).lean();
    if (product) {
      return JSON.parse(JSON.stringify(product)) as IProduct;
    }
  } catch {
    // fallback
  }

  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  const match = FALLBACK_PRODUCTS.find(
    (p) =>
      p.slug === slug ||
      p.id === slug ||
      p._id === slug ||
      p.slug.replace(/-5g$/, "") === slug ||
      p.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === normalizedSlug
  );
  return match ? JSON.parse(JSON.stringify(match)) : null;
}

export async function getFeaturedProducts(limit = 8): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({ isActive: true, isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    if (products && products.length > 0) {
      return JSON.parse(JSON.stringify(products)) as IProduct[];
    }
  } catch {
    // fallback
  }

  const featured = FALLBACK_PRODUCTS.filter((p) => p.isFeatured).slice(0, limit);
  return JSON.parse(JSON.stringify(featured));
}

export async function getNewArrivals(limit = 6): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({ isActive: true, isNewArrival: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    if (products && products.length > 0) {
      return JSON.parse(JSON.stringify(products)) as IProduct[];
    }
  } catch {
    // fallback
  }

  const arrivals = FALLBACK_PRODUCTS.filter((p) => p.isNewArrival).slice(0, limit);
  return JSON.parse(JSON.stringify(arrivals));
}

export async function getCurrentArrivals(limit = 6): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({ isActive: true, isCurrentArrival: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    if (products && products.length > 0) {
      return JSON.parse(JSON.stringify(products)) as IProduct[];
    }
  } catch {
    // fallback
  }

  const current = FALLBACK_PRODUCTS.filter((p) => p.isCurrentArrival).slice(0, limit);
  return JSON.parse(JSON.stringify(current));
}

export async function getBestDeals(limit = 8): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({ isActive: true, isDeal: true })
      .sort({ discountPercentage: -1, createdAt: -1 })
      .limit(limit)
      .lean();
    if (products && products.length > 0) {
      return JSON.parse(JSON.stringify(products)) as IProduct[];
    }
  } catch {
    // fallback
  }

  const deals = FALLBACK_PRODUCTS.filter((p) => p.isDeal).slice(0, limit);
  return JSON.parse(JSON.stringify(deals));
}

export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit = 4
): Promise<IProduct[]> {
  try {
    await connectToDatabase();
    const products = await Product.find({
      isActive: true,
      category,
      _id: { $ne: excludeId },
    })
      .limit(limit)
      .lean();
    if (products && products.length > 0) {
      return JSON.parse(JSON.stringify(products)) as IProduct[];
    }
  } catch {
    // fallback
  }

  const related = FALLBACK_PRODUCTS.filter(
    (p) =>
      p.category === category &&
      p._id !== excludeId &&
      p.id !== excludeId &&
      p.slug !== excludeId
  ).slice(0, limit);

  return JSON.parse(JSON.stringify(related));
}
