import type { Product } from "./types";
import { coreProducts } from "./core";
import { accessoryCategoryCards } from "./accessories-categories";
import { connectorProducts } from "./connectors";
import { cableGlandProducts } from "./cable-glands";
import { consumableProducts } from "./consumables";
import { contactProducts } from "./contacts";
import { wedgeLockProducts } from "./wedge-locks";
import { terminalProducts } from "./terminals";

export const products: Product[] = [
  ...coreProducts,
  ...accessoryCategoryCards,
  ...connectorProducts,
  ...cableGlandProducts,
  ...consumableProducts,
  ...contactProducts,
  ...wedgeLockProducts,
  ...terminalProducts,
];

export function getProduct(slug?: string) {
  const normalized = decodeURIComponent((slug ?? "").trim().toLowerCase());
  return products.find((p) => p.slug.toLowerCase() === normalized);
}

export type { Product };