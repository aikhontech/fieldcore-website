import { Suspense } from "react";
import ContactClient from "./ContactClient";

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <Suspense fallback={<div className="text-white/60">Loading…</div>}>
        <ContactClient />
      </Suspense>
    </div>
  );
}