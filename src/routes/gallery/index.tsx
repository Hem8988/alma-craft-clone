import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/PageHero";
import c1 from "@/assets/campus-1.jpg";
import c2 from "@/assets/campus-2.jpg";
import c3 from "@/assets/campus-3.jpg";
import c4 from "@/assets/campus-4.jpg";
import c5 from "@/assets/campus-5.jpg";
import c6 from "@/assets/campus-6.jpg";
import bio from "@/assets/biology-lab.jpg";
import chem from "@/assets/chemistry-lab.jpg";
import comp from "@/assets/computer-lab.jpg";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Photo Gallery | Govt. Sr. Sec. School Sangla" },
      {
        name: "description",
        content:
          "Photographs of the campus, laboratories, classrooms, sports and cultural events at GSSS Sangla, Kinnaur.",
      },
      { property: "og:title", content: "Photo Gallery — GSSS Sangla" },
      {
        property: "og:description",
        content: "A look at campus life, labs, events and activities at GSSS Sangla.",
      },
    ],
  }),
  component: Gallery,
});

const PHOTOS = [
  { src: c1, alt: "School campus view", cat: "Campus" },
  { src: c2, alt: "Main school building", cat: "Campus" },
  { src: c3, alt: "Smart classroom in session", cat: "Academics" },
  { src: bio, alt: "Students in the biology laboratory", cat: "Labs" },
  { src: chem, alt: "Chemistry laboratory", cat: "Labs" },
  { src: comp, alt: "Computer laboratory", cat: "Labs" },
  { src: c4, alt: "School library reading room", cat: "Academics" },
  { src: c5, alt: "Playground and sports activities", cat: "Sports" },
  { src: c6, alt: "Cultural event on campus", cat: "Events" },
];

const CATS = ["All", "Campus", "Academics", "Labs", "Sports", "Events"];

function Gallery() {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<string | null>(null);
  const shown = cat === "All" ? PHOTOS : PHOTOS.filter((p) => p.cat === cat);

  return (
    <>
      <PageHero title="Photo Gallery" subtitle="Moments from our classrooms, labs, grounds and celebrations." />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  cat === c
                    ? "border-transparent bg-navy text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <button
                key={p.alt}
                type="button"
                onClick={() => setActive(p.src)}
                className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <p className="px-4 py-3 text-left text-sm text-muted-foreground">{p.alt}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div
          role="presentation"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4"
        >
          <img src={active} alt="Enlarged gallery item" className="max-h-full max-w-4xl rounded-lg" />
        </div>
      )}
    </>
  );
}
