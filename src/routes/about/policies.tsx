import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/about/policies")({
  head: () => ({
    meta: [
      { title: "School Policies | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Code of conduct, attendance, uniform, anti-bullying and safety policies of Govt. Sr. Sec. School Sangla.",
      },
      { property: "og:title", content: "School Policies — GSSS Sangla" },
      {
        property: "og:description",
        content: "Rules, code of conduct and safety policies followed at GSSS Sangla.",
      },
    ],
  }),
  component: Policies,
});

const POLICIES = [
  {
    title: "Code of Conduct",
    points: [
      "Students must be respectful towards teachers, staff and fellow students.",
      "Damage to school property must be reported and will be recovered from the responsible student.",
      "Use of mobile phones is not permitted during school hours without permission.",
    ],
  },
  {
    title: "Attendance Policy",
    points: [
      "A minimum of 75% attendance is required to appear in the annual examination.",
      "Leave must be applied for in writing by the parent or guardian.",
      "Long absence without intimation may result in the removal of the student's name from the rolls.",
    ],
  },
  {
    title: "Uniform & Discipline",
    points: [
      "The prescribed school uniform must be worn neatly on all working days.",
      "Identity cards must be carried on campus at all times.",
      "Assembly attendance is compulsory for all students.",
    ],
  },
  {
    title: "Anti-Bullying & Safety",
    points: [
      "Ragging, bullying or harassment of any form results in strict disciplinary action.",
      "A grievance and complaint box is available outside the Principal's office.",
      "The campus is monitored by CCTV and a safety committee reviews incidents regularly.",
    ],
  },
  {
    title: "Examination Policy",
    points: [
      "Unit tests, half-yearly and annual examinations are conducted as per the CBSE pattern.",
      "Any form of unfair means during examinations leads to cancellation of the paper.",
      "Report cards are issued to parents during the parent-teacher meetings.",
    ],
  },
];

function Policies() {
  return (
    <>
      <PageHero title="School Policies" subtitle="Rules and guidelines that keep our campus safe, fair and focused." />

      <section className="py-20">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          {POLICIES.map((p) => (
            <article key={p.title} className="rounded-xl border border-border bg-card p-6 shadow-soft">
              <h2 className="font-display text-xl font-bold text-navy">{p.title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
