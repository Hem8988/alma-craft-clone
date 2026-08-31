import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import bio from "@/assets/biology-lab.jpg";
import chem from "@/assets/chemistry-lab.jpg";
import comp from "@/assets/computer-lab.jpg";
import campus3 from "@/assets/campus-3.jpg";
import campus4 from "@/assets/campus-4.jpg";
import campus5 from "@/assets/campus-5.jpg";

export const Route = createFileRoute("/infrastructure/")({
  head: () => ({
    meta: [
      { title: "Infrastructure & Facilities | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Laboratories, computer lab, library, smart classrooms, sports grounds and campus facilities at GSSS Sangla, Kinnaur.",
      },
      { property: "og:title", content: "Infrastructure at GSSS Sangla" },
      {
        property: "og:description",
        content: "Modern labs, library, smart classrooms and sports facilities in the Himalayas.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/infrastructure" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/infrastructure" }],
  }),
  component: Infrastructure,
});

const FACILITIES = [
  {
    img: bio,
    title: "Biology Laboratory",
    text: "Specimens, microscopes and charts supporting the CBSE practical syllabus for senior classes.",
  },
  {
    img: chem,
    title: "Chemistry Laboratory",
    text: "Well-stocked reagent store, fume safety measures and individual work stations for experiments.",
  },
  {
    img: comp,
    title: "Computer Laboratory",
    text: "Modern desktops with internet access for IT practicals and digital literacy programmes.",
  },
  {
    img: campus3,
    title: "Smart Classrooms",
    text: "Digital boards and projectors that make lessons interactive and easier to understand.",
  },
  {
    img: campus4,
    title: "Library",
    text: "Thousands of reference books, magazines, competitive exam material and a quiet reading room.",
  },
  {
    img: campus5,
    title: "Sports & Playground",
    text: "Open playground for cricket, football, volleyball, athletics and annual sports meets.",
  },
];

const AMENITIES = [
  "Safe drinking water and clean washrooms",
  "Mid-day meal kitchen and dining shed",
  "First-aid room and health check-up camps",
  "Separate staff rooms and activity hall",
  "CCTV monitored campus and boundary wall",
  "Ramp access for differently-abled students",
];

function Infrastructure() {
  return (
    <>
      <PageHero
        title="Infrastructure"
        subtitle="A campus designed for learning — laboratories, library, smart classrooms and wide open spaces."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f) => (
            <article
              key={f.title}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-soft"
            >
              <img src={f.img} alt={f.title} className="h-52 w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-2xl font-bold text-navy">Other Amenities</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((a) => (
              <div
                key={a}
                className="rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
              >
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
