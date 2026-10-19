import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "a1mobileshop",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export interface UploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload an image from a URL or file path into a specific folder with a descriptive public ID
 */
export async function uploadToCloudinary(
  source: string,
  folder: string,
  publicId?: string
): Promise<UploadResult> {
  const options: Record<string, unknown> = {
    folder: `a1-mobile/${folder}`,
    overwrite: false,
    resource_type: "image",
  };

  if (publicId) {
    options.public_id = publicId;
  }

  const result = await cloudinary.uploader.upload(source, options);
  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

/**
 * Generate a transformed Cloudinary URL with specified width, height, and crop mode
 */
export function getTransformedImageUrl(
  publicIdOrUrl: string,
  options?: { width?: number; height?: number; crop?: string; quality?: string }
): string {
  if (!publicIdOrUrl) return "/images/placeholder-device.png";

  // If already full URL and not Cloudinary publicId
  if (publicIdOrUrl.startsWith("http") && !publicIdOrUrl.includes("cloudinary.com")) {
    return publicIdOrUrl;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "a1mobileshop";
  const { width = 600, height = 600, crop = "pad", quality = "auto" } = options || {};

  // If already a Cloudinary URL, return with f_auto,q_auto transformations
  if (publicIdOrUrl.includes("res.cloudinary.com")) {
    return publicIdOrUrl;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/c_${crop},w_${width},h_${height},q_${quality},f_auto/${publicIdOrUrl}`;
}

export default cloudinary;
