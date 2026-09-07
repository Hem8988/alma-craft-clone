import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Award,
  BookOpen,
  Target,
  Compass,
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  GraduationCap,
  Clock,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";
import campus from "@/assets/campus-2.jpg";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Us | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Our story, mission and vision — decades of quality government education in Sangla, Kinnaur, Himachal Pradesh.",
      },
      { property: "og:title", content: "About GSSS Sangla" },
      {
        property: "og:description",
        content: "History, mission, vision and leadership of Govt. Sr. Sec. School Sangla.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/about" }],
  }),
  component: About,
});

const VALUE_ICONS = [Target, Heart, Compass, Sparkles];

function About() {
  const { content } = useSiteContent();

  const highlights = content.aboutHighlights || [];
  const timeline = content.aboutTimeline || [];
  const values = content.aboutValues || [];

  return (
    <>
      <PageHero
        title={`About ${content.schoolShortName || "GSSS Sangla"}`}
        subtitle="Empowering generations in the Sangla Valley through quality CBSE education, discipline, and Himalayan values."
        badge="Instituted by Govt. of Himachal Pradesh"
        breadcrumb={[{ label: "About Us" }]}
      />

      {/* Story & Campus Overview */}
      <section className="py-20 bg-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <Reveal variant="right">
            <div className="space-y-5">
              <span className="section-label">Our Legacy & Heritage</span>
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-navy">
                {content.aboutStoryTitle || "Educating the Sangla Valley for Generations"}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {content.aboutStoryP1}
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {content.aboutStoryP2}
              </p>

              <div className="pt-3">
                <h3 className="font-display text-lg font-bold text-navy mb-3">
                  Why Families Choose {content.schoolShortName || "GSSS Sangla"}:
                </h3>
                <ul className="space-y-2.5">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm text-foreground/80">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-saffron" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal variant="left" delay={150}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-elevated border border-border">
                <img
                  src={content.heroImageUrl || campus}
                  alt="School campus building in Sangla"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-navy p-5 text-primary-foreground shadow-elevated hidden sm:block max-w-xs border border-white/10">
                <p className="font-display text-2xl font-bold text-saffron">{content.stat3Value || "CBSE"}</p>
                <p className="text-xs text-primary-foreground/80 mt-1">
                  {content.affiliationCode || "Affiliated institution offering Science, Commerce & Humanities."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Institutional Timeline */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal variant="down">
              <span className="section-label">Milestones</span>
            </Reveal>
            <Reveal variant="up" delay={50}>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-navy">
                Our Journey of Continuous Growth
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, idx) => (
              <Reveal key={t.year + t.title} delay={idx * 80} variant="up">
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-saffron/15 text-saffron px-3 py-1 text-xs font-extrabold mb-3">
                      {t.year}
                    </span>
                    <h3 className="font-display text-lg font-bold text-navy">{t.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Core Institutional Values */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal variant="down">
              <span className="section-label">Core Philosophy</span>
            </Reveal>
            <Reveal variant="up" delay={50}>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-navy">
                Pillars of {content.schoolShortName || "GSSS Sangla"} Education
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const IconComp = VALUE_ICONS[i % VALUE_ICONS.length] || Sparkles;
              return (
                <Reveal key={v.title} delay={i * 80} variant="zoom">
                  <div className="hover-lift h-full rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all text-center flex flex-col items-center">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-navy/10 text-navy">
                      <IconComp className="size-7 text-saffron" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy">{v.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom CTA Card */}
          <div className="mt-14">
            <Reveal variant="up" delay={150}>
              <div className="rounded-2xl bg-gradient-to-r from-navy-deep via-navy to-navy-deep p-8 text-primary-foreground text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-elevated">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Meet Our Dedicated Faculty
                  </h3>
                  <p className="text-sm text-primary-foreground/80 mt-1 max-w-xl">
                    Discover the qualified educators and subject specialists guiding your child's academic journey.
                  </p>
                </div>
                <Link
                  to="/academics/faculty"
                  className="shimmer-btn rounded-xl bg-saffron px-6 py-3 text-xs font-bold text-accent-foreground shadow-gold hover:bg-saffron-light transition-all whitespace-nowrap"
                >
                  View Faculty Directory →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
