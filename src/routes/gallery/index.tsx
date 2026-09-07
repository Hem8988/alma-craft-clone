import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { useSiteContent } from "@/hooks/useSiteContent";
import c1 from "@/assets/campus-1.jpg";

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
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/gallery" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/gallery" }],
  }),
  component: Gallery,
});

function Gallery() {
  const { content } = useSiteContent();
  const photos = content.galleryPhotos || [];

  const [cat, setCat] = useState("All");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const categories = useMemo(() => {
    const list = photos.map((p) => p.cat).filter(Boolean);
    const unique = Array.from(new Set(list));
    return ["All", ...unique];
  }, [photos]);

  const shown = cat === "All" ? photos : photos.filter((p) => p.cat === cat);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % shown.length : null));
      }
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev !== null ? (prev - 1 + shown.length) % shown.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, shown.length]);

  return (
    <>
      <PageHero
        title="Photo & Media Gallery"
        subtitle={`Visual glimpses of campus life, science laboratories, smart classrooms, athletics, and cultural celebrations at ${content.schoolShortName || "GSSS Sangla"}.`}
        badge="Life at GSSS Sangla"
        breadcrumb={[{ label: "Gallery" }]}
      />

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCat(c);
                  setActiveIdx(null);
                }}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  cat === c
                    ? "bg-navy text-primary-foreground shadow-md scale-105"
                    : "border border-border bg-card text-muted-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, idx) => (
              <Reveal key={p.title + idx} delay={idx * 60} variant="zoom">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setActiveIdx(idx);
                  }}
                  className="hover-lift group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={p.src || c1}
                      alt={p.alt || p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-1.5 rounded-full bg-saffron text-accent-foreground px-3.5 py-1.5 text-xs font-bold shadow-gold">
                        <Maximize2 className="size-3.5" />
                        <span>View Photo</span>
                      </div>
                    </div>
                    <span className="absolute top-3 right-3 rounded-full bg-navy/80 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] font-bold text-primary-foreground">
                      {p.cat}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-display text-sm font-bold text-navy group-hover:text-saffron transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{p.alt}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {shown.length === 0 && (
            <div className="text-center py-12 rounded-2xl border border-dashed border-border p-8">
              <p className="text-sm font-semibold text-muted-foreground">
                No photos found in category "{cat}".
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeIdx !== null && shown[activeIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/90 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setActiveIdx(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={shown[activeIdx].src || c1}
                alt={shown[activeIdx].alt || shown[activeIdx].title}
                className="max-h-[75vh] w-full object-contain"
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveIdx(null)}
                className="absolute top-3 right-3 rounded-full bg-navy-deep/80 p-2 text-white hover:bg-saffron transition-colors"
                aria-label="Close photo"
              >
                <X className="size-5" />
              </button>

              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setActiveIdx((activeIdx - 1 + shown.length) % shown.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy-deep/80 p-2 text-white hover:bg-saffron transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setActiveIdx((activeIdx + 1) % shown.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-navy-deep/80 p-2 text-white hover:bg-saffron transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-card border-t border-border">
              <div>
                <p className="font-display text-base font-bold text-navy">
                  {shown[activeIdx].title}
                </p>
                <p className="text-xs text-muted-foreground">{shown[activeIdx].alt}</p>
              </div>
              <span className="text-xs font-semibold text-saffron bg-saffron/10 px-2.5 py-1 rounded-full">
                {activeIdx + 1} / {shown.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
