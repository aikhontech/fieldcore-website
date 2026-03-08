import type { Product } from "./types";

type RectSeries = "ATM" | "AT" | "ATP";
type WebsiteSeries = "MICRO" | "STANDARD" | "POWER";

const WEBSITE_SERIES_LABEL: Record<RectSeries, WebsiteSeries> = {
  ATM: "MICRO",
  AT: "STANDARD",
  ATP: "POWER",
};

const CONTACT_SIZE: Record<RectSeries, string> = {
  ATM: "20",
  AT: "16",
  ATP: "12",
};

const SERIES_ORDER: Record<WebsiteSeries, number> = {
  MICRO: 0,
  STANDARD: 1,
  POWER: 2,
};

export function formatPositionsCode(series: RectSeries, positions: number) {
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

function wedgeSku(opts: {
  series: RectSeries;
  positions: number;
  side: "P" | "S";
  key?: "A" | "B" | "C";
}) {
  const posCode = formatPositionsCode(opts.series, opts.positions);
  const keyPart = opts.key ? `-${opts.key}` : "";
  return `FC-WEDGE-RE-${posCode}${opts.side}${keyPart}`;
}

function slugifySku(sku: string) {
  return sku
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function sideLabel(side: "P" | "S") {
  return side === "P" ? "Plug" : "Receptacle";
}

function wedge(opts: {
  sku: string;
  internalRef: string;
  series: WebsiteSeries;
  manufacturerSeries: RectSeries;
  positions: number;
  side: "P" | "S";
  contactSize: string;
  key?: "A" | "B" | "C";
  matesWith?: string[];
  notes?: string;
}): Product {
  const side = sideLabel(opts.side);
  const slug = slugifySku(opts.sku);

  return {
    slug,
    name: `${opts.positions}-Position Wedge Lock ${side}`,
    sku: opts.sku,
    internalRef: opts.internalRef,
    category: "Accessories",
    group: "Wedge Locks",
    parentSlug: "wedge-locks",
    positions: opts.positions,
    series: opts.series,
    matesWith: opts.matesWith,
    variantGroup: opts.sku,

    short: `${opts.positions}-position wedge lock ${side.toLowerCase()} for ${opts.series.toLowerCase()} sealed connector housings.`,

    images: [
      {
        src: `/images/wedges/${opts.sku}.webp`,
        alt: `${opts.sku} wedge lock`,
      },
    ],

    description:
      opts.notes ??
      `Secondary locking wedge for ${opts.series.toLowerCase()} series sealed connector housings. Used to secure terminals in place and support proper terminal retention.`,

    highlights: [
      "Secondary locking feature",
      "Supports terminal retention",
      "Field-serviceable design",
      `${opts.series} series compatibility`,
    ],

    specs: [
      { label: "Series", value: opts.series },
      { label: "Manufacturer Series", value: opts.manufacturerSeries },
      { label: "Positions", value: String(opts.positions) },
      { label: "Side", value: side },
      { label: "Contact Size", value: opts.contactSize },
      ...(opts.key ? [{ label: "Key Position", value: opts.key }] : []),
      { label: "Ordering", value: "Contact Sales for pricing and compatibility guidance" },
    ],

    status: "Available",
  };
}

function wedgePair(opts: {
  series: RectSeries;
  positions: number;
  internalPlug: string;
  internalRec: string;
  key?: "A" | "B" | "C";
}) {
  const skuP = wedgeSku({
    series: opts.series,
    positions: opts.positions,
    side: "P",
    key: opts.key,
  });

  const skuS = wedgeSku({
    series: opts.series,
    positions: opts.positions,
    side: "S",
    key: opts.key,
  });

  return [
    wedge({
      sku: skuP,
      internalRef: opts.internalPlug,
      series: WEBSITE_SERIES_LABEL[opts.series],
      manufacturerSeries: opts.series,
      positions: opts.positions,
      side: "P",
      contactSize: CONTACT_SIZE[opts.series],
      key: opts.key,
      matesWith: [slugifySku(skuS)],
    }),
    wedge({
      sku: skuS,
      internalRef: opts.internalRec,
      series: WEBSITE_SERIES_LABEL[opts.series],
      manufacturerSeries: opts.series,
      positions: opts.positions,
      side: "S",
      contactSize: CONTACT_SIZE[opts.series],
      key: opts.key,
      matesWith: [slugifySku(skuP)],
    }),
  ] as const;
}

function wedgeSeriesSet(opts: {
  series: RectSeries;
  pairs: Array<{
    positions: number;
    internalPlug: string;
    internalRec: string;
    key?: "A" | "B" | "C";
  }>;
}) {
  return opts.pairs.flatMap((pair) =>
    wedgePair({
      series: opts.series,
      positions: pair.positions,
      internalPlug: pair.internalPlug,
      internalRec: pair.internalRec,
      key: pair.key,
    })
  );
}

function isPlugWedgeSku(sku?: string) {
  return /(?:^|-)0*?\d+P(?:-|$)/.test(sku ?? "");
}

export function sortWedgeLocks(a: Product, b: Product) {
  const sa = SERIES_ORDER[(a.series as WebsiteSeries) ?? "POWER"] ?? 99;
  const sb = SERIES_ORDER[(b.series as WebsiteSeries) ?? "POWER"] ?? 99;
  if (sa !== sb) return sa - sb;

  const pa = Number(a.positions ?? 999);
  const pb = Number(b.positions ?? 999);
  if (pa !== pb) return pa - pb;

  const aPlug = isPlugWedgeSku(a.sku);
  const bPlug = isPlugWedgeSku(b.sku);
  if (aPlug !== bPlug) return aPlug ? -1 : 1;

  return (a.sku ?? "").localeCompare(b.sku ?? "");
}

export const wedgeLockProducts: Product[] = [
  // -------------------
  // MICRO (ATM / size 20)
  // -------------------
  ...wedgeSeriesSet({
    series: "ATM",
    pairs: [
      { positions: 2, internalPlug: "AWM-2S", internalRec: "AWM-2P" },
      { positions: 3, internalPlug: "AWM-3S", internalRec: "AWM-3P" },
      { positions: 4, internalPlug: "AWM-4S", internalRec: "AWM-4P" },
      { positions: 6, internalPlug: "AWM-6S", internalRec: "AWM-6P" },
      { positions: 8, key: "A", internalPlug: "AWM-8S", internalRec: "AWM-8P" },
      { positions: 12, key: "A", internalPlug: "AWM-12S", internalRec: "AWM-12P" },
    ],
  }),

  // -------------------
  // STANDARD (AT / size 16)
  // -------------------
  ...wedgeSeriesSet({
    series: "AT",
    pairs: [
      { positions: 2, internalPlug: "AW2S", internalRec: "AW2P" },
      { positions: 3, internalPlug: "AW3S", internalRec: "AW3P" },
      { positions: 4, internalPlug: "AW4S", internalRec: "AW4P" },
      { positions: 6, internalPlug: "AW6S", internalRec: "AW6P" },
      { positions: 8, key: "A", internalPlug: "AW8S", internalRec: "AW8P" },
      { positions: 12, key: "A", internalPlug: "AW12S", internalRec: "AW12P" },
    ],
  }),

  // -------------------
  // POWER (ATP / size 12)
  // -------------------
  ...wedgeSeriesSet({
    series: "ATP",
    pairs: [
      { positions: 2, internalPlug: "AWP-2S", internalRec: "AWP-2P" },
      { positions: 4, internalPlug: "AWP-4S", internalRec: "AWP-4P" },
      { positions: 6, internalPlug: "AWP-6S", internalRec: "AWP-6P" },
    ],
  }),
].sort(sortWedgeLocks);