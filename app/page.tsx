import Link from "next/link";
import { products } from "@/lib/products";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Industrial automation products built for the field.
          </h1>
          <p className="mt-4 text-white/70 md:text-lg">
            Fieldcore Technologies designs PLC-style controllers and modular systems
            for rugged deployments—automation, vehicle upfits, and scalable I/O.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              View Products
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/5"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { t: "Rugged design", d: "Made for noisy, real-world environments." },
            { t: "Modular ecosystem", d: "Scale I/O through expansion modules." },
            { t: "Serviceable", d: "Built to install, maintain, and upgrade." },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold">{x.t}</div>
              <div className="mt-2 text-sm text-white/60">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Products</h2>
            <p className="mt-2 text-white/60">
              PLC controllers and modules designed for industrial and mobile automation.
            </p>
          </div>
          <Link href="/products" className="text-sm text-white/80 hover:text-white">
            See all →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="text-xs text-white/60">{p.status ?? "—"}</div>
              <div className="mt-2 text-lg font-semibold">{p.name}</div>
              <div className="mt-2 text-sm text-white/60">{p.short}</div>
              <div className="mt-4 text-sm font-semibold text-white/80">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold">Need integration help?</h3>
          <p className="mt-3 text-white/60">
            Tell us your application and I/O requirements. We’ll recommend a configuration and next steps.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Contact Fieldcore
          </Link>
        </div>
      </section>
    </div>
  );
}