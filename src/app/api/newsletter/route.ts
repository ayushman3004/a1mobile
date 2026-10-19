import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";
import { z } from "zod";

const NewsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = NewsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    await connectToDatabase();

    const existing = await NewsletterSubscriber.findOne({
      email: email.toLowerCase(),
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already subscribed to A1 Mobile Shop updates!",
      });
    }

    await NewsletterSubscriber.create({
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      isActive: true,
    });

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to new arrivals and exclusive deals!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Subscription failed" },
      { status: 500 }
    );
  }
}
