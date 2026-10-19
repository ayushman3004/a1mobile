import mongoose, { Schema, Document } from "mongoose";
import { IPromotionalBanner } from "@/types";

export interface IPromotionalBannerDocument
  extends Omit<IPromotionalBanner, "_id">,
    Document {}

const PromotionalBannerSchema = new Schema<IPromotionalBannerDocument>(
  {
    tag: { type: String, default: "LIMITED TIME MEGA SALE" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    buttonText: { type: String, default: "SHOP DEALS" },
    buttonLink: { type: String, default: "/deals" },
    imageUrl: { type: String, required: true },
    discountBadge: { type: String },
    bonusText: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const PromotionalBanner =
  mongoose.models.PromotionalBanner ||
  mongoose.model<IPromotionalBannerDocument>(
    "PromotionalBanner",
    PromotionalBannerSchema
  );

export default PromotionalBanner;
