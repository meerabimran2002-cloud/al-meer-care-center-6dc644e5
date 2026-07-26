import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Al Meer Hospital" },
      { name: "description", content: "Get in touch with Al Meer Hospital. Address, phone, email and contact form." },
      { property: "og:title", content: "Contact — Al Meer Hospital" },
      { property: "og:description", content: "Reach our team — we usually reply within a few hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="bg-hero">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-xs uppercase tracking-widest text-primary">Contact</div>
        <h1 className="mt-2 text-4xl font-bold sm:text-5xl">We're here to help</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Questions, feedback or scheduling help — reach us any time.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, title: "Visit us", body: "Main Boulevard, Karachi, Pakistan" },
              { icon: Phone, title: "Call us", body: "+92 300 000 0000" },
              { icon: Mail, title: "Email", body: "care@almeerhospital.com" },
            ].map((c) => (
              <div key={c.title} className="glass flex items-start gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-0.5 text-sm text-muted-foreground">{c.body}</div>
                </div>
              </div>
            ))}

            <div className="glass overflow-hidden rounded-2xl">
              <iframe
                title="Al Meer Hospital location"
                src="https://www.google.com/maps?q=Karachi&output=embed"
                className="h-64 w-full grayscale-[30%]"
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass-strong rounded-3xl p-6 sm:p-8"
          >
            {sent ? (
              <div className="py-8 text-center">
                <h2 className="text-2xl font-bold">Message sent ✨</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for reaching out. We usually reply within a few hours.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold">Send us a message</h2>
                <div className="mt-6 grid gap-4">
                  <input required placeholder="Your name" className={inputCls} />
                  <input required type="email" placeholder="Email" className={inputCls} />
                  <input placeholder="Subject" className={inputCls} />
                  <textarea required rows={5} placeholder="How can we help?" className={inputCls} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_0_30px_-10px_oklch(0.68_0.28_300)] transition hover:brightness-110"
                  >
                    <Send className="h-4 w-4" /> Send message
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30";
