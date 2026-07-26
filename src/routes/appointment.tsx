import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { departments, doctors } from "@/lib/data";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    meta: [
      { title: "Book Appointment — Al Meer Hospital" },
      {
        name: "description",
        content: "Book an appointment with a specialist at Al Meer Hospital in under a minute.",
      },
      { property: "og:title", content: "Book Appointment — Al Meer Hospital" },
      { property: "og:description", content: "Choose your specialist, date and time online." },
    ],
  }),
  component: AppointmentPage,
});

function AppointmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: departments[0].name,
    doctor: doctors[0].name,
    date: "",
    time: "10:00",
    notes: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Appointments</div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Book your visit</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Pick a department, doctor and time that works for you. We'll confirm within minutes.
        </p>

        {submitted ? (
          <div className="glass mt-10 rounded-3xl p-10 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-accent">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Appointment requested</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks {form.name || "there"}! We've received your booking with {form.doctor} on{" "}
              <span className="text-foreground">{form.date || "your selected date"}</span> at{" "}
              <span className="text-foreground">{form.time}</span>. Our team will call you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
            >
              Book another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="glass-strong mt-10 rounded-3xl p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name">
                <input required value={form.name} onChange={update("name")} className={inputCls} placeholder="Your name" />
              </Field>
              <Field label="Phone">
                <input required value={form.phone} onChange={update("phone")} className={inputCls} placeholder="+92 ..." />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <input required type="email" value={form.email} onChange={update("email")} className={inputCls} placeholder="you@email.com" />
              </Field>
              <Field label="Department">
                <select value={form.department} onChange={update("department")} className={inputCls}>
                  {departments.map((d) => (
                    <option key={d.name}>{d.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Doctor">
                <select value={form.doctor} onChange={update("doctor")} className={inputCls}>
                  {doctors.map((d) => (
                    <option key={d.id}>{d.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Date">
                <input required type="date" value={form.date} onChange={update("date")} className={inputCls} />
              </Field>
              <Field label="Time">
                <input required type="time" value={form.time} onChange={update("time")} className={inputCls} />
              </Field>
              <Field label="Notes (optional)" className="sm:col-span-2">
                <textarea value={form.notes} onChange={update("notes")} rows={4} className={inputCls} placeholder="Anything we should know?" />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-10px_oklch(0.68_0.28_300)] transition hover:brightness-110 sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" />
              Confirm Appointment
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
