import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "School Events | Govt. Sr. Sec. School Sangla" },
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

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Events() {
  const { data: events = [], isLoading } = useQuery({
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

  return (
    <>
      <PageHero
        title="School Events"
        subtitle="Celebrations, examinations, meetings and activities — all in one calendar."
      />

      <section className="py-20">
        <div className="mx-auto max-w-4xl space-y-4 px-4">
          {isLoading && (
            <p className="py-10 text-center text-sm text-muted-foreground">Loading events…</p>
          )}
          {!isLoading && events.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No upcoming events announced yet. Please check back soon.
            </p>
          )}
          {events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 70}>
              <article className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-soft">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-navy text-primary-foreground">
                  <span className="text-lg font-bold leading-none">
                    {new Date(ev.event_date + "T00:00:00").getDate()}
                  </span>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-wide">
                    {new Date(ev.event_date + "T00:00:00").toLocaleDateString("en-IN", {
                      month: "short",
                    })}
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-navy">{ev.title}</h2>
                  {ev.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{ev.description}</p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-saffron" /> {formatDate(ev.event_date)}
                    </span>
                    {ev.event_time && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-saffron" /> {ev.event_time}
                      </span>
                    )}
                    {ev.location && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-saffron" /> {ev.location}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
