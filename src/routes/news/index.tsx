import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
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

const FEATURED = [
  {
    img: c6,
    date: "12 August 2026",
    title: "Independence Day celebrated with cultural programme",
    text: "Students presented patriotic songs, Kinnauri folk dance and a march past, followed by prize distribution for academic toppers.",
  },
  {
    img: c5,
    date: "28 July 2026",
    title: "Annual Sports Meet concludes successfully",
    text: "Three days of athletics, volleyball and kabaddi saw enthusiastic participation from all four houses of the school.",
  },
  {
    img: c3,
    date: "10 July 2026",
    title: "Science exhibition showcases student innovation",
    text: "Working models on renewable energy, water conservation and Himalayan biodiversity were displayed by senior classes.",
  },
];

const UPDATES = [
  { date: "20 Aug 2026", title: "Parent-Teacher Meeting scheduled for 30 August 2026" },
  { date: "05 Aug 2026", title: "Half-yearly examination datesheet released" },
  { date: "22 Jul 2026", title: "Scholarship forms for SC/ST/OBC students invited" },
  { date: "15 Jul 2026", title: "Inter-house debate competition winners announced" },
  { date: "02 Jul 2026", title: "New books added to the school library" },
];

function News() {
  return (
    <>
      <PageHero title="News & Events" subtitle="Announcements, achievements and celebrations from our campus." />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED.map((n) => (
              <article
                key={n.title}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
              >
                <img src={n.img} alt={n.title} loading="lazy" className="h-48 w-full object-cover" />
                <div className="p-5">
                  <p className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5 text-saffron" /> {n.date}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-navy">{n.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{n.text}</p>
                </div>
              </article>
            ))}
          </div>

          <h2 className="mt-16 font-display text-2xl font-bold text-navy">Latest Updates</h2>
          <ul className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {UPDATES.map((u) => (
              <li key={u.title} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
                <span className="shrink-0 rounded bg-cream px-2 py-1 text-xs font-semibold text-navy">
                  {u.date}
                </span>
                <span className="text-sm text-muted-foreground">{u.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
