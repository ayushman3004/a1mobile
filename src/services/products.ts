import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { IProduct } from "@/types";

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

export async function getProducts(params: ProductFilterParams = {}) {
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

  return {
    products: JSON.parse(JSON.stringify(products)) as IProduct[],
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await connectToDatabase();
  const product = await Product.findOne({ slug, isActive: true }).lean();
  if (!product) return null;
  return JSON.parse(JSON.stringify(product)) as IProduct;
}

export async function getFeaturedProducts(limit = 8): Promise<IProduct[]> {
  await connectToDatabase();
  const products = await Product.find({ isActive: true, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products)) as IProduct[];
}

export async function getNewArrivals(limit = 6): Promise<IProduct[]> {
  await connectToDatabase();
  const products = await Product.find({ isActive: true, isNewArrival: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products)) as IProduct[];
}

export async function getCurrentArrivals(limit = 6): Promise<IProduct[]> {
  await connectToDatabase();
  const products = await Product.find({ isActive: true, isCurrentArrival: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products)) as IProduct[];
}

export async function getBestDeals(limit = 8): Promise<IProduct[]> {
  await connectToDatabase();
  const products = await Product.find({ isActive: true, isDeal: true })
    .sort({ discountPercentage: -1, createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products)) as IProduct[];
}

export async function getRelatedProducts(
  category: string,
  excludeId: string,
  limit = 4
): Promise<IProduct[]> {
  await connectToDatabase();
  const products = await Product.find({
    isActive: true,
    category,
    _id: { $ne: excludeId },
  })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products)) as IProduct[];
}
