import type { Product } from "./types";

type TerminalStyle = "Straight" | "Flag" | "Right Angle";

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function studCode(studSize: string) {
  return studSize.replace(/"/g, "").replace(/\//g, "-");
}

function styleLabel(style: TerminalStyle) {
  if (style === "Flag") return "Flag (Side Entry)";
  if (style === "Right Angle") return "Right Angle (90°)";
  return "Straight";
}

function styleCode(style?: TerminalStyle) {
  if (style === "Flag") return "FL";
  if (style === "Right Angle") return "RA";
  return "";
}

function ringSku(opts: {
  wireGauge: string;
  studSize: string;
  style?: TerminalStyle;
}) {
  const suffix = styleCode(opts.style);
  return `FC-TERM-RING-${opts.wireGauge}AWG-${studCode(opts.studSize)}${
    suffix ? `-${suffix}` : ""
  }`;
}

function ringTerminal(opts: {
  wireGauge: string;
  studSize: string;
  internalRef?: string;
  style?: TerminalStyle;
  material?: string;
  plating?: string;
  notes?: string;
}): Product {
  const style = opts.style ?? "Straight";
  const label = styleLabel(style);
  const sku = ringSku({
    wireGauge: opts.wireGauge,
    studSize: opts.studSize,
    style,
  });

  const name =
    style === "Straight"
      ? `Ring Terminal ${opts.wireGauge} AWG – ${opts.studSize} Stud`
      : `${label} Ring Terminal ${opts.wireGauge} AWG – ${opts.studSize} Stud`;

  const short =
    style === "Straight"
      ? `Ring terminal for ${opts.wireGauge} AWG wire.`
      : `${label.toLowerCase()} ring terminal for ${opts.wireGauge} AWG wire.`;

  return {
    slug: slugifySku(sku),
    sku,
    internalRef: opts.internalRef,

    name,
    short,

    category: "Accessories",
    group: "Terminals",
    parentSlug: "terminals",

    wireGauge: opts.wireGauge,
    variantGroup: `RING-${opts.wireGauge}AWG-${studCode(opts.studSize)}`,

    images: [
      {
        src: `/images/terminals/${sku}.webp`,
        alt: `${sku} ring terminal`,
      },
    ],

    description:
      opts.notes ??
      `${
        style === "Straight" ? "" : `${label} `
      }ring terminal for ${opts.wireGauge} AWG wire with ${
        opts.studSize
      } stud hole. Suitable for power, grounding, and industrial wiring applications.`,

    highlights: [
      style === "Straight" ? "Standard orientation" : label,
      "Crimp termination",
      `${opts.wireGauge} AWG wire size`,
      `${opts.studSize} stud size`,
    ],

    specs: [
      { label: "Type", value: "Ring Terminal" },
      { label: "Style", value: label },
      { label: "Wire Gauge", value: `${opts.wireGauge} AWG` },
      { label: "Stud Size", value: opts.studSize },
      { label: "Material", value: opts.material ?? "Copper" },
      { label: "Plating", value: opts.plating ?? "Tin" },
      {
        label: "Ordering",
        value: "Contact Sales for pricing and compatibility guidance",
      },
    ],

    status: "Available",
  };
}

function ringSet(opts: {
  wireGauge: string;
  material?: string;
  plating?: string;
  items: Array<{
    studSize: string;
    internalRef?: string;
    style?: TerminalStyle;
    notes?: string;
  }>;
}) {
  return opts.items.map((item) =>
    ringTerminal({
      wireGauge: opts.wireGauge,
      studSize: item.studSize,
      internalRef: item.internalRef,
      style: item.style,
      notes: item.notes,
      material: opts.material,
      plating: opts.plating,
    })
  );
}

function studRank(stud?: string) {
  const map: Record<string, number> = {
    '1/4"': 0,
    '5/16"': 1,
    '3/8"': 2,
    '1/2"': 3,
  };
  return map[stud ?? ""] ?? 99;
}

function terminalStyleRank(style?: string) {
  if (style?.includes("Flag")) return 1;
  if (style?.includes("Right Angle")) return 2;
  return 0; // Straight first
}

export function sortTerminals(a: Product, b: Product) {
  const styleA = a.specs?.find((s) => s.label === "Style")?.value;
  const styleB = b.specs?.find((s) => s.label === "Style")?.value;

  const sa = terminalStyleRank(styleA);
  const sb = terminalStyleRank(styleB);
  if (sa !== sb) return sa - sb;

  const ga = Number(a.wireGauge ?? 999);
  const gb = Number(b.wireGauge ?? 999);
  if (ga !== gb) return ga - gb;

  const studA = a.specs?.find((s) => s.label === "Stud Size")?.value ?? "";
  const studB = b.specs?.find((s) => s.label === "Stud Size")?.value ?? "";

  const ra = studRank(studA);
  const rb = studRank(studB);
  if (ra !== rb) return ra - rb;

  return (a.sku ?? "").localeCompare(b.sku ?? "");
}

export const terminalProducts: Product[] = [
  ...ringSet({
    wireGauge: "6",
    material: "Copper",
    plating: "Tin",
    items: [
      { studSize: '1/4"', internalRef: "3240095" },
      { studSize: '1/2"', internalRef: "320344" },
      { studSize: '3/8"', internalRef: "322204", style: "Flag" },
    ],
  }),

  ...ringSet({
    wireGauge: "4",
    material: "Copper",
    plating: "Tin",
    items: [
      { studSize: '1/4"', internalRef: "321275", style: "Flag" },
    ],
  }),
].sort(sortTerminals);