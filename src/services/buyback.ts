import { connectToDatabase } from "@/lib/mongodb";
import { BuybackCategory } from "@/models/BuybackCategory";
import { BuybackValuationRule } from "@/models/BuybackValuationRule";
import { BuybackRequest } from "@/models/BuybackRequest";
import { IBuybackCategory, IBuybackRequest } from "@/types";
import { generateBuybackReference } from "@/lib/utils";

export async function getBuybackCategories(): Promise<IBuybackCategory[]> {
  await connectToDatabase();
  const categories = await BuybackCategory.find({ isActive: true })
    .sort({ order: 1 })
    .lean();
  return JSON.parse(JSON.stringify(categories)) as IBuybackCategory[];
}

export async function calculateValuation({
  deviceCategory,
  brand,
  model,
  condition,
  functionalIssues = [],
  accessoriesIncluded = [],
}: {
  deviceCategory: string;
  brand: string;
  model: string;
  condition: "Flawless" | "Good" | "Average" | "Below Average";
  functionalIssues?: string[];
  accessoriesIncluded?: string[];
}) {
  await connectToDatabase();

  const rule = await BuybackValuationRule.findOne({
    deviceCategory: { $regex: new RegExp(`^${deviceCategory}$`, "i") },
    brand: { $regex: new RegExp(`^${brand}$`, "i") },
    model: { $regex: new RegExp(`^${model}$`, "i") },
    isActive: true,
  }).lean();

  // If exact model rule doesn't exist, calculate based on default category base price
  let basePrice = 12000;
  let multiplier = 0.85;

  if (rule) {
    basePrice = rule.basePrice;
    if (condition === "Flawless") multiplier = rule.conditions.flawless;
    else if (condition === "Good") multiplier = rule.conditions.good;
    else if (condition === "Average") multiplier = rule.conditions.average;
    else if (condition === "Below Average")
      multiplier = rule.conditions.belowAverage;
  } else {
    if (condition === "Flawless") multiplier = 1.0;
    else if (condition === "Good") multiplier = 0.85;
    else if (condition === "Average") multiplier = 0.7;
    else if (condition === "Below Average") multiplier = 0.5;
  }

  let estimated = Math.round(basePrice * multiplier);

  // Apply issue deductions
  if (functionalIssues.includes("Screen Scratched / Cracked")) {
    estimated = Math.max(1000, estimated - 1500);
  }
  if (functionalIssues.includes("Body Scratches / Dents")) {
    estimated = Math.max(1000, estimated - 800);
  }
  if (functionalIssues.includes("Battery Backup Issue")) {
    estimated = Math.max(1000, estimated - 1000);
  }
  if (functionalIssues.includes("Camera / Speaker Fault")) {
    estimated = Math.max(1000, estimated - 1500);
  }

  // Bonus for original bill and box
  if (accessoriesIncluded.includes("Original Bill")) {
    estimated += 400;
  }
  if (accessoriesIncluded.includes("Original Box & Charger")) {
    estimated += 500;
  }

  return {
    estimatedValue: Math.max(1000, estimated),
    basePrice,
    conditionMultiplier: multiplier,
  };
}

export async function createBuybackRequest(
  data: Omit<IBuybackRequest, "referenceNumber" | "status" | "_id">
): Promise<IBuybackRequest> {
  await connectToDatabase();

  const referenceNumber = generateBuybackReference();
  const request = await BuybackRequest.create({
    ...data,
    referenceNumber,
    status: "Quote Generated",
  });

  return JSON.parse(JSON.stringify(request)) as IBuybackRequest;
}

export async function getBuybackRequestByRef(
  referenceNumber: string
): Promise<IBuybackRequest | null> {
  await connectToDatabase();
  const req = await BuybackRequest.findOne({ referenceNumber }).lean();
  if (!req) return null;
  return JSON.parse(JSON.stringify(req)) as IBuybackRequest;
}

export async function getUserBuybackRequests(
  userId?: string,
  phone?: string
): Promise<IBuybackRequest[]> {
  await connectToDatabase();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: Record<string, any> = {};
  if (userId) query.userId = userId;
  else if (phone) query.phone = phone;
  else return [];

  const requests = await BuybackRequest.find(query)
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(requests)) as IBuybackRequest[];
}
