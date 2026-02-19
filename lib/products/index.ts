import type { Product } from "./types";
import { coreProducts } from "./core";
import { accessoryCategoryCards } from "./accessories-categories";
import { connectorProducts } from "./connectors";
// import { cableGlandProducts } from "./cable-glands";
// import { consumableProducts } from "./consumables";

export const products: Product[] = [
  ...coreProducts,
  ...accessoryCategoryCards,
  ...connectorProducts,
  // ...cableGlandProducts,
  // ...consumableProducts,
];

export function getProduct(slug?: string) {
  const normalized = decodeURIComponent((slug ?? "").trim().toLowerCase());
  return products.find((p) => p.slug.toLowerCase() === normalized);
}

export type { Product };