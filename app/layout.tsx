import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FIELDCORE Technologies",
  description: "Industrial Automation & Embedded Systems",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#040404] text-white antialiased">
        <div className="relative min-h-screen overflow-hidden">

          {/* PCB Background */}
          <div
            className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18]"
            style={{
              backgroundImage: "url('/images/pcb-bg.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "520px 350px",
            }}
          />

          {/* Slight dark overlay (lighter than before) */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-black/30" />

          <Navbar />

          <main className="mx-auto max-w-6xl px-6 pb-20">
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}