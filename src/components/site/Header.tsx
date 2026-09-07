import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Menu,
  Phone,
  Mail,
  X,
  Sparkles,
  User,
  ShieldAlert,
  GraduationCap,
  FileText,
  Building2,
  Image as ImageIcon,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import { SchoolLogo } from "@/components/site/SchoolLogo";
import { useAuth } from "@/hooks/useAuth";
import { useSiteContent } from "@/hooks/useSiteContent";

type NavChild = {
  label: string;
  to: string;
  desc?: string;
  isPdf?: boolean;
};

type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
};

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About the School", to: "/about", desc: "Our history, mission & leadership" },
      { label: "Faculty Directory (28 Teachers)", to: "/academics/faculty", desc: "Teaching mentors & subject experts" },
      { label: "Teachers & Staff Matrix (PDF)", to: "/documents/teachers-staff-details.pdf", desc: "Official Certified Copy", isPdf: true },
      { label: "School Policies & Safety", to: "/about/policies", desc: "Rules & safety standards" },
    ],
  },
  {
    label: "Admissions",
    to: "/admissions",
    children: [
      { label: "Admission Guidelines", to: "/admissions", desc: "Eligibility & stream selection" },
      { label: "Online Admission Form 2026-27", to: "/admissions/form", desc: "Direct registration portal" },
      { label: "Subsidized Fee Structure", to: "/school-info/fee-structure", desc: "Government fee details" },
      { label: "Official Fee Chart (PDF)", to: "/documents/fee-structure.pdf", desc: "Certified Fee Copy (PDF)", isPdf: true },
      { label: "Academic Calendar (PDF)", to: "/documents/academic-calendar.pdf", desc: "Session 2026-27 (PDF)", isPdf: true },
    ],
  },
  {
    label: "CBSE Disclosure",
    to: "/school-info/mandatory-disclosure",
    children: [
      { label: "Mandatory Public Disclosure Table", to: "/school-info/mandatory-disclosure", desc: "Full statutory compliance" },
      { label: "CBSE Affiliation Letter", to: "/documents/cbse-affiliation-letter.pdf", desc: "Affiliation Copy (PDF)", isPdf: true },
      { label: "Govt. NOC Certificate", to: "/documents/noc-certificate.pdf", desc: "State Govt NOC (PDF)", isPdf: true },
      { label: "Society Registration", to: "/documents/society-registration.pdf", desc: "Society Certificate (PDF)", isPdf: true },
      { label: "Building Safety Certificate", to: "/documents/building-safety-certificate.pdf", desc: "PWD Safety Norms (PDF)", isPdf: true },
      { label: "Fire Safety NOC", to: "/documents/fire-safety-noc.pdf", desc: "Fire Dept Approval (PDF)", isPdf: true },
      { label: "Water & Sanitation Certificate", to: "/documents/water-safety-certificate.pdf", desc: "Safe Drinking Water (PDF)", isPdf: true },
      { label: "DEO Certification", to: "/documents/deo-certificate.pdf", desc: "District Education Officer (PDF)", isPdf: true },
      { label: "SMC Committee Members", to: "/documents/smc-committee-members.pdf", desc: "Management Committee (PDF)", isPdf: true },
      { label: "3-Years Board Results", to: "/documents/three-years-board-results.pdf", desc: "CBSE Performance (PDF)", isPdf: true },
    ],
  },
  {
    label: "Infrastructure",
    to: "/infrastructure",
    children: [
      { label: "Campus Facilities Overview", to: "/infrastructure", desc: "Smart classes, labs & grounds" },
      { label: "Science & Computer Labs", to: "/infrastructure", desc: "Physics, Chem, Bio & IT centers" },
      { label: "Library & Sports Arena", to: "/infrastructure", desc: "Reading room & athletic grounds" },
    ],
  },
  {
    label: "Gallery & Notices",
    to: "/gallery",
    children: [
      { label: "Photo & Media Gallery", to: "/gallery", desc: "Campus glimpses & activities" },
      { label: "News & Events", to: "/news", desc: "Annual Day & achievements" },
      { label: "Official Circulars", to: "/school-info/circulars", desc: "Department notifications" },
      { label: "Public Notice Board", to: "/notice-board", desc: "Announcements & exam dates" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const { content } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 shadow-md">
      {/* ===== 1. TOP UTILITY BAR (Slim & Informative) ===== */}
      <div className="bg-[#091322] border-b border-white/10 text-primary-foreground/80 py-1.5 text-[11.5px] hidden sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          {/* Left: Statutory Compliance Info */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-medium text-primary-foreground/90">
              <ShieldCheck className="size-3.5 text-saffron" />
              <span>Govt. of Himachal Pradesh</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-primary-foreground/75">
              CBSE Affiliation No: <strong className="text-white">630121</strong>
            </span>
            <span className="text-white/30">•</span>
            <span className="text-primary-foreground/75">
              School Code: <strong className="text-white">44363</strong>
            </span>
          </div>

          {/* Right: Quick Desk Links */}
          <div className="flex items-center gap-4">
            {content.phone && (
              <a
                href={`tel:${content.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-1 text-primary-foreground/80 hover:text-saffron transition-colors"
                title="School Contact Desk"
              >
                <Phone className="size-3 text-saffron" />
                <span className="font-semibold">{content.phone}</span>
              </a>
            )}

            {content.email && (
              <a
                href={`mailto:${content.email}`}
                className="hidden lg:flex items-center gap-1 text-primary-foreground/80 hover:text-saffron transition-colors"
                title="Official Email"
              >
                <Mail className="size-3 text-saffron" />
                <span>{content.email}</span>
              </a>
            )}

            <div className="h-3 w-px bg-white/20" />

            <Link
              to="/portal"
              className="flex items-center gap-1 text-primary-foreground/80 hover:text-white font-medium transition-colors"
            >
              <User className="size-3 text-saffron" />
              <span>{user ? "My Account" : "Student Portal"}</span>
            </Link>

            <Link
              to="/admin"
              className="flex items-center gap-1 rounded bg-saffron/15 border border-saffron/30 px-2 py-0.5 text-[10.5px] font-bold text-saffron-light hover:bg-saffron hover:text-navy-deep transition-all"
            >
              <ShieldAlert className="size-3" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== 2. MAIN NAVIGATION BAR ===== */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-navy-deep/98 backdrop-blur-2xl py-2 shadow-2xl border-b border-white/15"
            : "bg-navy-deep/92 backdrop-blur-xl py-2.5 sm:py-3 border-b border-white/10"
        } text-primary-foreground`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4">
          {/* Logo Brand with Strict No-Wrap */}
          <Link to="/" className="shrink-0">
            <SchoolLogo size="sm" />
          </Link>

          {/* Desktop Navigation Links with Guaranteed Single-Line Fit */}
          <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 xl:px-3 py-2 text-[13px] font-semibold text-primary-foreground/90 transition-all duration-200 hover:bg-white/10 hover:text-white whitespace-nowrap"
                  activeProps={{
                    className:
                      "bg-white/12 text-saffron font-bold border border-saffron/40 backdrop-blur-md shadow-xs",
                  }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {item.children && (
                    <ChevronDown className="size-3.5 text-saffron/80 transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                  )}
                </Link>

                {/* Elegant Frosted Dropdown Menu */}
                {item.children && (
                  <div className="invisible absolute left-0 top-full mt-1 w-72 translate-y-2 rounded-2xl border border-white/15 bg-navy-deep/95 p-2.5 opacity-0 shadow-2xl backdrop-blur-3xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50">
                    <div className="space-y-1">
                      {item.children.map((child) =>
                        child.isPdf ? (
                          <a
                            key={child.to + child.label}
                            href={child.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/child flex items-center justify-between rounded-xl px-3 py-2 transition-all hover:bg-white/10"
                          >
                            <div className="flex-1 pr-2">
                              <p className="text-xs font-bold text-white group-hover/child:text-saffron transition-colors">
                                {child.label}
                              </p>
                              {child.desc && (
                                <p className="text-[0.68rem] text-primary-foreground/60 group-hover/child:text-primary-foreground/80">
                                  {child.desc}
                                </p>
                              )}
                            </div>
                            <span className="rounded bg-saffron/20 border border-saffron/30 px-1.5 py-0.5 text-[8.5px] font-extrabold text-saffron uppercase tracking-wider shrink-0">
                              PDF
                            </span>
                          </a>
                        ) : (
                          <Link
                            key={child.to + child.label}
                            to={child.to}
                            className="group/child block rounded-xl px-3 py-2 transition-all hover:bg-white/10"
                          >
                            <p className="text-xs font-bold text-white group-hover/child:text-saffron transition-colors">
                              {child.label}
                            </p>
                            {child.desc && (
                              <p className="text-[0.68rem] text-primary-foreground/60 group-hover/child:text-primary-foreground/80">
                                {child.desc}
                              </p>
                            )}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Button (High-Contrast Gold CTA) */}
          <div className="hidden items-center gap-3 lg:flex shrink-0">
            <Link
              to="/admissions/form"
              className="shimmer-btn inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-saffron to-amber-500 px-4 py-2 text-xs font-black text-navy-deep shadow-gold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="size-3.5" />
              <span>Apply 2026-27</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/admissions/form"
              className="rounded-lg bg-saffron px-3 py-1.5 text-xs font-bold text-navy-deep shadow-xs"
            >
              Apply
            </Link>
            <button
              type="button"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
              className="rounded-lg border border-white/15 bg-white/10 p-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              {open ? <X className="size-5 text-saffron" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <nav className="border-t border-white/10 bg-navy-deep/98 backdrop-blur-3xl px-4 py-4 lg:hidden animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="space-y-2">
              {NAV.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/5 bg-white/[0.03] overflow-hidden">
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block flex-1 text-sm font-bold text-white hover:text-saffron transition-colors"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} menu`}
                        onClick={() =>
                          setExpanded((cur) => (cur === item.label ? null : item.label))
                        }
                        className="rounded p-1 text-saffron hover:bg-white/10"
                      >
                        <ChevronDown
                          className={`size-4 transition-transform duration-200 ${
                            expanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {item.children && expanded === item.label && (
                    <div className="border-t border-white/5 bg-black/25 px-3 py-2 space-y-1">
                      {item.children.map((child) =>
                        child.isPdf ? (
                          <a
                            key={child.to + child.label}
                            href={child.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs text-primary-foreground/80 hover:bg-white/10 hover:text-white"
                          >
                            <span>{child.label}</span>
                            <span className="rounded bg-saffron/20 border border-saffron/30 px-1.5 py-0.5 text-[8.5px] font-bold text-saffron uppercase">
                              PDF
                            </span>
                          </a>
                        ) : (
                          <Link
                            key={child.to + child.label}
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-2.5 py-2 text-xs text-primary-foreground/80 hover:bg-white/10 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile Quick Desk Buttons */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-saffron/15 border border-saffron/30 py-2.5 text-xs font-bold text-saffron"
                >
                  <ShieldAlert className="size-4" />
                  <span>Admin CMS Login</span>
                </Link>

                <Link
                  to="/portal"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white"
                >
                  <User className="size-4 text-saffron" />
                  <span>Student & Parent Portal</span>
                </Link>

                {content.phone && (
                  <a
                    href={`tel:${content.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-2 text-xs text-primary-foreground/75"
                  >
                    <Phone className="size-3.5 text-saffron" />
                    <span>Call Desk: {content.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
