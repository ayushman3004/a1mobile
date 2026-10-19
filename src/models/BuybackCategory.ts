import mongoose, { Schema, Document } from "mongoose";
import { IBuybackCategory } from "@/types";

export interface IBuybackCategoryDocument
  extends Omit<IBuybackCategory, "_id">,
    Document {}

const BuybackCategorySchema = new Schema<IBuybackCategoryDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    ctaText: { type: String, default: "Sell Now" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const BuybackCategory =
  mongoose.models.BuybackCategory ||
  mongoose.model<IBuybackCategoryDocument>(
    "BuybackCategory",
    BuybackCategorySchema
  );

export default BuybackCategory;
