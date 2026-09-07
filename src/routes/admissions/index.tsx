import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  UserCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Download,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

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

const STEP_ICONS = [ClipboardList, FileText, UserCheck, CalendarDays];

function Admissions() {
  const { content } = useSiteContent();

  const steps = content.admissionSteps || [];
  const docs = content.admissionDocs || [];
  const dates = content.admissionDates || [];
  const faqs = content.admissionFaqs || [];

  return (
    <>
      <PageHero
        title={content.admissionSession || "Admissions 2026-27"}
        subtitle="Transparent, merit-based, and welcoming admission process for students seeking quality CBSE education in Kinnaur."
        badge={content.admissionStatus || "Session 2026-27 Registrations Open"}
        breadcrumb={[{ label: "Admissions" }]}
      />

      {/* 4-Step Interactive Journey */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">How to Enroll</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-navy">
              Simple 4-Step Admission Journey
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Follow these straightforward steps to secure your child's enrollment for {content.admissionSession || "the academic year 2026-27"}.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, idx) => {
              const IconComp = STEP_ICONS[idx % STEP_ICONS.length] || ClipboardList;
              return (
                <Reveal key={s.title + idx} delay={idx * 90} variant="up">
                  <article className="hover-lift relative h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-display text-2xl font-black text-saffron">
                          {s.step || `0${idx + 1}`}
                        </span>
                        <div className="flex size-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                          <IconComp className="size-5" />
                        </div>
                      </div>

                      <span className="inline-block rounded-full bg-navy/5 px-2.5 py-0.5 text-[0.65rem] font-bold text-navy mb-2">
                        {s.tag}
                      </span>

                      <h3 className="font-display text-lg font-bold text-navy">{s.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Reveal variant="zoom">
              <Link
                to="/admissions/form"
                className="shimmer-btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-gold hover:scale-105 transition-all"
              >
                <Sparkles className="size-4" />
                <span>Fill Online Admission Form ({content.admissionSession || "2026-27"})</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Documents & Important Dates Grid */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2">
          {/* Document Checklist */}
          <Reveal variant="right">
            <div>
              <span className="section-label">Checklist</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                Documents Required
              </h2>
              <p className="mt-2 text-xs text-muted-foreground mb-6">
                Please prepare these documents for verification during the admission process:
              </p>

              <ul className="space-y-3">
                {docs.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-3.5 shadow-sm text-xs sm:text-sm text-foreground/85"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 text-saffron shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Important Dates Table */}
          <Reveal variant="left" delay={150}>
            <div>
              <span className="section-label">Key Milestones</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy">
                Admission Schedule
              </h2>
              <p className="mt-2 text-xs text-muted-foreground mb-6">
                Important dates for the {content.admissionSession || "2026-27"} academic session admission cycle:
              </p>

              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <div className="divide-y divide-border">
                  {dates.map((d) => (
                    <div
                      key={d.label}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-2 hover:bg-muted/40 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-bold text-navy">{d.label}</p>
                        <span className="inline-block text-[0.68rem] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded mt-1">
                          {d.status}
                        </span>
                      </div>
                      <span className="font-display font-bold text-saffron text-sm whitespace-nowrap">
                        {d.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-saffron/10 border border-saffron/20 p-3.5 rounded-xl">
                <AlertCircle className="size-4 text-saffron shrink-0 mt-0.5" />
                <span>
                  Dates are subject to guidelines from the Directorate of Higher Education, Govt. of Himachal Pradesh.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-background border-t border-border">
        <div className="mx-auto max-w-4xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Common Queries</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-navy">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q + i} delay={i * 70} variant="up">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="size-5 text-saffron shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-base font-bold text-navy">{faq.q}</h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
