import Link from "next/link";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);

  if (!product) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link href="/products" className="text-white/80 hover:text-white">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Link href="/products" className="text-sm text-white/70 hover:text-white">
        ← Back to Products
      </Link>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="text-xs text-white/60">{product.status ?? "—"}</div>
        <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
        <p className="mt-4 max-w-2xl text-white/70">{product.description}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            Ask about availability
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Highlights</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Key Specs</h2>
          <dl className="mt-4 space-y-3">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6">
                <dt className="text-sm text-white/60">{s.label}</dt>
                <dd className="text-sm text-white/85">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}