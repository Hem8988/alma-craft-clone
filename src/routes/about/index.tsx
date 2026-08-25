import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import campus from "@/assets/campus-2.jpg";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Us | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Our story, mission and vision — decades of quality government education in Sangla, Kinnaur, Himachal Pradesh.",
      },
      { property: "og:title", content: "About GSSS Sangla" },
      {
        property: "og:description",
        content: "History, mission, vision and leadership of Govt. Sr. Sec. School Sangla.",
      },
    ],
  }),
  component: About,
});

const HIGHLIGHTS = [
  "Experienced faculty with specialised subject training",
  "Healthy student-to-teacher ratio for personal attention",
  "Consistently strong Class 10 and 12 board results",
  "Wide range of clubs, NCC, scouts and cultural activities",
  "Well-equipped laboratories, library and sports facilities",
];

const PILLARS = [
  {
    title: "Our History",
    text: "Established to serve the students of the Sangla Valley, the school has grown from a small institution into a full-fledged senior secondary school offering Science, Commerce and Arts streams.",
  },
  {
    title: "Mission & Vision",
    text: "To provide accessible, high-quality education that builds character, curiosity and confidence, preparing every student of Kinnaur for higher studies and responsible citizenship.",
  },
  {
    title: "Leadership",
    text: "Our Principal, senior faculty and School Management Committee work together with parents to maintain academic standards, discipline and a caring campus culture.",
  },
];

function About() {
  return (
    <>
      <PageHero
        title="About GSSS Sangla"
        subtitle="Committed to academic excellence and character development in the heart of Kinnaur district."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
          <div>
            <p className="section-label">Our Story</p>
            <h2 className="mt-3 font-display text-3xl font-bold">
              Educating the Sangla Valley for generations
            </h2>
            <p className="mt-4 text-muted-foreground">
              Government Senior Secondary School Sangla was established with a vision to bring
              quality education to the remote and beautiful Sangla Valley. Today we continue that
              legacy with modern teaching methodologies, well-equipped facilities and a passionate
              faculty dedicated to nurturing every student's potential.
            </p>
            <h3 className="mt-8 font-display text-xl font-bold">Why GSSS Sangla?</h3>
            <ul className="mt-4 space-y-3">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-saffron" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <img
            src={campus}
            alt="School campus building in Sangla"
            className="rounded-xl shadow-elevated"
          />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="rounded-xl border border-border bg-card p-6 shadow-soft"
            >
              <h3 className="font-display text-xl font-bold text-navy">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
