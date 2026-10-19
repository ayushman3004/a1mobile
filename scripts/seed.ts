import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// Import models
import { Product } from "../src/models/Product";
import { Category } from "../src/models/Category";
import { Brand } from "../src/models/Brand";
import { StoreSettings } from "../src/models/StoreSettings";
import { NavigationItem } from "../src/models/NavigationItem";
import { TrustBenefit } from "../src/models/TrustBenefit";
import { PromotionalBanner } from "../src/models/PromotionalBanner";
import { Testimonial } from "../src/models/Testimonial";
import { BuybackCategory } from "../src/models/BuybackCategory";
import { BuybackValuationRule } from "../src/models/BuybackValuationRule";
import { User } from "../src/models/User";
import { DiscountCode } from "../src/models/DiscountCode";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/a1_mobile_shop";

async function runSeed() {
  console.log("==================================================");
  console.log("🌱 STARTING A1 MOBILE SHOP DATABASE SEED SCRIPT");
  console.log("==================================================");
  console.log(`Connecting to: ${MONGODB_URI}`);

  await mongoose.connect(MONGODB_URI);
  console.log(" Connected to MongoDB successfully.");

  const manifestPath = path.join(__dirname, "image-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  // 1. Categories
  console.log("\n📦 Seeding Categories...");
  const categoriesData = [
    {
      name: "Smartphones",
      slug: "smartphones",
      description: "Flagship 5G phones, budget champions & verified pre-owned smartphones.",
      image: manifest.categories[0].url,
      itemCount: 6,
      order: 1,
      isActive: true,
    },
    {
      name: "Accessories",
      slug: "accessories",
      description: "Fast chargers, certified cables, adapters and protective gear.",
      image: manifest.categories[1].url,
      itemCount: 2,
      order: 2,
      isActive: true,
    },
    {
      name: "Smartwatches",
      slug: "smartwatches",
      description: "AMOLED fitness trackers, calling watches and premium wearables.",
      image: manifest.categories[2].url,
      itemCount: 2,
      order: 3,
      isActive: true,
    },
    {
      name: "Earbuds",
      slug: "earbuds",
      description: "Active noise cancelling wireless earbuds, audio neckbands and headphones.",
      image: manifest.categories[3].url,
      itemCount: 2,
      order: 4,
      isActive: true,
    },
    {
      name: "Tablets",
      slug: "tablets",
      description: "Large screen entertainment and productivity tablets and iPads.",
      image: manifest.categories[4].url,
      itemCount: 2,
      order: 5,
      isActive: true,
    },
    {
      name: "Mobile Covers",
      slug: "mobile-covers",
      description: "Shockproof cases, leather finishes, and MagSafe protective covers.",
      image: manifest.categories[5].url,
      itemCount: 1,
      order: 6,
      isActive: true,
    },
  ];

  for (const cat of categoriesData) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✅ Seeded ${categoriesData.length} categories.`);

  // 2. Brands
  console.log("\n🏷️ Seeding Brands...");
  const brandsData = [
    { name: "Xiaomi", slug: "xiaomi", isActive: true },
    { name: "Vivo", slug: "vivo", isActive: true },
    { name: "Samsung", slug: "samsung", isActive: true },
    { name: "Apple", slug: "apple", isActive: true },
    { name: "OnePlus", slug: "oneplus", isActive: true },
    { name: "boAt", slug: "boat", isActive: true },
    { name: "Noise", slug: "noise", isActive: true },
    { name: "Spigen", slug: "spigen", isActive: true },
  ];

  for (const b of brandsData) {
    await Brand.findOneAndUpdate({ slug: b.slug }, b, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✅ Seeded ${brandsData.length} brands.`);

  // 3. Products
  console.log("\n📱 Seeding Products (with exact models & verified images)...");
  const productsData = [
    {
      name: "Redmi 15A 5G",
      slug: "redmi-15a-5g",
      brand: "Xiaomi",
      category: "smartphones",
      modelNumber: "24129RN28I",
      description:
        "The Redmi 15A 5G delivers stunning speed with next-generation 5G connectivity, an ultra-smooth 120Hz display, and an enduring 5000mAh battery built for all-day performance. Equipped with AI dual camera optics for crisp low-light photos.",
      shortDescription: "Ultra-fast 5G with 120Hz display & 5000mAh battery.",
      price: 12999,
      originalPrice: 16999,
      discountPercentage: 24,
      currency: "INR",
      thumbnail: manifest.smartphones[0].url,
      images: [
        {
          url: manifest.smartphones[0].url,
          publicId: manifest.smartphones[0].publicId,
          alt: "Redmi 15A 5G Skyline Blue front and back",
          sourceUrl: manifest.smartphones[0].sourceUrl,
          attribution: manifest.smartphones[0].attribution,
          isPrimary: true,
        },
      ],
      colors: [
        { name: "Skyline Blue", hex: "#4A90E2" },
        { name: "Midnight Black", hex: "#1C1C1E" },
      ],
      variants: [
        {
          storage: "128GB",
          ram: "6GB",
          price: 12999,
          originalPrice: 16999,
          stock: 25,
        },
        {
          storage: "256GB",
          ram: "8GB",
          price: 14999,
          originalPrice: 18999,
          stock: 18,
        },
      ],
      specifications: {
        Processor: "MediaTek Dimensity 6100+ 5G",
        Display: "6.79-inch FHD+ 120Hz AdaptiveSync",
        "Rear Camera": "50MP AI Main + 2MP Depth",
        "Front Camera": "8MP Selfie",
        Battery: "5000mAh with 18W Fast Charging",
        OS: "Xiaomi HyperOS (Android 14)",
      },
      stock: 43,
      isFeatured: true,
      isNewArrival: true,
      isCurrentArrival: false,
      isDeal: true,
      isActive: true,
      rating: 4.6,
      reviewCount: 38,
      warranty: "1 Year Manufacturer Warranty for Phone and 6 Months for In-Box Accessories",
      tags: ["5G", "Xiaomi", "Redmi", "Best Budget 5G", "Gorakhpur In Stock"],
    },
    {
      name: "Vivo Y21 5G",
      slug: "vivo-y21-5g",
      brand: "Vivo",
      category: "smartphones",
      modelNumber: "V2149",
      description:
        "Vivo Y21 5G boasts an ultra-slim 8.0mm design, 5000mAh battery with 18W Fast Charge, and a sharp HD+ Halo display. Engineered with Extended RAM 2.0 to ensure silky smooth app switching.",
      shortDescription: "Sleek 8mm slim body, 5000mAh battery & fast charge.",
      price: 14490,
      originalPrice: 17990,
      discountPercentage: 19,
      currency: "INR",
      thumbnail: manifest.smartphones[1].url,
      images: [
        {
          url: manifest.smartphones[1].url,
          publicId: manifest.smartphones[1].publicId,
          alt: "Vivo Y21 5G Diamond Glow",
          sourceUrl: manifest.smartphones[1].sourceUrl,
          attribution: manifest.smartphones[1].attribution,
          isPrimary: true,
        },
      ],
      colors: [
        { name: "Diamond Glow", hex: "#E8F0F8" },
        { name: "Midnight Blue", hex: "#1A2E40" },
      ],
      variants: [
        {
          storage: "64GB",
          ram: "4GB + 1GB Extended",
          price: 14490,
          originalPrice: 17990,
          stock: 15,
        },
      ],
      specifications: {
        Processor: "MediaTek Helio P35 Octa-core",
        Display: "6.51-inch HD+ Halo FullView Display",
        "Rear Camera": "13MP + 2MP Super Macro",
        "Front Camera": "8MP AI Face Beauty",
        Battery: "5000mAh with 18W Fast Charge",
        OS: "Funtouch OS 11.1",
      },
      stock: 15,
      isFeatured: true,
      isNewArrival: false,
      isCurrentArrival: true,
      isDeal: false,
      isActive: true,
      rating: 4.4,
      reviewCount: 29,
      warranty: "1 Year Brand Warranty",
      tags: ["Vivo", "5G", "Slim Design", "Gorakhpur Store"],
    },
    {
      name: "Samsung Galaxy A17 5G",
      slug: "samsung-galaxy-a17-5g",
      brand: "Samsung",
      category: "smartphones",
      modelNumber: "SM-A176B",
      description:
        "The Samsung Galaxy A17 5G combines Samsung's signature minimalist design with Super AMOLED 90Hz clarity, 50MP triple camera system, Knox Security, and guaranteed 4 generations of OS updates.",
      shortDescription: "Super AMOLED 90Hz display with 50MP triple camera.",
      price: 17999,
      originalPrice: 22499,
      discountPercentage: 20,
      currency: "INR",
      thumbnail: manifest.smartphones[2].url,
      images: [
        {
          url: manifest.smartphones[2].url,
          publicId: manifest.smartphones[2].publicId,
          alt: "Samsung Galaxy A17 5G Awesome Graphite",
          sourceUrl: manifest.smartphones[2].sourceUrl,
          attribution: manifest.smartphones[2].attribution,
          isPrimary: true,
        },
      ],
      colors: [
        { name: "Awesome Graphite", hex: "#2C2C2C" },
        { name: "Awesome Light Blue", hex: "#A8DADC" },
      ],
      variants: [
        {
          storage: "128GB",
          ram: "6GB",
          price: 17999,
          originalPrice: 22499,
          stock: 20,
        },
        {
          storage: "256GB",
          ram: "8GB",
          price: 20999,
          originalPrice: 25999,
          stock: 14,
        },
      ],
      specifications: {
        Processor: "Samsung Exynos 1330 5G Octa-core",
        Display: "6.5-inch FHD+ Super AMOLED 90Hz",
        "Rear Camera": "50MP (OIS) + 5MP Ultrawide + 2MP Macro",
        "Front Camera": "13MP Selfie",
        Battery: "5000mAh with 25W Super Fast Charging",
        Security: "Samsung Knox Vault & Side Fingerprint",
      },
      stock: 34,
      isFeatured: true,
      isNewArrival: true,
      isCurrentArrival: false,
      isDeal: true,
      isActive: true,
      rating: 4.7,
      reviewCount: 45,
      warranty: "1 Year Official Samsung India Warranty",
      tags: ["Samsung", "Galaxy", "AMOLED", "50MP OIS", "Gorakhpur Verified"],
    },
    {
      name: "Samsung Galaxy F17 5G",
      slug: "samsung-galaxy-f17-5g",
      brand: "Samsung",
      category: "smartphones",
      modelNumber: "SM-F176B",
      description:
        "Built for boundless battery life, the Galaxy F17 5G sports a colossal 6000mAh power pack, crisp FHD+ 120Hz fluid screen, Voice Focus technology, and a 50MP No-Shake camera.",
      shortDescription: "Massive 6000mAh battery & 120Hz smooth screen.",
      price: 15499,
      originalPrice: 19999,
      discountPercentage: 22,
      currency: "INR",
      thumbnail: manifest.smartphones[3].url,
      images: [
        {
          url: manifest.smartphones[3].url,
          publicId: manifest.smartphones[3].publicId,
          alt: "Samsung Galaxy F17 5G Onyx Black",
          sourceUrl: manifest.smartphones[3].sourceUrl,
          attribution: manifest.smartphones[3].attribution,
          isPrimary: true,
        },
      ],
      colors: [
        { name: "Onyx Black", hex: "#1F1F1F" },
        { name: "Jade Green", hex: "#2E5D4B" },
      ],
      variants: [
        {
          storage: "128GB",
          ram: "6GB",
          price: 15499,
          originalPrice: 19999,
          stock: 30,
        },
      ],
      specifications: {
        Processor: "Exynos 1380 5nm Processor",
        Display: "6.6-inch FHD+ sAMOLED 120Hz",
        "Rear Camera": "50MP Main + 5MP Ultra-wide + 2MP Macro",
        Battery: "6000mAh Monster Battery",
        OS: "One UI 6.1 based on Android 14",
      },
      stock: 30,
      isFeatured: true,
      isNewArrival: false,
      isCurrentArrival: true,
      isDeal: true,
      isActive: true,
      rating: 4.5,
      reviewCount: 51,
      warranty: "1 Year Samsung Official Warranty",
      tags: ["Samsung", "Monster Battery", "F-Series", "Gorakhpur Best Deals"],
    },
    {
      name: "Apple iPhone 15 Pro",
      slug: "apple-iphone-15-pro",
      brand: "Apple",
      category: "smartphones",
      modelNumber: "A3101",
      description:
        "iPhone 15 Pro. Forged in aerospace-grade titanium with the groundbreaking A17 Pro chip, customizable Action button, and the most versatile iPhone camera system yet with 48MP main sensor.",
      shortDescription: "Aerospace-grade titanium, A17 Pro chip & 48MP Pro camera.",
      price: 124900,
      originalPrice: 134900,
      discountPercentage: 7,
      currency: "INR",
      thumbnail: manifest.smartphones[4].url,
      images: [
        {
          url: manifest.smartphones[4].url,
          publicId: manifest.smartphones[4].publicId,
          alt: "Apple iPhone 15 Pro Natural Titanium",
          sourceUrl: manifest.smartphones[4].sourceUrl,
          attribution: manifest.smartphones[4].attribution,
          isPrimary: true,
        },
      ],
      colors: [
        { name: "Natural Titanium", hex: "#9E9A93" },
        { name: "Black Titanium", hex: "#2D2D2D" },
      ],
      variants: [
        {
          storage: "128GB",
          price: 124900,
          originalPrice: 134900,
          stock: 8,
        },
        {
          storage: "256GB",
          price: 134900,
          originalPrice: 144900,
          stock: 5,
        },
      ],
      specifications: {
        Processor: "A17 Pro chip with 6-core GPU",
        Display: "6.1-inch Super Retina XDR with ProMotion 120Hz",
        "Camera System": "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto",
        Port: "USB-C with USB 3 speeds",
        Build: "Titanium design with Ceramic Shield front",
      },
      stock: 13,
      isFeatured: true,
      isNewArrival: true,
      isCurrentArrival: false,
      isDeal: false,
      isActive: true,
      rating: 4.9,
      reviewCount: 88,
      warranty: "1 Year Official Apple India Brand Warranty",
      tags: ["Apple", "iPhone", "Flagship", "Titanium", "Gorakhpur Ready Stock"],
    },
    {
      name: "OnePlus Nord CE4 5G",
      slug: "oneplus-nord-ce4-5g",
      brand: "OnePlus",
      category: "smartphones",
      modelNumber: "CPH2613",
      description:
        "OnePlus Nord CE4 5G combines the Qualcomm Snapdragon 7 Gen 3, ultra-rapid 100W SUPERVOOC charging, and a vibrant 120Hz AMOLED panel with Aqua Touch tech.",
      shortDescription: "100W SUPERVOOC, Snapdragon 7 Gen 3 & 120Hz AMOLED.",
      price: 24999,
      originalPrice: 26999,
      discountPercentage: 7,
      currency: "INR",
      thumbnail: manifest.smartphones[5].url,
      images: [
        {
          url: manifest.smartphones[5].url,
          publicId: manifest.smartphones[5].publicId,
          alt: "OnePlus Nord CE4 5G Celadon Marble",
          sourceUrl: manifest.smartphones[5].sourceUrl,
          attribution: manifest.smartphones[5].attribution,
          isPrimary: true,
        },
      ],
      colors: [
        { name: "Celadon Marble", hex: "#B9D7D2" },
        { name: "Dark Chrome", hex: "#222222" },
      ],
      variants: [
        {
          storage: "128GB",
          ram: "8GB",
          price: 24999,
          originalPrice: 26999,
          stock: 12,
        },
      ],
      specifications: {
        Processor: "Snapdragon 7 Gen 3 Mobile Platform",
        Display: "6.7-inch FHD+ 120Hz Fluid AMOLED",
        Charging: "100W SUPERVOOC Flash Charge (1-100% in 29 min)",
        Battery: "5500mAh Durable Battery",
        Camera: "50MP Sony LYT-600 with OIS",
      },
      stock: 12,
      isFeatured: true,
      isNewArrival: false,
      isCurrentArrival: true,
      isDeal: true,
      isActive: true,
      rating: 4.6,
      reviewCount: 42,
      warranty: "1 Year OnePlus India Warranty",
      tags: ["OnePlus", "Nord", "100W Fast Charge", "Gorakhpur Store"],
    },
    // Accessories
    {
      name: "67W SonicCharge Fast Charger Adapter",
      slug: "67w-soniccharge-fast-charger",
      brand: "Xiaomi",
      category: "accessories",
      modelNumber: "MDY-12-EH",
      description:
        "Official Xiaomi 67W SonicCharge 3.0 adapter with multi-layer surge protection, temperature control, and universal QC/PD compatibility.",
      shortDescription: "Official Xiaomi 67W adapter with surge protection.",
      price: 1999,
      originalPrice: 2999,
      discountPercentage: 33,
      currency: "INR",
      thumbnail: manifest.accessories[0].url,
      images: [
        {
          url: manifest.accessories[0].url,
          publicId: manifest.accessories[0].publicId,
          alt: "Xiaomi 67W SonicCharge Fast Charger",
          isPrimary: true,
        },
      ],
      colors: [{ name: "White", hex: "#FFFFFF" }],
      variants: [
        {
          storage: "Standard",
          price: 1999,
          originalPrice: 2999,
          stock: 40,
        },
      ],
      specifications: {
        Output: "67W Max (5V/3A, 9V/3A, 11V/6.1A)",
        Compatibility: "Xiaomi, Redmi, POCO & USB-PD Devices",
        Warranty: "6 Months Brand Warranty",
      },
      stock: 40,
      isFeatured: false,
      isNewArrival: false,
      isCurrentArrival: false,
      isDeal: true,
      isActive: true,
      rating: 4.8,
      reviewCount: 62,
      warranty: "6 Months Brand Warranty",
      tags: ["Charger", "Xiaomi", "Fast Charging", "Gorakhpur"],
    },
    {
      name: "Braided 100W Type-C to Type-C Cable",
      slug: "braided-100w-type-c-cable",
      brand: "boAt",
      category: "accessories",
      description:
        "Rugged nylon braided 1.5m Type-C cable supporting up to 100W Power Delivery and high-speed data transmission.",
      shortDescription: "Durable braided 100W fast charging cable.",
      price: 499,
      originalPrice: 999,
      discountPercentage: 50,
      currency: "INR",
      thumbnail: manifest.accessories[1].url,
      images: [
        {
          url: manifest.accessories[1].url,
          publicId: manifest.accessories[1].publicId,
          alt: "boAt Braided 100W Cable",
          isPrimary: true,
        },
      ],
      colors: [{ name: "Space Grey", hex: "#4A4A4A" }],
      variants: [
        {
          storage: "1.5m",
          price: 499,
          originalPrice: 999,
          stock: 50,
        },
      ],
      specifications: {
        Length: "1.5 Metres",
        "Power Rating": "100W (20V/5A) Power Delivery",
        Material: "High-density Nylon Braided",
      },
      stock: 50,
      isFeatured: false,
      isNewArrival: false,
      isCurrentArrival: false,
      isDeal: true,
      isActive: true,
      rating: 4.5,
      reviewCount: 84,
      warranty: "1 Year boAt Warranty",
      tags: ["Cable", "Type-C", "Fast Charging"],
    },
    // Smartwatches
    {
      name: "Noise ColorFit Pulse 3 AMOLED",
      slug: "noise-colorfit-pulse-3",
      brand: "Noise",
      category: "smartwatches",
      description:
        "1.96-inch AMOLED display with Always-On screen, advanced Bluetooth calling with Tru Sync technology, and comprehensive health monitoring.",
      shortDescription: "1.96-inch AMOLED Always-On display & Bluetooth calling.",
      price: 1899,
      originalPrice: 4999,
      discountPercentage: 62,
      currency: "INR",
      thumbnail: manifest.smartwatches[0].url,
      images: [
        {
          url: manifest.smartwatches[0].url,
          publicId: manifest.smartwatches[0].publicId,
          alt: "Noise ColorFit Pulse 3 AMOLED",
          isPrimary: true,
        },
      ],
      colors: [{ name: "Jet Black", hex: "#1C1C1E" }],
      variants: [
        {
          storage: "Standard",
          price: 1899,
          originalPrice: 4999,
          stock: 25,
        },
      ],
      specifications: {
        Display: "1.96-inch AMOLED 410x502 px",
        Battery: "Up to 7 Days Battery Life",
        "Water Resistance": "IP68 Dust and Water Resistant",
        Sensors: "Heart Rate, SpO2, Sleep Tracker, 100+ Sports Modes",
      },
      stock: 25,
      isFeatured: true,
      isNewArrival: false,
      isCurrentArrival: true,
      isDeal: true,
      isActive: true,
      rating: 4.4,
      reviewCount: 31,
      warranty: "1 Year Manufacturer Warranty",
      tags: ["Smartwatch", "Noise", "AMOLED", "Calling"],
    },
    // Earbuds
    {
      name: "OnePlus Buds 3 ANC",
      slug: "oneplus-buds-3-anc",
      brand: "OnePlus",
      category: "earbuds",
      description:
        "Dual dynamic drivers (10.4mm woofer + 6mm tweeter) with up to 49dB Smart Adaptive Active Noise Cancellation and Hi-Res LHDC 5.0 audio.",
      shortDescription: "49dB Active Noise Cancellation with dual dynamic drivers.",
      price: 4999,
      originalPrice: 6499,
      discountPercentage: 23,
      currency: "INR",
      thumbnail: manifest.earbuds[0].url,
      images: [
        {
          url: manifest.earbuds[0].url,
          publicId: manifest.earbuds[0].publicId,
          alt: "OnePlus Buds 3 ANC Metallic Grey",
          isPrimary: true,
        },
      ],
      colors: [{ name: "Metallic Grey", hex: "#5C5C5C" }],
      variants: [
        {
          storage: "Standard",
          price: 4999,
          originalPrice: 6499,
          stock: 20,
        },
      ],
      specifications: {
        Audio: "Dual Drivers (10.4mm + 6mm) Hi-Res Audio",
        ANC: "49dB Smart Adaptive Active Noise Cancellation",
        Battery: "Up to 44 Hours Total Playback with Fast Charging",
      },
      stock: 20,
      isFeatured: true,
      isNewArrival: true,
      isCurrentArrival: false,
      isDeal: false,
      isActive: true,
      rating: 4.7,
      reviewCount: 56,
      warranty: "1 Year Official OnePlus Warranty",
      tags: ["Earbuds", "OnePlus", "ANC", "Hi-Res Audio"],
    },
    // Tablets
    {
      name: "OnePlus Pad Go 11.35 2.4K",
      slug: "oneplus-pad-go",
      brand: "OnePlus",
      category: "tablets",
      description:
        "Stunning 11.35-inch 2.4K ReadFit Eye Care Display with Omnibearing Quad Speakers, Dolby Atmos, and massive 8000mAh battery with 33W SUPERVOOC.",
      shortDescription: "11.35-inch 2.4K display, quad speakers & 8000mAh battery.",
      price: 19999,
      originalPrice: 23999,
      discountPercentage: 16,
      currency: "INR",
      thumbnail: manifest.tablets[0].url,
      images: [
        {
          url: manifest.tablets[0].url,
          publicId: manifest.tablets[0].publicId,
          alt: "OnePlus Pad Go Twin Mint",
          isPrimary: true,
        },
      ],
      colors: [{ name: "Twin Mint", hex: "#A8D5C8" }],
      variants: [
        {
          storage: "128GB",
          ram: "8GB (Wi-Fi)",
          price: 19999,
          originalPrice: 23999,
          stock: 10,
        },
      ],
      specifications: {
        Display: "11.35-inch 2.4K (2408x1720) 90Hz Display",
        Audio: "Quad Speakers with Dolby Atmos",
        Battery: "8000mAh with 33W Fast Charging",
        Chipset: "MediaTek Helio G99 Octa-core",
      },
      stock: 10,
      isFeatured: true,
      isNewArrival: false,
      isCurrentArrival: true,
      isDeal: false,
      isActive: true,
      rating: 4.6,
      reviewCount: 27,
      warranty: "1 Year Official Brand Warranty",
      tags: ["Tablet", "OnePlus", "2.4K Display", "Entertainment"],
    },
    // Mobile Covers
    {
      name: "Shockproof Matte MagSafe Case",
      slug: "shockproof-matte-magsafe-case",
      brand: "Spigen",
      category: "mobile-covers",
      description:
        "Mil-grade drop protection with integrated strong neodymium magnets for flawless MagSafe accessories and wireless charging.",
      shortDescription: "Mil-grade shockproof drop protection with MagSafe magnets.",
      price: 799,
      originalPrice: 1499,
      discountPercentage: 46,
      currency: "INR",
      thumbnail: manifest.mobileCovers[0].url,
      images: [
        {
          url: manifest.mobileCovers[0].url,
          publicId: manifest.mobileCovers[0].publicId,
          alt: "Shockproof Matte MagSafe Case",
          isPrimary: true,
        },
      ],
      colors: [{ name: "Frosted Black", hex: "#222222" }],
      variants: [
        {
          storage: "Universal Fit",
          price: 799,
          originalPrice: 1499,
          stock: 35,
        },
      ],
      specifications: {
        Material: "Polycarbonate Back + TPU Bumper",
        Protection: "Air Cushion Technology Drop Protection",
        Features: "Raised Camera Lip & Clicky Tactile Buttons",
      },
      stock: 35,
      isFeatured: false,
      isNewArrival: false,
      isCurrentArrival: false,
      isDeal: true,
      isActive: true,
      rating: 4.8,
      reviewCount: 77,
      warranty: "6 Months Brand Warranty",
      tags: ["Cover", "Case", "MagSafe", "Shockproof"],
    },
  ];

  for (const prod of productsData) {
    await Product.findOneAndUpdate({ slug: prod.slug }, prod, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✅ Seeded ${productsData.length} products with verified models and images.`);

  // 4. Store Settings
  console.log("\n🏢 Seeding Store Settings...");
  const storeSettingsData = {
    storeName: "A1 Mobile Shop",
    tagline: "Gorakhpur's Most Trusted Mobile Store",
    address: "Near Basharatpur Chauraha, Medical College Road, Basharatpur",
    city: "Gorakhpur",
    state: "Uttar Pradesh",
    pincode: "273004",
    landmark: "Opposite City Hospital, Basharatpur",
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
    storeImageUrl: manifest.store.url,
    announcementText:
      "Special Offers Available | Free Delivery on Selected Orders",
    announcementActive: true,
  };

  await StoreSettings.findOneAndUpdate({}, storeSettingsData, {
    upsert: true,
    new: true,
  });
  console.log("✅ Seeded Store Settings (Gorakhpur, Basharatpur).");

  // 5. Navigation Items
  console.log("\n🧭 Seeding Navigation Items...");
  const navData = [
    { title: "Buy Phone", href: "/products?category=smartphones", order: 1, isActive: true },
    {
      title: "Sell Old Device",
      href: "/sell-old-device",
      badge: "Instant Cash",
      order: 2,
      isActive: true,
    },
    { title: "Accessories", href: "/products?category=accessories", order: 3, isActive: true },
    { title: "Deals", href: "/deals", order: 4, isActive: true },
    { title: "Brands", href: "/brands/all", order: 5, isActive: true },
    { title: "Corporate Buyback", href: "/sell-old-device#corporate", order: 6, isActive: true },
    { title: "Contact Us", href: "/#store-location", order: 7, isActive: true },
  ];

  await NavigationItem.deleteMany({});
  await NavigationItem.insertMany(navData);
  console.log(`✅ Seeded ${navData.length} navigation items.`);

  // 6. Trust Benefits
  console.log("\n🛡️ Seeding Trust Benefits...");
  const trustData = [
    {
      title: "Original Products",
      description: "100% genuine devices",
      iconName: "ShieldCheck",
      order: 1,
      isActive: true,
    },
    {
      title: "Fast Delivery",
      description: "Quick & reliable shipping",
      iconName: "Truck",
      order: 2,
      isActive: true,
    },
    {
      title: "Easy Returns",
      description: "Simple return policy",
      iconName: "RotateCcw",
      order: 3,
      isActive: true,
    },
    {
      title: "Secure Payments",
      description: "Safe & trusted checkout",
      iconName: "Lock",
      order: 4,
      isActive: true,
    },
  ];

  await TrustBenefit.deleteMany({});
  await TrustBenefit.insertMany(trustData);
  console.log(`✅ Seeded ${trustData.length} trust benefits.`);

  // 7. Promotional Banner
  console.log("\n🎯 Seeding Promotional Banner...");
  const bannerData = {
    tag: "LIMITED TIME MEGA SALE",
    title: "Upgrade Today",
    description:
      "Get up to 40% OFF on selected smartphones & accessories. Plus get flat ₹3,000 instant trade-in exchange bonus!",
    buttonText: "SHOP DEALS",
    buttonLink: "/deals",
    imageUrl: manifest.banners.megaSale.url,
    discountBadge: "40% OFF",
    bonusText: "₹3,000 Trade-In Bonus",
    isActive: true,
  };

  await PromotionalBanner.findOneAndUpdate({}, bannerData, {
    upsert: true,
    new: true,
  });
  console.log("✅ Seeded Promotional Banner.");

  // 8. Testimonials (Identified as Demo Testimonials per user rule)
  console.log("\n💬 Seeding Testimonials...");
  const testimonialsData = [
    {
      customerName: "Rahul Srivastava",
      city: "Basharatpur, Gorakhpur",
      rating: 5,
      reviewText:
        "Sold my old Redmi phone at A1 Mobile Shop. The executive came directly to my home in Basharatpur within 2 hours, inspected the phone, and transferred the cash via UPI instantly. 100% trustworthy!",
      verifiedPurchase: true,
      devicePurchasedOrSold: "Sold Redmi Note 10 Pro",
      isDemo: true,
      isActive: true,
    },
    {
      customerName: "Ananya Mishra",
      city: "Medical College Road, Gorakhpur",
      rating: 5,
      reviewText:
        "Purchased the new Samsung Galaxy A17 5G from A1 Mobile Shop. Sealed pack authentic Indian unit with genuine GST bill and official brand warranty. Got better price than major online platforms!",
      verifiedPurchase: true,
      devicePurchasedOrSold: "Purchased Samsung Galaxy A17 5G",
      isDemo: true,
      isActive: true,
    },
    {
      customerName: "Mohammad Tariq",
      city: "Golghar, Gorakhpur",
      rating: 5,
      reviewText:
        "Hands down the best electronics retail store in Gorakhpur. The staff is polite, knows technical details thoroughly, and the buyback exchange bonus was transparent with zero hidden cuts.",
      verifiedPurchase: true,
      devicePurchasedOrSold: "Exchanged for OnePlus Nord CE4",
      isDemo: true,
      isActive: true,
    },
    {
      customerName: "Amitabh Pandey",
      city: "Civil Lines, Gorakhpur",
      rating: 5,
      reviewText:
        "Got fast delivery of boAt audio accessories on the same day. Great packaging and immediate customer support on WhatsApp for setup.",
      verifiedPurchase: true,
      devicePurchasedOrSold: "Purchased boAt Airdopes",
      isDemo: true,
      isActive: true,
    },
  ];

  await Testimonial.deleteMany({});
  await Testimonial.insertMany(testimonialsData);
  console.log(`✅ Seeded ${testimonialsData.length} demonstration testimonials.`);

  // 9. Buyback Device Categories
  console.log("\n🔄 Seeding Buyback Device Categories...");
  const buybackCatData = [
    {
      name: "Sell Phone",
      slug: "phone",
      description: "Instant cash for smartphones of all major brands with free doorstep pickup.",
      image: manifest.smartphones[0].url,
      ctaText: "Sell Phone",
      order: 1,
      isActive: true,
    },
    {
      name: "Sell Laptop",
      slug: "laptop",
      description: "Exchange MacBooks, Windows laptops and gaming rigs at competitive market rates.",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      ctaText: "Sell Laptop",
      order: 2,
      isActive: true,
    },
    {
      name: "Sell Tablet",
      slug: "tablet",
      description: "Instant doorstep valuation for iPads, Samsung Galaxy Tabs and Android tablets.",
      image: manifest.tablets[0].url,
      ctaText: "Sell Tablet",
      order: 3,
      isActive: true,
    },
    {
      name: "Sell Smartwatch",
      slug: "smartwatch",
      description: "Get best resale value for Apple Watches, Galaxy Watches, and fitness bands.",
      image: manifest.smartwatches[0].url,
      ctaText: "Sell Smartwatch",
      order: 4,
      isActive: true,
    },
  ];

  for (const bCat of buybackCatData) {
    await BuybackCategory.findOneAndUpdate({ slug: bCat.slug }, bCat, {
      upsert: true,
      new: true,
    });
  }
  console.log(`✅ Seeded ${buybackCatData.length} buyback categories.`);

  // 10. Buyback Valuation Rules
  console.log("\n💰 Seeding Valuation Rules...");
  const valuationRulesData = [
    {
      deviceCategory: "phone",
      brand: "Xiaomi",
      model: "Redmi 15A 5G",
      basePrice: 9500,
      conditions: { flawless: 1.0, good: 0.85, average: 0.7, belowAverage: 0.5 },
      deductions: {
        screenScratched: 1200,
        bodyDented: 800,
        batteryDegraded: 1000,
        cameraFaulty: 1500,
        boxChargerMissing: 400,
      },
      isActive: true,
    },
    {
      deviceCategory: "phone",
      brand: "Vivo",
      model: "Vivo Y21 5G",
      basePrice: 10000,
      conditions: { flawless: 1.0, good: 0.85, average: 0.7, belowAverage: 0.5 },
      deductions: {
        screenScratched: 1200,
        bodyDented: 800,
        batteryDegraded: 1000,
        cameraFaulty: 1500,
        boxChargerMissing: 400,
      },
      isActive: true,
    },
    {
      deviceCategory: "phone",
      brand: "Samsung",
      model: "Samsung Galaxy A17 5G",
      basePrice: 13500,
      conditions: { flawless: 1.0, good: 0.85, average: 0.7, belowAverage: 0.5 },
      deductions: {
        screenScratched: 1500,
        bodyDented: 1000,
        batteryDegraded: 1200,
        cameraFaulty: 2000,
        boxChargerMissing: 500,
      },
      isActive: true,
    },
    {
      deviceCategory: "phone",
      brand: "Samsung",
      model: "Samsung Galaxy F17 5G",
      basePrice: 11000,
      conditions: { flawless: 1.0, good: 0.85, average: 0.7, belowAverage: 0.5 },
      deductions: {
        screenScratched: 1500,
        bodyDented: 1000,
        batteryDegraded: 1200,
        cameraFaulty: 2000,
        boxChargerMissing: 500,
      },
      isActive: true,
    },
    {
      deviceCategory: "phone",
      brand: "Apple",
      model: "Apple iPhone 15 Pro",
      basePrice: 85000,
      conditions: { flawless: 1.0, good: 0.88, average: 0.72, belowAverage: 0.52 },
      deductions: {
        screenScratched: 5000,
        bodyDented: 3000,
        batteryDegraded: 4000,
        cameraFaulty: 8000,
        boxChargerMissing: 1500,
      },
      isActive: true,
    },
  ];

  for (const vr of valuationRulesData) {
    await BuybackValuationRule.findOneAndUpdate(
      {
        deviceCategory: vr.deviceCategory,
        brand: vr.brand,
        model: vr.model,
      },
      vr,
      { upsert: true, new: true }
    );
  }
  console.log(`✅ Seeded ${valuationRulesData.length} valuation rules.`);

  // 11. Initial Admin and Sample User
  console.log("\n👤 Seeding Initial Admin Account...");
  const adminEmail = process.env.ADMIN_EMAIL || "admin@a1mobileshop.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword123!";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: "A1 Mobile Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      phone: "+91 98765 43210",
      addresses: [
        {
          id: "addr-admin-1",
          label: "Store",
          street: "Near Basharatpur Chauraha, Medical Road",
          area: "Basharatpur",
          city: "Gorakhpur",
          pincode: "273004",
          isDefault: true,
        },
      ],
    },
    { upsert: true, new: true }
  );
  console.log(`✅ Admin account seeded: ${adminEmail} (password: ${adminPassword})`);

  // 12. Discount Codes
  console.log("\n🎟️ Seeding Discount Codes...");
  const coupons = [
    { code: "A1WELCOME", discountPercentage: 10, maxDiscountAmount: 1500, minOrderAmount: 2000, isActive: true },
    { code: "GORAKHPUR500", discountPercentage: 5, maxDiscountAmount: 500, minOrderAmount: 1000, isActive: true },
    { code: "A1MEGA", discountPercentage: 15, maxDiscountAmount: 3000, minOrderAmount: 5000, isActive: true },
  ];

  for (const c of coupons) {
    await DiscountCode.findOneAndUpdate({ code: c.code }, c, { upsert: true, new: true });
  }
  console.log(`✅ Seeded ${coupons.length} discount coupons.`);

  console.log("\n==================================================");
  console.log("🎉 DATABASE SEED COMPLETED SUCCESSFULLY!");
  console.log("==================================================");

  await mongoose.disconnect();
}

runSeed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
