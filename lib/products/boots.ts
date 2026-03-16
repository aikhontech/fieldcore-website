import type { Product } from "./types";

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function terminalBoot(opts: {
  sku: string;
  color: "Red" | "Black";
  internalRef?: string;
  style?: string;
  fitment?: string;
  notes?: string;
}): Product {
  return {
    slug: slugifySku(opts.sku),
    sku: opts.sku,
    internalRef: opts.internalRef,

    name: `${opts.color} Terminal Boot`,
    short: `${opts.color.toLowerCase()} protective boot for terminal and stud connections.`,

    category: "Accessories",
    group: "Boots",
    parentSlug: "boots",
    color: opts.color,

    images: [
      {
        src: `/images/boots/${opts.sku}.webp`,
        alt: `${opts.sku} terminal boot`,
      },
    ],

    description:
      opts.notes ??
      `${opts.color} protective PVC/rubber boot for covering exposed terminal or stud connections. Suitable for winch, battery, power, and industrial cable protection.`,

    highlights: [
      `${opts.color} color coding`,
      "Protects exposed connections",
      "Helps reduce accidental shorting",
      "Suitable for power cable terminations",
    ],

    specs: [
      { label: "Type", value: "Terminal Boot" },
      { label: "Color", value: opts.color },
      { label: "Material", value: "PVC / Rubber" },
      { label: "Style", value: opts.style ?? "Straight" },
      { label: "Application", value: opts.fitment ?? "Terminal and stud protection" },
    ],

    status: "Available",
  };
}

export const bootProducts: Product[] = [
  terminalBoot({
    sku: "FC-BOOT-TERM-RED",
    color: "Red",
    fitment: "Winch, battery, and power terminal protection",
  }),
  terminalBoot({
    sku: "FC-BOOT-TERM-BLK",
    color: "Black",
    fitment: "Winch, battery, and power terminal protection",
  }),
];