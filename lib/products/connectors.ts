import type { Product } from "./types";

/**
 * Internal-only sorting keys (NOT shown to customers unless you render them).
 */
const SERIES_ORDER: Record<string, number> = {
  ATM: 0,
  AT: 1,
  ATP: 2,
  HDP20: 3,
  AHDP: 4,
};

const COLOR_ORDER: Record<string, number> = {
  BLK: 0,
  BLU: 1,
  RED: 2,
  GRN: 3,
  BRN: 4,
};

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isPlugFromSku(sku: string) {
  // Rectangle: ...-02P-... (plug) vs ...-02S-... (receptacle)
  // Round: ...-08PA... (plug) vs ...-08SA... (receptacle)
  return /-0?\d+(?:\d)?P-/.test(sku) || /-0?\d+-0?\d+PA\b/.test(sku) || sku.includes("-PLUG-");
}

function conn(opts: {
  sku: string;            // FC-CONN-RE-03P-BLK, FC-CONN-RO-18-08PA-SRA, etc.
  internalRef: string;    // AT06-3S-BLK etc (private)
  positions: number;
  series: string;         // internal only (ATM/AT/ATP/HDP20/AHDP)
  family: "RE" | "RO";    // rectangle vs round/circular
  wireGauge?: string;
  color?: string;
  matesWith?: string[];
  notes?: string;         // optional description override
}): Product {
  const slug = slugifySku(opts.sku);
  const plug = isPlugFromSku(opts.sku);
  const side = plug ? "Plug" : "Receptacle";

  const name =
    opts.family === "RO"
      ? `${opts.positions}-Position Circular ${side}`
      : `${opts.positions}-Position Sealed ${side} Housing`;

  const short =
    opts.family === "RO"
      ? `${opts.positions}-position circular ${side.toLowerCase()} for rugged harness builds.`
      : `${opts.positions}-position sealed ${side.toLowerCase()} housing for rugged harness builds.`;

  return {
    slug,
    name,
    sku: opts.sku,
    internalRef: opts.internalRef,
    category: "Accessories",
    group: "Connectors",
    positions: opts.positions,
    series: opts.series,
    wireGauge: opts.wireGauge,
    color: opts.color,
    matesWith: opts.matesWith,
    // group color variants together (BLK/BLU/RED/GRN/BRN)
    variantGroup: opts.sku.replace(/-(BLK|BLU|RED|GRN|BRN)$/i, ""),
    short,

    images: [
  {
    src: `/images/connectors/${opts.sku}.webp`,
    alt: `${opts.sku} connector`  
  },

],

    description:
      opts.notes ??
      (opts.family === "RO"
        ? "Circular connector used for harsh-environment interconnects. Contact Sales for compatibility guidance."
        : "Sealed connector housing suitable for mobile and industrial environments. Contact Sales for compatibility guidance."),
    highlights: ["Sealed configuration", "Field-serviceable design"],
    specs: [
      { label: "Pin Count", value: String(opts.positions) },
      { label: "Wire Gauge", value: opts.wireGauge ? `${opts.wireGauge} AWG (typical)` : "Varies by application" },
      { label: "Ordering", value: "Contact Sales for quotes and compatibility guidance" },
    ],
    status: "Available",
  };
}

/**
 * Sort: series -> pin count -> plug before receptacle -> color -> sku
 */
export function sortConnectors(a: Product, b: Product) {
  const sa = SERIES_ORDER[a.series ?? "ZZZ"] ?? 99;
  const sb = SERIES_ORDER[b.series ?? "ZZZ"] ?? 99;
  if (sa !== sb) return sa - sb;

  const pa = a.positions ?? 999;
  const pb = b.positions ?? 999;
  if (pa !== pb) return pa - pb;

  const aPlug = isPlugFromSku(a.sku ?? "");
  const bPlug = isPlugFromSku(b.sku ?? "");
  if (aPlug !== bPlug) return aPlug ? -1 : 1;

  const ca = COLOR_ORDER[a.color ?? "ZZZ"] ?? 99;
  const cb = COLOR_ORDER[b.color ?? "ZZZ"] ?? 99;
  if (ca !== cb) return ca - cb;

  return (a.sku ?? a.name).localeCompare(b.sku ?? b.name);
}

