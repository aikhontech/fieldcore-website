"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { sortConnectors } from "@/lib/products/connectors";

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export default function ConnectorCatalog({ items }: { items: Product[] }) {
  // Build filter options from what exists
  const seriesOptions = useMemo(
    () => uniq(items.map(i => i.series).filter(Boolean)) as string[],
    [items]
  );
  const pinOptions = useMemo(
    () => uniq(items.map(i => i.positions).filter(Boolean)) as number[],
    [items]
  );
  const colorOptions = useMemo(
    () => uniq(items.map(i => i.color).filter(Boolean)) as string[],
    [items]
  );

  const SERIES_LABEL: Record<string, string> = {
  ATM: "Micro (1-digit)",
  AT: "Standard (2-digit)",
  ATP: "Power (3-digit)",
  HDP20: "HDP20",
  AHDP: "AHDP",
};

  // Filters
  const [series, setSeries] = useState<string>("All");
  const [pins, setPins] = useState<string>("All");
  const [color, setColor] = useState<string>("All");

  const filtered = useMemo(() => {
    const list = items.filter(p => {
      if (series !== "All" && p.series !== series) return false;
      if (pins !== "All" && String(p.positions ?? "") !== pins) return false;
      if (color !== "All" && p.color !== color) return false;
      return true;
    });

    return [...list].sort(sortConnectors);
  }, [items, series, pins, color]);

  // Quick lookup for mates
  const bySlug = useMemo(() => {
    const m = new Map<string, Product>();
    items.forEach(p => m.set(p.slug, p));
    return m;
  }, [items]);

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="text-sm font-semibold">Filter</div>

          <select
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm"
            value={series}
            onChange={(e) => setSeries(e.target.value)}
          >
            <option value="All">All families</option>
            {seriesOptions.map((s) => (
              <option key={s} value={s}>
                {SERIES_LABEL[s] ?? s}
              </option>
            ))}
          </select>

          <select
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm"
            value={pins}
            onChange={(e) => setPins(e.target.value)}
          >
            <option value="All">All pin counts</option>
            {pinOptions.sort((a,b)=>a-b).map(n => (
              <option key={n} value={String(n)}>{n}</option>
            ))}
          </select>

          <select
            className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="All">All colors</option>
            {colorOptions.sort().map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="mt-3 text-xs text-white/60">
          Showing <span className="text-white/80">{filtered.length}</span> items
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map((p) => {
          const mates = (p.matesWith ?? [])
            .map(slug => bySlug.get(slug))
            .filter(Boolean) as Product[];

          return (
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
              <div className="mt-2 text-lg font-semibold">{p.sku ?? p.name}</div>

              <div className="mt-2 text-sm text-white/60">{p.short}</div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
                {p.series ? (
                  <span className="rounded-lg border border-white/10 px-2 py-1">
                    {SERIES_LABEL[p.series] ?? p.series}
                  </span>
                ) : null}
                {p.positions ? <span className="rounded-lg border border-white/10 px-2 py-1">{p.positions} pos</span> : null}
                {p.color ? <span className="rounded-lg border border-white/10 px-2 py-1">{p.color}</span> : null}
              </div>

              {mates.length ? (
                <div className="mt-4 text-xs text-white/60">
                  Mates with:{" "}
                  <span className="text-white/80">
                    {mates.map(m => m.sku ?? m.name).join(", ")}
                  </span>
                </div>
              ) : null}

              <div className="mt-4 text-sm font-semibold text-white/80">View details →</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}