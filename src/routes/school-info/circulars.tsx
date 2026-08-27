import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/school-info/circulars")({
  head: () => ({
    meta: [
      { title: "Circulars — Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Official circulars and notifications issued by Govt. Sr. Sec. School Sangla and the Education Department.",
      },
      { property: "og:title", content: "Circulars — Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content:
          "Official circulars and notifications issued by Govt. Sr. Sec. School Sangla and the Education Department.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/school-info/circulars" },
    ],
    links: [
      { rel: "canonical", href: "https://alma-craft-clone.lovable.app/school-info/circulars" },
    ],
  }),
  component: CircularsPage,
});

const CIRCULARS = [
  {
    date: "15 Jul 2026",
    title: "Half-Yearly Examination Schedule — Classes VI to XII",
    ref: "GSSS/SGL/2026/12",
  },
  {
    date: "02 Jul 2026",
    title: "Parent-Teacher Meeting for Classes X and XII",
    ref: "GSSS/SGL/2026/11",
  },
  {
    date: "20 Jun 2026",
    title: "Monsoon Uniform and Timings Advisory",
    ref: "GSSS/SGL/2026/10",
  },
  {
    date: "05 Jun 2026",
    title: "Enrolment under Samagra Shiksha — Data Verification",
    ref: "GSSS/SGL/2026/09",
  },
  {
    date: "18 May 2026",
    title: "Summer Vacation Homework Guidelines",
    ref: "GSSS/SGL/2026/08",
  },
  {
    date: "01 Apr 2026",
    title: "Commencement of New Academic Session 2026–27",
    ref: "GSSS/SGL/2026/07",
  },
];

function CircularsPage() {
  return (
    <>
      <PageHero
        title="Circulars"
        subtitle="Official circulars and notifications from the school administration"
      />
      <section className="mx-auto max-w-4xl px-4 py-16">
        <ul className="space-y-4">
          {CIRCULARS.map((c) => (
            <li
              key={c.ref}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="size-5" />
              </div>
              <div className="flex-1">
                <h2 className="font-display font-semibold text-foreground">{c.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ref: {c.ref} · Issued on {c.date}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {c.date}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Certified copies of circulars are available at the school office during working hours.
        </p>
      </section>
    </>
  );
}
