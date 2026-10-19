import mongoose, { Schema, Document } from "mongoose";
import { IBuybackRequest } from "@/types";

export type IBuybackRequestDocument = IBuybackRequest;

const PickupAddressSchema = new Schema(
  {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, default: "Gorakhpur" },
    pincode: { type: String, required: true },
    landmark: { type: String },
  },
  { _id: false }
);

const BuybackRequestSchema = new Schema<IBuybackRequestDocument>(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: { type: String, index: true },
    customerName: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    email: { type: String },
    deviceCategory: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    configuration: { type: String, required: true },
    condition: {
      type: String,
      enum: ["Flawless", "Good", "Average", "Below Average"],
      required: true,
    },
    functionalIssues: [{ type: String }],
    accessoriesIncluded: [{ type: String }],
    estimatedValue: { type: Number, required: true },
    finalInspectionValue: { type: Number },
    pickupAddress: { type: PickupAddressSchema, required: true },
    pickupDate: { type: String, required: true },
    pickupTimeSlot: { type: String, required: true },
    paymentPreference: {
      type: String,
      enum: ["UPI", "Bank Transfer", "Cash on Inspection"],
      default: "UPI",
    },
    upiId: { type: String },
    bankDetails: {
      accountNumber: { type: String },
      ifsc: { type: String },
      bankName: { type: String },
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Quote Generated",
        "Pickup Scheduled",
        "Inspection Completed",
        "Offer Accepted",
        "Payment Pending",
        "Paid",
        "Cancelled",
      ],
      default: "Quote Generated",
      index: true,
    },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

export const BuybackRequest =
  mongoose.models.BuybackRequest ||
  mongoose.model<IBuybackRequestDocument>(
    "BuybackRequest",
    BuybackRequestSchema
  );

export default BuybackRequest;
