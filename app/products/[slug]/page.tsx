import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { products, getProduct } from "@/lib/products";
import { sortConnectors } from "@/lib/products/connectors";
import ConnectorCatalog from "@/components/ConnectorCatalog";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const normalizeSlug = (s: string) =>
  decodeURIComponent(s)
    .trim()
    .toLowerCase()
    .replace(/[‐-‒–—―]/g, "-");

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const slug = normalizeSlug(resolvedParams.slug);

  // Use getProduct (single source of truth)
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const isCategory =
    product.category === "Accessories" && product.group === "Category";

  const related = isCategory
  ? products
      .filter(
        (p) =>
          p.category === "Accessories" &&
          p.group === product.name &&
          p.slug !== product.slug
      )
      .sort(
        product.name === "Connectors"
          ? sortConnectors
          : (a, b) => a.name.localeCompare(b.name)
      )
  : [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-3xl">
            <div className="text-xs text-white/60">{product.status ?? "—"}</div>
            <h1 className="mt-2 text-[clamp(2rem,4.8vw,3.3rem)] font-semibold leading-[1.06] tracking-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-white/70 md:text-lg">{product.short}</p>

            {product.sku ? (
              <div className="mt-4 text-sm text-white/60">
                SKU: <span className="text-white/80">{product.sku}</span>
              </div>
            ) : null}
          </div>

          <Link
            href={`/contact?dept=sales&product=${encodeURIComponent(
              product.name
            )}`}
            className="inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      {/* Category listing (Accessories -> Category page) */}
      {isCategory ? (
        <section className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">{product.name} catalog</h2>
              <p className="mt-2 text-sm text-white/60">
                Browse available configurations below. Contact Sales for compatibility guidance and pricing.
              </p>
            </div>
          </div>

          {related.length ? (
            product.name === "Connectors" ? (
              <ConnectorCatalog items={related} />
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:bg-white/10 hover:-translate-y-1"
                  >
                    {p.images?.[0] && (
                      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={p.images[0].src}
                          alt={p.images[0].alt}
                          fill
                          className="object-contain p-3"
                        />
                      </div>
                    )}

                    <div className="text-xs text-white/60">{p.status ?? "—"}</div>
                    <div className="mt-2 text-lg font-semibold">{p.name}</div>
                    {p.sku && (
                      <div className="mt-1 text-sm text-white/60">{p.sku}</div>
                    )}
                    <div className="mt-2 text-sm text-white/60">{p.short}</div>
                    <div className="mt-4 text-sm font-semibold text-white/80">
                      View details →
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
              No SKUs listed yet for this category.
            </div>
          )}

        </section>
      ) : (
        <>
          {/* Body (only for non-category products) */}
          <section className="grid gap-8 md:grid-cols-2">
            {/* Images */}
            <div className="space-y-4">
              {(product.images ?? []).length ? (
                <div className="grid gap-4">
                  {(product.images ?? []).map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/60">
                  Images coming soon.
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold">Overview</div>
                <p className="mt-3 text-sm text-white/70">{product.description}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold">Highlights</div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
                  {product.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold">Specs</div>
                <div className="mt-3 space-y-2 text-sm">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="text-white/60">{s.label}</div>
                      <div className="text-white/80 text-right">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <div>
        <Link href="/products" className="text-white/70 hover:text-white">
          ← Back to products
        </Link>
      </div>
    </div>
  );
}