import mongoose, { Schema, Document } from "mongoose";
import { IBuybackValuationRule } from "@/types";

export type IBuybackValuationRuleDocument = IBuybackValuationRule;

const BuybackValuationRuleSchema = new Schema<IBuybackValuationRuleDocument>(
  {
    deviceCategory: { type: String, required: true, index: true },
    brand: { type: String, required: true, index: true },
    model: { type: String, required: true, index: true },
    basePrice: { type: Number, required: true },
    conditions: {
      flawless: { type: Number, default: 1.0 },
      good: { type: Number, default: 0.85 },
      average: { type: Number, default: 0.7 },
      belowAverage: { type: Number, default: 0.5 },
    },
    deductions: {
      screenScratched: { type: Number, default: 1500 },
      bodyDented: { type: Number, default: 1000 },
      batteryDegraded: { type: Number, default: 1200 },
      cameraFaulty: { type: Number, default: 2000 },
      boxChargerMissing: { type: Number, default: 500 },
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

BuybackValuationRuleSchema.index(
  { deviceCategory: 1, brand: 1, model: 1 },
  { unique: true }
);

export const BuybackValuationRule =
  mongoose.models.BuybackValuationRule ||
  mongoose.model<IBuybackValuationRuleDocument>(
    "BuybackValuationRule",
    BuybackValuationRuleSchema
  );

export default BuybackValuationRule;
