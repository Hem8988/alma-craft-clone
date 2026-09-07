import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Microscope,
  Monitor,
  BookOpen,
  Trophy,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";
import bio from "@/assets/biology-lab.jpg";

export const Route = createFileRoute("/infrastructure/")({
  head: () => ({
    meta: [
      { title: "Infrastructure & Facilities | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Laboratories, computer lab, library, smart classrooms, sports grounds and campus facilities at GSSS Sangla, Kinnaur.",
      },
      { property: "og:title", content: "Infrastructure at GSSS Sangla" },
      {
        property: "og:description",
        content: "Modern labs, library, smart classrooms and sports facilities in the Himalayas.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/infrastructure" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/infrastructure" }],
  }),
  component: Infrastructure,
});

function Infrastructure() {
  const { content } = useSiteContent();
  const facilities = content.infrastructureList || [];
  const amenities = content.amenitiesList || [];

  const [selectedCat, setSelectedCat] = useState("All");

  const categories = useMemo(() => {
    const list = facilities.map((f) => f.cat).filter(Boolean);
    const unique = Array.from(new Set(list));
    return ["All", ...unique];
  }, [facilities]);

  const filteredFacilities =
    selectedCat === "All"
      ? facilities
      : facilities.filter((f) => f.cat === selectedCat);

  return (
    <>
      <PageHero
        title="Campus & Infrastructure"
        subtitle="Modern science laboratories, interactive digital smart rooms, sports grounds, and learning resources designed for excellence."
        badge="State-of-the-Art Facilities"
        breadcrumb={[{ label: "Infrastructure" }]}
      />

      {/* Facilities Grid with Category Filter */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-label">Explore Facilities</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-navy">
              World-Class Infrastructure at {content.schoolShortName || "GSSS Sangla"}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  selectedCat === cat
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Facility Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredFacilities.map((f, idx) => (
              <Reveal key={f.title + idx} delay={idx * 80} variant="up">
                <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={f.imgUrl || bio}
                        alt={f.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 rounded-full bg-saffron text-accent-foreground px-2.5 py-0.5 text-[0.68rem] font-bold shadow-sm">
                        {f.tag}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-xl font-bold text-navy group-hover:text-primary transition-colors">
                        {f.title}
                      </h3>
                      <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                        {f.text}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-2 border-t border-border/50">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron">
                      <ShieldCheck className="size-3.5" />
                      CBSE Standard Compliant
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other Campus Amenities */}
      <section className="py-20 bg-muted/40 border-t border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Campus Amenities</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-navy">
              Essential Student Care & Support
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((a, i) => (
              <Reveal key={a.title + i} delay={i * 60} variant="zoom">
                <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="size-4 text-saffron shrink-0" />
                    <h3 className="font-display text-sm font-bold text-navy">{a.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed pl-6">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Admission link banner */}
          <div className="mt-14 text-center">
            <Reveal variant="up">
              <Link
                to="/admissions/form"
                className="shimmer-btn inline-flex items-center gap-2 rounded-xl bg-saffron px-8 py-3.5 text-sm font-bold text-accent-foreground shadow-gold hover:bg-saffron-light transition-all"
              >
                <span>Experience {content.schoolShortName || "GSSS Sangla"} — Apply Today</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
