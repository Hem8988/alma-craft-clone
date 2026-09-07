import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, MapPin, Sparkles, Trophy, Users } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "School Events & Calendar | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Upcoming events, celebrations, examinations and activities at Govt. Sr. Sec. School Sangla, Kinnaur.",
      },
      { property: "og:title", content: "School Events — GSSS Sangla" },
      {
        property: "og:description",
        content: "Calendar of upcoming events and activities at GSSS Sangla.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/events" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/events" }],
  }),
  component: Events,
});

const DEFAULT_EVENTS = [
  {
    id: "ev-1",
    title: "Annual Himalayan Science Fair & Model Exhibition",
    description: "Students from Classes 6 to 12 present original science working models, environmental demonstrations, and sustainable robotics projects.",
    event_date: "2026-03-25",
    event_time: "10:00 AM - 3:30 PM",
    location: "Main Multipurpose Hall & Quadrangle",
  },
  {
    id: "ev-2",
    title: "CBSE Class 10 & 12 Pre-Board Counseling & Mentorship",
    description: "Specialized exam strategy and stress management workshop led by senior subject faculties and alumni toppers.",
    event_date: "2026-04-05",
    event_time: "11:00 AM - 1:00 PM",
    location: "Senior Academic Block Lecture Hall",
  },
  {
    id: "ev-3",
    title: "Inter-School Volleyball & Athletic Championship 2026",
    description: "Annual sports tournament featuring top teams from Kinnaur district schools competing in track athletics, badminton, and volleyball.",
    event_date: "2026-04-18",
    event_time: "09:00 AM - 4:00 PM",
    location: "School Sports Ground & Athletic Track",
  },
  {
    id: "ev-4",
    title: "Parent-Teacher Interactive Forum (PTA Meeting)",
    description: "Comprehensive review of student academic progress, attendance records, and syllabus roadmap for the forthcoming term.",
    event_date: "2026-04-28",
    event_time: "10:30 AM - 2:00 PM",
    location: "Classrooms & Staff Resource Center",
  },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Events() {
  const { data: dbEvents = [], isLoading } = useQuery({
    queryKey: ["public-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, description, event_date, event_time, location")
        .order("event_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const allEvents = dbEvents.length > 0 ? dbEvents : DEFAULT_EVENTS;

  return (
    <>
      <PageHero
        title="Events & Activity Calendar"
        subtitle="Celebrations, academic competitions, sports meets, and parent-teacher interactions at GSSS Sangla."
        badge="Upcoming School Calendar"
        breadcrumb={[{ label: "Events Calendar" }]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-4xl space-y-6 px-4">
          {isLoading && (
            <p className="py-12 text-center text-sm text-muted-foreground">Loading events…</p>
          )}

          {allEvents.map((ev, i) => {
            const dateObj = new Date(ev.event_date + "T00:00:00");
            return (
              <Reveal key={ev.id} delay={i * 80} variant="up">
                <article className="hover-lift group rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col sm:flex-row items-start gap-6">
                  {/* Calendar Date Block */}
                  <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-deep text-primary-foreground shadow-md ring-2 ring-saffron/30 group-hover:ring-saffron transition-all">
                    <span className="font-display text-2xl font-black leading-none text-saffron-light">
                      {dateObj.getDate()}
                    </span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider mt-1 text-primary-foreground/90">
                      {dateObj.toLocaleDateString("en-IN", { month: "short" })}
                    </span>
                    <span className="text-[0.6rem] text-primary-foreground/60">
                      {dateObj.getFullYear()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold text-navy group-hover:text-primary transition-colors">
                      {ev.title}
                    </h2>
                    {ev.description && (
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {ev.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-foreground/80 pt-3 border-t border-border/50">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CalendarDays className="size-3.5 text-saffron" />
                        {formatDate(ev.event_date)}
                      </span>
                      {ev.event_time && (
                        <span className="flex items-center gap-1.5 font-medium">
                          <Clock className="size-3.5 text-saffron" />
                          {ev.event_time}
                        </span>
                      )}
                      {ev.location && (
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin className="size-3.5 text-saffron" />
                          {ev.location}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
