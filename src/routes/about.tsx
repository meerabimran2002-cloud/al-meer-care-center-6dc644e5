import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, HeartPulse, ShieldPlus, Sparkles, Target, Users } from "lucide-react";
import lobbyImg from "@/assets/hospital-lobby.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Al Meer Hospital" },
      {
        name: "description",
        content:
          "Al Meer Hospital combines world-class specialists, modern facilities and a human-first approach to healthcare.",
      },
      { property: "og:title", content: "About — Al Meer Hospital" },
      { property: "og:description", content: "Our mission, vision and the team behind Al Meer Hospital." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: HeartPulse, title: "Patient First", desc: "Every decision starts with the person, not the procedure." },
  { icon: ShieldPlus, title: "Safety by Design", desc: "Rigorous protocols and JCI-standard clinical governance." },
  { icon: Sparkles, title: "Precision Medicine", desc: "Data-driven diagnostics for accurate, personalised care." },
  { icon: Users, title: "Compassionate Team", desc: "Specialists and staff who listen, explain and support." },
];

function AboutPage() {
  return (
    <div className="bg-hero">
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <div className="text-xs uppercase tracking-widest text-primary">About Us</div>
          <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
            Care that feels <span className="text-gradient">human.</span>
          </h1>
          <p className="mt-5 text-muted-foreground">
            Al Meer Hospital was founded on a simple belief: exceptional medicine
            and genuine warmth should never be separate. We bring together
            leading specialists, calming design and the latest diagnostic
            technology under one roof — so every patient feels seen, safe and
            supported.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/appointment"
              className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:brightness-110"
            >
              Book a visit
            </Link>
            <Link
              to="/doctors"
              className="glass rounded-xl px-5 py-3 text-sm font-medium text-foreground hover:bg-primary/5"
            >
              Our doctors
            </Link>
          </div>
        </div>
        <div className="relative h-[420px] overflow-hidden rounded-3xl">
          <img src={lobbyImg} alt="Al Meer lobby" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To deliver world-class, patient-first healthcare that combines
              advanced clinical excellence with warmth, dignity and trust —
              accessible to every family we serve.
            </p>
          </div>
          <div className="glass rounded-3xl p-8">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To be the region's most trusted hospital — recognised for
              precision medicine, human-centred design and outcomes that set a
              new standard of care.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Our Values</div>
        <h2 className="mt-2 text-3xl font-bold sm:text-4xl">What we stand for</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="glass rounded-2xl p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="glass-strong grid gap-6 rounded-3xl p-8 sm:grid-cols-4">
          {[
            { k: "1998", v: "Founded" },
            { k: "50+", v: "Specialists" },
            { k: "250", v: "Beds" },
            { k: "25k+", v: "Patients / year" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-3xl font-bold text-foreground">{s.k}</div>
              <div className="text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
