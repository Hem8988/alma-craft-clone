import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/school-info/fee-structure")({
  head: () => ({
    meta: [
      { title: "Fee Structure | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Class-wise highly subsidized fee structure of Govt. Sr. Sec. School Sangla for the current academic session.",
      },
      { property: "og:title", content: "Fee Structure — Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content:
          "Class-wise fee structure and government concessions for Govt. Sr. Sec. School Sangla.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/school-info/fee-structure" },
    ],
    links: [
      { rel: "canonical", href: "https://alma-craft-clone.lovable.app/school-info/fee-structure" },
    ],
  }),
  component: FeeStructurePage,
});

function FeeStructurePage() {
  const { content } = useSiteContent();
  const feeRows = content.feeRows || [];
  const feeNotes = content.feeNotes || [];

  return (
    <>
      <PageHero
        title="Fee Structure & Concessions"
        subtitle={`Affordable, government-subsidized education ensuring every child in Sangla Valley has equal learning access at ${content.schoolShortName || "GSSS Sangla"}.`}
        badge="Session 2026-27 Government Scale"
        breadcrumb={[
          { label: "School Info", to: "/school-info" },
          { label: "Fee Structure" },
        ]}
      />

      <section className="mx-auto max-w-5xl px-4 py-16 bg-background space-y-8">
        <Reveal variant="up">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-saffron/30 bg-saffron/10 p-5 shadow-xs">
            <div>
              <h3 className="font-display text-base font-bold text-navy">Official Certified Fee Structure</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Download the official government approved fee matrix and circular in PDF format.
              </p>
            </div>
            <a
              href="/documents/fee-structure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-navy/90 transition-all hover:scale-105"
            >
              <span>Download Fee PDF</span>
              <span className="rounded bg-saffron px-1.5 py-0.2 text-[9px] font-black text-navy-deep">PDF</span>
            </a>
          </div>
        </Reveal>

        <Reveal variant="up">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="bg-navy p-4 text-primary-foreground flex items-center justify-between">
              <span className="font-display font-bold text-sm">Class-Wise Fee Schedule (INR)</span>
              <span className="text-xs text-saffron-light">Official Govt. Norms</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60 text-left">
                    <th className="px-6 py-4 font-display font-bold text-navy">Class / Section</th>
                    <th className="px-6 py-4 font-display font-bold text-navy">Admission Fee</th>
                    <th className="px-6 py-4 font-display font-bold text-navy">Monthly Tuition</th>
                    <th className="px-6 py-4 font-display font-bold text-navy">Exam Fee</th>
                    <th className="px-6 py-4 font-display font-bold text-navy">Annual Charges</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row) => (
                    <tr key={row.cls} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-navy">{row.cls}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{row.admission}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{row.monthly}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{row.exam}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={150}>
          <div className="mt-10 rounded-2xl border border-border bg-cream/70 p-8 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="size-5 text-saffron" />
              <h2 className="font-display text-xl font-bold text-navy">
                Government Subsidies, Waivers & Scholarships
              </h2>
            </div>
            <ul className="space-y-3 text-sm text-foreground/85">
              {feeNotes.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-saffron shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <Reveal variant="zoom">
            <Link
              to="/admissions/form"
              className="shimmer-btn inline-flex items-center gap-2 rounded-xl bg-saffron px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-gold hover:bg-saffron-light transition-all"
            >
              <span>Proceed to Online Admission Form</span>
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
