import type { Product } from "./types";

export const coreProducts: Product[] = [
  {
    slug: "plc-v1",
    name: "PLC V1",
    sku: "FC-PLC-10DI8RO-AO1-V1", // ✅ Fieldcore SKU / part number
    internalRef: "Prototype 3 (ESP32-WROOM-32E-H4)", // optional internal reference
    category: "Controllers",
    short:
      "Rugged 9–30V industrial controller with opto-isolated inputs and relay outputs for field automation and vehicle upfitting.",
    description:
      "PLC V1 is a rugged controller built for real-world electrical noise, transients, and mobile equipment environments. It supports opto-isolated digital inputs, high-reliability relay outputs, and a 0–5V analog output for proportional control and signaling.",

    images: [
      { src: "/images/plc-v1-nice.png", alt: "PLC V1 hero view" },
      { src: "/images/plc-v1-side1.png", alt: "PLC V1 top view" },
      { src: "/images/plc-v1-together-best.png", alt: "PLC V1 multiple angles" },
    ],

    highlights: [
      "9–30V input with UV/OV + reverse polarity protection (LTC4368 front end)",
      "10× opto-isolated digital inputs (3.3–24V field compatible)",
      "8× relay outputs with ULN2803 driver and status LEDs",
      "1× 0–5V analog output (buffered, DAC-based)",
      "I²C ready for expansion modules and sensors",
    ],

    specs: [
      { label: "Part Number", value: "FC-PLC-10DI8RO-AO1-V1" },
      { label: "Input Voltage", value: "9–30 V DC" },
      { label: "Digital Inputs", value: "10 × opto-isolated (3.3–24V field range)" },
      { label: "Relay Outputs", value: "8 × 5V relay outputs (with indicators)" },
      { label: "Analog Output", value: "1 × 0–5V (buffered, protected)" },
      { label: "Protection", value: "UV/OV, reverse polarity, electronic breaker + TVS" },
      { label: "MCU", value: "ESP32-WROOM-32E (dual-core 240MHz, 3.3V logic)" },
      { label: "Interfaces", value: "I²C, UART (debug/programming)" },
      { label: "Form Factor", value: "Approx. 180 × 100 mm (prototype)" },
      { label: "Ordering", value: "Contact Sales for quotes and lead times" },
    ],

    status: "Available",
  },

  // ...io-expansion-module, telematics-gateway
];