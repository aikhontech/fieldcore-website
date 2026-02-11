import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-white">FIELDCORE</div>
          <div className="mt-2 text-sm text-white/60">
            Industrial automation products built for real-world deployment.
          </div>
          <div className="mt-4 text-xs text-white/40">
            © {new Date().getFullYear()} Fieldcore Technologies. All rights reserved.
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-white">Company</div>
          <div className="mt-3 grid gap-2 text-white/70">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/products" className="hover:text-white">Products</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-white">Get in touch</div>
          <div className="mt-3 text-white/70">
            Use the contact form to request pricing, integration details, or product availability.
          </div>
        </div>
      </div>
    </footer>
  );
}