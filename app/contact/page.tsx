export default function ContactPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-semibold">Contact</h1>
        <p className="mt-3 text-white/60">
          Tell us what you’re building and what I/O you need. We’ll respond with next steps.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <form className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="grid gap-4">
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/30"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/30"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="text-sm text-white/70">Message</label>
              <textarea
                className="mt-2 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-white/30"
                placeholder="Application, environment, I/O needed, timeline..."
              />
            </div>

            <button
              type="button"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Send (UI only for now)
            </button>

            <p className="text-xs text-white/50">
              Next step: we’ll connect this to email (Resend/SMTP) once your domain is ready.
            </p>
          </div>
        </form>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">What to include</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
            <li>Your application (vehicle upfit, industrial control, etc.)</li>
            <li>Number of inputs/outputs</li>
            <li>Power environment and constraints</li>
            <li>Any required integrations (sensors, modules, gateways)</li>
          </ul>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5">
            <div className="text-sm font-semibold">Response time</div>
            <div className="mt-2 text-sm text-white/60">
              Typically within 1–2 business days.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}