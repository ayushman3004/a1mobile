import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import { comparePassword, signToken } from "@/lib/auth";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(3).optional(),
  identifier: z.string().min(3).optional(),
  password: z.string().min(6),
}).refine((data) => data.email || data.identifier, {
  message: "Email or phone number is required",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please enter a valid email or phone number and password" },
        { status: 400 }
      );
    }

    const rawId = (parsed.data.identifier || parsed.data.email || "").trim();
    const { password } = parsed.data;
    await connectToDatabase();

    const cleanDigits = rawId.replace(/[^0-9]/g, "");
    const isEmail = rawId.includes("@");

    let query: any;
    if (isEmail) {
      query = { email: rawId.toLowerCase() };
    } else {
      const orConditions: any[] = [
        { email: rawId.toLowerCase() },
        { phone: rawId },
      ];
      if (cleanDigits.length >= 10) {
        orConditions.push({ phone: cleanDigits });
        orConditions.push({ phone: { $regex: cleanDigits.slice(-10) + "$" } });
      }
      query = { $or: orConditions };
    }

    const user = await User.findOne(query);
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid email, phone number, or password" },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });

    response.cookies.set("a1_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
