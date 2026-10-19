import mongoose, { Schema, Document } from "mongoose";
import { ITrustBenefit } from "@/types";

export interface ITrustBenefitDocument
  extends Omit<ITrustBenefit, "_id">,
    Document {}

const TrustBenefitSchema = new Schema<ITrustBenefitDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconName: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const TrustBenefit =
  mongoose.models.TrustBenefit ||
  mongoose.model<ITrustBenefitDocument>("TrustBenefit", TrustBenefitSchema);

export default TrustBenefit;
