import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 pt-10 pb-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold text-white">FIELDCORE TECHNOLOGIES</div>
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
          <div className="font-semibold text-white">Contact</div>
          <div className="mt-3 grid gap-2 text-white/70">
            <a className="hover:text-white" href="mailto:info@fieldcoretechnologies.com">
              info@fieldcoretechnologies.com
            </a>
            <a className="hover:text-white" href="mailto:sales@fieldcoretechnologies.com">
              sales@fieldcoretechnologies.com
            </a>

            {/*
            <a className="hover:text-white" href="tel:+14168566965">
              +1 416-856-6965
            </a>
            */}      
          </div>
          
          <div className="mt-4 text-white/60 text-xs">
            Ontario, Canada
          </div>

        </div>
      </div>
    </footer>
  );
}