import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { doctors } from "@/lib/data";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Our Doctors — Al Meer Hospital" },
      {
        name: "description",
        content: "Meet Al Meer Hospital's specialists across cardiology, neurology, pediatrics, orthopedics and more.",
      },
      { property: "og:title", content: "Our Doctors — Al Meer Hospital" },
      { property: "og:description", content: "Meet our expert medical team and book online." },
    ],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      doctors.filter((d) =>
        (d.name + d.specialty).toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Our Team</div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">Doctors & Specialists</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Board-certified experts across every specialty, ready to help.
        </p>

        <div className="glass mt-8 flex items-center gap-3 rounded-2xl px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc) => (
            <article key={doc.id} className="glass overflow-hidden rounded-2xl transition hover:-translate-y-1">
              <div className="relative">
                <img
                  src={doc.image}
                  alt={doc.name}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="h-72 w-full object-cover"
                />
                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 text-xs backdrop-blur">
                  <Star className="h-3 w-3 text-accent" fill="currentColor" />
                  <span className="text-accent">{doc.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-wider text-primary">{doc.specialty}</div>
                <h3 className="mt-1 text-lg font-semibold">{doc.name}</h3>
                <div className="mt-1 text-xs text-muted-foreground">
                  {doc.experience} experience · {doc.availability}
                </div>
                <Link
                  to="/appointment"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  Book Appointment
                </Link>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="glass col-span-full rounded-2xl p-10 text-center text-sm text-muted-foreground">
              No doctors match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