export const connectorProducts: Product[] = [
  // -------------------
  // AT (2-digit) BLACK
  // -------------------
  conn({ sku: "FC-CONN-RE-02P-BLK", internalRef: "AT06-2S-BLK", positions: 2, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-02s-blk"] }),
  conn({ sku: "FC-CONN-RE-02S-BLK", internalRef: "AT04-2P-BLK", positions: 2, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-02p-blk"] }),

  conn({ sku: "FC-CONN-RE-03P-BLK", internalRef: "AT06-3S-BLK", positions: 3, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-03s-blk"] }),
  conn({ sku: "FC-CONN-RE-03S-BLK", internalRef: "AT04-3P-BLK", positions: 3, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-03p-blk"] }),

  conn({ sku: "FC-CONN-RE-04P-BLK", internalRef: "AT06-4S-BLK", positions: 4, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-04s-blk"] }),
  conn({ sku: "FC-CONN-RE-04S-BLK", internalRef: "AT04-4P-BLK", positions: 4, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-04p-blk"] }),

  conn({ sku: "FC-CONN-RE-06P-BLK", internalRef: "AT06-6S-BLK", positions: 6, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-06s-blk"] }),
  conn({ sku: "FC-CONN-RE-06S-BLK", internalRef: "AT04-6P-BLK", positions: 6, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-06p-blk"] }),

  // 8-position KEY A (black)
  conn({ sku: "FC-CONN-RE-08P-A-BLK", internalRef: "AT06-08SA-BLK", positions: 8, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-08s-a-blk"], notes: "Key Position A sealed 8-position plug housing." }),
  conn({ sku: "FC-CONN-RE-08S-A-BLK", internalRef: "AT04-08PA-BLK", positions: 8, series: "AT", family: "RE", wireGauge: "20-16", color: "BLK", matesWith: ["fc-conn-re-08p-a-blk"], notes: "Key Position A sealed 8-position receptacle housing." }),

  // -------------------
  // AT COLOR VARIANTS (match color only)
  // -------------------
  conn({ sku: "FC-CONN-RE-02P-BLU", internalRef: "AT06-2S-BLU", positions: 2, series: "AT", family: "RE", wireGauge: "20-16", color: "BLU", matesWith: ["fc-conn-re-02s-blu"] }),
  conn({ sku: "FC-CONN-RE-02S-BLU", internalRef: "AT04-2P-BLU", positions: 2, series: "AT", family: "RE", wireGauge: "20-16", color: "BLU", matesWith: ["fc-conn-re-02p-blu"] }),

  conn({ sku: "FC-CONN-RE-02P-RED", internalRef: "AT06-2S-RED", positions: 2, series: "AT", family: "RE", wireGauge: "20-16", color: "RED", matesWith: ["fc-conn-re-02s-red"] }),
  conn({ sku: "FC-CONN-RE-02S-RED", internalRef: "AT04-2P-RED", positions: 2, series: "AT", family: "RE", wireGauge: "20-16", color: "RED", matesWith: ["fc-conn-re-02p-red"] }),

  conn({ sku: "FC-CONN-RE-03P-BLU", internalRef: "AT06-3S-BLU", positions: 3, series: "AT", family: "RE", wireGauge: "20-16", color: "BLU", matesWith: ["fc-conn-re-03s-blu"] }),
  conn({ sku: "FC-CONN-RE-03S-BLU", internalRef: "AT04-3P-BLU", positions: 3, series: "AT", family: "RE", wireGauge: "20-16", color: "BLU", matesWith: ["fc-conn-re-03p-blu"] }),

  conn({ sku: "FC-CONN-RE-03P-GRN", internalRef: "AT06-3S-GRN", positions: 3, series: "AT", family: "RE", wireGauge: "20-16", color: "GRN", matesWith: ["fc-conn-re-03s-grn"] }),
  conn({ sku: "FC-CONN-RE-03S-GRN", internalRef: "AT04-3P-GRN", positions: 3, series: "AT", family: "RE", wireGauge: "20-16", color: "GRN", matesWith: ["fc-conn-re-03p-grn"] }),

  conn({ sku: "FC-CONN-RE-04P-GRN", internalRef: "AT06-4S-GRN", positions: 4, series: "AT", family: "RE", wireGauge: "20-16", color: "GRN", matesWith: ["fc-conn-re-04s-grn"] }),
  conn({ sku: "FC-CONN-RE-04S-GRN", internalRef: "AT04-4P-GRN", positions: 4, series: "AT", family: "RE", wireGauge: "20-16", color: "GRN", matesWith: ["fc-conn-re-04p-grn"] }),

  conn({ sku: "FC-CONN-RE-04P-BRN", internalRef: "AT06-4S-BRN", positions: 4, series: "AT", family: "RE", wireGauge: "20-16", color: "BRN" }),
  conn({ sku: "FC-CONN-RE-04S-BLU", internalRef: "AT04-4P-BLU", positions: 4, series: "AT", family: "RE", wireGauge: "20-16", color: "BLU" }),

  // -------------------
  // ATP (3-digit) BLACK
  // -------------------
  conn({ sku: "FC-CONN-RE-002P-BLK", internalRef: "ATP06-2S-BLK", positions: 2, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-002s-blk"] }),
  conn({ sku: "FC-CONN-RE-002S-BLK", internalRef: "ATP04-2P-BLK", positions: 2, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-002p-blk"] }),

  conn({ sku: "FC-CONN-RE-004P-BLK", internalRef: "ATP06-4S-BLK", positions: 4, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-004s-blk"] }),
  conn({ sku: "FC-CONN-RE-004S-BLK", internalRef: "ATP04-4P-BLK", positions: 4, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-004p-blk"] }),

  conn({ sku: "FC-CONN-RE-006P-BLK", internalRef: "ATP06-6S-BLK", positions: 6, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-006s-blk"] }),
  conn({ sku: "FC-CONN-RE-006S-BLK", internalRef: "ATP04-6P-BLK", positions: 6, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-006p-blk"] }),

  // ATP “no color code” SKUs (kept neutral)
  conn({ sku: "FC-CONN-RE-006P", internalRef: "ATP06-6S", positions: 6, series: "ATP", family: "RE", matesWith: ["fc-conn-re-006s"] }),
  conn({ sku: "FC-CONN-RE-006S", internalRef: "ATP04-6P", positions: 6, series: "ATP", family: "RE", matesWith: ["fc-conn-re-006p"] }),

  // ATP MM01BLK variant pair
  conn({ sku: "FC-CONN-RE-004P-MM01BLK", internalRef: "ATP06-4S-MM01BLK", positions: 4, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-004s-mm01blk"], notes: "ATP 4-position plug housing (MM01 variant)." }),
  conn({ sku: "FC-CONN-RE-004S-MM01BLK", internalRef: "ATP04-4P-MM01BLK", positions: 4, series: "ATP", family: "RE", color: "BLK", matesWith: ["fc-conn-re-004p-mm01blk"], notes: "ATP 4-position receptacle housing (MM01 variant)." }),

  // -------------------
  // TE HDP20 (Round/Circular)
  // -------------------
  conn({ sku: "FC-CONN-RO-H20-18-08PA", internalRef: "HDP26-18-8PN", positions: 8, series: "HDP20", family: "RO", matesWith: ["fc-conn-ro-h20-18-08sa"] }),
  conn({ sku: "FC-CONN-RO-H20-18-08SA", internalRef: "HDP24-18-8SN", positions: 8, series: "HDP20", family: "RO", matesWith: ["fc-conn-ro-h20-18-08pa"] }),

  // -------------------
  // Amphenol AHDP (Round/Circular) SRA
  // Your chosen style: FC-CONN-RO-18-08PA-SRA etc.
  // -------------------
  conn({ sku: "FC-CONN-RO-18-08PA", internalRef: "AHDP06-18-08PN-SRA", positions: 8, series: "AHDP", family: "RO", matesWith: ["fc-conn-ro-18-08sa"] }),
  conn({ sku: "FC-CONN-RO-18-08SA", internalRef: "AHDP04-18-08SN-SRA", positions: 8, series: "AHDP", family: "RO", matesWith: ["fc-conn-ro-18-08pa"] }),

  conn({ sku: "FC-CONN-RO-24-16PA", internalRef: "AHDP06-24-16PN-SRA", positions: 16, series: "AHDP", family: "RO", matesWith: ["fc-conn-ro-24-16sa"] }),
  conn({ sku: "FC-CONN-RO-24-16SA", internalRef: "AHDP04-24-16SN-SRA", positions: 16, series: "AHDP", family: "RO", matesWith: ["fc-conn-ro-24-16pa"] }),

    // 31-position
  conn({ sku: "FC-CONN-RO-24-31PA", internalRef: "AHDP06-24-31PR-SRA", positions: 31, series: "AHDP", family: "RO", matesWith: ["fc-conn-ro-24-31sa"] }),
  conn({ sku: "FC-CONN-RO-24-31SA", internalRef: "AHDP04-24-31SR-SRA", positions: 31, series: "AHDP", family: "RO", matesWith: ["fc-conn-ro-24-31pa"] }),
];