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
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Microscope,
  Calendar,
  Quote,
  Star,
  ChevronRight,
  FileText,
  FileCheck,
  Compass,
  Laptop,
  Flame,
  PhoneCall,
  ExternalLink,
  Atom,
  TrendingUp,
  Building2,
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/campus-1.jpg";
import campus2 from "@/assets/campus-2.jpg";
import campus3 from "@/assets/campus-3.jpg";
import bioLab from "@/assets/biology-lab.jpg";
import chemLab from "@/assets/chemistry-lab.jpg";
import compLab from "@/assets/computer-lab.jpg";
import campus4 from "@/assets/campus-4.jpg";
import { Reveal } from "@/components/site/Reveal";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { NoticeTicker } from "@/components/site/NoticeTicker";
import { useSiteContent } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Govt. Sr. Sec. School Sangla | Excellence in Education" },
      {
        name: "description",
        content:
          "Government Senior Secondary School Sangla, Kinnaur — Premier CBSE curriculum, qualified faculty, modern science labs, smart classrooms and holistic development in the Himalayas.",
      },
      { property: "og:title", content: "Govt. Sr. Sec. School Sangla" },
      {
        property: "og:description",
        content: "Nurturing young minds in the heart of the Himalayas. Admissions open 2026-27.",
      },
      { property: "og:url", content: "https://alma-craft-clone.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://alma-craft-clone.lovable.app/" }],
  }),
  component: Index,
});

// Class 11 & 12 Academic Streams
const ACADEMIC_STREAMS = [
  {
    id: "science",
    name: "Science Stream",
    tagline: "Medical & Non-Medical",
    icon: Atom,
    badge: "Most Popular",
    color: "from-blue-600 to-indigo-700",
    borderGlow: "group-hover:border-blue-500/50",
    bgGradient: "group-hover:bg-blue-500/5",
    subjects: ["Physics", "Chemistry", "Biology / Mathematics", "English Core", "Physical Education / IT"],
    description: "Rigorous scientific foundation with hands-on laboratory experimentation, NCERT conceptual clarity, and competitive entrance preparation (NEET / JEE).",
    features: ["Dedicated Physics & Chem Labs", "Advanced Biology Specimens", "Smart Numerical Problem Sets"],
  },
  {
    id: "commerce",
    name: "Commerce Stream",
    tagline: "Finance & Enterprise",
    icon: TrendingUp,
    badge: "High Growth",
    color: "from-amber-500 to-orange-600",
    borderGlow: "group-hover:border-amber-500/50",
    bgGradient: "group-hover:bg-amber-500/5",
    subjects: ["Accountancy", "Business Studies", "Economics", "English Core", "Mathematics / Informatics"],
    description: "Comprehensive financial literacy, corporate management principles, and modern economic theory preparing students for CA, CS, B.Com, and Banking careers.",
    features: ["Case Study Simulations", "Digital Spreadsheet & IT", "Economics & Commerce Seminars"],
  },
  {
    id: "arts",
    name: "Humanities & Arts",
    tagline: "Social Sciences & Culture",
    icon: BookOpen,
    badge: "Civil Services Focus",
    color: "from-emerald-600 to-teal-700",
    borderGlow: "group-hover:border-emerald-500/50",
    bgGradient: "group-hover:bg-emerald-500/5",
    subjects: ["History", "Political Science", "Hindi / Sanskrit", "English Core", "Economics / Geography"],
    description: "Deep critical thinking, understanding of administrative governance, constitutional framework, and cultural heritage tailored for UPSC, State PSC & Law.",
    features: ["Youth Parliament & Debates", "Essay & Analytical Writing", "Tribal Kinnaur History Research"],
  },
  {
    id: "vocational",
    name: "IT & Vocational",
    tagline: "Digital & Practical Skills",
    icon: Laptop,
    badge: "Skill India",
    color: "from-purple-600 to-pink-600",
    borderGlow: "group-hover:border-purple-500/50",
    bgGradient: "group-hover:bg-purple-500/5",
    subjects: ["Information Technology", "Computer Applications", "Digital Literacy", "Soft Skills & Communication"],
    description: "Empowering students with modern computing fundamentals, digital toolsets, coding basics, and practical employability skills for the digital age.",
    features: ["High-Speed Computer Center", "Office Productivity Suites", "Internet & Cybersecurity Basics"],
  },
];

