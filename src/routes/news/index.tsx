import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ArrowRight, Sparkles, Newspaper } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import c6 from "@/assets/campus-6.jpg";
import c5 from "@/assets/campus-5.jpg";
import c3 from "@/assets/campus-3.jpg";
import c1 from "@/assets/campus-1.jpg";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Happenings | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Latest news, announcements, sports meets and cultural events at Govt. Sr. Sec. School Sangla, Kinnaur.",
      },
      { property: "og:title", content: "News & Events — GSSS Sangla" },
      {
        property: "og:description",
        content: "Stay updated with the latest happenings at GSSS Sangla.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/news" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/news" }],
  }),
  component: News,
});

const DEFAULT_NEWS = [
  {
    id: "news-1",
    title: "GSSS Sangla Students Achieve Outstanding Results in CBSE Board 2026",
    excerpt: "Students from Science and Commerce streams registered 100% pass percentages with several students scoring above 90% in Kinnaur district.",
    published_at: "2026-03-05",
    tag: "CBSE Results",
  },
  {
    id: "news-2",
    title: "Grand Annual Day Celebrations & Kinnauri Cultural Festival",
    excerpt: "A vibrant day featuring student folk performances, theatrical dramas, academic award distribution, and principal address.",
    published_at: "2026-02-26",
    tag: "Celebration",
  },
  {
    id: "news-3",
    title: "Admissions Open for Academic Session 2026-27 (Classes 1 to 12)",
    excerpt: "Online application forms are now open on the school web portal. Free counseling and document verification desks are active.",
    published_at: "2026-02-18",
    tag: "Admissions",
  },
  {
    id: "news-4",
    title: "New ICT Computer Science Lab & Robotics Module Inaugurated",
    excerpt: "Equipped with high-speed internet and modern desktops to support the state government's digital education initiative.",
    published_at: "2026-02-05",
    tag: "Campus Upgrade",
  },
];

const IMAGES = [c6, c5, c3, c1];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function News() {
  const { data: dbNews = [], isLoading } = useQuery({
    queryKey: ["public-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("id, title, excerpt, published_at")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const news = dbNews.length > 0 ? dbNews : DEFAULT_NEWS;

  const featured = news.slice(0, 3);
  const updates = news.slice(3);

  return (
    <>
      <PageHero
        title="News & Announcements"
        subtitle="Recent achievements, academic milestones, celebrations, and circulars from GSSS Sangla."
        badge="Press & Media Bulletins"
        breadcrumb={[{ label: "News & Events" }]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading && (
            <p className="py-12 text-center text-sm text-muted-foreground">Loading news articles…</p>
          )}

          {/* Featured News Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((n, i) => (
              <Reveal key={n.id} delay={i * 80} variant="up">
                <article className="hover-lift group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={IMAGES[i % IMAGES.length]}
                        alt={n.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 right-3 rounded-full bg-navy/80 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
                        {n.tag || "Official"}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <CalendarDays className="size-3.5 text-saffron" />
                        <span>{formatDate(n.published_at)}</span>
                      </p>
                      <h3 className="font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                        {n.title}
                      </h3>
                      {n.excerpt && (
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {n.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-2 border-t border-border/50">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-navy group-hover:text-saffron transition-colors">
                      <span>Read Full Story</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* More Updates List */}
          {updates.length > 0 && (
            <div className="mt-16">
              <Reveal variant="up">
                <div className="flex items-center gap-2 mb-6">
                  <Newspaper className="size-5 text-saffron" />
                  <h2 className="font-display text-2xl font-bold text-navy">Additional Bulletins</h2>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft divide-y divide-border">
                  {updates.map((u) => (
                    <div
                      key={u.id}
                      className="p-5 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="rounded bg-saffron/15 px-2 py-0.5 text-[0.68rem] font-bold text-saffron">
                            {formatDate(u.published_at)}
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold text-navy">{u.title}</h4>
                        {u.excerpt && (
                          <p className="text-xs text-muted-foreground mt-1">{u.excerpt}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
