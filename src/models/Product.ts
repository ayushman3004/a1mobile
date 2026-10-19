import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "@/types";

export interface IProductDocument extends Omit<IProduct, "_id">, Document {}

const ProductImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String },
    alt: { type: String, required: true },
    sourceUrl: { type: String },
    attribution: { type: String },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductVariantSchema = new Schema(
  {
    storage: { type: String, required: true },
    ram: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    stock: { type: Number, default: 10 },
    sku: { type: String },
  },
  { _id: false }
);

const ProductColorSchema = new Schema(
  {
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    brand: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    modelNumber: { type: String },
    description: { type: String, required: true },
    shortDescription: { type: String },
    price: { type: Number, required: true, index: true },
    originalPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    images: [ProductImageSchema],
    thumbnail: { type: String, required: true },
    colors: [ProductColorSchema],
    variants: [ProductVariantSchema],
    specifications: { type: Map, of: String, default: {} },
    stock: { type: Number, default: 10, min: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    isNewArrival: { type: Boolean, default: false, index: true },
    isCurrentArrival: { type: Boolean, default: false, index: true },
    isDeal: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    warranty: { type: String, default: "1 Year Official Brand Warranty" },
    tags: [{ type: String, index: true }],
  },
  {
    timestamps: true,
  }
);

// Text search index for product name, brand, category, tags
ProductSchema.index({
  name: "text",
  brand: "text",
  category: "text",
  tags: "text",
  description: "text",
});

export const Product =
  mongoose.models.Product ||
  mongoose.model<IProductDocument>("Product", ProductSchema);

export default Product;
