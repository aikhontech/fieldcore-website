"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  department: "Sales" | "Info";
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    department: "Sales",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }, [form]);

  const canSubmit = Object.keys(errors).length === 0 && status !== "submitting";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!canSubmit) {
      setStatus("error");
      setErrorMsg("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Submission failed.");
      }

      setStatus("success");
      setForm((prev) => ({ ...prev, message: "" }));
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2rem,4.8vw,3.3rem)] font-semibold leading-[1.06] tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-white/70 md:text-lg">
            Reach the Fieldcore team using the form or contact us directly by email/phone.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-5">
        {/* Form */}
        <div className="md:col-span-3">
          <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="Your name"
                error={errors.name}
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => update("email", v)}
                placeholder="your@email.com"
                error={errors.email}
                type="email"
              />
              <Field
                label="Phone (optional)"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                placeholder="Optional"
              />

              <div>
                <label className="text-sm font-medium text-white/90">Department</label>
                <div className="mt-2">
                  <select
                    value={form.department}
                    onChange={(e) => update("department", e.target.value as FormState["department"])}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  >
                    <option value="Sales" className="bg-black">Sales</option>
                    <option value="Info" className="bg-black">Info</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-white/90">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="How can we help?"
                className={[
                  "mt-2 h-36 w-full resize-none rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20",
                  errors.message ? "border-red-500/60" : "border-white/10",
                ].join(" ")}
              />
              {errors.message ? <p className="mt-2 text-xs text-red-400">{errors.message}</p> : null}
            </div>

            {status === "success" ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                ✅ Message sent. We’ll get back to you shortly.
              </div>
            ) : null}

            {status === "error" && errorMsg ? (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
                {errorMsg}
              </div>
            ) : null}

            <div className="mt-6">
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "w-full rounded-xl px-5 py-3 text-sm font-semibold sm:w-auto",
                  canSubmit ? "bg-white text-black hover:bg-white/90" : "bg-white/20 text-white/60 cursor-not-allowed",
                ].join(" ")}
              >
                {status === "submitting" ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* Direct Contact */}
        <div className="md:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-lg font-semibold">Direct Contact</div>

            <div className="mt-5 space-y-5 text-sm text-white/70">
              <div>
                <div className="font-medium text-white/90">Sales</div>
                <a className="mt-1 block hover:text-white" href="mailto:sales@fieldcoretechnologies.com">
                  sales@fieldcoretechnologies.com
                </a>
              </div>

              <div>
                <div className="font-medium text-white/90">Info</div>
                <a className="mt-1 block hover:text-white" href="mailto:info@fieldcoretechnologies.com">
                  info@fieldcoretechnologies.com
                </a>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="font-medium text-white/90">Phone (Sales & Info Team)</div>
                <a className="mt-1 block hover:text-white" href="tel:+14168566965">
                  +1 416-856-6965
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-6 md:p-8">
            <div className="text-sm font-semibold">What to include</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-white/60 space-y-1">
              <li>Product of interest</li>
              <li>Quantity / timeline</li>
              <li>Application environment</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-white/90">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "mt-2 w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20",
          error ? "border-red-500/60" : "border-white/10",
        ].join(" ")}
      />
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}