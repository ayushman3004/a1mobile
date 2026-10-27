import mongoose, { Schema, Document } from "mongoose";
import { IStoreSettings } from "@/types";

export interface IStoreSettingsDocument
  extends Omit<IStoreSettings, "_id">,
    Document {}

const StoreSettingsSchema = new Schema<IStoreSettingsDocument>(
  {
    storeName: { type: String, default: "A1 Mobile Shop" },
    tagline: {
      type: String,
      default: "Gorakhpur's Most Trusted Mobile Store",
    },
    address: {
      type: String,
      default: "Aluminium Factory Road, Basharatpur",
    },
    city: { type: String, default: "Gorakhpur" },
    state: { type: String, default: "Uttar Pradesh" },
    pincode: { type: String, default: "273004" },
    landmark: { type: String, default: "Aluminium Factory Road" },
    phone: { type: String, default: "+91 87269 42338" },
    altPhone: { type: String, default: "+91 87269 42338" },
    email: { type: String, default: "Jaikishanhome1998@gmail.com" },
    whatsappNumber: { type: String, default: "+918726942338" },
    openingHours: {
      type: String,
      default: "Mon - Sun: 10:00 AM - 09:30 PM",
    },
    isOpenToday: { type: Boolean, default: true },
    googleMapsUrl: {
      type: String,
      default:
        "https://www.google.com/maps/place/26%C2%B046'32.2%22N+83%C2%B022'19.0%22E/@26.77561,83.3719368,17z",
    },
    instagramHandle: { type: String, default: "@a1mobileshop26" },
    instagramUrl: {
      type: String,
      default: "https://instagram.com/a1mobileshop26",
    },
    storeImageUrl: { type: String, default: "/shop-front.png" },
    announcementText: {
      type: String,
      default:
        "Special Offers Available | Free Delivery on Selected Orders",
    },
    announcementActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const StoreSettings =
  mongoose.models.StoreSettings ||
  mongoose.model<IStoreSettingsDocument>("StoreSettings", StoreSettingsSchema);

export default StoreSettings;
