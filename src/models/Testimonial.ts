import mongoose, { Schema, Document } from "mongoose";
import { ITestimonial } from "@/types";

export interface ITestimonialDocument
  extends Omit<ITestimonial, "_id">,
    Document {}

const TestimonialSchema = new Schema<ITestimonialDocument>(
  {
    customerName: { type: String, required: true },
    city: { type: String, default: "Gorakhpur" },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    verifiedPurchase: { type: Boolean, default: true },
    devicePurchasedOrSold: { type: String },
    isDemo: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model<ITestimonialDocument>("Testimonial", TestimonialSchema);

export default Testimonial;
