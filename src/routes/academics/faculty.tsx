import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/academics/faculty")({
  head: () => ({
    meta: [
      { title: "Our Faculty | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Meet the experienced teaching faculty of Govt. Sr. Sec. School Sangla across Science, Commerce, Arts and primary sections.",
      },
      { property: "og:title", content: "Faculty — GSSS Sangla" },
      {
        property: "og:description",
        content: "Qualified and dedicated teachers guiding students at GSSS Sangla.",
      },
    ],
  }),
  component: Faculty,
});

const FACULTY = [
  { name: "Sh. Rajesh Negi", role: "Principal", subject: "Administration", qual: "M.A., M.Ed." },
  { name: "Smt. Kamla Devi", role: "Lecturer", subject: "Physics", qual: "M.Sc., B.Ed." },
  { name: "Sh. Suresh Kumar", role: "Lecturer", subject: "Chemistry", qual: "M.Sc., B.Ed." },
  { name: "Smt. Anita Sharma", role: "Lecturer", subject: "Biology", qual: "M.Sc., B.Ed." },
  { name: "Sh. Vinod Thakur", role: "Lecturer", subject: "Mathematics", qual: "M.Sc., B.Ed." },
  { name: "Smt. Pooja Chauhan", role: "Lecturer", subject: "English", qual: "M.A., B.Ed." },
  { name: "Sh. Devendra Singh", role: "Lecturer", subject: "Commerce", qual: "M.Com., B.Ed." },
  { name: "Smt. Rekha Negi", role: "TGT", subject: "Hindi", qual: "M.A., B.Ed." },
  { name: "Sh. Naresh Kumar", role: "TGT", subject: "Social Science", qual: "M.A., B.Ed." },
  { name: "Smt. Sunita Rani", role: "TGT", subject: "Computer Science", qual: "MCA, B.Ed." },
  { name: "Sh. Mohan Lal", role: "PET", subject: "Physical Education", qual: "M.P.Ed." },
  { name: "Smt. Meena Kumari", role: "JBT", subject: "Primary Section", qual: "B.A., JBT" },
];

function initials(name: string) {
  return name
    .replace(/^(Sh\.|Smt\.|Dr\.)\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Faculty() {
  return (
    <>
      <PageHero
        title="Our Faculty"
        subtitle="Qualified, experienced teachers committed to the success of every student."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FACULTY.map((f) => (
              <article
                key={f.name}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-soft"
              >
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-primary-foreground">
                  {initials(f.name)}
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{f.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-saffron">{f.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{f.subject}</p>
                <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <GraduationCap className="size-3.5" /> {f.qual}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-xl border border-border bg-cream p-6 text-center">
            <p className="text-sm text-muted-foreground">
              For academic queries, write to us at{" "}
              <a
                href="mailto:gssssangla@gmail.com"
                className="inline-flex items-center gap-1 font-medium text-navy hover:text-saffron"
              >
                <Mail className="size-4" /> gssssangla@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
