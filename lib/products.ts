export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  images?: { src: string; alt: string }[];
  status?: "Available" | "In Development" | "Prototype";
};

export const products: Product[] = [
  {
    slug: "plc-controller-v1",
    name: "PLC Controller V1",
    short: "Industrial I/O controller for reliable field automation and vehicle upfitting.",
    description: "A rugged PLC-style controller designed for real-world I/O...",
    images: [
      { src: "/images/plc-v1-nice.png", alt: "PLC Controller V1 hero view" },
      { src: "/images/plc-v1-side1.png", alt: "PLC Controller V1 top view" },
      { src: "/images/plc-v1-together-best.png", alt: "PLC Controller V1 multiple angles" },
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
];

export function getProduct(slug?: string) {
  const normalized = decodeURIComponent((slug ?? "").trim().toLowerCase());
  return products.find((p) => p.slug.toLowerCase() === normalized);
}