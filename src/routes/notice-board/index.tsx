import { createFileRoute } from "@tanstack/react-router";
import { Bell, Download } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";

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
    ],
  }),
  component: NoticeBoard,
});

const NOTICES = [
  {
    date: "22 Aug 2026",
    tag: "Examination",
    title: "Half-Yearly Examination Datesheet (Classes 6-12)",
    text: "The half-yearly examinations will commence from 10 September 2026. Students must carry their admit cards.",
  },
  {
    date: "18 Aug 2026",
    tag: "Meeting",
    title: "Parent-Teacher Meeting on 30 August 2026",
    text: "Parents are requested to attend the PTM between 10:00 AM and 1:00 PM to discuss student progress.",
  },
  {
    date: "10 Aug 2026",
    tag: "Scholarship",
    title: "Submission of scholarship forms",
    text: "Eligible students must submit their scholarship applications with income and category certificates by 5 September 2026.",
  },
  {
    date: "01 Aug 2026",
    tag: "Holiday",
    title: "Holiday list for the second half of the session",
    text: "The revised holiday list as per the Directorate of Education, Himachal Pradesh is displayed on the school notice board.",
  },
  {
    date: "20 Jul 2026",
    tag: "Admission",
    title: "Late admissions for Class 11 streams",
    text: "Limited seats are available in the Commerce and Arts streams. Contact the school office for details.",
  },
];

function NoticeBoard() {
  return (
    <>
      <PageHero title="Notice Board" subtitle="Official notices and announcements for students and parents." />

      <section className="py-20">
        <div className="mx-auto max-w-4xl space-y-4 px-4">
          {NOTICES.map((n) => (
            <article
              key={n.title}
              className="rounded-xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Bell className="size-4 text-saffron" />
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy">
                  {n.tag}
                </span>
                <span className="text-xs text-muted-foreground">{n.date}</span>
              </div>
              <h2 className="mt-3 font-display text-lg font-bold text-navy">{n.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{n.text}</p>
              <button
                type="button"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-saffron"
              >
                <Download className="size-4" /> View notice
              </button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
