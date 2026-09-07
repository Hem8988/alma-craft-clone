import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, Calendar, Tag, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/notice-board/")({
  head: () => ({
    meta: [
      { title: "Notice Board | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Official notices, examination schedules, holiday lists and announcements from GSSS Sangla, Kinnaur.",
      },
      { property: "og:title", content: "Notice Board — GSSS Sangla" },
      {
        property: "og:description",
        content: "All official school notices and announcements in one place.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/notice-board" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/notice-board" }],
  }),
  component: NoticeBoard,
});

const DEFAULT_NOTICES = [
  {
    id: "demo-1",
    title: "CBSE Class 10 & 12 Board Examination Schedule 2026",
    description: "Detailed date sheet and instructions for board examinees. Students are advised to collect admit cards from the administrative office.",
    notice_date: "2026-03-01",
    category: "Examinations",
  },
  {
    id: "demo-2",
    title: "Admissions Open for Academic Session 2026-27 (Classes 1 to 12)",
    description: "Online and offline admission applications are invited for all streams (Science, Commerce, Arts). Submit documents before the deadline.",
    notice_date: "2026-02-28",
    category: "Admissions",
  },
  {
    id: "demo-3",
    title: "Annual Sports Meet & Inter-House Athletics Tournament",
    description: "Registration for track and field events, volleyball, and cricket tournaments is now open with PET Incharge Sh. Mohan Lal.",
    notice_date: "2026-02-20",
    category: "Sports",
  },
  {
    id: "demo-4",
    title: "District Level Science Exhibition & Robotics Workshop",
    description: "Selected science models from high school students will represent GSSS Sangla at the Kinnaur district exhibition in Reckong Peo.",
    notice_date: "2026-02-15",
    category: "Academics",
  },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function NoticeBoard() {
  const [selectedCat, setSelectedCat] = useState("All");

  const { data: dbNotices = [], isLoading } = useQuery({
    queryKey: ["public-notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("id, title, description, notice_date, category")
        .order("notice_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const allNotices = dbNotices.length > 0 ? dbNotices : DEFAULT_NOTICES;

  const categories = ["All", ...Array.from(new Set(allNotices.map((n) => n.category)))];

  const filteredNotices =
    selectedCat === "All"
      ? allNotices
      : allNotices.filter((n) => n.category === selectedCat);

  return (
    <>
      <PageHero
        title="Notice Board & Circulars"
        subtitle="Official circulars, examination schedules, academic calendars, and administrative updates."
        badge="Official School Bulletin"
        breadcrumb={[{ label: "Notice Board" }]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCat(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  selectedCat === c
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {isLoading && (
              <p className="py-12 text-center text-sm text-muted-foreground">Loading notices…</p>
            )}

            {filteredNotices.map((n, i) => (
              <Reveal key={n.id} delay={i * 70} variant="up">
                <article className="hover-lift group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-navy/10 text-navy group-hover:bg-navy group-hover:text-saffron transition-colors">
                    <Bell className="size-5 text-saffron" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="rounded-full bg-saffron/15 text-saffron font-bold text-[0.68rem] px-2.5 py-0.5">
                        {n.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="size-3 text-muted-foreground" />
                        {formatDate(n.notice_date)}
                      </span>
                    </div>

                    <h2 className="font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                      {n.title}
                    </h2>

                    {n.description && (
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {n.description}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
