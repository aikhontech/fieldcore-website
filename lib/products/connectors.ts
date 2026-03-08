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
  NAT: 0,
  BLK: 1,
  BLU: 2,
  RED: 3,
  GRN: 4,
  BRN: 5,
};

const WIRE_GAUGE = {
  ATM: "16–22 AWG",
  AT: "14–20 AWG",
  ATP: "10–14 AWG",
  HDP20: "10–14 AWG",
  AHDP_18_08: "10–14 AWG",
  AHDP_24_16: "10–14 AWG",
  AHDP_24_23: "14–20 AWG",
  AHDP_24_31: "14–20 AWG",
} as const;

type Series = "ATM" | "AT" | "ATP" | "HDP20" | "AHDP";

export function formatPositionsCode(series: Series, positions: number) {
  const n = String(positions);

  if (series === "ATM") {
    // ATM: no leading zeros (2,3,4,6,8,12...)
    return n;
  }

  if (series === "AT") {
    // AT: <10 => 02..08, >=10 => 012, 014...
    return positions < 10 ? n.padStart(2, "0") : `0${n}`;
  }

  if (series === "ATP") {
    // ATP: <10 => 002..008, >=10 => 0012...
    return positions < 10 ? n.padStart(3, "0") : n.padStart(4, "0");
  }

  return n;
}

function rectSku(opts: {
  family: "RE";
  series: Series;
  positions: number;
  side: "P" | "S";
  color: string;
  key?: "A" | "B" | "C";
}) {
  const posCode = formatPositionsCode(opts.series, opts.positions);
  const keyPart = opts.key ? `-${opts.key}` : "";
  return `FC-CONN-${opts.family}-${posCode}${opts.side}${keyPart}-${opts.color}`;
}

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isPlugFromSku(sku: string) {
  // Rectangle: ...-02P-..., ...-012P-..., ...-0012P-...
  const rectPlug = /-\d{1,4}P-/.test(sku);

  // Round/circular: ...-18-08PA (plug) vs ...-18-08SA (receptacle)
  const roundPlug = /-\d{2}-\d{2}PA\b/.test(sku);

  return rectPlug || roundPlug || sku.includes("-PLUG-");
}

