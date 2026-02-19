export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  images?: { src: string; alt: string }[];
  status?: "Available" | "In Development" | "Prototype";

  category?: "Controllers" | "Accessories";
  group?: string;

  sku?: string;          // public Fieldcore SKU (shown)
  internalRef?: string;  // private OEM PN (hidden)
  positions?: number;
  series?: string;       // internal only (AT/ATP/AHDP...)
  wireGauge?: string;

  matesWith?: string[];
  variantGroup?: string;
  color?: string;
};