import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { FileText, ClipboardList, IndianRupee, Bell } from "lucide-react";

export const Route = createFileRoute("/school-info/")({
  head: () => ({
    meta: [
      { title: "School Information — Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Key information about Govt. Sr. Sec. School Sangla: mandatory disclosure, fee structure, circulars and notices.",
      },
      { property: "og:title", content: "School Information — Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content:
          "Key information about Govt. Sr. Sec. School Sangla: mandatory disclosure, fee structure, circulars and notices.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/school-info" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/school-info" }],
  }),
  component: SchoolInfoPage,
});

const SECTIONS = [
  {
    icon: ClipboardList,
    title: "Mandatory Disclosure",
    description:
      "CBSE-mandated public disclosure of school particulars, affiliation details, infrastructure and staff information.",
    to: "/school-info/mandatory-disclosure",
  },
  {
    icon: IndianRupee,
    title: "Fee Structure",
    description:
      "Detailed class-wise fee structure for the current academic session, including admission and examination fees.",
    to: "/school-info/fee-structure",
  },
  {
    icon: Bell,
    title: "Circulars",
    description:
      "Latest official circulars issued by the school administration and the Education Department.",
    to: "/school-info/circulars",
  },
  {
    icon: FileText,
    title: "Notice Board",
    description:
      "Upcoming events, holidays, examination schedules and important announcements for students and parents.",
    to: "/notice-board",
  },
];

function SchoolInfoPage() {
  return (
    <>
      <PageHero
        title="School Information"
        subtitle="Transparent access to official school documents, fees and announcements"
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link
              key={s.to + s.title}
              to={s.to}
              className="group rounded-xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="size-6" />
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold text-foreground group-hover:text-primary">
                {s.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-muted p-8">
          <h2 className="font-display text-2xl font-bold text-foreground">About the School</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Govt. Sr. Sec. School Sangla is a government-run co-educational institution located in
            the scenic Sangla Valley of district Kinnaur, Himachal Pradesh. Affiliated with the
            Himachal Pradesh Board of School Education, the school offers classes from VI to XII
            in Science, Commerce and Arts streams, serving the educational needs of the local
            community with dedicated faculty and steadily improving infrastructure.
          </p>
        </div>
      </section>
    </>
  );
}
