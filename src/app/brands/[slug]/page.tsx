import { redirect } from "next/navigation";

export default async function BrandRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === "all") {
    redirect("/products");
  }
  redirect(`/products?brand=${encodeURIComponent(slug)}`);
}
