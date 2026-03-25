import type { Product } from "./types";

export const consumableProducts: Product[] = [
  {
    slug: "fc-solder-rosin-core-1-5mm",
    name: "Lead-Free Solder Wire (1.5mm)",
    sku: "FC-SOLDER-ROSIN-CORE-1.5MM",
    category: "Accessories",
    group: "Consumables",
    parentSlug: "consumables",
    short:
      "Electrical solder wire for wiring, electronics assembly, and repair work.",
    description:
      "High-quality rosin core lead-free solder wire suitable for wiring, control systems, PCB assembly, and harness fabrication.",
    highlights: [
      "Rosin core flux",
      "Consistent melt profile",
      "Suitable for control electronics",
    ],
    specs: [
      { label: "Type", value: "Solder Wire" },
      { label: "Alloy", value: "Silver Bearing" },
      { label: "Diameter", value: "1.5 mm" },
      { label: "Core", value: "Rosin Flux" },
      {
        label: "Ordering",
        value: "Contact Sales for pricing and availability",
      },
    ],
    status: "Available",
    images: [
      {
        src: "/images/consumables/FC-SOLDER-ROSIN-CORE-1.5MM.webp",
        alt: "Lead-free rosin core solder wire",
      },
    ],
  },

  {
    slug: "fc-flux-paste-lf-4oz",
    name: "Lead-Free Soldering Flux Paste (4 oz)",
    sku: "FC-FLUX-PASTE-LF-4OZ",
    category: "Accessories",
    group: "Consumables",
    parentSlug: "consumables",
    short:
      "Lead-free soldering flux paste for soldering, rework, and metal joining applications.",
    description:
      "Lead-free soldering flux paste designed to improve wetting and support clean, reliable solder joints during assembly, repair, and rework. Suitable for general soldering and metal joining applications where flux paste is required.",
    highlights: [
      "Lead-free formulation",
      "Improves solder wetting",
      "Supports clean solder joints",
      "Convenient 4 oz jar",
    ],
    specs: [
      { label: "Type", value: "Flux Paste" },
      { label: "Formulation", value: "Lead-Free" },
      { label: "Package Size", value: "4 oz" },
      { label: "Application", value: "Soldering and Rework" },
      {
        label: "Ordering",
        value: "Contact Sales for pricing and availability",
      },
    ],
    status: "Available",
    images: [
      {
        src: "/images/consumables/FC-FLUX-PASTE-LF-4OZ.webp",
        alt: "Lead-free soldering flux paste 4 oz jar",
      },
    ],
  },

  {
    slug: "fc-flux-no-clean-2oz",
    name: "No-Clean Rosin Paste Flux (2 oz)",
    sku: "FC-FLUX-NO-CLEAN-2OZ",
    internalRef: "NCP291-2OZ",
    category: "Accessories",
    group: "Consumables",
    parentSlug: "consumables",
    short:
      "No-clean rosin paste flux for soldering, touch-up, rework, and electronics assembly.",
    description:
      "No-clean rosin paste flux in a compact jar for soldering, repair, rework, and electronics assembly. Designed to improve solder wetting and support reliable solder joints while minimizing post-solder cleanup requirements.",
    highlights: [
      "No-clean formulation",
      "Rosin paste flux",
      "Supports solder wetting",
      "Compact 2 oz jar",
    ],
    specs: [
      { label: "Type", value: "Flux" },
      { label: "Formulation", value: "No-Clean Rosin" },
      { label: "Form", value: "Jar" },
      { label: "Package Size", value: "2 oz" },
      { label: "Application", value: "Soldering, Rework, and Repair" },
      {
        label: "Ordering",
        value: "Contact Sales for pricing and availability",
      },
    ],
    status: "Available",
    images: [
      {
        src: "/images/consumables/FC-FLUX-NO-CLEAN-2OZ.webp",
        alt: "No-clean rosin paste flux 2 oz jar",
      },
    ],
  },
];