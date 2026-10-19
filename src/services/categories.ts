import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Brand } from "@/models/Brand";
import { ICategory, IBrand } from "@/types";

const FALLBACK_CATEGORIES: ICategory[] = [
  {
    name: "Smartphones",
    slug: "smartphones",
    description: "Flagship 5G phones, budget champions & verified pre-owned smartphones.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    itemCount: 19,
    order: 1,
    isActive: true,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Fast chargers, certified cables, adapters and protective gear.",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
    itemCount: 8,
    order: 2,
    isActive: true,
  },
  {
    name: "Smartwatches",
    slug: "smartwatches",
    description: "AMOLED fitness trackers, calling watches and premium wearables.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    order: 3,
    isActive: true,
  },
  {
    name: "Earbuds",
    slug: "earbuds",
    description: "Active noise cancelling wireless earbuds, audio neckbands and headphones.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
    itemCount: 6,
    order: 4,
    isActive: true,
  },
  {
    name: "Tablets",
    slug: "tablets",
    description: "Large screen entertainment and productivity tablets and iPads.",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    order: 5,
    isActive: true,
  },
  {
    name: "Mobile Covers",
    slug: "mobile-covers",
    description: "Shockproof cases, leather finishes, and MagSafe protective covers.",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=600&q=80",
    itemCount: 12,
    order: 6,
    isActive: true,
  },
];

const FALLBACK_BRANDS: IBrand[] = [
  { name: "Realme", slug: "realme", isActive: true },
  { name: "Samsung", slug: "samsung", isActive: true },
  { name: "Vivo", slug: "vivo", isActive: true },
  { name: "Xiaomi", slug: "xiaomi", isActive: true },
  { name: "Lava", slug: "lava", isActive: true },
  { name: "Apple", slug: "apple", isActive: true },
  { name: "OnePlus", slug: "oneplus", isActive: true },
];

export async function getCategories(): Promise<ICategory[]> {
  try {
    await connectToDatabase();
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    if (categories && categories.length > 0) {
      return JSON.parse(JSON.stringify(categories)) as ICategory[];
    }
  } catch {
    // fallback
  }
  return FALLBACK_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  try {
    await connectToDatabase();
    const cat = await Category.findOne({ slug, isActive: true }).lean();
    if (cat) return JSON.parse(JSON.stringify(cat)) as ICategory;
  } catch {
    // fallback
  }
  return FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
}

export async function getBrands(): Promise<IBrand[]> {
  try {
    await connectToDatabase();
    const brands = await Brand.find({ isActive: true }).sort({ name: 1 }).lean();
    if (brands && brands.length > 0) {
      return JSON.parse(JSON.stringify(brands)) as IBrand[];
    }
  } catch {
    // fallback
  }
  return FALLBACK_BRANDS;
}

export async function getBrandBySlug(slug: string): Promise<IBrand | null> {
  try {
    await connectToDatabase();
    const brand = await Brand.findOne({ slug, isActive: true }).lean();
    if (brand) return JSON.parse(JSON.stringify(brand)) as IBrand;
  } catch {
    // fallback
  }
  return FALLBACK_BRANDS.find((b) => b.slug === slug) || null;
}
