import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, LayoutDashboard, Loader2, Lock, LogOut, UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/portal/")({
  head: () => ({
    meta: [
      { title: "Student & Parent Portal | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Login to the GSSS Sangla student and parent portal to view results, attendance, timetables and circulars.",
      },
      { property: "og:title", content: "Portal Login — GSSS Sangla" },
      {
        property: "og:description",
        content: "Access results, attendance and circulars through the school portal.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/portal" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/portal" }],
  }),
  component: Portal,
});

const inputCls =
  "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function Portal() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  async function handleEmailAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in successfully.");
      } else {
        const fullName = String(fd.get("name") ?? "").trim();
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm, then sign in.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed. Please try again.");
    }
    // redirected → browser navigates away
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    toast.success("Signed out.");
    navigate({ to: "/portal", replace: true });
  }

  if (loading) {
    return (
      <>
        <PageHero title="Student & Parent Portal" subtitle="Loading your account…" />
        <div className="flex justify-center py-20">
          <Loader2 className="size-8 animate-spin text-saffron" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Student & Parent Portal"
        subtitle="Sign in to access results, attendance, circulars and school services online."
      />

      <section className="py-20">
        {user ? (
          <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-xl border border-border bg-card p-8 text-center shadow-soft">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-cream">
                <UserRound className="size-8 text-navy" />
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-navy">
                Welcome{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ""}!
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-saffron px-5 py-3 text-sm font-semibold text-navy-deep transition-opacity hover:opacity-90"
                  >
                    <LayoutDashboard className="size-4" /> Admin Panel
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  <LogOut className="size-4" /> Sign Out
                </button>
              </div>
              {!isAdmin && (
                <p className="mt-5 text-xs text-muted-foreground">
                  Student results and attendance services will appear here as they are enabled by the
                  school office.
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-md px-4">
            <div className="rounded-xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="size-6 text-saffron" />
                <h2 className="font-display text-xl font-bold text-navy">
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </h2>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-1 rounded-md bg-muted p-1 text-sm font-medium">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`rounded px-3 py-1.5 transition-colors ${mode === "signin" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`rounded px-3 py-1.5 transition-colors ${mode === "signup" ? "bg-card shadow-sm" : "text-muted-foreground"}`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={handleEmailAuth} className="mt-5">
                {mode === "signup" && (
                  <label className="block text-sm font-medium">
                    Full Name
                    <input required name="name" className={inputCls} placeholder="Your full name" />
                  </label>
                )}
                <label className="mt-3 block text-sm font-medium">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className={inputCls}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="mt-3 block text-sm font-medium">
                  Password
                  <input
                    required
                    type="password"
                    name="password"
                    minLength={6}
                    className={inputCls}
                    placeholder="••••••••"
                  />
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {busy ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> OR <span className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted disabled:opacity-60"
              >
                <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.9h5.5c-.25 1.3-1.66 3.8-5.5 3.8-3.31 0-6-2.74-6-6.1s2.69-6.1 6-6.1c1.88 0 3.14.8 3.87 1.5l2.63-2.55C16.82 3.1 14.63 2 12 2 6.9 2 2.75 6.15 2.75 11.8S6.9 21.6 12 21.6c5.8 0 9.25-4.07 9.25-9.8 0-.66-.07-1.16-.16-1.6H12z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="mt-5 text-center text-xs text-muted-foreground">
                Trouble signing in? Contact the school office at gssssangla@gmail.com during working
                hours.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
