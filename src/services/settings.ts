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

const FALLBACK_SETTINGS: IStoreSettings = {
  storeName: "A1 Mobile Shop",
  tagline: "Gorakhpur's Most Trusted Mobile Store",
  address: "Aluminium Factory Road, Basharatpur",
  city: "Gorakhpur",
  state: "Uttar Pradesh",
  pincode: "273004",
  landmark: "Aluminium Factory Road",
  phone: "+91 87269 42338",
  altPhone: "+91 87269 42338",
  email: "Jaikishanhome1998@gmail.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+918726942338",
  openingHours: "Mon - Sun: 10:00 AM - 09:30 PM",
  isOpenToday: true,
  googleMapsUrl:
    "https://maps.google.com/?q=Aluminium+Factory+Road,+Basharatpur,+Gorakhpur,+Uttar+Pradesh+273004",
  instagramHandle: "@a1mobileshop26",
  instagramUrl: "https://instagram.com/a1mobileshop26",
  storeImageUrl: "/store.jpg",
  announcementText:
    "Special Offers Available | Free Delivery on Selected Orders across Gorakhpur",
  announcementActive: true,
};

const FALLBACK_NAV_ITEMS: INavigationItem[] = [
  { title: "Home", href: "/", order: 1, isActive: true },
  { title: "Smartphones", href: "/products?category=smartphones", order: 2, isActive: true },
  { title: "Best Deals", href: "/deals", order: 3, isActive: true },
  { title: "Sell Old Phone", href: "/sell-old-device", order: 4, isActive: true },
  { title: "Accessories", href: "/products?category=accessories", order: 5, isActive: true },
];

const FALLBACK_TRUST_BENEFITS: ITrustBenefit[] = [
  {
    title: "100% Genuine Devices",
    description: "Official brand sealed stock with genuine Indian tax invoice & manufacturer warranty.",
    iconName: "ShieldCheck",
    order: 1,
    isActive: true,
  },
  {
    title: "Instant Buyback Cash",
    description: "Doorstep inspection across Gorakhpur with instant UPI/Cash transfer for your old phone.",
    iconName: "RotateCcw",
    order: 2,
    isActive: true,
  },
  {
    title: "Same Day Dispatch",
    description: "Same-day doorstep delivery with tamper-proof packaging across Gorakhpur.",
    iconName: "Truck",
    order: 3,
    isActive: true,
  },
  {
    title: "Best Price Guarantee",
    description: "Matchless festive discounts, exchange bonuses & zero-cost EMI options.",
    iconName: "BadgePercent",
    order: 4,
    isActive: true,
  },
];

const FALLBACK_TESTIMONIALS: ITestimonial[] = [
  {
    customerName: "Aditya Verma",
    city: "Basharatpur, Gorakhpur",
    rating: 5,
    reviewText: "Bought my Realme 16 from A1 Mobile. Got genuine brand sealed piece with immediate delivery in 2 hours! Best prices in Gorakhpur.",
    verifiedPurchase: true,
    devicePurchasedOrSold: "Realme 16 5G",
    isDemo: true,
    createdAt: new Date().toISOString(),
    isActive: true,
  },
  {
    customerName: "Pooja Srivastava",
    city: "Medical College Road, Gorakhpur",
    rating: 5,
    reviewText: "Sold my old phone via their doorstep buyback. Executive came on time, tested the phone, and sent payment via Google Pay within 10 minutes.",
    verifiedPurchase: true,
    devicePurchasedOrSold: "Realme C85 5G",
    isDemo: true,
    createdAt: new Date().toISOString(),
    isActive: true,
  },
];

export async function getStoreSettings(): Promise<IStoreSettings> {
  try {
    await connectToDatabase();
    let settings = await StoreSettings.findOne().lean();
    if (!settings) {
      const created = await StoreSettings.create(FALLBACK_SETTINGS);
      settings = created.toObject();
    }
    return JSON.parse(JSON.stringify(settings)) as IStoreSettings;
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getNavigationItems(): Promise<INavigationItem[]> {
  try {
    await connectToDatabase();
    const items = await NavigationItem.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    if (items && items.length > 0) {
      return JSON.parse(JSON.stringify(items)) as INavigationItem[];
    }
  } catch {
    // fallback
  }
  return FALLBACK_NAV_ITEMS;
}

export async function getTrustBenefits(): Promise<ITrustBenefit[]> {
  try {
    await connectToDatabase();
    const benefits = await TrustBenefit.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    if (benefits && benefits.length > 0) {
      return JSON.parse(JSON.stringify(benefits)) as ITrustBenefit[];
    }
  } catch {
    // fallback
  }
  return FALLBACK_TRUST_BENEFITS;
}

export async function getPromotionalBanner(): Promise<IPromotionalBanner | null> {
  try {
    await connectToDatabase();
    const banner = await PromotionalBanner.findOne({ isActive: true }).lean();
    if (banner) return JSON.parse(JSON.stringify(banner)) as IPromotionalBanner;
  } catch {
    // fallback
  }
  return {
    tag: "Gorakhpur Mega Festival",
    title: "Gorakhpur Mega Smartphone Festival",
    description: "Up to 25% Off on Realme 16, Samsung Galaxy & Lava Devices",
    buttonText: "Shop Flagship Deals",
    buttonLink: "/deals",
    discountBadge: "Save up to 25%",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80",
    isActive: true,
  };
}

export async function getTestimonials(): Promise<ITestimonial[]> {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
    if (testimonials && testimonials.length > 0) {
      return JSON.parse(JSON.stringify(testimonials)) as ITestimonial[];
    }
  } catch {
    // fallback
  }
  return FALLBACK_TESTIMONIALS;
}
