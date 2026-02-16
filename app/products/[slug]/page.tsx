import Link from "next/link";
import Image from "next/image";
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

      {/* Image Gallery (optional) */}
      {product.images?.length ? (
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Hero image */}
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={1400}
            height={900}
            priority
            className="max-h-[520px] w-full rounded-3xl border border-white/10 object-cover"
          />

          {/* Secondary images */}
          {product.images.length > 1 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {product.images.slice(1).map((img) => (
                <Image
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  width={1000}
                  height={700}
                  className="rounded-2xl border border-white/10"
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Product Info */}
      <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-10 backdrop-blur">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-400"></span>
          {product.status}
        </div>
        <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
        <p className="mt-4 max-w-2xl text-white/70">{product.description}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Contact
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
          >
            Ask about availability
          </Link>
        </div>
      </div>

      {/* Highlights + Specs */}
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