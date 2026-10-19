import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/types";

export interface IUserDocument extends Omit<IUser, "_id">, Document {}

const AddressSchema = new Schema(
  {
    id: { type: String, required: true },
    label: { type: String, default: "Home" },
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, default: "Gorakhpur" },
    pincode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    phone: { type: String },
    addresses: [AddressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);

export default User;
