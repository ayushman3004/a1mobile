export interface IProductImage {
  url: string;
  publicId?: string;
  alt: string;
  sourceUrl?: string;
  attribution?: string;
  isPrimary?: boolean;
}

export interface IProductVariant {
  storage: string;
  ram?: string;
  price: number;
  originalPrice: number;
  stock: number;
  sku?: string;
}

export interface IProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface IProduct {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  modelNumber?: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  currency: string;
  images: IProductImage[];
  thumbnail: string;
  colors: IProductColor[];
  variants: IProductVariant[];
  specifications: Record<string, string>;
  stock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isCurrentArrival: boolean;
  isDeal: boolean;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  warranty?: string;
  tags: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount?: number;
  isActive: boolean;
  order: number;
}

export interface IBrand {
  _id?: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  isActive: boolean;
}

export interface IStoreSettings {
  _id?: string;
  storeName: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  phone: string;
  altPhone?: string;
  email: string;
  whatsappNumber: string;
  openingHours: string;
  isOpenToday: boolean;
  googleMapsUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  storeImageUrl?: string;
  announcementText: string;
  announcementActive: boolean;
}

export interface INavigationItem {
  _id?: string;
  title: string;
  href: string;
  badge?: string;
  iconName?: string;
  order: number;
  isActive: boolean;
  isExternal?: boolean;
}

export interface ITrustBenefit {
  _id?: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  isActive: boolean;
}

export interface IPromotionalBanner {
  _id?: string;
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  discountBadge?: string;
  bonusText?: string;
  isActive: boolean;
}

export interface ITestimonial {
  _id?: string;
  customerName: string;
  city: string;
  rating: number;
  reviewText: string;
  verifiedPurchase: boolean;
  devicePurchasedOrSold?: string;
  isDemo: boolean;
  isActive: boolean;
  createdAt?: string | Date;
}

export interface IBuybackCategory {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  ctaText: string;
  isActive: boolean;
  order: number;
}

export interface IBuybackValuationRule {
  _id?: string;
  deviceCategory: string; // phone, laptop, tablet, smartwatch
  brand: string;
  model: string;
  basePrice: number;
  conditions: {
    flawless: number; // multiplier e.g. 1.0
    good: number;     // 0.85
    average: number;  // 0.70
    belowAverage: number; // 0.50
  };
  deductions: {
    screenScratched: number;
    bodyDented: number;
    batteryDegraded: number;
    cameraFaulty: number;
    boxChargerMissing: number;
  };
  isActive: boolean;
}

export interface IBuybackRequest {
  _id?: string;
  referenceNumber: string;
  userId?: string;
  customerName: string;
  phone: string;
  email?: string;
  deviceCategory: string;
  brand: string;
  model: string;
  configuration: string;
  condition: "Flawless" | "Good" | "Average" | "Below Average";
  functionalIssues: string[];
  accessoriesIncluded: string[];
  estimatedValue: number;
  finalInspectionValue?: number;
  pickupAddress: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  pickupDate: string;
  pickupTimeSlot: string;
  paymentPreference: "UPI" | "Bank Transfer" | "Cash on Inspection";
  upiId?: string;
  bankDetails?: {
    accountNumber: string;
    ifsc: string;
    bankName: string;
  };
  status:
    | "Pending"
    | "Quote Generated"
    | "Pickup Scheduled"
    | "Inspection Completed"
    | "Offer Accepted"
    | "Payment Pending"
    | "Paid"
    | "Cancelled";
  notes?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: "customer" | "admin";
  phone?: string;
  addresses?: {
    id: string;
    label: string;
    street: string;
    area: string;
    city: string;
    pincode: string;
    isDefault: boolean;
  }[];
  wishlist?: string[]; // Product IDs
  createdAt?: string | Date;
}

export interface ICartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedVariant?: string;
}

export interface IOrderItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  color?: string;
  variant?: string;
  image: string;
}

export interface IOrder {
  _id?: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  shippingAddress: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  paymentMethod: "COD" | "UPI";
  paymentStatus: "Pending" | "Paid" | "Failed";
  orderStatus:
    | "Placed"
    | "Confirmed"
    | "Processing"
    | "Shipped"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  trackingNumber?: string;
  notes?: string;
  createdAt?: string | Date;
}

export interface INewsletterSubscriber {
  _id?: string;
  email: string;
  subscribedAt: Date;
  isActive: boolean;
}