function conn(opts: {
  sku: string;
  internalRef: string;
  positions: number;
  series: string;
  family: "RE" | "RO";
  wireGauge?: string;
  contactSize?: string;
  color?: string;
  matesWith?: string[];
  notes?: string;
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
    variantGroup: opts.sku.replace(/-(NAT|BLK|BLU|RED|GRN|BRN)$/i, ""),
    short,

    images: [
      {
        src: `/images/connectors/${opts.sku}.webp`,
        alt: `${opts.sku} connector`,
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
      ...(opts.contactSize ? [{ label: "Contact Size", value: opts.contactSize }] : []),
      { label: "Wire Gauge", value: opts.wireGauge ?? "Varies by application" },
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

function rectPair(opts: {
  series: Series;
  positions: number;
  color: string;
  internalPlug: string;
  internalRec: string;
  wireGauge?: string;
  key?: "A" | "B" | "C";
}) {
  const plugSku = rectSku({ family: "RE", series: opts.series, positions: opts.positions, side: "P", color: opts.color, key: opts.key });
  const recSku = rectSku({ family: "RE", series: opts.series, positions: opts.positions, side: "S", color: opts.color, key: opts.key });

  return [
    conn({ sku: plugSku, internalRef: opts.internalPlug, positions: opts.positions, series: opts.series, family: "RE", wireGauge: opts.wireGauge, color: opts.color, matesWith: [slugifySku(recSku)] }),
    conn({ sku: recSku, internalRef: opts.internalRec, positions: opts.positions, series: opts.series, family: "RE", wireGauge: opts.wireGauge, color: opts.color, matesWith: [slugifySku(plugSku)] }),
  ] as const;
}

function rectSeriesSet(opts: {
  series: Series;
  color: string;
  wireGauge: string;
  pairs: Array<{
    positions: number;
    internalPlug: string;
    internalRec: string;
    key?: "A" | "B" | "C";
  }>;
}) {
  return opts.pairs.flatMap((pair) =>
    rectPair({
      series: opts.series,
      positions: pair.positions,
      color: opts.color,
      wireGauge: opts.wireGauge,
      internalPlug: pair.internalPlug,
      internalRec: pair.internalRec,
      key: pair.key,
    })
  );
}

export const connectorProducts: Product[] = [
  // -------------------
  // ATM (1-digit) NEUTRAL
  // -------------------
  ...rectSeriesSet({
    series: "ATM",
    color: "NAT",
    wireGauge: WIRE_GAUGE.ATM,
    pairs: [
      { positions: 2, internalPlug: "ATM06-2S", internalRec: "ATM04-2P" },
      { positions: 3, internalPlug: "ATM06-3S", internalRec: "ATM04-3P" },
      { positions: 4, internalPlug: "ATM06-4S", internalRec: "ATM04-4P" },
      { positions: 6, internalPlug: "ATM06-6S", internalRec: "ATM04-6P" },
      { positions: 8, key: "A", internalPlug: "ATM06-08SA", internalRec: "ATM04-08PA" },
      { positions: 12, key: "A", internalPlug: "ATM06-12SA", internalRec: "ATM04-12PA" },
    ],
  }),

  // -------------------
  // AT (2-digit) NEUTRAL
  // -------------------
  ...rectSeriesSet({
    series: "AT",
    color: "NAT",
    wireGauge: WIRE_GAUGE.AT,
    pairs: [
      { positions: 2, internalPlug: "AT06-2S", internalRec: "AT04-2P" },
      { positions: 3, internalPlug: "AT06-3S", internalRec: "AT04-3P" },
      { positions: 4, internalPlug: "AT06-4S", internalRec: "AT04-4P" },
      { positions: 6, internalPlug: "AT06-6S", internalRec: "AT04-6P" },
      { positions: 8, key: "A", internalPlug: "AT06-08SA", internalRec: "AT04-08PA" },
      { positions: 12, key: "A", internalPlug: "AT06-12SA", internalRec: "AT04-12PA" },
    ],
  }),

  // -------------------
  // AT (2-digit) BLACK
  // -------------------
  ...rectSeriesSet({
    series: "AT",
    color: "BLK",
    wireGauge: WIRE_GAUGE.AT,
    pairs: [
      { positions: 2, internalPlug: "AT06-2S-BLK", internalRec: "AT04-2P-BLK" },
      { positions: 3, internalPlug: "AT06-3S-BLK", internalRec: "AT04-3P-BLK" },
      { positions: 4, internalPlug: "AT06-4S-BLK", internalRec: "AT04-4P-BLK" },
      { positions: 6, internalPlug: "AT06-6S-BLK", internalRec: "AT04-6P-BLK" },
      { positions: 8, key: "A", internalPlug: "AT06-08SA-BLK", internalRec: "AT04-08PA-BLK" },
      { positions: 12, key: "A", internalPlug: "AT06-12SA-BLK", internalRec: "AT04-12PA-BLK" },
    ],
  }),

  // -------------------
  // AT COLOR VARIANTS
  // -------------------
  ...rectPair({ series: "AT", positions: 2, color: "BLU", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-2S-BLU", internalRec: "AT04-2P-BLU" }),
  ...rectPair({ series: "AT", positions: 2, color: "RED", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-2S-RED", internalRec: "AT04-2P-RED" }),
  ...rectPair({ series: "AT", positions: 3, color: "BLU", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-3S-BLU", internalRec: "AT04-3P-BLU" }),
  ...rectPair({ series: "AT", positions: 3, color: "GRN", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-3S-GRN", internalRec: "AT04-3P-GRN" }),
  ...rectPair({ series: "AT", positions: 4, color: "GRN", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-4S-GRN", internalRec: "AT04-4P-GRN" }),

  // Fixed missing pair issue:
  // BLU is now a proper 4P/4S pair, and BRN is now a proper 4P/4S pair.
  ...rectPair({ series: "AT", positions: 4, color: "BLU", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-4S-BLU", internalRec: "AT04-4P-BLU" }),
  ...rectPair({ series: "AT", positions: 4, color: "BRN", wireGauge: WIRE_GAUGE.AT, internalPlug: "AT06-4S-BRN", internalRec: "AT04-4P-BRN" }),

  // -------------------
  // ATP (3-digit) NEUTRAL
  // -------------------
  ...rectSeriesSet({
    series: "ATP",
    color: "NAT",
    wireGauge: WIRE_GAUGE.ATP,
    pairs: [
      { positions: 2, internalPlug: "ATP06-2S", internalRec: "ATP04-2P" },
      { positions: 4, internalPlug: "ATP06-4S", internalRec: "ATP04-4P" },
      { positions: 6, internalPlug: "ATP06-6S", internalRec: "ATP04-6P" },
    ],
  }),

  // -------------------
  // ATP (3-digit) BLACK
  // -------------------
  ...rectSeriesSet({
    series: "ATP",
    color: "BLK",
    wireGauge: WIRE_GAUGE.ATP,
    pairs: [
      { positions: 2, internalPlug: "ATP06-2S-BLK", internalRec: "ATP04-2P-BLK" },
      { positions: 4, internalPlug: "ATP06-4S-BLK", internalRec: "ATP04-4P-BLK" },
      { positions: 6, internalPlug: "ATP06-6S-BLK", internalRec: "ATP04-6P-BLK" },
    ],
  }),

  // -------------------
  // ATP SPECIAL VARIANTS
  // -------------------
  conn({ sku: "FC-CONN-RE-006P-RD01BLK", internalRef: "ATP06-6S-RD01BK", positions: 6, series: "ATP", family: "RE", wireGauge: WIRE_GAUGE.ATP, color: "BLK", matesWith: ["fc-conn-re-006s-rd01blk"] }),
  conn({ sku: "FC-CONN-RE-006S-RD01BLK", internalRef: "ATP04-6P-RD01BK", positions: 6, series: "ATP", family: "RE", wireGauge: WIRE_GAUGE.ATP, color: "BLK", matesWith: ["fc-conn-re-006p-rd01blk"] }),

  conn({ sku: "FC-CONN-RE-004P-MM01BLK", internalRef: "ATP06-4S-MM01BLK", positions: 4, series: "ATP", family: "RE", wireGauge: WIRE_GAUGE.ATP, color: "BLK", matesWith: ["fc-conn-re-004s-mm01blk"], notes: "ATP 4-position plug housing (MM01 variant)." }),
  conn({ sku: "FC-CONN-RE-004S-MM01BLK", internalRef: "ATP04-4P-MM01BLK", positions: 4, series: "ATP", family: "RE", wireGauge: WIRE_GAUGE.ATP, color: "BLK", matesWith: ["fc-conn-re-004p-mm01blk"], notes: "ATP 4-position receptacle housing (MM01 variant)." }),

  // -------------------
  // TE HDP20 (Round/Circular)
  // -------------------
  conn({ sku: "FC-CONN-RO-H20-18-08PA", internalRef: "HDP26-18-8PN", positions: 8, series: "HDP20", family: "RO", wireGauge: WIRE_GAUGE.HDP20, contactSize: "12", matesWith: ["fc-conn-ro-h20-18-08sa"] }),
  conn({ sku: "FC-CONN-RO-H20-18-08SA", internalRef: "HDP24-18-8SN", positions: 8, series: "HDP20", family: "RO", wireGauge: WIRE_GAUGE.HDP20, contactSize: "12", matesWith: ["fc-conn-ro-h20-18-08pa"] }),

  // -------------------
  // AHDP (Round/Circular)
  // -------------------
  conn({ sku: "FC-CONN-RO-18-08PA", internalRef: "AHDP06-18-08PN-SRA", positions: 8, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_18_08, contactSize: "12", matesWith: ["fc-conn-ro-18-08sa"] }),
  conn({ sku: "FC-CONN-RO-18-08SA", internalRef: "AHDP04-18-08SN-SRA", positions: 8, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_18_08, contactSize: "12", matesWith: ["fc-conn-ro-18-08pa"] }),

  conn({ sku: "FC-CONN-RO-24-16PA", internalRef: "AHDP06-24-16PN-SRA", positions: 16, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_24_16, contactSize: "12", matesWith: ["fc-conn-ro-24-16sa"] }),
  conn({ sku: "FC-CONN-RO-24-16SA", internalRef: "AHDP04-24-16SN-SRA", positions: 16, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_24_16, contactSize: "12", matesWith: ["fc-conn-ro-24-16pa"] }),

  conn({ sku: "FC-CONN-RO-24-23PA", internalRef: "AHDP06-24-23PN-SRA", positions: 23, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_24_23, contactSize: "16", matesWith: ["fc-conn-ro-24-23sa"] }),
  conn({ sku: "FC-CONN-RO-24-23SA", internalRef: "AHDP04-24-23SN-SRA", positions: 23, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_24_23, contactSize: "16", matesWith: ["fc-conn-ro-24-23pa"] }),

  conn({ sku: "FC-CONN-RO-24-31PA", internalRef: "AHDP06-24-31PR-SRA", positions: 31, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_24_31, contactSize: "16", matesWith: ["fc-conn-ro-24-31sa"] }),
  conn({ sku: "FC-CONN-RO-24-31SA", internalRef: "AHDP04-24-31SR-SRA", positions: 31, series: "AHDP", family: "RO", wireGauge: WIRE_GAUGE.AHDP_24_31, contactSize: "16", matesWith: ["fc-conn-ro-24-31pa"] }),
];