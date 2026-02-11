import Link from "next/link";
import { getProduct, products } from "@/lib/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export default async function ProductDetailPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const resolved = await Promise.resolve(params);
  const product = getProduct(resolved.slug);

  if (!product) return notFound();

  return (
    <div className="space-y-10">
      <Link href="/products" className="text-sm text-white/70 hover:text-white">
        ← Back to Products
      </Link>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs text-white/60">{product.status ?? "—"}</div>
        <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
        <p className="mt-4 max-w-2xl text-white/70">{product.description}</p>
      </div>
    </div>
  );
}