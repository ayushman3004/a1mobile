import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency into Indian Rupees format (e.g. ₹12,999)
 */
export function formatPrice(price: number): string {
  if (typeof price !== "number" || isNaN(price)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format number into Indian comma separated string (e.g. 12,999)
 */
export function formatNumber(num: number): string {
  if (typeof num !== "number" || isNaN(num)) return "0";
  return new Intl.NumberFormat("en-IN").format(num);
}

/**
 * Convert string to URL-safe slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/**
 * Generate a unique reference number for buyback requests
 */
export function generateBuybackReference(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString().slice(-4);
  return `A1-BUY-${timestamp}-${random}`;
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const random = Math.floor(1000 + Math.random() * 9000);
  const timestamp = Date.now().toString().slice(-4);
  return `A1-ORD-${timestamp}-${random}`;
}

/**
 * Clean phone number for WhatsApp URL (e.g. remove spaces, dashes, plus)
 */
export function normalizePhoneForWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Get store default WhatsApp number
 */
export function getStoreWhatsAppNumber(customNumber?: string): string {
  return (
    customNumber ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
    "+919876543210"
  );
}

/**
 * Build WhatsApp click-to-chat URL with prefilled message
 */
export function buildWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const cleanNumber = normalizePhoneForWhatsApp(phoneNumber);
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
}

/**
 * Format Product Enquiry message for WhatsApp
 */
export function formatProductEnquiryMessage(product: {
  name: string;
  price: number;
  variant?: string;
  color?: string;
  slug?: string;
}): string {
  const lines = [
    `👋 *Hello A1 Mobile Shop Gorakhpur!*`,
    `I am interested in inquiring about this product:`,
    ``,
    `📱 *Product:* ${product.name}`,
    product.variant ? `💾 *Variant:* ${product.variant}` : null,
    product.color ? `🎨 *Color:* ${product.color}` : null,
    `💰 *Price:* ${formatPrice(product.price)}`,
    product.slug ? `🔗 *Product URL:* ${process.env.NEXT_PUBLIC_SITE_URL || "https://a1mobileshop.com"}/products/${product.slug}` : null,
    ``,
    `Is this device in stock at your Basharatpur, Gorakhpur store? What is the best price / exchange offer available today?`,
  ].filter(Boolean);

  return lines.join("\n");
}

/**
 * Format Order Confirmation message for WhatsApp
 */
export function formatOrderPlacedWhatsAppMessage(order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: Array<{
    name: string;
    variant?: string;
    color?: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  notes?: string;
}): string {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}*${item.variant ? ` (${item.variant})` : ""}${item.color ? ` [${item.color}]` : ""} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");

  const address = `${order.shippingAddress.street}, ${order.shippingAddress.area}, ${order.shippingAddress.city} - ${order.shippingAddress.pincode}${order.shippingAddress.landmark ? ` (Landmark: ${order.shippingAddress.landmark})` : ""}`;

  const lines = [
    `🛍️ *NEW ORDER PLACED - A1 MOBILE SHOP GORAKHPUR*`,
    ``,
    `*Order ID:* ${order.orderNumber}`,
    `*Customer Name:* ${order.customerName}`,
    `*Phone Number:* ${order.customerPhone}`,
    ``,
    `📦 *Items in Order:*`,
    itemsText,
    ``,
    `💰 *Bill Breakdown:*`,
    `• Subtotal: ${formatPrice(order.subtotal)}`,
    `• Gorakhpur Delivery: ${order.deliveryCharge === 0 ? "FREE" : formatPrice(order.deliveryCharge)}`,
    `• *Total Payable:* ${formatPrice(order.total)}`,
    `• *Payment Mode:* ${order.paymentMethod === "COD" ? "Cash on Delivery" : "UPI Online"}`,
    ``,
    `📍 *Delivery Address:*`,
    address,
    order.notes ? `📝 *Special Instructions:* ${order.notes}` : null,
    ``,
    `Hello A1 Mobile Shop team! I have placed this order on your website. Please verify and dispatch my order. Thank you!`,
  ].filter(Boolean);

  return lines.join("\n");
}

/**
 * Format Sell Old Phone / Buyback message for WhatsApp
 */
export function formatBuybackWhatsAppMessage(request: {
  referenceNumber: string;
  customerName: string;
  phone: string;
  deviceCategory: string;
  brand: string;
  model: string;
  configuration?: string;
  condition: string;
  functionalIssues?: string[];
  accessoriesIncluded?: string[];
  estimatedValue: number;
  pickupDate: string;
  pickupTimeSlot: string;
  pickupAddress: {
    street: string;
    area: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  paymentPreference: string;
  upiId?: string;
}): string {
  const address = `${request.pickupAddress.street}, ${request.pickupAddress.area}, ${request.pickupAddress.city} - ${request.pickupAddress.pincode}${request.pickupAddress.landmark ? ` (Landmark: ${request.pickupAddress.landmark})` : ""}`;

  const lines = [
    `🔄 *SELL OLD DEVICE / BUYBACK REQUEST - A1 MOBILE SHOP GORAKHPUR*`,
    ``,
    `*Booking Reference:* ${request.referenceNumber}`,
    `*Customer Name:* ${request.customerName}`,
    `*WhatsApp / Mobile:* ${request.phone}`,
    ``,
    `📱 *Device Assessment Details:*`,
    `• Category: ${request.deviceCategory.toUpperCase()}`,
    `• Model: *${request.brand} ${request.model}* ${request.configuration ? `(${request.configuration})` : ""}`,
    `• Overall Condition: ${request.condition}`,
    request.accessoriesIncluded && request.accessoriesIncluded.length > 0
      ? `• Accessories Included: ${request.accessoriesIncluded.join(", ")}`
      : null,
    request.functionalIssues && request.functionalIssues.length > 0
      ? `• Issues Reported: ${request.functionalIssues.join(", ")}`
      : `• Issues Reported: None (100% Functional)`,
    ``,
    `💵 *Estimated Buyback Quote:* *${formatPrice(request.estimatedValue)}*`,
    `• Payout Mode: ${request.paymentPreference}${request.upiId ? ` (${request.upiId})` : ""}`,
    ``,
    `🗓️ *Doorstep Pickup Schedule:*`,
    `• Date: ${request.pickupDate}`,
    `• Time Slot: ${request.pickupTimeSlot}`,
    `• Pickup Address: ${address}`,
    ``,
    `Hello A1 Mobile Shop team! I have submitted this old device buyback request. Please confirm my doorstep inspection and pickup.`,
  ].filter(Boolean);

  return lines.join("\n");
}

