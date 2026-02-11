import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Products</h1>
        <p className="mt-3 text-white/60">
          Controllers and modular expansions built for rugged automation and field deployment.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((p) => (
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
    </div>
  );
}