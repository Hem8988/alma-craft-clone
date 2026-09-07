import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { GraduationCap, Mail, Award, BookOpen, Sparkles, Phone, UserCheck } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/academics/faculty")({
  head: () => ({
    meta: [
      { title: "Our Faculty | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Meet the experienced teaching faculty of Govt. Sr. Sec. School Sangla across Science, Commerce, Arts and primary sections.",
      },
      { property: "og:title", content: "Faculty — GSSS Sangla" },
      {
        property: "og:description",
        content: "Qualified and dedicated teachers guiding students at GSSS Sangla.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/academics/faculty" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/academics/faculty" }],
  }),
  component: Faculty,
});

function initials(name: string) {
  return name
    .replace(/^(Sh\.|Smt\.|Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Faculty() {
  const { content } = useSiteContent();
  const facultyList = content.facultyList || [];
  const [selectedDept, setSelectedDept] = useState("All");

  const departments = useMemo(() => {
    const list = facultyList.map((f) => f.dept).filter(Boolean);
    const unique = Array.from(new Set(list));
    return ["All", ...unique];
  }, [facultyList]);

  const filteredFaculty =
    selectedDept === "All"
      ? facultyList
      : facultyList.filter((f) => f.dept === selectedDept);

  return (
    <>
      <PageHero
        title="Our Faculty & Mentors"
        subtitle={`Dedicated educators, subject specialists, and mentors shaping young minds at ${content.schoolShortName || "GSSS Sangla"}.`}
        badge="Highly Qualified Teaching Faculty"
        breadcrumb={[
          { label: "Academics", to: "/about" },
          { label: "Faculty Directory" },
        ]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-label">Academic Mentorship</span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl text-navy">
              Experienced Educators Committed to Your Growth
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Total {facultyList.length} faculty members dedicated to student success and holistic development
            </p>
            <div className="mt-4">
              <a
                href="/documents/teachers-staff-details.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-saffron/20 border border-saffron/40 px-4 py-2 text-xs font-bold text-navy hover:bg-saffron/30 transition-all shadow-xs"
              >
                <span>📥 Download Official Staff Matrix (PDF)</span>
                <span className="rounded bg-saffron px-1.5 py-0.2 text-[9px] font-black text-navy-deep">PDF</span>
              </a>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  selectedDept === dept
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Faculty Card Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredFaculty.map((f, i) => (
              <Reveal key={f.id || f.name + i} delay={i * 45} variant="up">
                <article className="hover-lift group h-full rounded-2xl border border-border bg-card p-6 text-center shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    {/* Glowing Avatar or Initials Ring */}
                    {f.imageUrl ? (
                      <div className="relative mx-auto size-20 overflow-hidden rounded-full ring-4 ring-saffron/20 group-hover:ring-saffron transition-all duration-300 shadow-md">
                        <img
                          src={f.imageUrl}
                          alt={f.name}
                          className="h-full w-full object-cover"
                        />
                        <Award className="absolute -bottom-1 -right-1 size-6 rounded-full bg-saffron p-1 text-accent-foreground shadow-sm" />
                      </div>
                    ) : (
                      <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-deep font-display text-xl font-bold text-primary-foreground shadow-md ring-4 ring-saffron/20 group-hover:ring-saffron transition-all duration-300">
                        {initials(f.name) || "GS"}
                        <Award className="absolute -bottom-1 -right-1 size-6 rounded-full bg-saffron p-1 text-accent-foreground shadow-sm" />
                      </div>
                    )}

                    <h3 className="mt-4 font-display text-base font-bold text-navy group-hover:text-primary transition-colors">
                      {f.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wide text-saffron mt-0.5">
                      {f.role}
                    </p>
                    <p className="mt-2 text-xs font-medium text-foreground/80">
                      {f.subject}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-border/60 space-y-1.5">
                    {f.qual && (
                      <p className="flex items-center justify-center gap-1.5 text-[0.72rem] text-muted-foreground">
                        <GraduationCap className="size-3.5 text-saffron" />
                        <span>{f.qual}</span>
                      </p>
                    )}
                    {f.exp && (
                      <span className="inline-block rounded-full bg-navy/5 px-2 py-0.5 text-[0.65rem] font-semibold text-navy">
                        {f.exp}
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {filteredFaculty.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-dashed border-border p-8">
              <p className="text-sm font-semibold text-muted-foreground">
                No faculty members found in "{selectedDept}".
              </p>
            </div>
          )}

          {/* Academic Consultation Contact Box */}
          <div className="mt-14 rounded-2xl border border-border bg-cream/70 p-8 text-center max-w-3xl mx-auto shadow-soft">
            <h3 className="font-display text-lg font-bold text-navy">
              Want to consult our faculty for academic guidance?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              Parents are welcome to meet subject teachers during designated parent-teacher interaction hours or write directly to the school office.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${content.email || "gssssangla@gmail.com"}`}
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-navy-deep transition-all"
              >
                <Mail className="size-3.5 text-saffron" />
                <span>Email: {content.email || "gssssangla@gmail.com"}</span>
              </a>
              <a
                href={`tel:${content.phone?.replace(/[^0-9+]/g, "") || "+911786000000"}`}
                className="inline-flex items-center gap-2 rounded-xl border border-navy/30 bg-card px-5 py-2.5 text-xs font-bold text-navy hover:bg-muted transition-all"
              >
                <Phone className="size-3.5 text-saffron" />
                <span>Call School Desk ({content.phone || "+91 1786-XXXXXX"})</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
