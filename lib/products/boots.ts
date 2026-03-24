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
  size: string;
  internalRef?: string;
  style?: string;
  fitment?: string;
  notes?: string;
}): Product {
  return {
    slug: slugifySku(opts.sku),
    sku: opts.sku,
    internalRef: opts.internalRef,

    name: `${opts.color} Terminal Boot (${opts.size})`,
    short: `${opts.color.toLowerCase()} protective boot for ${opts.size.toLowerCase()} cable terminal connections.`,

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
      `${opts.color} protective PVC/rubber boot designed for ${opts.size} cable terminals. Suitable for winch, battery, and high-current power connections, helping protect exposed studs and reduce risk of short circuits.`,

    highlights: [
      `${opts.color} color coding`,
      `${opts.size} cable compatibility`,
      "Protects exposed connections",
      "Helps reduce accidental shorting",
      "Suitable for power cable terminations",
    ],

    specs: [
      { label: "Type", value: "Terminal Boot" },
      { label: "Color", value: opts.color },
      { label: "Cable Size", value: opts.size },
      { label: "Material", value: "PVC / Rubber" },
      { label: "Style", value: opts.style ?? "Straight" },
      {
        label: "Application",
        value: opts.fitment ?? "Terminal and stud protection",
      },
    ],

    status: "Available",
  };
}

export const bootProducts: Product[] = [
  terminalBoot({
    sku: "FC-BOOT-TERM-8AWG-RED",
    color: "Red",
    size: "8 AWG",
    fitment: "Battery, winch, and power terminal protection",
  }),
  terminalBoot({
    sku: "FC-BOOT-TERM-8AWG-BLK",
    color: "Black",
    size: "8 AWG",
    fitment: "Battery, winch, and power terminal protection",
  }),
  terminalBoot({
    sku: "FC-BOOT-TERM-4-1AWG-RED",
    color: "Red",
    size: "4–1 AWG",
    fitment: "High-current battery and winch terminals",
  }),
  terminalBoot({
    sku: "FC-BOOT-TERM-4-1AWG-BLK",
    color: "Black",
    size: "4–1 AWG",
    fitment: "High-current battery and winch terminals",
  }),
];