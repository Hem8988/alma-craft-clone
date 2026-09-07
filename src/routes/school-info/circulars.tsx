import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FileText, Sparkles } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

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

function CircularsPage() {
  const { content } = useSiteContent();
  const circulars = content.circularsList || [];

  return (
    <>
      <PageHero
        title="Official Circulars"
        subtitle={`Official circulars, administrative advisories and notifications from ${content.schoolShortName || "GSSS Sangla"} administration.`}
        badge="Official Notifications"
        breadcrumb={[{ label: "School Info", to: "/school-info" }, { label: "Circulars" }]}
      />
      <section className="mx-auto max-w-4xl px-4 py-20 bg-background">
        <ul className="space-y-4">
          {circulars.map((c, idx) => (
            <Reveal key={c.ref + idx} delay={idx * 60} variant="up">
              <li
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-elevated hover:border-saffron/40"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/10 text-navy">
                  <FileText className="size-5 text-saffron" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-navy text-base">{c.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ref: {c.ref} · Issued on {c.date}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy">
                  {c.date}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Certified physical copies of all circulars are available at the school office ({content.phone || "+91 1786-XXXXXX"}) during working hours.
        </p>
      </section>
    </>
  );
}
