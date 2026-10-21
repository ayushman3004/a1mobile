import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

// POST: returns a signed upload signature so the browser can upload directly to Cloudinary
export async function POST() {
  try {
    await requireAdmin();

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "a1-mobile/products";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET || ""
    );

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 403 }
    );
  }
}
