import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Mail, User as UserIcon, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Al Meer Hospital" },
      { name: "description", content: "Sign in or create an account to manage your appointments." },
      { property: "og:title", content: "Sign in — Al Meer Hospital" },
      { property: "og:description", content: "Secure patient & admin access." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-hero min-h-[80vh]">
      <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <div className="mb-6 flex items-center gap-2 text-primary">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-xs uppercase tracking-widest">Secure Access</span>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to book appointments or access your portal."
            : "Register as a patient — admins are provisioned separately."}
        </p>

        <form onSubmit={onSubmit} className="glass-strong mt-8 space-y-4 rounded-3xl p-6 sm:p-8">
          {mode === "signup" && (
            <Field icon={<UserIcon className="h-4 w-4" />} label="Full name">
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputCls}
                placeholder="Your name"
              />
            </Field>
          )}
          <Field icon={<Mail className="h-4 w-4" />} label="Email">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="you@email.com"
            />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="Password">
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
            />
          </Field>

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px_oklch(0.55_0.24_295_/_0.5)] transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white/80 px-2 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              setError(null);
              const result = await lovable.auth.signInWithOAuth("google", {
                redirect_uri: window.location.origin,
              });
              setLoading(false);
              if (result.error) {
                setError(result.error.message || "Google sign-in failed");
              } else if (!result.redirected) {
                navigate({ to: "/admin" });
              }
            }}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-foreground shadow-sm transition hover:bg-black/5 disabled:opacity-60"
          >
            <GoogleLogo className="h-4 w-4" />
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to home</Link>
        </p>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white/80 px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/25";

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
