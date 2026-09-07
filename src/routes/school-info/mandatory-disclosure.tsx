import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, FileCheck, Download, FileText, ExternalLink, Award, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/school-info/mandatory-disclosure")({
  head: () => ({
    meta: [
      { title: "Mandatory Public Disclosure & Certificates | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Mandatory public disclosure of Govt. Sr. Sec. School Sangla: CBSE affiliation, NOCs, building safety, fire NOC, water certificates and staff details.",
      },
      { property: "og:title", content: "Mandatory Disclosure & Certificates — GSSS Sangla" },
      {
        property: "og:description",
        content:
          "Official statutory public disclosure and verified certificates for GSSS Sangla, Kinnaur.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/school-info/mandatory-disclosure" },
    ],
    links: [
      { rel: "canonical", href: "https://alma-craft-clone.lovable.app/school-info/mandatory-disclosure" },
    ],
  }),
  component: MandatoryDisclosurePage,
});

const OFFICIAL_DOCS = [
  {
    title: "CBSE Affiliation Extension Letter",
    category: "Affiliation Copy",
    file: "/documents/cbse-affiliation-letter.pdf",
    tag: "CBSE Affiliation",
  },
  {
    title: "State Government NOC Certificate",
    category: "Government NOC",
    file: "/documents/noc-certificate.pdf",
    tag: "State Govt NOC",
  },
  {
    title: "Society Registration Certificate",
    category: "Legal & Society",
    file: "/documents/society-registration.pdf",
    tag: "Registration",
  },
  {
    title: "Building Safety Certificate",
    category: "PWD / Structural Safety",
    file: "/documents/building-safety-certificate.pdf",
    tag: "Safety Norms",
  },
  {
    title: "Fire Safety NOC Application / Certificate",
    category: "Fire Department",
    file: "/documents/fire-safety-noc.pdf",
    tag: "Fire Safety",
  },
  {
    title: "Safe Drinking Water & Sanitation Certificate",
    category: "Health & Hygiene",
    file: "/documents/water-safety-certificate.pdf",
    tag: "Health & Sanitation",
  },
  {
    title: "DEO Certification Copy",
    category: "District Education Officer",
    file: "/documents/deo-certificate.pdf",
    tag: "DEO Office",
  },
  {
    title: "School Management Committee (SMC) Members",
    category: "Governance & Committee",
    file: "/documents/smc-committee-members.pdf",
    tag: "SMC List",
  },
  {
    title: "3-Years Board Examination Results (Class 10 & 12)",
    category: "Academic Records",
    file: "/documents/three-years-board-results.pdf",
    tag: "Board Results",
  },
  {
    title: "Teachers & Teaching Staff Details Matrix",
    category: "Staff Composition",
    file: "/documents/teachers-staff-details.pdf",
    tag: "Staff Details",
  },
  {
    title: "Official Approved Fee Structure Chart",
    category: "Financial Disclosures",
    file: "/documents/fee-structure.pdf",
    tag: "Fee Structure",
  },
  {
    title: "School Annual Academic Calendar",
    category: "Academic Year 2026-27",
    file: "/documents/academic-calendar.pdf",
    tag: "Calendar",
  },
];

function MandatoryDisclosurePage() {
  const { content } = useSiteContent();
  const sections = content.disclosureSections || [];

  return (
    <>
      <PageHero
        title="Mandatory Public Disclosure"
        subtitle={`Official statutory records, government NOCs, CBSE affiliation compliance, and safety certificates for ${content.schoolName || "Govt. Sr. Sec. School Sangla"}.`}
        badge="Statutory Public Record (CBSE Appendix IX)"
        breadcrumb={[
          { label: "School Info", to: "/school-info" },
          { label: "Mandatory Disclosure" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 bg-background space-y-16">
        {/* Official PDF Documents Download Cards Section */}
        <div>
          <Reveal variant="up">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="section-label">Official Certificates & Compliances</span>
                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-navy">
                  Certified Documents & PDF Downloads
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Download authentic, verified PDF copies of all statutory certificates submitted to CBSE New Delhi.
                </p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-saffron/10 border border-saffron/30 px-3 py-1 text-xs font-bold text-navy">
                <CheckCircle2 className="size-4 text-saffron" />
                <span>12 Certified Documents Available</span>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFICIAL_DOCS.map((doc, idx) => (
              <Reveal key={doc.file + idx} delay={idx * 40} variant="up">
                <div className="group hover-lift flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-md bg-navy/10 px-2 py-0.5 text-[10px] font-bold text-navy uppercase">
                        {doc.tag}
                      </span>
                      <span className="rounded bg-saffron/20 border border-saffron/30 px-1.5 py-0.2 text-[9px] font-extrabold text-navy-deep">
                        PDF
                      </span>
                    </div>

                    <h3 className="mt-3 font-display text-sm font-bold text-navy group-hover:text-saffron transition-colors leading-snug">
                      {doc.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted-foreground">{doc.category}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border flex items-center justify-between">
                    <a
                      href={doc.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-saffron transition-colors"
                    >
                      <ExternalLink className="size-3.5 text-saffron" /> View Document
                    </a>
                    <a
                      href={doc.file}
                      download
                      className="inline-flex items-center gap-1 rounded-lg bg-navy/5 hover:bg-navy hover:text-white px-2.5 py-1 text-xs font-semibold text-navy transition-all"
                      title="Download PDF"
                    >
                      <Download className="size-3 text-saffron" /> Download
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Structured Disclosure Tables */}
        <div className="space-y-8 pt-8 border-t border-border">
          <Reveal variant="up">
            <div>
              <span className="section-label">Detailed Information Matrix</span>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                Institutional Disclosures & Statistics
              </h2>
            </div>
          </Reveal>

          {sections.map((section, idx) => (
            <Reveal key={section.title + idx} delay={idx * 60} variant="up">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <div className="flex items-center gap-2 bg-navy px-6 py-4 text-primary-foreground">
                  <FileCheck className="size-4 text-saffron" />
                  <h2 className="font-display text-base font-bold text-white">
                    {section.title}
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {(section.rows || []).map(([label, value], rIdx) => (
                    <div
                      key={label + rIdx}
                      className="grid grid-cols-1 sm:grid-cols-3 p-4 gap-2 hover:bg-muted/30 transition-colors text-xs sm:text-sm"
                    >
                      <div className="font-bold text-navy">{label}</div>
                      <div className="sm:col-span-2 text-foreground/80">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="rounded-2xl bg-cream/70 p-6 text-center border border-border">
          <p className="text-xs text-muted-foreground">
            Information validated for the current academic session {content.admissionSession || "2026-27"}. For official certified physical copies, please contact the Principal's Office ({content.phone || "+91 82193-98898"}) during school hours.
          </p>
        </div>
      </section>
    </>
  );
}

