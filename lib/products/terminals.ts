import type { Product } from "./types";

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ringTerminal(opts: {
  sku: string;
  internalRef?: string;
  wireGauge: string;
  studSize: string;
  plating?: string;
  material?: string;
  notes?: string;
}): Product {
  return {
    slug: slugifySku(opts.sku),
    sku: opts.sku,
    internalRef: opts.internalRef,

    name: `Ring Terminal ${opts.wireGauge} AWG – ${opts.studSize} Stud`,
    short: `Crimp ring terminal for ${opts.wireGauge} AWG wire and ${opts.studSize} stud connections.`,

    category: "Accessories",
    group: "Terminals",
    parentSlug: "terminals",

    wireGauge: opts.wireGauge,

    images: [
      {
        src: `/images/terminals/${opts.sku}.webp`,
        alt: `${opts.sku} ring terminal`,
      },
    ],

    description:
      opts.notes ??
      `Crimp ring terminal for ${opts.wireGauge} AWG wire with ${opts.studSize} stud hole. Suitable for power, grounding, and industrial harness applications.`,

    highlights: [
      "Crimp termination",
      `${opts.wireGauge} AWG wire size`,
      `${opts.studSize} stud size`,
      opts.plating ? `${opts.plating} plated` : "Industrial wiring compatible",
    ],

    specs: [
      { label: "Type", value: "Ring Terminal" },
      { label: "Wire Gauge", value: `${opts.wireGauge} AWG` },
      { label: "Stud Size", value: opts.studSize },
      { label: "Material", value: opts.material ?? "Copper" },
      { label: "Plating", value: opts.plating ?? "Tin" },
    ],

    status: "Available",
  };
}

export const terminalProducts: Product[] = [
  ringTerminal({
    sku: "FC-TERM-RING-6AWG-1-2",
    internalRef: "320344",
    wireGauge: "6",
    studSize: '1/2"',
    material: "Copper",
    plating: "Tin",
    notes:
      "Heavy-duty crimp ring terminal for 6 AWG wire with 1/2 inch stud hole. Suitable for battery, ground, and high-current power connections.",
  }),
];