import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  Monitor,
  Palette,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import heroImage from "@/assets/campus-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Govt. Sr. Sec. School Sangla | Excellence in Education" },
      {
        name: "description",
        content:
          "Government Senior Secondary School Sangla, Kinnaur — CBSE curriculum, qualified faculty, smart classrooms and holistic development in the Himalayas.",
      },
      { property: "og:title", content: "Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content: "Nurturing young minds in the heart of the Himalayas. Admissions open 2026-27.",
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { value: "1000+", label: "Students Enrolled" },
  { value: "50+", label: "Qualified Teachers" },
  { value: "CBSE", label: "Affiliated Board" },
  { value: "100%", label: "Pass Rate" },
];

const DIGNITARIES = [
  {
    initials: "SS",
    name: "Sh. Sukhvinder Singh Sukhu",
    role: "Hon'ble Chief Minister, Himachal Pradesh",
  },
  { initials: "RT", name: "Sh. Rohit Thakur", role: "Hon'ble Education Minister, HP" },
  {
    initials: "DE",
    name: "Director of Education",
    role: "Directorate of Higher Education, HP",
  },
  { initials: "PR", name: "Principal", role: "Principal, GSSS Sangla" },
];

const FEATURES = [
  {
    icon: BookOpen,
    title: "CBSE Curriculum",
    text: "Comprehensive CBSE-affiliated education from Class 1 to 12 with focus on conceptual learning and critical thinking.",
  },
  {
    icon: Users,
    title: "Qualified Faculty",
    text: "Dedicated and experienced teachers committed to nurturing each student's potential and academic growth.",
  },
  {
    icon: Monitor,
    title: "Smart Classrooms",
    text: "Digital classrooms with modern teaching aids, projectors, and interactive learning tools for enhanced education.",
  },
  {
    icon: Trophy,
    title: "Sports & NCC",
    text: "Active sports programs, NCC training, and inter-school competitions building discipline and teamwork.",
  },
  {
    icon: Palette,
    title: "Co-Curricular Activities",
    text: "Art, music, cultural programs, and science exhibitions fostering creativity and all-round development.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Environment",
    text: "CCTV monitored campus with proper safety measures ensuring a secure and welcoming learning environment.",
  },
];

const NEWS = [
  {
    date: "Mar 5, 2026",
    tag: "Results",
    title: "GSSS Sangla Students Shine in CBSE Board Exams 2026",
    text: "Our students achieved outstanding results with multiple students scoring above 90% in Class 12 board examinations.",
  },
  {
    date: "Feb 26, 2026",
    tag: "Events",
    title: "Annual Day Celebrations & Cultural Programme",
    text: "A grand celebration featuring cultural performances, prize distribution, and a showcase of student talents.",
  },
  {
    date: "Feb 18, 2026",
    tag: "Admissions",
    title: "Admissions Open for Session 2026-27",
    text: "Online and offline admission forms are now available for all classes.",
  },
];

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="GSSS Sangla campus surrounded by Himalayan mountains"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy-deep/75" />
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-center px-4 py-24 text-primary-foreground">
          <p className="section-label">Established in Kinnaur, Himachal Pradesh</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-6xl">
            Government <span className="text-saffron">Sr. Sec.</span> School Sangla
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/85">
            Nurturing young minds in the heart of the Himalayas. Building tomorrow's leaders
            through quality education, discipline, and holistic development.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/admissions/form"
              className="inline-flex items-center gap-2 rounded-md bg-saffron px-6 py-3 text-sm font-semibold text-accent-foreground shadow-gold transition-transform hover:-translate-y-0.5"
            >
              Apply Now <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-navy text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-bold text-saffron sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4">
          <p className="section-label text-center">Our Dignitaries</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">
            Guided by Visionary Leadership
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIGNITARIES.map((d) => (
              <div
                key={d.name}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-soft transition-shadow hover:shadow-elevated"
              >
                <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-primary-foreground">
                  {d.initials}
                  <Award className="absolute -bottom-1 -right-1 size-6 rounded-full bg-saffron p-1 text-accent-foreground" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{d.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{d.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <p className="section-label text-center">Why Choose GSSS Sangla</p>
          <h2 className="mt-3 text-center font-display text-3xl font-bold sm:text-4xl">
            Building a Strong Foundation
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-navy/10 text-navy">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-label">Latest Updates</p>
              <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
                News & Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-saffron"
            >
              View All <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {NEWS.map((n) => (
              <article
                key={n.title}
                className="rounded-xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-muted-foreground">{n.date}</span>
                  <span className="rounded-full bg-saffron/15 px-2 py-0.5 font-semibold text-saffron">
                    {n.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hero-gradient py-20 text-primary-foreground">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Join GSSS Sangla Today</h2>
          <p className="mt-4 text-primary-foreground/80">
            Admissions for the 2026-2027 academic session are now open. Give your child the gift of
            quality education in the beautiful Sangla Valley.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions/form"
              className="rounded-md bg-saffron px-6 py-3 text-sm font-semibold text-accent-foreground shadow-gold"
            >
              Apply Online
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
