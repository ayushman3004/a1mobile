import mongoose, { Schema, Document } from "mongoose";

export interface IDiscountCodeDocument extends Document {
  code: string;
  discountPercentage: number;
  maxDiscountAmount?: number;
  minOrderAmount?: number;
  isActive: boolean;
  expiresAt?: Date;
}

const DiscountCodeSchema = new Schema<IDiscountCodeDocument>(
  {
    code: { type: String, required: true, uppercase: true, unique: true },
    discountPercentage: { type: Number, required: true },
    maxDiscountAmount: { type: Number },
    minOrderAmount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const DiscountCode =
  mongoose.models.DiscountCode ||
  mongoose.model<IDiscountCodeDocument>("DiscountCode", DiscountCodeSchema);

export default DiscountCode;
