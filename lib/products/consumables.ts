import type { Product } from "./types";

export const consumableProducts: Product[] = [
  {
    slug: "fc-solder-60-40-1.5mm",
    name: "LEAD-FREE Solder Wire (1.5mm)",
    sku: "FC-SOLDER-ROSIN-CORE-1.5MM",
    category: "Accessories",
    group: "Consumables",
    parentSlug: "consumables",
    short: "Electrical solder wire for wires and electronics assembly.",
    description:
      "High-quality rosin core lead-free solder wire for wires, for control systems, PCB assembly, and harness fabrication.",
    highlights: [
      "Rosin core a non-conductive flux",
      "Consistent melt profile",
      "Suitable for control electronics",
    ],
    specs: [
      { label: "Alloy", value: "Silver bearing solder" },
      { label: "Diameter", value: "1.5 mm" },
      { label: "Core", value: "Rosin flux" },
    ],
    status: "Available",
    images: [
      {
        src: "/images/consumables/FC-SOLDER-ROSIN-CORE-1.5MM.webp",
        alt: "rosin core solder wire",
      },
    ],
  },
];