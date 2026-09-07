import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

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
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/about/policies" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/about/policies" }],
  }),
  component: Policies,
});

function Policies() {
  const { content } = useSiteContent();
  const policies = content.policiesList || [];

  return (
    <>
      <PageHero
        title="School Policies"
        subtitle={`Rules and guidelines that keep ${content.schoolShortName || "GSSS Sangla"} campus safe, fair and focused.`}
        badge="Institutional Standards"
        breadcrumb={[{ label: "About", to: "/about" }, { label: "Policies" }]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          {policies.map((p, idx) => (
            <Reveal key={p.title + idx} delay={idx * 60} variant="up">
              <article className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all">
                <h2 className="font-display text-xl font-bold text-navy">{p.title}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground leading-relaxed">
                  {(p.points || []).map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
