"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  ioDigitalIn: string;
  ioDigitalOut: string;
  ioAnalogIn: string;
  ioAnalogOut: string;
  environment: string;
  message: string;
};

const PROJECT_TYPES = [
  "PLC / Controller",
  "I/O Expansion Module",
  "Vehicle / Mobile Upfit",
  "Custom Embedded System",
  "Other",
] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "PLC / Controller",
    ioDigitalIn: "",
    ioDigitalOut: "",
    ioAnalogIn: "",
    ioAnalogOut: "",
    environment: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email.";
    if (!form.message.trim()) e.message = "Tell us a bit about your project.";
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
      // Optional: reset form
      setForm((prev) => ({
        ...prev,
        message: "",
        ioDigitalIn: "",
        ioDigitalOut: "",
        ioAnalogIn: "",
        ioAnalogOut: "",
        environment: "",
      }));
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <div className="py-12">
      {/* Header */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2rem,4.8vw,3.3rem)] font-semibold leading-[1.06] tracking-tight">
            Request a Quote
          </h1>
          <p className="mt-4 text-white/70 md:text-lg">
            Send your requirements and we’ll recommend a configuration or build
            plan. Typical details: I/O count, power, environment, mounting, and
            communications.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mt-8 grid gap-6 md:grid-cols-5">
        {/* Form */}
        <div className="md:col-span-3">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Full Name"
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="Your name"
                error={errors.name}
              />
              <Field
                label="Company"
                value={form.company}
                onChange={(v) => update("company", v)}
                placeholder="Company (optional)"
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => update("email", v)}
                placeholder="you@company.com"
                error={errors.email}
                type="email"
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                placeholder="(optional)"
              />

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-white/90">
                  Project Type
                </label>
                <div className="mt-2">
                  <select
                    value={form.projectType}
                    onChange={(e) => update("projectType", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none ring-0 focus:border-white/20"
                  >
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-black">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* I/O */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold">I/O Requirements</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field
                  label="Digital Inputs"
                  value={form.ioDigitalIn}
                  onChange={(v) => update("ioDigitalIn", v)}
                  placeholder="e.g. 10"
                />
                <Field
                  label="Digital Outputs"
                  value={form.ioDigitalOut}
                  onChange={(v) => update("ioDigitalOut", v)}
                  placeholder="e.g. 8 relays"
                />
                <Field
                  label="Analog Inputs"
                  value={form.ioAnalogIn}
                  onChange={(v) => update("ioAnalogIn", v)}
                  placeholder="e.g. 2 (0–10V)"
                />
                <Field
                  label="Analog Outputs"
                  value={form.ioAnalogOut}
                  onChange={(v) => update("ioAnalogOut", v)}
                  placeholder="e.g. 2 (DAC)"
                />
              </div>
            </div>

            {/* Environment */}
            <div className="mt-6">
              <label className="text-sm font-medium text-white/90">
                Environment / Constraints
              </label>
              <textarea
                value={form.environment}
                onChange={(e) => update("environment", e.target.value)}
                placeholder="Vibration, temperature range, enclosure/IP rating, mounting, power input, comms (CAN, RS-485, Ethernet, LTE)…"
                className="mt-2 h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20"
              />
            </div>

            {/* Message */}
            <div className="mt-6">
              <label className="text-sm font-medium text-white/90">
                Project Description
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="What are you building? What needs to be controlled/monitored? Timeline?"
                className={[
                  "mt-2 h-32 w-full resize-none rounded-2xl border bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20",
                  errors.message ? "border-red-500/60" : "border-white/10",
                ].join(" ")}
              />
              {errors.message ? (
                <p className="mt-2 text-xs text-red-400">{errors.message}</p>
              ) : null}
            </div>

            {/* Status */}
            {status === "success" ? (
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                ✅ Request received. We’ll reach out shortly.
              </div>
            ) : null}

            {status === "error" && errorMsg ? (
              <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
                {errorMsg}
              </div>
            ) : null}

            {/* Submit */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={!canSubmit}
                className={[
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  canSubmit
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/20 text-white/60 cursor-not-allowed",
                ].join(" ")}
              >
                {status === "submitting" ? "Submitting..." : "Submit Request"}
              </button>

              <p className="text-xs text-white/50">
                We typically respond within 1–2 business days.
              </p>
            </div>
          </form>
        </div>

        {/* Side panel */}
        <div className="md:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-lg font-semibold">Contact</div>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <div>
                <div className="text-white/90 font-medium">Email</div>
                <div className="mt-1">aikhon@fieldcoretechnologies.com</div>
              </div>
              <div>
                <div className="text-white/90 font-medium">Location</div>
                <div className="mt-1">Ontario, Canada</div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="text-white/90 font-medium">What to include</div>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-white/60">
                  <li>I/O count (DI/DO/AI/AO)</li>
                  <li>Power input range</li>
                  <li>Enclosure/IP rating</li>
                  <li>Comms: CAN / RS-485 / Ethernet / LTE</li>
                  <li>Timeline & quantity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-6 md:p-8">
            <div className="text-sm font-semibold">Prefer a quick start?</div>
            <p className="mt-2 text-sm text-white/70">
              If you already know your requirements, send the I/O and environment
              notes and we’ll propose a configuration.
            </p>
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
      <div className="mt-2">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={[
            "w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20",
            error ? "border-red-500/60" : "border-white/10",
          ].join(" ")}
        />
      </div>
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}