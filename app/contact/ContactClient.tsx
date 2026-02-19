"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function ContactClient() {
  const sp = useSearchParams();

  const dept = sp.get("dept") ?? "sales";
  const product = sp.get("product") ?? "";

  const subjectLine = useMemo(() => {
    const p = product ? ` — ${product}` : "";
    return `${dept.toUpperCase()} Inquiry${p}`;
  }, [dept, product]);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "sending" }
    | { state: "success" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  async function onSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ state: "error", message: "Please fill in name, email, and message." });
      return;
    }

    try {
      setStatus({ state: "sending" });
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dept,
          product,
          subject: subjectLine,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({ state: "success" });
    } catch (e: any) {
      setStatus({ state: "error", message: e?.message || "Something went wrong." });
    }
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2rem,4.8vw,3.3rem)] font-semibold leading-[1.06] tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-white/70 md:text-lg">
            Reach the Fieldcore team using the form or contact us directly.
          </p>

          <div className="mt-4 text-sm text-white/60">
            <div>Department: <span className="text-white/80">{dept}</span></div>
            {product ? (
              <div>Product: <span className="text-white/80">{product}</span></div>
            ) : null}
            <div>Subject: <span className="text-white/80">{subjectLine}</span></div>
          </div>
        </div>
      </section>

      {/* Simple form (placeholder) */}
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="rounded-xl border border-white/10 bg-black/30 p-3 text-white placeholder:text-white/40"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          <input
            className="rounded-xl border border-white/10 bg-black/30 p-3 text-white placeholder:text-white/40"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
        </div>

        <textarea
          className="mt-4 min-h-[140px] w-full rounded-xl border border-white/10 bg-black/30 p-3 text-white placeholder:text-white/40"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
        />

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            onClick={onSubmit}
            disabled={status.state === "sending"}
          >
            {status.state === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status.state === "success" ? (
            <span className="text-sm text-emerald-300">Message sent. We’ll get back to you soon.</span>
          ) : null}
          {status.state === "error" ? (
            <span className="text-sm text-red-300">{status.message}</span>
          ) : null}

          <Link
            href="/products"
            className="text-sm text-white/60 hover:text-white"
          >
            Browse products →
          </Link>
        </div>
      </section>
    </div>
  );
}