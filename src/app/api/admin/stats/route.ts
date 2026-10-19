import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { BuybackRequest } from "@/models/BuybackRequest";
import { User } from "@/models/User";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";

export async function GET() {
  try {
    await requireAdmin();
    await connectToDatabase();

    const [
      totalProducts,
      totalOrders,
      totalBuybacks,
      totalUsers,
      totalSubscribers,
      recentOrders,
      recentBuybacks,
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      BuybackRequest.countDocuments(),
      User.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      BuybackRequest.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Calculate revenue
    const revenueAgg = await Order.aggregate([
      { $match: { orderStatus: { $ne: "Cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    return NextResponse.json({
      stats: {
        totalProducts,
        totalOrders,
        totalBuybacks,
        totalUsers,
        totalSubscribers,
        totalRevenue,
      },
      recentOrders,
      recentBuybacks,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unauthorized" },
      { status: 403 }
    );
  }
}
