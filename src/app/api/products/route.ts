import { NextResponse } from "next/server";
import { getProducts } from "@/services/products";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const brand = searchParams.get("brand") || undefined;
    const search = searchParams.get("search") || undefined;
    const isDeal = searchParams.get("deal") === "true";
    const isFeatured = searchParams.get("featured") === "true";
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;
    const sort =
      (searchParams.get("sort") as
        | "price-asc"
        | "price-desc"
        | "rating"
        | "latest") || "latest";
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;

    const result = await getProducts({
      category,
      brand,
      search,
      isDeal,
      isFeatured,
      minPrice,
      maxPrice,
      sort,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
