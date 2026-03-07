import type { Product } from "./types";

export const wedgeLockProducts: Product[] = [
  {
    slug: "atm-wedge-lock",
    name: "ATM Wedge Lock",
    sku: "FC-CON-WL-ATM",
    category: "Accessories",
    group: "Wedge Locks",
    parentSlug: "wedge-locks",

    short: "Secondary locking wedge for ATM series connectors.",

    description:
      "ATM series wedge lock used to secure terminals in sealed connector housings and ensure proper terminal retention.",

    highlights: [
      "Secondary locking feature",
      "Ensures terminal retention",
      "Compatible with ATM series housings",
      "Industrial sealed connector systems",
    ],

    specs: [
      { label: "Connector Series", value: "ATM" },
      { label: "Function", value: "Terminal retention wedge" },
      { label: "Material", value: "Thermoplastic" },
      { label: "Ordering", value: "Contact Sales for pricing and lead times" },
    ],

    status: "Available",
  },

  {
    slug: "at-wedge-lock",
    name: "AT Wedge Lock",
    sku: "FC-CON-WL-AT",
    category: "Accessories",
    group: "Wedge Locks",
    parentSlug: "wedge-locks",

    short: "Secondary locking wedge for AT series connectors.",

    description:
      "AT series wedge lock used to secure terminals and ensure correct positioning inside AT connector housings.",

    highlights: [
      "Secondary terminal lock",
      "Compatible with AT series connectors",
      "Improves terminal retention",
      "Sealed harness systems",
    ],

    specs: [
      { label: "Connector Series", value: "AT" },
      { label: "Function", value: "Terminal retention wedge" },
      { label: "Material", value: "Thermoplastic" },
      { label: "Ordering", value: "Contact Sales for pricing and lead times" },
    ],

    status: "Available",
  },

  {
    slug: "atp-wedge-lock",
    name: "ATP Wedge Lock",
    sku: "FC-CON-WL-ATP",
    category: "Accessories",
    group: "Wedge Locks",
    parentSlug: "wedge-locks",

    short: "Secondary locking wedge for ATP power connectors.",

    description:
      "ATP series wedge lock used in ATP power connector housings to ensure proper terminal alignment and retention.",

    highlights: [
      "Secondary terminal retention",
      "Compatible with ATP series connectors",
      "Power connector systems",
      "Heavy-duty harness builds",
    ],

    specs: [
      { label: "Connector Series", value: "ATP" },
      { label: "Function", value: "Terminal retention wedge" },
      { label: "Material", value: "Thermoplastic" },
      { label: "Ordering", value: "Contact Sales for pricing and lead times" },
    ],

    status: "Available",
  },
];