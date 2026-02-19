import type { Product } from "./types";

export const accessoryCategoryCards: Product[] = [
  {
    slug: "connectors",
    name: "Connectors",
    category: "Accessories",
    group: "Category",
    short: "Sealed connector housings and interconnect components for rugged harness builds.",
    description:
      "Connector housings, terminals, and locking components designed for industrial and mobile equipment applications. Contact Sales for pairing guidance, pin counts, and lead times.",
    highlights: ["Multiple pin counts", "Cable and panel mount options", "Sealed configurations", "Field-serviceable designs"],
    specs: [
      { label: "Selection", value: "Pin count, wire gauge, mounting style" },
      { label: "Applications", value: "Vehicle upfits, automation systems, mobile equipment" },
      { label: "Ordering", value: "Contact Sales for quotes and compatibility guidance" },
    ],
    status: "Available",
  },

  // ...cable-glands, harness-components, etc.
];