const CAMPUS_PREVIEWS = [
  {
    title: "Biology & Life Sciences Lab",
    img: bioLab,
    cat: "Laboratories",
    desc: "Advanced optical microscopes, botanical charts & biological specimens.",
    tag: "CBSE Standard",
  },
  {
    title: "Chemistry Research Lab",
    img: chemLab,
    cat: "Laboratories",
    desc: "Individual chemical reagent bays, safety hoods & titration benches.",
    tag: "Safety Compliant",
  },
  {
    title: "Modern Computer Center",
    img: compLab,
    cat: "Digital Hub",
    desc: "High-speed internet workstations with coding & digital literacy curriculum.",
    tag: "Fiber Internet",
  },
  {
    title: "Himalayan View Reading Room",
    img: campus4,
    cat: "Library",
    desc: "Extensive reference archives, competitive exam guides & periodicals.",
    tag: "Quiet Zone",
  },
  {
    title: "Scenic Mountain Sports Ground",
    img: campus3,
    cat: "Athletics",
    desc: "Spacious sports arena for football, volleyball, cricket & athletic meets.",
    tag: "NCC & Games",
  },
  {
    title: "Interactive Smart Classrooms",
    img: campus2,
    cat: "Technology",
    desc: "Multimedia digital boards for intuitive concept visualization.",
    tag: "Audio-Visual",
  },
];

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Fill Online Admission Form",
    desc: "Complete the simple 2-minute digital registration form with student and parent details.",
    link: "/admissions/form",
    cta: "Open Form",
    icon: FileText,
  },
  {
    step: "02",
    title: "Verification & Counseling",
    desc: "Submit previous academic marksheet, Aadhaar copy, and category certificate at the school desk.",
    link: "/admissions",
    cta: "View Checklist",
    icon: FileCheck,
  },
  {
    step: "03",
    title: "Class Allocation & Welcome",
    desc: "Get enrolled with free textbooks, student ID, and direct classroom seat allocation for 2026-27.",
    link: "/contact",
    cta: "Contact Desk",
    icon: GraduationCap,
  },
];

const TESTIMONIALS = [
  {
    name: "Arun Kumar Negi",
    role: "CBSE Board District Topper (Batch 2025)",
    text: "The dedicated teachers at GSSS Sangla and personal laboratory mentorship gave me the confidence to score 96% in Class 12 Science.",
    avatarText: "AK",
  },
  {
    name: "Smt. Sunita Devi",
    role: "Parent of Class 10 Student",
    text: "As a parent in Sangla valley, having smart digital classrooms, caring faculty, and 100% subsidized education right here is a blessing.",
    avatarText: "SD",
  },
  {
    name: "Priyanka Kumari",
    role: "NCC Cadet & State Athlete",
    text: "The sports training and NCC drills taught me discipline, teamwork, and resilience. GSSS Sangla nurtures both academic and athletic growth.",
    avatarText: "PK",
  },
];

const NEWS = [
  {
    date: "Mar 5, 2026",
    tag: "Results",
    title: "GSSS Sangla Students Shine in CBSE Board Exams 2026",
    text: "Outstanding results with multiple students scoring above 90% in Class 12 Science and Arts board examinations.",
  },
  {
    date: "Feb 26, 2026",
    tag: "Celebration",
    title: "Annual Day Celebrations & Grand Cultural Showcase",
    text: "A grand celebration featuring Kinnauri folk music, drama, science exhibitions, and academic prize distributions.",
  },
  {
    date: "Feb 18, 2026",
    tag: "Admissions",
    title: "Online & Offline Admissions Open for Session 2026-27",
    text: "Registration forms are now available online for all classes. Early counseling sessions have commenced.",
  },
];

