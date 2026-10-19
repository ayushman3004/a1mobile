import fs from "fs";
import path from "path";

async function validateImages() {
  console.log("🔍 Validating image manifest entries...");
  const manifestPath = path.join(process.cwd(), "scripts", "image-manifest.json");

  if (!fs.existsSync(manifestPath)) {
    console.error("❌ Manifest file scripts/image-manifest.json does not exist!");
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  let validCount = 0;
  let totalCount = 0;

  for (const [section, items] of Object.entries(manifest)) {
    if (Array.isArray(items)) {
      for (const item of items) {
        totalCount++;
        if (item.url && item.url.startsWith("https://") && item.publicId) {
          validCount++;
        } else {
          console.warn(`⚠️ Invalid entry in ${section}: ${JSON.stringify(item)}`);
        }
      }
    } else if (typeof items === "object" && items !== null) {
      for (const [subKey, item] of Object.entries(items as Record<string, any>)) {
        totalCount++;
        if (item.url && item.url.startsWith("https://")) {
          validCount++;
        } else {
          console.warn(`⚠️ Invalid entry in ${section}.${subKey}`);
        }
      }
    }
  }

  console.log(`✅ Image Manifest Validation Complete: ${validCount}/${totalCount} items verified.`);
}

validateImages().catch((err) => {
  console.error("Validation error:", err);
  process.exit(1);
});
