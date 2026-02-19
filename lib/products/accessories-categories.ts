import type { Product } from "./types";

export const accessoryCategoryCards: Product[] = [
  {
    slug: "connectors",
    name: "Connectors",
    category: "Accessories",
    group: "Category",
    short:
      "Sealed connector housings and interconnect components for rugged harness builds.",
    description:
      "Connector housings, terminals, and locking components designed for industrial and mobile equipment applications. Contact Sales for pairing guidance, pin counts, and lead times.",
    highlights: [
      "Multiple pin counts",
      "Cable and panel mount options",
      "Sealed configurations",
      "Field-serviceable designs",
    ],
    specs: [
      { label: "Selection", value: "Pin count, wire gauge, mounting style" },
      {
        label: "Applications",
        value: "Vehicle upfits, automation systems, mobile equipment",
      },
      { label: "Ordering", value: "Contact Sales for quotes and compatibility guidance" },
    ],
    status: "Available",
  },

  // ✅ ADD THIS
  {
    slug: "cable-glands",
    name: "Cable Glands",
    category: "Accessories",
    group: "Category",
    short: "Sealed cable entry glands for enclosure strain relief and clean cable routing.",
    description:
      "Industrial cable glands for secure cable entry, sealing, and strain relief in control enclosures. Contact Sales for sizing guidance, materials, and lead times.",
    highlights: [
      "Sealed strain relief",
      "Clean enclosure cable entry",
      "Industrial panel compatible",
      "Multiple thread standards",
    ],
    specs: [
      { label: "Selection", value: "Thread type (PG/M/NPT), cable OD range, material" },
      { label: "Applications", value: "Control enclosures, junction boxes, vehicle panels" },
      { label: "Ordering", value: "Contact Sales for quotes and compatibility guidance" },
    ],
    status: "Available",
  },

  {
  slug: "consumables",
  name: "Consumables",
  category: "Accessories",
  group: "Category",
  short: "Solder wire, assembly materials, and installation supplies for control systems.",
  description:
    "Industrial solder wire and related consumables for electronics assembly, harness fabrication, and field service applications.",
  highlights: [
    "Industrial-grade solder wire",
    "Assembly and repair compatible",
    "Suitable for control panels and harness builds",
  ],
  specs: [
    { label: "Includes", value: "Solder wire, flux core variants, assembly materials" },
    { label: "Applications", value: "Electronics assembly, harness fabrication, service repair" },
    { label: "Ordering", value: "Contact Sales for quotes and bulk pricing" },
  ],
  status: "Available",
  },

  // ...harness-components, etc.
];