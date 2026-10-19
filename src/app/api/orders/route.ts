import { NextResponse } from "next/server";
import { createOrder, getUserOrders } from "@/services/orders";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const {
      customerName,
      customerEmail,
      customerPhone,
      items,
      shippingAddress,
      paymentMethod,
      discount,
      deliveryCharge,
      notes,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !items ||
      !items.length ||
      !shippingAddress
    ) {
      return NextResponse.json(
        { error: "Missing required order details" },
        { status: 400 }
      );
    }

    const order = await createOrder({
      userId: user?.userId,
      customerName,
      customerEmail,
      customerPhone,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || "COD",
      discount,
      deliveryCharge,
      notes,
    });

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ orders: [] });
    }
    const orders = await getUserOrders(user.userId);
    return NextResponse.json({ orders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
