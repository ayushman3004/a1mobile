# A1 Mobile Shop Gorakhpur — Full-Stack E-Commerce Platform

A production-quality full-stack e-commerce website and doorstep device buyback exchange application built for **"A1 Mobile Shop"**, a smartphone and electronics retailer based in **Basharatpur, Gorakhpur, Uttar Pradesh, India**.

---

## 🎨 Visual Identity & Strict Design System

Crafted to strictly recreate the reference website UI with a warm-neutral, premium electronics retail aesthetic:

| Token | Hex Code | Description |
|---|---|---|
| **Main Background** | `#F5EFE6` | Warm ivory canvas |
| **Secondary Background** | `#EEE7DC` | Muted section background |
| **Card Background** | `#EDE6DC` | Elevated container surfaces |
| **Dark Primary** | `#24211E` | Deep charcoal for headers & buttons |
| **Dark Brown** | `#575047` | Body text & step card accents |
| **Border** | `#DED6CA` | Subtle hairline dividers |
| **Accent Green** | `#26784F` | Trust indicators & positive states |
| **Accent Orange** | `#E66827` | Promotional sale badges & fire deals |

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router with Server Components & Route Handlers)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React & Custom SVG Brand Icons
- **Database**: MongoDB Atlas / Local MongoDB via Mongoose ODM
- **Media Pipeline**: Cloudinary CDN Image Pipeline
- **Validation**: Zod schema validation
- **State Management**: React Context (Cart, Wishlist, Authentication)
- **Security**: JWT Session Cookies (HTTP-only) & Bcrypt password hashing

---

## 📱 Exact Smartphone Models & Verified Image Manifest

In adherence with the **No-Fake-Product** policy, genuine high-resolution assets were researched and recorded in `scripts/image-manifest.json`:

1. **Redmi 15A 5G** (Skyline Blue, 120Hz display, MediaTek Dimensity 6100+)
2. **Vivo Y21 5G** (Diamond Glow, 8.0mm slim body, 5000mAh battery)
3. **Samsung Galaxy A17 5G** (Awesome Graphite, Super AMOLED 90Hz, 50MP OIS)
4. **Samsung Galaxy F17 5G** (Onyx Black, 6000mAh Monster battery, 120Hz)
5. **Apple iPhone 15 Pro** (Natural Titanium, A17 Pro chip, 48MP Pro camera)
6. **OnePlus Nord CE4 5G** (Celadon Marble, 100W SUPERVOOC, Snapdragon 7 Gen 3)
7. **Official Accessories**: Xiaomi 67W SonicCharge Adapter, boAt 100W Braided Cable, Spigen MagSafe Case
8. **Wearables & Tablets**: Noise ColorFit Pulse 3 AMOLED, OnePlus Buds 3 ANC, OnePlus Pad Go 11.35 2.4K

---

## 📂 Architecture & Directory Structure

```
mobile/
├── .env.example                # Documented environment variables
├── .env.local                  # Local MongoDB development configuration
├── package.json                # Project dependencies & seed commands
├── scripts/
│   ├── image-manifest.json     # Verified image manifest with models & CDN sources
│   ├── seed.ts                 # Idempotent database seed populating all collections
│   ├── seed-images.ts          # Cloudinary asset upload pipeline
│   └── validate-images.ts      # Validates manifest HTTPS URLs and attributes
└── src/
    ├── app/
    │   ├── page.tsx            # Complete Homepage (Sections A through L)
    │   ├── products/
    │   │   ├── page.tsx        # Filterable, sortable catalog
    │   │   └── [slug]/page.tsx # Product details, specs, and reviews
    │   ├── sell-old-device/
    │   │   └── page.tsx        # 12-Step Buyback quotation & pickup wizard
    │   ├── cart/page.tsx       # Shopping cart with coupon verification
    │   ├── checkout/page.tsx   # Gorakhpur address input & COD/UPI ordering
    │   ├── orders/page.tsx     # Order history and delivery tracking
    │   ├── account/
    │   │   ├── page.tsx        # User dashboard & buyback history
    │   │   ├── login/page.tsx  # Customer & admin login
    │   │   └── register/page.tsx
    │   ├── admin/page.tsx      # Protected administrative dashboard
    │   └── api/                # Route handlers for auth, buyback, orders, products
    ├── components/
    │   ├── layout/             # TopBar, Header, Navbar, Footer
    │   ├── home/               # Hero, Benefits, Categories, Deals, Testimonials, Store
    │   ├── products/           # ProductCard, QuickViewModal, ProductDetailClient
    │   ├── buyback/            # BuybackWizard (12-step flow)
    │   └── providers/          # Cart, Wishlist, and Auth providers
    ├── context/                # CartContext, WishlistContext, AuthContext
    ├── lib/                    # mongodb.ts, cloudinary.ts, auth.ts, utils.ts
    ├── models/                 # Mongoose schemas for all entities
    ├── services/               # Server-side DB query services
    └── types/                  # TypeScript interface definitions
```

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Provide your MongoDB connection string (or use the default local MongoDB URI: `mongodb://127.0.0.1:27017/a1_mobile_shop`).

### 3. Validate Images & Seed Database
```bash
# Verify image manifest integrity
npm run validate:images

# Populate initial categories, products, store settings, and demo data
npm run seed

# (Optional) Upload manifest assets to your Cloudinary bucket if API keys are set
npm run seed:images
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Administrative Access

The seed script initializes an administrator account for managing orders, buyback pickups, and store inventory:

- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@a1mobileshop.com`
- **Password**: `AdminPassword123!`

---

## ⚡ Key Features Verified

- [x] **No Hardcoded Data Rule**: Content (products, categories, store info, banners, navigation, benefits, testimonials) is pulled dynamically from MongoDB.
- [x] **Top Announcement Bar**: Displays Gorakhpur location, `@a1mobileshop26` Instagram, and active offers.
- [x] **Multi-Step Buyback Wizard**: 12-step quotation wizard at `/sell-old-device` with dynamic calculations and unique booking references (`A1-BUY-XXXX-YYYY`).
- [x] **Instant WhatsApp Integration**: Prefilled enquiry links with the store's official WhatsApp number.
- [x] **Shopping Cart & Checkout**: Live quantity adjustments, coupon validation (`A1WELCOME`, `GORAKHPUR500`), and Cash on Delivery / UPI checkout.
- [x] **Production Grade Build**: Fully typed TypeScript codebase passing `next build` with zero errors.
