import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Al Meer Hospital" },
      { name: "description", content: "Answers to common questions about appointments, insurance, emergency care and visits." },
      { property: "og:title", content: "FAQ — Al Meer Hospital" },
      { property: "og:description", content: "Common questions, clearly answered." },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  { q: "How do I book an appointment?", a: "Use our online booking page — pick a department, doctor and time. You'll receive a confirmation within minutes." },
  { q: "Do you accept insurance?", a: "Yes, we work with most major insurance providers. Please bring your card and CNIC at check-in." },
  { q: "Is emergency care available 24/7?", a: "Absolutely. Our emergency department is open 24 hours a day, 7 days a week with on-call specialists." },
  { q: "How do I access my medical records?", a: "Patient portal access is coming soon. In the meantime, you can request records from our front desk." },
  { q: "Where is the hospital located?", a: "We're located on Main Boulevard, Karachi. Parking is available on-site." },
  { q: "Can I cancel or reschedule?", a: "Yes — call us at least 4 hours before your appointment and we'll gladly reschedule." },
];

function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Support</div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Frequently asked questions</h1>
        <p className="mt-3 text-muted-foreground">Everything you might want to know before your visit.</p>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="glass rounded-2xl">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium sm:text-base">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-primary transition ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
