import type { Product } from "./types";

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function contact(opts: {
  sku: string;
  name: string;
  short: string;
  size: number;
  style: "Solid" | "Stamped";
  type: "Pin" | "Socket";
  wireGauge?: string;      // e.g. "16–18" or "20-16"
  internalRef?: string;    // your private ATxx-xxxx-xxxxx PN (optional)
  description?: string;    // optional override
}): Product {
  const wireLabel = opts.wireGauge
    ? opts.wireGauge.replace("-", "–") + " AWG"
    : "Varies by application";

  return {
    slug: slugifySku(opts.sku),
    sku: opts.sku,
    internalRef: opts.internalRef,

    name: opts.name,
    short: opts.short,

    description:
      opts.description ??
      `Size ${opts.size} ${opts.style.toLowerCase()} ${opts.type.toLowerCase()} contact for sealed connector systems. Contact Sales for compatibility guidance.`,

    category: "Accessories",
    group: "Contacts",

    wireGauge: opts.wireGauge,

    images: [
      {
        // ✅ Put your images here with exact SKU names:
        // public/images/contacts/FC-CON-CT-16-ST-SK-1618.webp
        src: `/images/contacts/${opts.sku}.webp`,
        alt: opts.name,
      },
    ],

    highlights: [
      `Size ${opts.size}`,
      `${opts.style} construction`,
      `${opts.type} contact`,
      ...(opts.wireGauge ? [`${wireLabel} wire range`] : []),
    ],

    specs: [
      { label: "Contact Size", value: String(opts.size) },
      { label: "Style", value: opts.style },
      { label: "Type", value: opts.type },
      { label: "Wire Gauge", value: wireLabel },
    ],

    status: "Available",
  };
}

export const contactProducts: Product[] = [
  // --- Size 16 (Stamped) 16–18 AWG ---
  contact({
    sku: "FC-CON-CT-16-ST-SK-1618",
    name: "Size 16 Stamped Socket Contact",
    short: "Stamped contact for 16–18 AWG wire",
    size: 16,
    style: "Stamped",
    type: "Socket",
    wireGauge: "16-18",
  }),

  contact({
    sku: "FC-CON-CT-16-ST-PN-1618",
    name: "Size 16 Stamped Pin Contact",
    short: "Stamped contact for 16–18 AWG wire",
    size: 16,
    style: "Stamped",
    type: "Pin",
    wireGauge: "16-18",
  }),

  // --- Size 14 (Stamped) ---
  contact({
    sku: "FC-CON-CT-14-ST-PN-1418",
    name: "Size 14 Stamped Pin Contact",
    short: "Stamped pin contact",
    size: 14,
    style: "Stamped",
    type: "Pin",
  }),

  contact({
    sku: "FC-CON-CT-14-ST-SK-1418",
    name: "Size 14 Stamped Socket Contact",
    short: "Stamped socket contact",
    size: 14,
    style: "Stamped",
    type: "Socket",
  }),

  // --- Size 14 (Solid / Machined) ---
  contact({
    sku: "FC-CON-CT-14-SD-SK",
    name: "Size 14 Solid Socket Contact",
    short: "Solid machined socket contact",
    size: 14,
    style: "Solid",
    type: "Socket",
  }),

  contact({
    sku: "FC-CON-CT-14-SD-PN",
    name: "Size 14 Solid Pin Contact",
    short: "Solid machined pin contact",
    size: 14,
    style: "Solid",
    type: "Pin",
  }),

  // --- Size 12 (Solid / Machined) ---
  contact({
    sku: "FC-CON-CT-12-SD-SK",
    name: "Size 12 Solid Socket Contact",
    short: "Solid machined socket contact",
    size: 12,
    style: "Solid",
    type: "Socket",
  }),

  contact({
    sku: "FC-CON-CT-12-SD-PN",
    name: "Size 12 Solid Pin Contact",
    short: "Solid machined pin contact",
    size: 12,
    style: "Solid",
    type: "Pin",
  }),

  // --- Size 12 (Stamped) ---
  contact({
    sku: "FC-CON-CT-12-ST-SK",
    name: "Size 12 Stamped Socket Contact",
    short: "Stamped socket contact",
    size: 12,
    style: "Stamped",
    type: "Socket",
  }),

  contact({
    sku: "FC-CON-CT-12-ST-PN",
    name: "Size 12 Stamped Pin Contact",
    short: "Stamped pin contact",
    size: 12,
    style: "Stamped",
    type: "Pin",
  }),
];