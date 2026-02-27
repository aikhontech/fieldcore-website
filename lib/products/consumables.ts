import type { Product } from "./types";

export const consumableProducts: Product[] = [
  {
    slug: "fc-solder-60-40-1.5mm",
    name: "60/40 Leaded Solder Wire (1.5mm)",
    sku: "FC-SOLDER-60-40-1.5MM",
    category: "Accessories",
    group: "Consumables",
    short: "Industrial 60/40 tin-lead solder wire for electronics assembly.",
    description:
      "High-quality 60/40 tin-lead solder wire suitable for control systems, PCB assembly, and harness fabrication.",
    highlights: [
      "Rosin core",
      "Consistent melt profile",
      "Suitable for control electronics",
    ],
    specs: [
      { label: "Alloy", value: "Sn60 / Pb40" },
      { label: "Diameter", value: "1.5 mm" },
      { label: "Core", value: "Rosin" },
    ],
    status: "Available",
    images: [
      {
        src: "/images/consumables/FC-SOLDER-60-40-1.5MM.webp",
        alt: "60/40 solder wire",
      },
    ],
  },
];