function Index() {
  const { content } = useSiteContent();

  const STATS = [
    {
      icon: Users,
      number: content.studentsEnrolled,
      suffix: "+",
      label: "Students Enrolled",
      subtext: "From Primary to Class XII",
    },
    {
      icon: GraduationCap,
      number: content.qualifiedFaculty,
      suffix: "+",
      label: "Qualified Faculty",
      subtext: "28 Subject Mentors & Staff",
    },
    {
      icon: Award,
      isText: true,
      value: content.boardAffiliation || "CBSE",
      label: "Affiliated Board",
      subtext: "Code: 630121 • New Delhi",
    },
    {
      icon: Trophy,
      number: content.passPercentage,
      suffix: "%",
      label: "Board Pass Rate",
      subtext: "Excellence in Class 10 & 12",
    },
  ];

  const DIGNITARIES = [
    {
      initials: "SS",
      name: content.cmName,
      role: content.cmRole,
      dept: "Himachal Pradesh",
      quote: content.cmQuote,
    },
    {
      initials: "RT",
      name: content.eduMinisterName,
      role: content.eduMinisterRole,
      dept: "Himachal Pradesh",
      quote: content.eduMinisterQuote,
    },
    {
      initials: "DE",
      name: "Director of Higher Education",
      role: "Directorate of Education",
      dept: "Govt. of HP, Shimla",
      quote: "Fostering academic rigor, scientific curiosity, and character in students.",
    },
    {
      initials: "PR",
      name: content.principalName,
      role: content.principalRole,
      dept: "GSSS Sangla",
      quote: content.principalQuote,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ===== 1. CINEMATIC HERO SECTION ===== */}
      <section className="relative isolate min-h-[90vh] overflow-hidden flex items-center">
        {/* Parallax Campus Backdrop */}
        <img
          src={heroImage}
          alt="GSSS Sangla campus surrounded by snow-clad Himalayan peaks"
          className="absolute inset-0 -z-20 size-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Multi-layered Deep Navy & Gold Ambient Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/98 via-navy-deep/90 to-navy-deep/80 backdrop-blur-[2px]" />
        
        {/* Subtle glowing ambient orbs */}
        <div className="absolute top-1/4 left-10 -z-10 size-96 rounded-full bg-saffron/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 -z-10 size-[500px] rounded-full bg-primary/30 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24 text-primary-foreground w-full">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Verification Pill */}
              <Reveal variant="down" delay={50}>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-saffron-light backdrop-blur-md border border-white/15 shadow-sm">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-saffron" />
                  </span>
                  <span>{content.heroBadge || "Admissions Open 2026-27"}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white font-bold">{content.boardAffiliation || "CBSE"} Affiliated (Govt.)</span>
                </div>
              </Reveal>

              {/* Main Headline */}
              <Reveal variant="up" delay={100}>
                <h1 className="font-display text-4xl font-extrabold leading-[1.12] sm:text-6xl lg:text-7xl text-white tracking-tight">
                  {content.heroTitle || "Nurturing Minds in the"}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-saffron-light to-amber-300 drop-shadow-sm">
                    {content.heroHighlight || "Heart of Sangla"}
                  </span>
                </h1>
              </Reveal>

              {/* Subtitle */}
              <Reveal variant="up" delay={180}>
                <p className="max-w-2xl text-base sm:text-lg text-primary-foreground/90 leading-relaxed font-normal">
                  {content.heroSubtitle || "Government Senior Secondary School Sangla delivers quality CBSE education, state-of-the-art science laboratories, smart digital classrooms, and holistic character building in Kinnaur, Himachal Pradesh."}
                </p>
              </Reveal>

              {/* Action Buttons */}
              <Reveal variant="up" delay={240}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/admissions/form"
                    className="shimmer-btn inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-7 py-3.5 text-sm font-black text-navy-deep shadow-gold transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-95"
                  >
                    <Sparkles className="size-4" />
                    <span>Apply for Admission 2026-27</span>
                    <ArrowRight className="size-4" />
                  </Link>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/50 active:scale-95"
                  >
                    <span>Discover Our Campus</span>
                  </Link>
                </div>
              </Reveal>

              {/* Feature Checklist Pills */}
              <Reveal variant="up" delay={300}>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs text-primary-foreground/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-saffron" />
                    100% Subsidized Govt. Fees
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-saffron" />
                    4 Modern Science & IT Labs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-saffron" />
                    Science, Commerce & Arts
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right Quick Portal Cards (Interactive Glass Deck) */}
            <div className="lg:col-span-5">
              <Reveal variant="left" delay={200}>
                <div className="rounded-3xl border border-white/15 bg-navy-deep/80 backdrop-blur-2xl p-6 sm:p-7 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-saffron">
                        Quick Access Portal
                      </span>
                      <p className="text-xs text-primary-foreground/70">Official School Resources & Downloads</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[0.65rem] font-extrabold px-2.5 py-0.5">
                      Session 2026-27
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {/* Card 1: Online Admission */}
                    <Link
                      to="/admissions/form"
                      className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 hover:border-saffron/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-saffron/20 text-saffron group-hover:scale-110 transition-transform">
                          <Sparkles className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-saffron transition-colors">
                            Online Admission Form
                          </p>
                          <p className="text-[0.7rem] text-primary-foreground/60">Class 1 to 12 registration</p>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-saffron transition-transform group-hover:translate-x-1" />
                    </Link>

                    {/* Card 2: Faculty Directory */}
                    <Link
                      to="/academics/faculty"
                      className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 hover:border-saffron/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/40 text-saffron-light group-hover:scale-110 transition-transform">
                          <GraduationCap className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-saffron transition-colors">
                            Faculty Directory (28 Teachers)
                          </p>
                          <p className="text-[0.7rem] text-primary-foreground/60">Subject experts & qualifications</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-primary-foreground/50 group-hover:text-saffron" />
                    </Link>

                    {/* Card 3: CBSE Mandatory Disclosures */}
                    <Link
                      to="/school-info/mandatory-disclosure"
                      className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 hover:border-saffron/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                          <FileCheck className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-saffron transition-colors">
                            CBSE Mandatory Public Disclosure
                          </p>
                          <p className="text-[0.7rem] text-primary-foreground/60">12 Certified official documents</p>
                        </div>
                      </div>
                      <span className="rounded bg-saffron/20 border border-saffron/30 px-1.5 py-0.5 text-[9px] font-extrabold text-saffron uppercase">
                        PDFs
                      </span>
                    </Link>

                    {/* Card 4: Fee Structure */}
                    <Link
                      to="/school-info/fee-structure"
                      className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 hover:border-saffron/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 group-hover:scale-110 transition-transform">
                          <ShieldCheck className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-saffron transition-colors">
                            Subsidized Fee Structure
                          </p>
                          <p className="text-[0.7rem] text-primary-foreground/60">HP Govt. zero-burden chart</p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-primary-foreground/50 group-hover:text-saffron" />
                    </Link>
                  </div>

                  {/* Direct Contact Desk Footer inside Card */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[0.72rem] text-primary-foreground/75">
                    <span>Helpline: <strong className="text-saffron">{content.phone || "+91 82193-98898"}</strong></span>
                    <Link to="/contact" className="text-saffron hover:underline font-semibold flex items-center gap-1">
                      Desk Info <ExternalLink className="size-2.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. INTEGRATED TICKER NOTIFICATION BAR ===== */}
      <NoticeTicker />

      {/* ===== 3. MODERN BENTO STATS SECTION ===== */}
      <section className="relative z-10 -mt-6 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 rounded-3xl bg-gradient-to-r from-navy-deep via-navy to-navy-deep p-6 sm:p-8 text-primary-foreground shadow-elevated border border-white/10">
          {STATS.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 80} variant="zoom">
              <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl hover:bg-white/5 transition-all">
                <div className="mb-2.5 flex size-12 items-center justify-center rounded-xl bg-saffron/20 text-saffron ring-1 ring-saffron/40 shadow-inner">
                  <s.icon className="size-6" />
                </div>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-saffron-light">
                  {s.isText ? (
                    <span>{s.value}</span>
                  ) : (
                    <AnimatedCounter end={s.number ?? 0} suffix={s.suffix} />
                  )}
                </div>
                <p className="mt-1 text-sm font-bold text-white">{s.label}</p>
                <p className="text-[0.72rem] text-primary-foreground/60">{s.subtext}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== 4. INTERACTIVE ACADEMIC STREAMS (CLASS XI & XII) ===== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div className="max-w-2xl">
              <Reveal variant="down">
                <span className="section-label">Senior Secondary Pathways</span>
              </Reveal>
              <Reveal variant="up" delay={60}>
                <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-navy">
                  Academic Streams & Future Careers
                </h2>
              </Reveal>
              <Reveal variant="up" delay={120}>
                <p className="mt-2 text-sm text-muted-foreground">
                  Offering rigorous CBSE curriculum with personalized faculty mentorship in Science, Commerce, and Humanities.
                </p>
              </Reveal>
            </div>

            <Reveal variant="left" delay={100}>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-saffron transition-colors"
              >
                <span>View Stream Eligibility</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          {/* Academic Streams Bento Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ACADEMIC_STREAMS.map((st, i) => (
              <Reveal key={st.id} delay={i * 80} variant="up">
                <div className={`hover-lift group relative h-full rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between ${st.borderGlow}`}>
                  <div>
                    {/* Header with Icon & Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${st.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                        <st.icon className="size-6" />
                      </div>
                      <span className="rounded-full bg-saffron/15 border border-saffron/30 px-2.5 py-0.5 text-[0.68rem] font-bold text-saffron">
                        {st.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-navy group-hover:text-primary transition-colors">
                      {st.name}
                    </h3>
                    <p className="text-xs font-semibold text-saffron mt-0.5">{st.tagline}</p>
                    
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {st.description}
                    </p>

                    {/* Subject Pills */}
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-navy/70 mb-2">Core Subjects:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {st.subjects.map((sub) => (
                          <span key={sub} className="rounded-md bg-muted px-2 py-0.5 text-[0.68rem] font-medium text-foreground/80">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-border">
                    <Link
                      to="/admissions/form"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-saffron transition-colors"
                    >
                      <span>Apply for {st.name}</span>
                      <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. 3-STEP ADMISSION PROCESS WALKTHROUGH ===== */}
      <section className="py-20 bg-gradient-to-b from-muted/50 via-muted/20 to-background border-y border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal variant="down">
              <span className="section-label">Simple & Transparent</span>
            </Reveal>
            <Reveal variant="up" delay={60}>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-navy">
                3 Steps to Join GSSS Sangla
              </h2>
            </Reveal>
            <Reveal variant="up" delay={120}>
              <p className="mt-2 text-sm text-muted-foreground">
                Easy enrollment process for Session 2026-27 with transparent government guidelines and no hidden fees.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {ADMISSION_STEPS.map((step, idx) => (
              <Reveal key={step.step} delay={idx * 100} variant="up">
                <div className="hover-lift group relative h-full rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  {/* Step Number Background Accent */}
                  <span className="absolute top-4 right-6 font-display text-5xl font-black text-navy/10 group-hover:text-saffron/20 transition-colors">
                    {step.step}
                  </span>

                  <div>
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-navy text-saffron mb-5 shadow-sm group-hover:bg-saffron group-hover:text-navy-deep transition-all">
                      <step.icon className="size-6" />
                    </div>

                    <h3 className="font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      to={step.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-saffron transition-colors"
                    >
                      <span>{step.cta}</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. MODERN CAMPUS & LABS SHOWCASE (BENTO) ===== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div className="max-w-2xl">
              <Reveal variant="down">
                <span className="section-label">State-of-the-Art Infrastructure</span>
              </Reveal>
              <Reveal variant="up" delay={60}>
                <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-navy">
                  Modern Science Laboratories & Campus
                </h2>
              </Reveal>
              <Reveal variant="up" delay={120}>
                <p className="mt-2 text-sm text-muted-foreground">
                  Equipped with modern scientific apparatus, computer centers, and spacious grounds in the Himalayan valley.
                </p>
              </Reveal>
            </div>

            <Reveal variant="left" delay={100}>
              <Link
                to="/infrastructure"
                className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-soft hover:bg-navy-deep transition-all"
              >
                <span>Full Infrastructure Tour</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAMPUS_PREVIEWS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} variant="zoom">
                <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft hover:shadow-elevated transition-all">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <span className="absolute top-3 left-3 rounded-full bg-navy-deep/85 backdrop-blur-md px-2.5 py-0.5 text-[0.65rem] font-bold text-white border border-white/10">
                      {item.cat}
                    </span>

                    <span className="absolute top-3 right-3 rounded-full bg-saffron/90 text-navy-deep px-2 py-0.5 text-[0.62rem] font-black uppercase">
                      {item.tag}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold text-navy group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. PRINCIPAL'S DESK SPOTLIGHT (EDITORIAL STYLE) ===== */}
      <section className="py-20 bg-gradient-to-b from-navy-deep via-navy to-navy-deep text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal variant="zoom">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-md p-8 sm:p-12 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-10 items-center">
                {/* Principal Photo & Signature Card */}
                <div className="lg:col-span-4 flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="size-40 sm:size-44 rounded-full bg-gradient-to-tr from-saffron to-amber-300 p-1 shadow-glow mb-4">
                      <img
                        src={campus2}
                        alt={content.principalName}
                        className="size-full rounded-full object-cover border-2 border-navy-deep"
                      />
                    </div>
                    <span className="absolute bottom-4 right-2 size-8 rounded-full bg-saffron text-navy-deep flex items-center justify-center font-bold text-xs shadow-md border-2 border-navy-deep">
                      <Award className="size-4" />
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">{content.principalName}</h3>
                  <p className="text-xs font-bold text-saffron mt-0.5">{content.principalRole}</p>
                  <p className="text-[0.75rem] text-primary-foreground/75 mt-1">{content.principalQual}</p>
                  
                  <span className="mt-3 rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold text-primary-foreground/80 border border-white/15">
                    Govt. Sr. Sec. School Sangla, Kinnaur
                  </span>
                </div>

                {/* Principal's Inspiring Message */}
                <div className="lg:col-span-8 space-y-4">
                  <Quote className="size-10 text-saffron/70" />
                  
                  <h4 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    "{content.principalQuote}"
                  </h4>
                  
                  <p className="text-sm sm:text-base text-primary-foreground/85 leading-relaxed">
                    {content.principalMessage}
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-6 py-2.5 text-xs font-black text-navy-deep shadow-gold hover:scale-105 transition-all"
                    >
                      <span>Read Full Institutional Vision</span>
                      <ArrowRight className="size-3.5" />
                    </Link>

                    <Link
                      to="/academics/faculty"
                      className="text-xs font-bold text-saffron-light hover:text-white underline underline-offset-4"
                    >
                      Meet Our Faculty Team →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== 8. LEADERSHIP & DIGNITARIES OF HP ===== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal variant="down">
              <span className="section-label">Visionary Leadership</span>
            </Reveal>
            <Reveal variant="up" delay={60}>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-navy">
                Guided by Educational Visionaries
              </h2>
            </Reveal>
            <Reveal variant="up" delay={120}>
              <p className="mt-2 text-sm text-muted-foreground">
                Dedicated to uplifting government school infrastructure and student outcomes in tribal Kinnaur.
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIGNITARIES.map((d, i) => (
              <Reveal key={d.name} delay={i * 90} variant="up">
                <div className="hover-lift h-full rounded-3xl border border-border bg-card p-6 text-center shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group">
                  <div>
                    {/* Avatar Badge with Glow Ring */}
                    <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-navy font-display text-xl font-bold text-primary-foreground shadow-md ring-4 ring-saffron/30 group-hover:ring-saffron transition-all duration-300">
                      {d.initials}
                      <Award className="absolute -bottom-1 -right-1 size-6 rounded-full bg-saffron p-1 text-accent-foreground shadow-sm" />
                    </div>

                    <h3 className="mt-5 font-display text-base font-bold text-navy group-hover:text-primary transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs font-bold text-saffron mt-0.5">{d.role}</p>
                    <p className="text-[0.72rem] text-muted-foreground">{d.dept}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60">
                    <p className="text-xs text-muted-foreground italic line-clamp-3">
                      "{d.quote}"
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. VOICES OF EXCELLENCE (TESTIMONIALS) ===== */}
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal variant="down">
              <span className="section-label">Student & Community Voices</span>
            </Reveal>
            <Reveal variant="up" delay={60}>
              <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-navy">
                Transforming Lives in Sangla Valley
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, idx) => (
              <Reveal key={t.name} delay={idx * 90} variant="up">
                <div className="hover-lift h-full rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-3.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground/85 italic leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-navy text-primary-foreground font-bold text-xs">
                      {t.avatarText}
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-navy">{t.name}</p>
                      <p className="text-[0.7rem] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. LATEST NEWS & EVENTS ===== */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <Reveal variant="down">
                <span className="section-label">Stay Informed</span>
              </Reveal>
              <Reveal variant="up" delay={60}>
                <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-navy">
                  News, Events & Circulars
                </h2>
              </Reveal>
            </div>
            <Reveal variant="left" delay={100}>
              <Link
                to="/news"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-saffron transition-colors"
              >
                <span>View All Updates</span>
                <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {NEWS.map((n, i) => (
              <Reveal key={n.title} delay={i * 90} variant="up">
                <article className="hover-lift group h-full rounded-3xl border border-border bg-card p-7 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-3.5">
                      <Calendar className="size-3.5 text-saffron" />
                      <span className="text-muted-foreground">{n.date}</span>
                      <span className="rounded-full bg-saffron/15 px-2.5 py-0.5 font-bold text-saffron text-[0.65rem] ml-auto">
                        {n.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-navy group-hover:text-primary transition-colors">
                      {n.title}
                    </h3>
                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                      {n.text}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border">
                    <Link
                      to="/news"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-saffron transition-colors"
                    >
                      <span>Read full notice</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. FINAL HIGH-CONVERSION ADMISSIONS CTA ===== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-navy-deep py-24 text-primary-foreground">
        {/* Glowing background ambient lights */}
        <div className="absolute -top-32 left-1/2 -z-10 -translate-x-1/2 size-[600px] rounded-full bg-saffron/15 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 text-center">
          <Reveal variant="down">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/20 border border-saffron/40 px-4 py-1 text-xs font-bold text-saffron-light">
              <Sparkles className="size-3.5" />
              {content.admissionSession || "Admissions Open 2026-27"}
            </span>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h2 className="mt-4 font-display text-3xl font-black sm:text-5xl lg:text-6xl text-white tracking-tight">
              Enroll Your Child at {content.schoolShortName || content.schoolName}
            </h2>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <p className="mt-4 text-base sm:text-lg text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed font-normal">
              Admissions are open for Class 1 to 12. Give your child the foundation of quality government CBSE education, dedicated mentorship, and high career aspirations.
            </p>
          </Reveal>

          <Reveal variant="up" delay={200}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/admissions/form"
                className="shimmer-btn rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-8 py-3.5 text-sm font-black text-navy-deep shadow-gold transition-all duration-300 hover:scale-105"
              >
                Apply Online Now (Session 2026-27)
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Contact School Admission Desk
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
