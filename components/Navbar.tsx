import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur shadow-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        {/* Left: logo (allowed to shrink) */}
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/company-logo1.png"
            alt="Fieldcore Technologies"
            width={1000}
            height={300}
            priority
            className="h-9 w-auto flex-shrink-0 object-contain md:h-10"
            sizes="(max-width: 768px) 160px, 220px"
          />
        </Link>

        {/* Middle nav (desktop only) */}
        <nav className="hidden gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTA (never wrap, tighter on mobile) */}
        <Link
          href="/contact"
          className="whitespace-nowrap rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90 md:px-4"
        >
          Request a Quote
        </Link>
      </div>
    </header>
  );
}