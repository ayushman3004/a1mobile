import mongoose, { Schema, Document } from "mongoose";
import { IBrand } from "@/types";

export interface IBrandDocument extends Omit<IBrand, "_id">, Document {}

const BrandSchema = new Schema<IBrandDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const Brand =
  mongoose.models.Brand ||
  mongoose.model<IBrandDocument>("Brand", BrandSchema);

export default Brand;
