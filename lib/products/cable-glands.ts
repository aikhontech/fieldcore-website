import type { Product } from "./types";

function gland(opts: {
  sku: string;           // Your FC SKU
  internalRef: string;   // TE part number
  thread: string;        // PG36, M32, NPT1 etc
  color?: string;
  notes?: string;
}): Product {
  const slug = opts.sku.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return {
    slug,
    name: `${opts.thread} Cable Gland`,
    sku: opts.sku,
    internalRef: opts.internalRef,
    category: "Accessories",
    group: "Cable Glands",
    short: `${opts.thread} industrial cable gland for enclosure strain relief.`,
    description:
      opts.notes ??
      "Industrial cable gland for secure cable entry and strain relief in control enclosures.",
    highlights: [
      "Sealed strain relief",
      "Industrial enclosure compatible",
      "Suitable for control panels",
    ],
    specs: [
      { label: "Thread Size", value: opts.thread },
      { label: "Color", value: opts.color ?? "Standard" },
      { label: "Ordering", value: "Contact Sales for pricing and lead times" },
    ],
    status: "Available",

    images: [
      {
        src: `/images/cable-glands/${opts.sku}.webp`,
        alt: `${opts.sku} cable gland`,
      },
    ],
  };
}

export const cableGlandProducts: Product[] = [
  gland({
    sku: "FC-GLAND-PG36-GR",
    internalRef: "1SNG601227R0000",
    thread: "PG36",
    color: "Gray",
  }),
  gland({
    sku: "FC-GLAND-NPT1-BLK",
    internalRef: "1SNG626141R0000",
    thread: "NPT 1\"",
    color: "Black",
  }),
  gland({
    sku: "FC-GLAND-M32-BLK",
    internalRef: "1SNG601108R0000",
    thread: "M32",
    color: "Black",
  }),
];