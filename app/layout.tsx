import "./globals.css";
import type { Metadata } from "next";

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
      <body className="bg-black text-white">
        <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
          <div className="text-lg font-semibold tracking-wide">
            FIELDCORE
          </div>
          <div className="space-x-6 text-sm">
            <a href="/" className="hover:text-gray-400">Home</a>
            <a href="/products" className="hover:text-gray-400">Products</a>
            <a href="/about" className="hover:text-gray-400">About</a>
            <a href="/contact" className="hover:text-gray-400">Contact</a>
          </div>
        </nav>

        {children}

        <footer className="border-t border-gray-800 mt-20 px-8 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FIELDCORE Technologies. All rights reserved.
        </footer>
      </body>
    </html>
  );
}