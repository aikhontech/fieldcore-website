import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <h1 className="text-4xl font-semibold">
          Industrial automation products built for the field.
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Rugged controllers, modular expansion, and future telematics—designed for real-world deployments.
        </p>
        <div className="mt-6">
          <Link
            href="/products"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
}