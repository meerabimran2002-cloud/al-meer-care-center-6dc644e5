import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  Brain,
  CalendarCheck,
  HeartPulse,
  PhoneCall,
  ShieldPlus,
  Stethoscope,
  Users,
} from "lucide-react";
import heroImg from "@/assets/hero-hospital.jpg";
import { departments, doctors, testimonials } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Meer Hospital — Premium Care, Modern Medicine" },
      {
        name: "description",
        content:
          "World-class specialists, advanced diagnostics and 24/7 emergency care at Al Meer Hospital. Book your appointment online.",
      },
      { property: "og:title", content: "Al Meer Hospital — Premium Care" },
      {
        property: "og:description",
        content: "Book appointments, meet our doctors, and access modern healthcare.",
      },
    ],
  }),
  component: Home,
});

const deptIcons = [HeartPulse, Brain, Users, Activity, Stethoscope, ShieldPlus];

function Home() {
  return (
    <div className="bg-hero">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-8 sm:px-6 md:grid-cols-2 md:pt-16 lg:pt-20">
          <div className="flex flex-col justify-center">
            <span className="glass mb-6 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-glow rounded-full bg-accent" />
              Now booking · Winter 2026
            </span>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Modern medicine,
              <br />
              <span className="text-gradient">delivered with heart.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Al Meer Hospital brings together leading specialists, precision
              diagnostics and calming, human-first design — for care that feels
              as good as it works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/appointment"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_40px_-10px_oklch(0.68_0.28_300)] transition hover:brightness-110"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Appointment
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/doctors"
                className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-foreground hover:bg-white/10"
              >
                <Stethoscope className="h-4 w-4 text-primary" />
                Meet Doctors
              </Link>
              <a
                href="tel:+923000000000"
                className="inline-flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-medium text-accent hover:bg-accent/20"
              >
                <PhoneCall className="h-4 w-4" />
                Emergency
              </a>
            </div>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { k: "50+", v: "Specialists" },
                { k: "25k", v: "Patients / yr" },
                { k: "24/7", v: "Emergency" },
                { k: "12", v: "Departments" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-2xl px-4 py-4">
                  <div className="font-display text-2xl font-bold text-foreground">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass-strong glow-purple relative overflow-hidden rounded-3xl">
              <img
                src={heroImg}
                width={1600}
                height={1000}
                alt="Al Meer Hospital modern interior at night"
                className="h-[420px] w-full object-cover md:h-[560px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">JCI Accredited</div>
                    <div className="text-xs text-muted-foreground">
                      Excellence in patient safety & care
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass absolute -left-4 top-8 hidden animate-float rounded-2xl px-4 py-3 md:block">
              <div className="text-xs text-muted-foreground">Today</div>
              <div className="text-sm font-semibold">120 appointments</div>
            </div>
            <div className="glass absolute -right-4 bottom-24 hidden animate-float rounded-2xl px-4 py-3 md:block">
              <div className="text-xs text-muted-foreground">Rating</div>
              <div className="text-sm font-semibold text-accent">★ 4.9 / 5</div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Departments</div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Care across every specialty</h2>
          </div>
          <Link to="/doctors" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">
            View all doctors →
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => {
            const Icon = deptIcons[i % deptIcons.length];
            return (
              <div
                key={d.name}
                className="glass group rounded-2xl p-6 transition hover:-translate-y-1 hover:bg-white/10"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary/25">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-primary">Our Team</div>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Meet the specialists</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doc) => (
            <div key={doc.id} className="glass overflow-hidden rounded-2xl">
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-64 w-full object-cover"
                />
                <div className="absolute right-3 top-3 rounded-lg bg-black/50 px-2 py-1 text-xs backdrop-blur">
                  ★ <span className="text-accent">{doc.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-sm text-primary">{doc.specialty}</div>
                <h3 className="mt-1 text-base font-semibold">{doc.name}</h3>
                <div className="mt-1 text-xs text-muted-foreground">
                  {doc.experience} · {doc.availability}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Stories</div>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Trusted by our patients</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6">
              <p className="text-sm leading-relaxed text-foreground/90">“{t.quote}”</p>
              <div className="mt-5">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="glass-strong glow-purple relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12">
          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">Ready when you are.</h3>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Book online in under a minute — pick your specialist, date and time.
              </p>
            </div>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accent-foreground hover:brightness-110"
            >
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        </div>
      </section>
    </div>
  );
}
