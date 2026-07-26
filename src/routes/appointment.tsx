import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, CheckCircle2, LogIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { departments, doctors } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";
import { createAppointment } from "@/lib/appointments.functions";

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
  const navigate = useNavigate();
  const createFn = useServerFn(createAppointment);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState(departments[0].name);
  const filteredDoctors = useMemo(
    () => doctors.filter((d) => d.department === department),
    [department],
  );
  const [doctor, setDoctor] = useState(filteredDoctors[0]?.name ?? "");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "10:00",
    notes: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
  }, []);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDepartment(value);
    const first = doctors.find((d) => d.department === value);
    setDoctor(first?.name ?? "");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createFn({
        data: {
          patient_name: form.name,
          patient_phone: form.phone,
          department,
          doctor_name: doctor,
          appointment_date: form.date,
          appointment_time: form.time,
          notes: form.notes,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (authed === false) {
    return (
      <div className="bg-hero">
        <section className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">Sign in to book</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            To keep your appointment safe and track it in your portal, please sign in or create a
            free patient account first.
          </p>
          <button
            onClick={() => navigate({ to: "/auth" })}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            <LogIn className="h-4 w-4" />
            Sign in / Sign up
          </button>
        </section>
      </div>
    );
  }

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
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-accent-foreground">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-bold">Appointment requested</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thanks {form.name || "there"}! We've received your booking with {doctor} on{" "}
              <span className="text-foreground">{form.date}</span> at{" "}
              <span className="text-foreground">{form.time}</span>. Our team will call you shortly.
            </p>
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setSubmitted(false)}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
              >
                Book another
              </button>
              <button
                onClick={() => navigate({ to: "/admin" })}
                className="rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium hover:bg-black/5"
              >
                View my portal
              </button>
            </div>
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
              <Field label="Department">
                <select value={department} onChange={onDepartmentChange} className={inputCls}>
                  {departments.map((d) => (
                    <option key={d.name} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Doctor">
                <select
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className={inputCls}
                  disabled={filteredDoctors.length === 0}
                >
                  {filteredDoctors.length === 0 ? (
                    <option>No doctors in this department</option>
                  ) : (
                    filteredDoctors.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} — {d.specialty}
                      </option>
                    ))
                  )}
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

            {error && (
              <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.55_0.24_295_/_0.5)] transition hover:brightness-110 disabled:opacity-60 sm:w-auto"
            >
              <CalendarCheck className="h-4 w-4" />
              {loading ? "Booking..." : "Confirm Appointment"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white/80 px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

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
