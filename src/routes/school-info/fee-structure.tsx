import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/school-info/fee-structure")({
  head: () => ({
    meta: [
      { title: "Fee Structure — Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Class-wise fee structure of Govt. Sr. Sec. School Sangla for the current academic session.",
      },
      { property: "og:title", content: "Fee Structure — Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content:
          "Class-wise fee structure of Govt. Sr. Sec. School Sangla for the current academic session.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/school-info/fee-structure" },
    ],
    links: [
      { rel: "canonical", href: "https://alma-craft-clone.lovable.app/school-info/fee-structure" },
    ],
  }),
  component: FeeStructurePage,
});

const FEES: { cls: string; admission: string; monthly: string; exam: string; other: string }[] = [
  { cls: "VI – VIII", admission: "₹0", monthly: "₹0", exam: "₹50", other: "₹100" },
  { cls: "IX – X", admission: "₹0", monthly: "₹0", exam: "₹100", other: "₹150" },
  { cls: "XI – XII (Arts)", admission: "₹50", monthly: "₹30", exam: "₹150", other: "₹200" },
  { cls: "XI – XII (Commerce)", admission: "₹50", monthly: "₹30", exam: "₹150", other: "₹250" },
  { cls: "XI – XII (Science)", admission: "₹50", monthly: "₹50", exam: "₹150", other: "₹300" },
];

const NOTES = [
  "Girls are exempted from tuition fees as per Himachal Pradesh Government norms.",
  "Students belonging to SC/ST/BPL categories are eligible for fee concessions and scholarships.",
  "Board examination fees for classes X and XII are charged separately as per HPBoSE notifications.",
  "Fee once deposited is non-refundable.",
];

function FeeStructurePage() {
  return (
    <>
      <PageHero
        title="Fee Structure"
        subtitle="Affordable education for all — class-wise fee details for the current academic session"
      />
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted text-left">
                <th className="px-6 py-4 font-display font-semibold text-foreground">Class</th>
                <th className="px-6 py-4 font-display font-semibold text-foreground">
                  Admission Fee
                </th>
                <th className="px-6 py-4 font-display font-semibold text-foreground">
                  Monthly Tuition
                </th>
                <th className="px-6 py-4 font-display font-semibold text-foreground">Exam Fee</th>
                <th className="px-6 py-4 font-display font-semibold text-foreground">
                  Other Charges (Annual)
                </th>
              </tr>
            </thead>
            <tbody>
              {FEES.map((row) => (
                <tr key={row.cls} className="border-b border-border last:border-0">
                  <td className="px-6 py-3 font-medium text-foreground">{row.cls}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.admission}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.monthly}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.exam}</td>
                  <td className="px-6 py-3 text-muted-foreground">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 rounded-xl bg-muted p-8">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Concessions & Important Notes
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {NOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
