import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import c6 from "@/assets/campus-6.jpg";
import c5 from "@/assets/campus-5.jpg";
import c3 from "@/assets/campus-3.jpg";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Events | Govt. Sr. Sec. School Sangla" },
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

const IMAGES = [c6, c5, c3];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function News() {
  const { data: news = [], isLoading } = useQuery({
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

  const featured = news.slice(0, 3);
  const updates = news.slice(3);

  return (
    <>
      <PageHero title="News & Events" subtitle="Announcements, achievements and celebrations from our campus." />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          {isLoading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading news…</p>
          )}
          {!isLoading && news.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No news published yet. Please check back soon.
            </p>
          )}

          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((n, i) => (
              <Reveal key={n.id} delay={i * 80} className="hover-scale">
                <article className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                  <img
                    src={IMAGES[i % IMAGES.length]}
                    alt={n.title}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5 text-saffron" /> {formatDate(n.published_at)}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold text-navy">{n.title}</h3>
                    {n.excerpt && (
                      <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {updates.length > 0 && (
            <>
              <h2 className="mt-16 font-display text-2xl font-bold text-navy">More Updates</h2>
              <ul className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
                {updates.map((u) => (
                  <li
                    key={u.id}
                    className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span className="shrink-0 rounded bg-cream px-2 py-1 text-xs font-semibold text-navy">
                      {formatDate(u.published_at)}
                    </span>
                    <span className="text-sm font-medium text-navy">{u.title}</span>
                    {u.excerpt && (
                      <span className="text-sm text-muted-foreground">— {u.excerpt}</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
