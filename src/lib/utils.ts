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
