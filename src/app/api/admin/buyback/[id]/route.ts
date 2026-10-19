import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { BuybackRequest } from "@/models/BuybackRequest";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();
    const { status, finalInspectionValue, notes } = body;

    await connectToDatabase();
    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (finalInspectionValue !== undefined)
      updateData.finalInspectionValue = finalInspectionValue;
    if (notes !== undefined) updateData.notes = notes;

    const updated = await BuybackRequest.findByIdAndUpdate(id, updateData, {
      new: true,
    }).lean();

    return NextResponse.json({ success: true, buyback: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update buyback request" },
      { status: 403 }
    );
  }
}
