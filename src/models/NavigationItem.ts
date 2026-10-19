import mongoose, { Schema, Document } from "mongoose";
import { INavigationItem } from "@/types";

export interface INavigationItemDocument
  extends Omit<INavigationItem, "_id">,
    Document {}

const NavigationItemSchema = new Schema<INavigationItemDocument>(
  {
    title: { type: String, required: true },
    href: { type: String, required: true },
    badge: { type: String },
    iconName: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isExternal: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const NavigationItem =
  mongoose.models.NavigationItem ||
  mongoose.model<INavigationItemDocument>(
    "NavigationItem",
    NavigationItemSchema
  );

export default NavigationItem;
