export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  images?: { src: string; alt: string }[];
  status?: "Available" | "In Development" | "Prototype";

  // NEW (optional, won't break anything)
  category?: "Controllers" | "Accessories";
  group?: string; // e.g. "Industrial Connectors", "Cable Glands"
  sku?: string;          // public Fieldcore part number
  internalRef?: string;  // private manufacturer ref (not shown)
  positions?: number;    // 2, 4, 6...
  series?: string;       // AT / ATM / ATP (internal use)
  wireGauge?: string;    // "20-16", "14-12", etc
};

export const products: Product[] = [
  {
    slug: "plc-v1",
    name: "PLC V1",
    category: "Controllers",
    short: "Industrial control module for reliable field automation and vehicle upfitting.",
    description: "A rugged industrial controller designed for real-world I/O...",
    images: [
      { src: "/images/plc-v1-nice.png", alt: "PLC V1 hero view"  },
      { src: "/images/plc-v1-side1.png", alt: "PLC V1 top view" },
      { src: "/images/plc-v1-together-best.png", alt: "PLC V1 multiple angles" },
    ],
    highlights: [
      "Multiple digital inputs and relay outputs",
      "Designed for noisy environments",
      "Expandable ecosystem",
      "Field-serviceable wiring terminals",
    ],
    specs: [
      { label: "I/O", value: "Digital inputs, relay outputs, analog channels" },
      { label: "Power", value: "Designed for rugged deployments" },
      { label: "Use cases", value: "Automation, vehicle upfits, remote control" },
    ],
    status: "Prototype",
  },
  {
    slug: "io-expansion-module",
    name: "I/O Expansion Module",
    short: "Add more inputs/outputs with a modular expansion approach.",
    description:
      "Expansion module concept for adding extra channels and specialized I/O while keeping the main controller simple and robust.",
    highlights: [
      "Modular expansion",
      "Flexible channel mapping",
      "Designed for clean wiring and service",
    ],
    specs: [
      { label: "Form factor", value: "Compact module" },
      { label: "Integration", value: "Works alongside PLC Controller V1" },
      { label: "Status", value: "In development" },
    ],
    status: "In Development",
  },
  {
    slug: "telematics-gateway",
    name: "Telematics Gateway",
    short: "Remote monitoring and data logging gateway for field systems.",
    description:
      "Gateway concept for telemetry, event logging, and remote status reporting—built for future product ecosystem integration.",
    highlights: [
      "Remote monitoring concept",
      "Data logging + event tracking",
      "Designed for field deployments",
    ],
    specs: [
      { label: "Functions", value: "Logging, monitoring, reporting" },
      { label: "Status", value: "In development" },
    ],
    status: "In Development",
  },
  // --- Accessories (for launch / visit-ready) ---
    {
    slug: "connectors",
    name: "Connectors",
    category: "Accessories",
    group: "Category",
    short: "Sealed connector housings and interconnect components for rugged harness builds.",
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
      { label: "Applications", value: "Vehicle upfits, automation systems, mobile equipment" },
      { label: "Ordering", value: "Contact Sales for quotes and compatibility guidance" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-002p-plug-blk",
    name: "2-Position Sealed Plug Housing",
    sku: "FC-CONN-002P-PLUG-BLK",
    internalRef: "AT06-2S-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 2,
    series: "AT",
    wireGauge: "20-16",
    short: "2-position sealed plug housing for rugged harness builds.",
    description:
      "Compact 2-position sealed plug housing suitable for mobile and industrial environments. Compatible with commonly used sealed automotive crimp contacts and locking wedge inserts.",
    highlights: [
      "Compatible with commonly used sealed automotive crimp contacts and locking wedge inserts.",
      "Sealed configuration",
      "Field-serviceable design",
    ],
    images: [
      { src: "/images/connectors/FC-CONN-2P-PLUG-BLK.webp", alt: "2 Pin Sealed Plug Connector" }
    ],
    specs: [
      { label: "Pin Count", value: "2" },
      { label: "Type", value: "Plug Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-002p-receptacle-blk",
    name: "2-Position Sealed Receptacle Housing",
    sku: "FC-CONN-002P-REC-BLK",
    internalRef: "AT04-2P-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 2,
    series: "AT",
    wireGauge: "20-16",
    short: "2-position sealed receptacle housing for rugged harness builds.",
    description:
      "2-position sealed receptacle housing suitable for mobile and industrial environments. Compatible with commonly used sealed automotive crimp contacts and locking wedge inserts.",
    highlights: [
      "Compatible with commonly used sealed automotive crimp contacts and locking wedge inserts.",
      "Sealed configuration",
      "Field-serviceable design",
    ],
    images: [
    { src: "/images/connectors/FC-CONN-2P-REC-BLK.webp", alt: "2 Pin Sealed Receptacle Connector" }
    ],
    specs: [
      { label: "Pin Count", value: "2" },
      { label: "Type", value: "Receptacle Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },

    // --- Connectors: Additional SKUs ---

  {
    slug: "fc-conn-003p-plug-blk",
    name: "3-Position Sealed Plug Housing",
    sku: "FC-CONN-003P-PLUG-BLK",
    internalRef: "AT06-3S-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 3,
    series: "AT",
    wireGauge: "20-16",
    short: "3-position sealed plug housing for rugged harness builds.",
    description:
      "Compact 3-position sealed plug housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-3P-PLUG-BLK.webp", alt: "3 Pin Sealed Plug Connector" }],
    specs: [
      { label: "Pin Count", value: "3" },
      { label: "Type", value: "Plug Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-003p-receptacle-blk",
    name: "3-Position Sealed Receptacle Housing",
    sku: "FC-CONN-003P-REC-BLK",
    internalRef: "AT04-3P-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 3,
    series: "AT",
    wireGauge: "20-16",
    short: "3-position sealed receptacle housing for rugged harness builds.",
    description:
      "3-position sealed receptacle housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-3P-REC-BLK.webp", alt: "3 Pin Sealed Receptacle Connector" }],
    specs: [
      { label: "Pin Count", value: "3" },
      { label: "Type", value: "Receptacle Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },

  {
    slug: "fc-conn-004p-plug-blk",
    name: "4-Position Sealed Plug Housing",
    sku: "FC-CONN-004P-PLUG-BLK",
    internalRef: "AT06-4S-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 4,
    series: "AT",
    wireGauge: "20-16",
    short: "4-position sealed plug housing for rugged harness builds.",
    description:
      "Compact 4-position sealed plug housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-4P-PLUG-BLK.webp", alt: "4 Pin Sealed Plug Connector" }],
    specs: [
      { label: "Pin Count", value: "4" },
      { label: "Type", value: "Plug Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-004p-receptacle-blk",
    name: "4-Position Sealed Receptacle Housing",
    sku: "FC-CONN-004P-REC-BLK",
    internalRef: "AT04-4P-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 4,
    series: "AT",
    wireGauge: "20-16",
    short: "4-position sealed receptacle housing for rugged harness builds.",
    description:
      "4-position sealed receptacle housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-4P-REC-BLK.webp", alt: "4 Pin Sealed Receptacle Connector" }],
    specs: [
      { label: "Pin Count", value: "4" },
      { label: "Type", value: "Receptacle Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },

  {
    slug: "fc-conn-006p-plug-blk",
    name: "6-Position Sealed Plug Housing",
    sku: "FC-CONN-006P-PLUG-BLK",
    internalRef: "AT06-6S-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 6,
    series: "AT",
    wireGauge: "20-16",
    short: "6-position sealed plug housing for rugged harness builds.",
    description:
      "Compact 6-position sealed plug housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-6P-PLUG-BLK.webp", alt: "6 Pin Sealed Plug Connector" }],
    specs: [
      { label: "Pin Count", value: "6" },
      { label: "Type", value: "Plug Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-006p-receptacle-blk",
    name: "6-Position Sealed Receptacle Housing",
    sku: "FC-CONN-006P-REC-BLK",
    internalRef: "AT04-6P-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 6,
    series: "AT",
    wireGauge: "20-16",
    short: "6-position sealed receptacle housing for rugged harness builds.",
    description:
      "6-position sealed receptacle housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-6P-REC-BLK.jpg", alt: "6 Pin Sealed Receptacle Connector" }],
    specs: [
      { label: "Pin Count", value: "6" },
      { label: "Type", value: "Receptacle Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },

  {
    slug: "fc-conn-008p-plug-blk",
    name: "8-Position Sealed Plug Housing",
    sku: "FC-CONN-008P-PLUG-BLK",
    internalRef: "AT06-8S-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 8,
    series: "AT",
    wireGauge: "20-16",
    short: "8-position sealed plug housing for rugged harness builds.",
    description:
      "Compact 8-position sealed plug housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-8P-PLUG-BLK.webp", alt: "8 Pin Sealed Plug Connector" }],
    specs: [
      { label: "Pin Count", value: "8" },
      { label: "Type", value: "Plug Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-008p-receptacle-blk",
    name: "8-Position Sealed Receptacle Housing",
    sku: "FC-CONN-008P-REC-BLK",
    internalRef: "AT04-8P-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 8,
    series: "AT",
    wireGauge: "20-16",
    short: "8-position sealed receptacle housing for rugged harness builds.",
    description:
      "8-position sealed receptacle housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-8P-REC-BLK.webp", alt: "8 Pin Sealed Receptacle Connector" }],
    specs: [
      { label: "Pin Count", value: "8" },
      { label: "Type", value: "Receptacle Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },

  {
    slug: "fc-conn-012p-plug-blk",
    name: "12-Position Sealed Plug Housing",
    sku: "FC-CONN-012P-PLUG-BLK",
    internalRef: "AT06-12S-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 12,
    series: "AT",
    wireGauge: "20-16",
    short: "12-position sealed plug housing for rugged harness builds.",
    description:
      "Compact 12-position sealed plug housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-12P-PLUG-BLK.webp", alt: "12 Pin Sealed Plug Connector" }],
    specs: [
      { label: "Pin Count", value: "12" },
      { label: "Type", value: "Plug Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },
  {
    slug: "fc-conn-012p-receptacle-blk",
    name: "12-Position Sealed Receptacle Housing",
    sku: "FC-CONN-012P-REC-BLK",
    internalRef: "AT04-12P-BLK",
    category: "Accessories",
    group: "Connectors",
    positions: 12,
    series: "AT",
    wireGauge: "20-16",
    short: "12-position sealed receptacle housing for rugged harness builds.",
    description:
      "12-position sealed receptacle housing suitable for mobile and industrial environments.",
    highlights: ["Sealed configuration", "Field-serviceable design"],
    images: [{ src: "/images/connectors/FC-CONN-12P-REC-BLK.webp", alt: "12 Pin Sealed Receptacle Connector" }],
    specs: [
      { label: "Pin Count", value: "12" },
      { label: "Type", value: "Receptacle Housing" },
      { label: "Wire Gauge", value: "20–16 AWG (typical)" },
    ],
    status: "Available",
  },


  {
    slug: "cable-glands",
    name: "Cable Glands",
    category: "Accessories",
    group: "Category",
    short: "Strain relief and sealing solutions for enclosure cable entries.",
    description:
      "Cable gland options for clean enclosure entries, strain relief, and environmental sealing. Contact Sales for size selection and bundle quotes.",
    highlights: ["Sealing + strain relief", "Multiple sizes available", "Clean enclosure routing"],
    specs: [
      { label: "Use cases", value: "Enclosures, junction boxes, control panels" },
      { label: "Selection", value: "Cable OD range, thread type, sealing needs" },
      { label: "Ordering", value: "Contact Sales" },
    ],
    status: "Available",
  },
  {
    slug: "harness-components",
    name: "Harness Components",
    category: "Accessories",
    group: "Category",
    short: "Core components for looms and clean wiring builds.",
    description:
      "Harness components used in Fieldcore builds—ideal for producing tidy, serviceable wiring looms. Contact Sales for recommended bundles.",
    highlights: [
      "Loom-friendly build components",
      "Supports serviceable wiring practices",
      "Bundled kits available",
    ],
    specs: [
      { label: "Includes", value: "Terminals, seals, boots, housings (as needed)" },
      { label: "Use cases", value: "Vehicle harnessing, field wiring looms" },
      { label: "Ordering", value: "Contact Sales" },
    ],
    status: "Available",
  },
  {
    slug: "wire-loom-protection",
    name: "Wire Loom Protection",
    category: "Accessories",
    group: "Category",
    short: "Abrasion and heat protection for wiring looms.",
    description:
      "Protection options for wiring looms including abrasion resistance and clean routing solutions. Contact Sales for recommended combinations.",
    highlights: ["Abrasion protection", "Clean routing", "Harsh environment focused"],
    specs: [
      { label: "Use cases", value: "Mobile equipment, vibration areas, exposed routes" },
      { label: "Selection", value: "Diameter, material, routing constraints" },
      { label: "Ordering", value: "Contact Sales" },
    ],
    status: "Available",
  },
  {
    slug: "enclosures",
    name: "Enclosures",
    category: "Accessories",
    group: "Category",
    short: "Mounting and protection options for control hardware.",
    description:
      "Enclosure options suitable for control installations. Contact Sales for sizing guidance and mounting compatibility with Fieldcore controllers.",
    highlights: ["Protection + mounting", "Serviceability focused", "Integration support"],
    specs: [
      { label: "Use cases", value: "Vehicle upfits, mobile installations, control panels" },
      { label: "Selection", value: "Size, mounting, sealing needs" },
      { label: "Ordering", value: "Contact Sales" },
    ],
    status: "In Development",
  },
  {
    slug: "mounting-hardware",
    name: "Mounting Hardware",
    category: "Accessories",
    group: "Category",
    short: "DIN rail, brackets, fasteners, and mounting solutions.",
    description:
      "Mounting options for clean installs, service access, and stable hardware placement. Contact Sales for recommended mounting kits.",
    highlights: ["Clean install", "Service access", "Stable mounting"],
    specs: [
      { label: "Use cases", value: "Panels, vehicles, equipment enclosures" },
      { label: "Ordering", value: "Contact Sales" },
    ],
    status: "In Development",
  },
];

export function getProduct(slug?: string) {
  const normalized = decodeURIComponent((slug ?? "").trim().toLowerCase());
  return products.find((p) => p.slug.toLowerCase() === normalized);
}