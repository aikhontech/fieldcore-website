export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Built for rugged automation.
          </h1>
          <p className="mt-4 text-white/70 md:text-lg">
            Fieldcore Technologies designs rugged PLC-style controllers and modular I/O systems for real-world deployment — industrial automation, vehicle upfits, and mobile platforms that demand reliability, serviceability, and clean integration.
          </p>
        </div>
      </section>

      {/* What we do */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            t: "PLC-style controllers",
            d: "Compact, robust control units designed for field wiring and real deployment constraints.",
          },
          {
            t: "Modular expansion",
            d: "Scalable I/O and add-on modules to fit your application without redesigning everything.",
          },
          {
            t: "Integration-first",
            d: "We focus on clean wiring, documentation, and serviceable designs for installers and technicians.",
          },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold">{x.t}</div>
            <div className="mt-2 text-sm text-white/60">{x.d}</div>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold">How we build</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { t: "Rugged by design", d: "Designed for vibration, noise, and harsh environments." },
              { t: "Serviceable", d: "Built to install, maintain, and upgrade." },
              { t: "Clear documentation", d: "Wiring and I/O mapping that technicians can actually use." },
              { t: "Iterate fast", d: "Prototype → test → refine with real feedback from the field." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-2 text-sm text-white/60">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-8 md:p-12">
        <div className="max-w-2xl">
          <h3 className="text-2xl font-semibold">Have a project in mind?</h3>
          <p className="mt-3 text-white/60">
            Send your requirements (I/O count, power, environment, mounting, communications)
            and we’ll recommend a configuration.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
          >
            Contact
          </a>
        </div>
      </section>
    </div>
  );
}