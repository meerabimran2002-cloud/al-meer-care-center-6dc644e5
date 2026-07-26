import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  Ambulance,
  Baby,
  Brain,
  HeartPulse,
  Microscope,
  ShieldPlus,
  Stethoscope,
  Syringe,
  TestTube2,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Al Meer Hospital" },
      {
        name: "description",
        content:
          "Explore Al Meer Hospital's services: cardiology, neurology, pediatrics, emergency, diagnostics, surgery and more.",
      },
      { property: "og:title", content: "Services — Al Meer Hospital" },
      { property: "og:description", content: "Comprehensive medical services under one roof." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: HeartPulse, title: "Cardiology", desc: "Advanced heart care, echo, stress tests, angiography and cardiac surgery." },
  { icon: Brain, title: "Neurology", desc: "Stroke care, epilepsy, neuro-imaging and specialist consultations." },
  { icon: Baby, title: "Pediatrics", desc: "Loving, expert care for infants, children and adolescents." },
  { icon: Activity, title: "Orthopedics", desc: "Joint replacement, sports injury, spine and trauma surgery." },
  { icon: Microscope, title: "Radiology & Imaging", desc: "MRI, CT scan, ultrasound and high-resolution digital X-ray." },
  { icon: Ambulance, title: "24 / 7 Emergency", desc: "Round-the-clock trauma, ICU and rapid-response ambulance." },
  { icon: Syringe, title: "Surgery", desc: "General, laparoscopic and minimally invasive surgical procedures." },
  { icon: TestTube2, title: "Laboratory", desc: "Pathology, blood tests, hormone and genetic diagnostics." },
  { icon: ShieldPlus, title: "Preventive Care", desc: "Executive health check-ups, vaccinations and screenings." },
];

function ServicesPage() {
  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Services</div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
          Every specialty, <span className="text-gradient">one hospital.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          From routine check-ups to complex surgeries — a full spectrum of
          medical services delivered by leading specialists and the latest
          technology.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="glass group rounded-2xl p-6 transition hover:-translate-y-1">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:bg-primary/25">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass-strong mt-14 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-8">
          <div>
            <h3 className="text-xl font-bold">Not sure which service you need?</h3>
            <p className="text-sm text-muted-foreground">Our team will help you choose the right specialist.</p>
          </div>
          <Link
            to="/appointment"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            Talk to us <Stethoscope className="ml-1 inline h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
