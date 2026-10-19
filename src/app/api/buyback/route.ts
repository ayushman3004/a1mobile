import { NextResponse } from "next/server";
import {
  calculateValuation,
  createBuybackRequest,
  getUserBuybackRequests,
} from "@/services/buyback";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "calculate") {
      const {
        deviceCategory,
        brand,
        model,
        condition,
        functionalIssues,
        accessoriesIncluded,
      } = body;

      if (!deviceCategory || !brand || !model || !condition) {
        return NextResponse.json(
          { error: "Missing required fields for valuation" },
          { status: 400 }
        );
      }

      const quote = await calculateValuation({
        deviceCategory,
        brand,
        model,
        condition,
        functionalIssues,
        accessoriesIncluded,
      });

      return NextResponse.json({ success: true, quote });
    }

    if (action === "submit") {
      const user = await getCurrentUser();
      const requestData = {
        ...body.requestData,
        userId: user?.userId,
      };

      if (
        !requestData.customerName ||
        !requestData.phone ||
        !requestData.pickupAddress ||
        !requestData.pickupDate ||
        !requestData.pickupTimeSlot
      ) {
        return NextResponse.json(
          { error: "All contact and pickup details are required" },
          { status: 400 }
        );
      }

      const created = await createBuybackRequest(requestData);
      return NextResponse.json({ success: true, request: created });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process buyback action" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ requests: [] });
    }
    const requests = await getUserBuybackRequests(user.userId);
    return NextResponse.json({ requests });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch buyback history" },
      { status: 500 }
    );
  }
}
