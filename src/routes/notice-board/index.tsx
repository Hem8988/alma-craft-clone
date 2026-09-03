import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
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

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function NoticeBoard() {
  const { data: notices = [], isLoading } = useQuery({
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

  return (
    <>
      <PageHero title="Notice Board" subtitle="Official notices and announcements for students and parents." />

      <section className="py-20">
        <div className="mx-auto max-w-4xl space-y-4 px-4">
          {isLoading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading notices…</p>
          )}
          {!isLoading && notices.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No notices published yet. Please check back soon.
            </p>
          )}
          {notices.map((n, i) => (
            <Reveal key={n.id} delay={i * 60}>
              <article className="rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-center gap-3">
                  <Bell className="size-4 text-saffron" />
                  <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy">
                    {n.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(n.notice_date)}</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-bold text-navy">{n.title}</h2>
                {n.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{n.description}</p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
