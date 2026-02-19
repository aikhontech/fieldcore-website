import type { Product } from "./types";

export const coreProducts: Product[] = [
  {
    slug: "plc-v1",
    name: "PLC V1",
    category: "Controllers",
    short: "Industrial control module for reliable field automation and vehicle upfitting.",
    description: "A rugged industrial controller designed for real-world I/O...",
    images: [
      { src: "/images/plc-v1-nice.png", alt: "PLC V1 hero view" },
      { src: "/images/plc-v1-side1.png", alt: "PLC V1 top view" },
      { src: "/images/plc-v1-together-best.png", alt: "PLC V1 multiple angles" },
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

  // ...io-expansion-module, telematics-gateway
];