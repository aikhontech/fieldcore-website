import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
    const controllers = products.filter((p) => p.category === "Controllers");
    const accessories = products.filter(
    (p) => p.category === "Accessories" && p.group === "Category"
    );

  return (
    <div className="space-y-14">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="mt-3 text-white/60">
          Browse Fieldcore controllers and industrial accessories—including connectors, cable glands, and harness components. Contact Sales for quotes, compatibility guidance, and lead times.
        </p>
      </div>

            {/* Contact Sales Strip */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">
              Need pricing or compatibility guidance?
            </div>
            <div className="mt-1 text-sm text-white/60">
              Tell us your pin count, wire gauge, quantities, and environment. Our team will assist with selection and lead times.
            </div>
          </div>

          <Link
            href="/contact?dept=sales"
            className="inline-flex w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Contact Sales
          </Link>
        </div>
      </div>

      {/* Controllers Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Controllers</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {controllers.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="text-xs text-white/60">{p.status ?? "—"}</div>
              <div className="mt-2 text-lg font-semibold">{p.name}</div>
              <div className="mt-2 text-sm text-white/60">{p.short}</div>
              <div className="mt-4 text-sm font-semibold text-white/80">
                View details →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Accessories Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Accessories</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {accessories.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="text-xs text-white/60">{p.status ?? "—"}</div>
              <div className="mt-2 text-lg font-semibold">{p.name}</div>
              <div className="mt-2 text-sm text-white/60">{p.short}</div>
              <div className="mt-4 text-sm font-semibold text-white/80">
                View details →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}