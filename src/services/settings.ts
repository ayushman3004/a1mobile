import { connectToDatabase } from "@/lib/mongodb";
import { StoreSettings } from "@/models/StoreSettings";
import { NavigationItem } from "@/models/NavigationItem";
import { TrustBenefit } from "@/models/TrustBenefit";
import { PromotionalBanner } from "@/models/PromotionalBanner";
import { Testimonial } from "@/models/Testimonial";
import {
  IStoreSettings,
  INavigationItem,
  ITrustBenefit,
  IPromotionalBanner,
  ITestimonial,
} from "@/types";

export async function getStoreSettings(): Promise<IStoreSettings> {
  await connectToDatabase();
  let settings = await StoreSettings.findOne().lean();
  if (!settings) {
    // If not seeded yet, create default
    const created = await StoreSettings.create({
      storeName: "A1 Mobile Shop",
      tagline: "Gorakhpur's Most Trusted Mobile Store",
      address: "Near Basharatpur Chauraha, Medical Road, Basharatpur",
      city: "Gorakhpur",
      state: "Uttar Pradesh",
      pincode: "273004",
      landmark: "Opposite City Hospital",
      phone: "+91 98765 43210",
      altPhone: "+91 91234 56789",
      email: "contact@a1mobileshop.com",
      whatsappNumber: "+919876543210",
      openingHours: "Mon - Sun: 10:00 AM - 09:30 PM",
      isOpenToday: true,
      googleMapsUrl:
        "https://maps.google.com/?q=Basharatpur,Gorakhpur,Uttar+Pradesh+273004",
      instagramHandle: "@a1mobileshop26",
      instagramUrl: "https://instagram.com/a1mobileshop26",
      announcementText:
        "Special Offers Available | Free Delivery on Selected Orders",
      announcementActive: true,
    });
    settings = created.toObject();
  }
  return JSON.parse(JSON.stringify(settings)) as IStoreSettings;
}

export async function getNavigationItems(): Promise<INavigationItem[]> {
  await connectToDatabase();
  const items = await NavigationItem.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(items)) as INavigationItem[];
}

export async function getTrustBenefits(): Promise<ITrustBenefit[]> {
  await connectToDatabase();
  const benefits = await TrustBenefit.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(benefits)) as ITrustBenefit[];
}

export async function getPromotionalBanner(): Promise<IPromotionalBanner | null> {
  await connectToDatabase();
  const banner = await PromotionalBanner.findOne({ isActive: true }).lean();
  if (!banner) return null;
  return JSON.parse(JSON.stringify(banner)) as IPromotionalBanner;
}

export async function getTestimonials(): Promise<ITestimonial[]> {
  await connectToDatabase();
  const testimonials = await Testimonial.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();
  return JSON.parse(JSON.stringify(testimonials)) as ITestimonial[];
}
