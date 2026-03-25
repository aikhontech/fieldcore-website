import type { Product } from "./types";

type TerminalStyle = "Straight" | "Flag" | "Right Angle";
type InsulationType = "Insulated" | "Non-Insulated";

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cleanCode(value: string) {
  return value
    .toUpperCase()
    .replace(/"/g, "")
    .replace(/\//g, "-")
    .replace(/\s+/g, "")
    .replace(/^#/g, "NO");
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

function insulationLabel(insulation?: InsulationType) {
  return insulation ?? "Non-Insulated";
}

function styleRank(style?: string) {
  if (style?.includes("Straight")) return 0;
  if (style?.includes("Flag")) return 1;
  if (style?.includes("Right Angle")) return 2;
  return 99;
}

function parseGaugeMin(gauge?: string) {
  if (!gauge) return 999;

  const nums = gauge.match(/\d+/g);
  if (!nums || nums.length === 0) return 999;

  return Math.min(...nums.map(Number));
}

function parseGaugeMax(gauge?: string) {
  if (!gauge) return 999;

  const nums = gauge.match(/\d+/g);
  if (!nums || nums.length === 0) return 999;

  return Math.max(...nums.map(Number));
}

function studRank(stud?: string) {
  const normalized = (stud ?? "").trim();

  const map: Record<string, number> = {
    "#6": 0,
    "#8": 1,
    "#10": 2,
    '1/4"': 3,
    '5/16"': 4,
    '3/8"': 5,
    '1/2"': 6,
  };

  return map[normalized] ?? 99;
}

function getSpec(product: Product, label: string) {
  return product.specs?.find((s) => s.label === label)?.value ?? "";
}

function ringSku(opts: {
  wireGauge: string;
  studSize: string;
  style?: TerminalStyle;
}) {
  const suffix = styleCode(opts.style);
  return `FC-TERM-RING-${cleanCode(opts.wireGauge)}AWG-${cleanCode(
    opts.studSize
  )}${suffix ? `-${suffix}` : ""}`;
}

function ringTerminal(opts: {
  wireGauge: string;
  studSize: string;
  internalRef?: string;
  style?: TerminalStyle;
  insulation?: InsulationType;
  material?: string;
  plating?: string;
  notes?: string;
}): Product {
  const style = opts.style ?? "Straight";
  const styleText = styleLabel(style);
  const insulation = insulationLabel(opts.insulation);
  const sku = ringSku({
    wireGauge: opts.wireGauge,
    studSize: opts.studSize,
    style,
  });

  const name =
    style === "Straight"
      ? `Ring Terminal ${opts.wireGauge} AWG – ${opts.studSize} Stud`
      : `${styleText} Ring Terminal ${opts.wireGauge} AWG – ${opts.studSize} Stud`;

  const short =
    style === "Straight"
      ? `Ring terminal for ${opts.wireGauge} AWG wire.`
      : `${styleText.toLowerCase()} ring terminal for ${opts.wireGauge} AWG wire.`;

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
    variantGroup: `RING-${cleanCode(opts.wireGauge)}AWG-${cleanCode(
      opts.studSize
    )}`,

    images: [
      {
        src: `/images/terminals/${sku}.webp`,
        alt: `${sku} ring terminal`,
      },
    ],

    description:
      opts.notes ??
      `${
        style === "Straight" ? "" : `${styleText} `
      }ring terminal for ${opts.wireGauge} AWG wire with ${
        opts.studSize
      } stud hole. Suitable for power, grounding, and industrial wiring applications.`,

    highlights: [
      "Ring terminal",
      style === "Straight" ? "Standard orientation" : styleText,
      insulation,
      "Crimp termination",
      `${opts.wireGauge} AWG wire size`,
      `${opts.studSize} stud size`,
    ],

    specs: [
      { label: "Type", value: "Ring Terminal" },
      { label: "Style", value: styleText },
      { label: "Wire Gauge", value: `${opts.wireGauge} AWG` },
      { label: "Stud Size", value: opts.studSize },
      { label: "Insulation", value: insulation },
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
  insulation?: InsulationType;
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
      insulation: opts.insulation,
    })
  );
}

export function sortTerminals(a: Product, b: Product) {
  const ga = parseGaugeMin(a.wireGauge);
  const gb = parseGaugeMin(b.wireGauge);
  if (ga !== gb) return ga - gb;

  const gxa = parseGaugeMax(a.wireGauge);
  const gxb = parseGaugeMax(b.wireGauge);
  if (gxa !== gxb) return gxa - gxb;

  const styleA = getSpec(a, "Style");
  const styleB = getSpec(b, "Style");

  const sa = styleRank(styleA);
  const sb = styleRank(styleB);
  if (sa !== sb) return sa - sb;

  const studA = getSpec(a, "Stud Size");
  const studB = getSpec(b, "Stud Size");

  const ra = studRank(studA);
  const rb = studRank(studB);
  if (ra !== rb) return ra - rb;

  return (a.sku ?? "").localeCompare(b.sku ?? "");
}

export function getTerminalGaugeKey(product: Product) {
  return (product.wireGauge ?? "").trim();
}

export function filterTerminalsByGauge(products: Product[], wireGauge: string) {
  return products.filter((p) => (p.wireGauge ?? "").trim() === wireGauge.trim());
}

export function getTerminalGaugeOptions(products: Product[]) {
  const seen = new Set<string>();

  products.forEach((p) => {
    const gauge = getTerminalGaugeKey(p);
    if (gauge) seen.add(gauge);
  });

  return Array.from(seen).sort((a, b) => {
    const amin = parseGaugeMin(a);
    const bmin = parseGaugeMin(b);
    if (amin !== bmin) return amin - bmin;

    const amax = parseGaugeMax(a);
    const bmax = parseGaugeMax(b);
    if (amax !== bmax) return amax - bmax;

    return a.localeCompare(b);
  });
}

export const terminalProducts: Product[] = [
  ...ringSet({
    wireGauge: "4",
    material: "Copper",
    plating: "Tin",
    insulation: "Non-Insulated",
    items: [
      { studSize: '1/4"', internalRef: "321275", style: "Flag" },
      { studSize: '5/16"', internalRef: "DRNB8-25" },
      { studSize: '5/16"', internalRef: "FGNB22-8", style: "Flag" },
    ],
  }),

  ...ringSet({
    wireGauge: "6",
    material: "Copper",
    plating: "Tin",
    insulation: "Non-Insulated",
    items: [
      { studSize: '1/4"', internalRef: "3240095" },
      { studSize: '5/16"', internalRef: "DRNB8-16" },
      { studSize: '3/8"', internalRef: "322204", style: "Flag" },
      { studSize: '1/2"', internalRef: "320344" },
      { studSize: '1/4"', internalRef: "FG14-6", style: "Flag" },
    ],
  }),

  ...ringSet({
    wireGauge: "8",
    material: "Copper",
    plating: "Tin",
    insulation: "Non-Insulated",
    items: [{ studSize: '5/16"', internalRef: "FGNB8-8", style: "Flag" }],
  }),
].sort(sortTerminals);