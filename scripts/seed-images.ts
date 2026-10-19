import fs from "fs";
import path from "path";
import { uploadToCloudinary } from "../src/lib/cloudinary";

// Load .env.local if present
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key] && val) {
        process.env[key] = val;
      }
    }
  }
}

async function seedImages() {
  console.log("🚀 Starting Cloudinary Image Seed Pipeline...");

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

  if (!apiKey || !apiSecret || !cloudName) {
    console.log("ℹ️ CLOUDINARY_API_KEY or CLOUDINARY_API_SECRET is not configured in .env.local.");
    console.log("   Manifest contains verified high-resolution CDN images that will be referenced directly in MongoDB.");
    console.log("   To upload these directly to your own Cloudinary bucket, add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local and re-run npm run seed:images.");
    return;
  }

  const manifestPath = path.join(process.cwd(), "scripts", "image-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  let uploaded = 0;
  let failed = 0;

  for (const [section, items] of Object.entries(manifest)) {
    if (Array.isArray(items)) {
      for (const item of items) {
        try {
          console.log(`Uploading [${section}] ${item.model || item.name} -> ${item.publicId}`);
          await uploadToCloudinary(item.url, item.folder || `categories`, item.publicId.split("/").pop());
          uploaded++;
        } catch (err: any) {
          console.warn(`Upload failed for ${item.publicId}: ${err.message}`);
          failed++;
        }
      }
    }
  }

  console.log(`✨ Cloudinary Upload Report: ${uploaded} uploaded, ${failed} failed.`);
}

seedImages().catch((err) => {
  console.error("Cloudinary seed error:", err);
});
