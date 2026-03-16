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

  {
    slug: "contacts",
    name: "Contacts",
    short: "Pins & Sockets - Stamped and solid contacts in common sizes",
    description:
      "Contact pins and sockets for sealed connector systems. Size 16/14/12 options available.",
    highlights: ["Stamped & Solid", "Pins & Sockets", "Size 16 / 14 / 12"],
    specs: [],
    category: "Accessories",
    group: "Category",
    status: "Available",
  },

  {
    slug: "wedge-locks",
    name: "Wedge Locks",
    short: "Secondary locking wedges for sealed connector housings.",
    description:
      "Wedge locks provide terminal retention assurance and proper contact alignment for compatible connector housings.",
    highlights: [
      "Secondary locking feature",
      "Supports connector terminal retention",
      "Available for multiple connector series",
      "Industrial and vehicle wiring compatible",
    ],
    specs: [
      { label: "Category", value: "Accessories" },
      { label: "Group", value: "Wedge Locks" },
      { label: "Ordering", value: "Contact Sales for pricing and lead times" },
    ],
    category: "Accessories",
    group: "Category",
    parentSlug: "products",
    status: "Available",
  },

  {
  slug: "terminals",
  name: "Terminals",
  short: "Ring terminals, spade terminals, butt splices, and other wire termination hardware.",
  description:
    "Electrical terminals for power distribution, grounding, harness fabrication, and industrial wiring. Contact Sales for stud size, wire gauge, plating, and compatibility guidance.",
  highlights: [
    "Ring, spade, and splice styles",
    "Multiple wire gauge options",
    "Suitable for power and grounding connections",
    "Industrial and vehicle wiring compatible",
  ],
  specs: [
    { label: "Selection", value: "Terminal type, wire gauge, stud size, material/plating" },
    { label: "Applications", value: "Power distribution, grounding, harness fabrication, field wiring" },
    { label: "Ordering", value: "Contact Sales for quotes and compatibility guidance" },
  ],
  category: "Accessories",
  group: "Category",
  status: "Available",
},

  // ...harness-components, etc.
];