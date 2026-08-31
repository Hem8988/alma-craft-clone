import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Lock, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/PageHero";

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

function LoginCard({ title, icon: Icon, note }: { title: string; icon: typeof Users; note: string }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.info("Portal accounts are issued by the school office. Please contact the administrator.");
      }}
      className="rounded-xl border border-border bg-card p-6 shadow-soft"
    >
      <div className="flex items-center gap-3">
        <Icon className="size-6 text-saffron" />
        <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{note}</p>
      <label className="mt-4 block text-sm font-medium">
        User ID
        <input required name="user" className={inputCls} placeholder="Enter your ID" />
      </label>
      <label className="mt-3 block text-sm font-medium">
        Password
        <input required type="password" name="pass" className={inputCls} placeholder="••••••••" />
      </label>
      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <Lock className="size-4" /> Sign In
      </button>
    </form>
  );
}

function Portal() {
  return (
    <>
      <PageHero
        title="Student & Parent Portal"
        subtitle="Check results, attendance, timetables and circulars online."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 md:grid-cols-2">
          <LoginCard
            title="Student Login"
            icon={GraduationCap}
            note="Use your admission number as the user ID."
          />
          <LoginCard
            title="Parent Login"
            icon={Users}
            note="Use the registered mobile number of the parent/guardian."
          />
        </div>
        <p className="mx-auto mt-8 max-w-4xl px-4 text-center text-xs text-muted-foreground">
          Forgot your credentials? Contact the school office at gssssangla@gmail.com or +91
          1786-XXXXXX during working hours.
        </p>
      </section>
    </>
  );
}
