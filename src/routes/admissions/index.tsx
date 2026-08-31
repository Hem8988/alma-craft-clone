import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, ClipboardList, FileText, UserCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/admissions/")({
  head: () => ({
    meta: [
      { title: "Admissions 2026-27 | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Admission process, eligibility, required documents and important dates for Govt. Sr. Sec. School Sangla, Kinnaur.",
      },
      { property: "og:title", content: "Admissions at GSSS Sangla" },
      {
        property: "og:description",
        content: "Step-by-step admission process, documents and key dates for the 2026-27 session.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/admissions" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/admissions" }],
  }),
  component: Admissions,
});

const STEPS = [
  {
    icon: ClipboardList,
    title: "1. Collect / Fill Form",
    text: "Obtain the admission form from the school office or fill the online admission form on this website.",
  },
  {
    icon: FileText,
    title: "2. Submit Documents",
    text: "Attach self-attested copies of all required documents along with recent passport-size photographs.",
  },
  {
    icon: UserCheck,
    title: "3. Interaction / Test",
    text: "A simple interaction or placement test is held for higher classes to determine the appropriate stream.",
  },
  {
    icon: CalendarDays,
    title: "4. Confirmation",
    text: "On approval, complete the fee formalities at the office and collect the admission slip.",
  },
];

const DOCUMENTS = [
  "Birth certificate (for Class 1 admission)",
  "Transfer Certificate from previous school",
  "Last examination mark sheet / report card",
  "Aadhaar card of student and parents",
  "Caste / category certificate (if applicable)",
  "Himachali bonafide certificate (if applicable)",
  "Four recent passport-size photographs",
];

const DATES = [
  { label: "Form availability", value: "01 March 2026 onwards" },
  { label: "Last date of submission", value: "15 April 2026" },
  { label: "Interaction / placement test", value: "20 April 2026" },
  { label: "Display of admission list", value: "25 April 2026" },
  { label: "Commencement of session", value: "01 May 2026" },
];

function Admissions() {
  return (
    <>
      <PageHero
        title="Admissions"
        subtitle="Admissions open for the academic session 2026-27. Join a school that puts every student first."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <p className="section-label text-center">How to Apply</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold">Admission Process</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <article
                key={s.title}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <s.icon className="size-8 text-saffron" />
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/admissions/form"
              className="inline-flex items-center rounded-md bg-saffron px-6 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              Fill Online Admission Form
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Documents Required</h2>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              {DOCUMENTS.map((d) => (
                <li key={d} className="rounded-md border border-border bg-card px-4 py-3">
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Important Dates</h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <tbody>
                  {DATES.map((d) => (
                    <tr key={d.label} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium">{d.label}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{d.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Dates are indicative and may change as per directions of the Directorate of Education,
              Himachal Pradesh.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
