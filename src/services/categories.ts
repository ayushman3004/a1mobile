import { connectToDatabase } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Brand } from "@/models/Brand";
import { ICategory, IBrand } from "@/types";

export async function getCategories(): Promise<ICategory[]> {
  await connectToDatabase();
  const categories = await Category.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(categories)) as ICategory[];
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await connectToDatabase();
  const cat = await Category.findOne({ slug, isActive: true }).lean();
  if (!cat) return null;
  return JSON.parse(JSON.stringify(cat)) as ICategory;
}

export async function getBrands(): Promise<IBrand[]> {
  await connectToDatabase();
  const brands = await Brand.find({ isActive: true }).sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(brands)) as IBrand[];
}

export async function getBrandBySlug(slug: string): Promise<IBrand | null> {
  await connectToDatabase();
  const brand = await Brand.findOne({ slug, isActive: true }).lean();
  if (!brand) return null;
  return JSON.parse(JSON.stringify(brand)) as IBrand;
}
