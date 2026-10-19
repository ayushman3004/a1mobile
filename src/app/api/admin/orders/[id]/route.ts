import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateOrderStatus } from "@/services/orders";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const { status, trackingNumber } = body;

    const updated = await updateOrderStatus(id, status, trackingNumber);
    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update order" },
      { status: 403 }
    );
  }
}
