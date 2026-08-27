import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/school-info/mandatory-disclosure")({
  head: () => ({
    meta: [
      { title: "Mandatory Disclosure — Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Mandatory public disclosure of Govt. Sr. Sec. School Sangla: affiliation, infrastructure, staff and academic details.",
      },
      { property: "og:title", content: "Mandatory Disclosure — Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content:
          "Mandatory public disclosure of Govt. Sr. Sec. School Sangla: affiliation, infrastructure, staff and academic details.",
      },
      {
        property: "og:url",
        content: "https://alma-craft-clone.lovable.app/school-info/mandatory-disclosure",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://alma-craft-clone.lovable.app/school-info/mandatory-disclosure",
      },
    ],
  }),
  component: MandatoryDisclosurePage,
});

const SECTIONS: { title: string; rows: [string, string][] }[] = [
  {
    title: "General Information",
    rows: [
      ["Name of the School", "Govt. Sr. Sec. School Sangla"],
      ["Address", "Sangla, Distt. Kinnaur, Himachal Pradesh – 172106"],
      ["Email", "gssssangla@gmail.com"],
      ["Year of Establishment", "1952"],
      ["School Type", "Government, Co-educational"],
      ["Medium of Instruction", "Hindi / English"],
    ],
  },
  {
    title: "Affiliation & Board",
    rows: [
      ["Board", "Himachal Pradesh Board of School Education (HPBoSE), Dharamshala"],
      ["Affiliation Status", "Senior Secondary (Class VI–XII)"],
      ["Streams Offered", "Science, Commerce, Arts"],
    ],
  },
  {
    title: "Infrastructure",
    rows: [
      ["Total Campus Area", "Approx. 2 acres"],
      ["Classrooms", "16"],
      ["Laboratories", "Physics, Chemistry, Biology, Computer Science"],
      ["Library", "Yes — approx. 5,000 books"],
      ["Playground", "Yes"],
      ["Internet Facility", "Yes"],
    ],
  },
  {
    title: "Staff Details",
    rows: [
      ["Principal", "1"],
      ["Post Graduate Teachers (PGT)", "10"],
      ["Trained Graduate Teachers (TGT)", "12"],
      ["Other Teaching & Non-Teaching Staff", "8"],
    ],
  },
  {
    title: "Academic",
    rows: [
      ["Academic Session", "April to March"],
      ["Vacation Period", "Winter vacation as per HP Government schedule"],
      ["Admission Period", "March – April"],
    ],
  },
];

function MandatoryDisclosurePage() {
  return (
    <>
      <PageHero
        title="Mandatory Disclosure"
        subtitle="Public disclosure of school information as mandated by the education board"
      />
      <section className="mx-auto max-w-5xl space-y-10 px-4 py-16">
        {SECTIONS.map((section) => (
          <div
            key={section.title}
            className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
          >
            <h2 className="border-b border-border bg-muted px-6 py-4 font-display text-lg font-semibold text-foreground">
              {section.title}
            </h2>
            <table className="w-full text-sm">
              <tbody>
                {section.rows.map(([label, value]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="w-1/3 px-6 py-3 font-medium text-foreground">{label}</td>
                    <td className="px-6 py-3 text-muted-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <p className="text-center text-xs text-muted-foreground">
          Last updated for the current academic session. For certified copies of documents, please
          contact the school office during working hours.
        </p>
      </section>
    </>
  );
}
