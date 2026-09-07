import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, ShieldCheck, Award, ExternalLink } from "lucide-react";
import { SchoolLogo } from "@/components/site/SchoolLogo";
import { useSiteContent } from "@/hooks/useSiteContent";

const QUICK_LINKS = [
  { label: "About Our School", to: "/about" },
  { label: "Admissions 2026-27", to: "/admissions" },
  { label: "Infrastructure & Labs", to: "/infrastructure" },
  { label: "Faculty Directory", to: "/academics/faculty" },
  { label: "Latest News & Events", to: "/news" },
  { label: "Contact & Location", to: "/contact" },
];

const IMPORTANT_LINKS = [
  { label: "Online Admission Form", to: "/admissions/form" },
  { label: "Mandatory Public Disclosure", to: "/school-info/mandatory-disclosure" },
  { label: "Fee Structure Details", to: "/school-info/fee-structure" },
  { label: "Official Circulars", to: "/school-info/circulars" },
  { label: "Public Notice Board", to: "/notice-board" },
  { label: "Photo & Media Gallery", to: "/gallery" },
];

export function Footer() {
  const { content } = useSiteContent();

  return (
    <footer className="relative bg-navy-deep text-primary-foreground">
      {/* Decorative Golden Ribbon */}
      <div className="bg-gradient-to-r from-saffron via-amber-400 to-saffron py-2.5 text-center text-[0.72rem] font-black tracking-[0.2em] text-navy-deep shadow-md uppercase">
        {content.schoolName} • COMMITTED TO EXCELLENCE IN EDUCATION
      </div>

      <div className="border-b border-white/10 bg-black/30 py-2.5 text-center text-[0.68rem] font-semibold tracking-[0.2em] text-primary-foreground/75 flex items-center justify-center gap-2">
        <ShieldCheck className="size-3.5 text-saffron" />
        <span>DIRECTORATE OF HIGHER EDUCATION, GOVERNMENT OF HIMACHAL PRADESH</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <Link to="/">
              <SchoolLogo size="lg" />
            </Link>

            <p className="text-xs sm:text-sm text-primary-foreground/75 leading-relaxed pt-2">
              Empowering students in the heart of Kinnaur valley with CBSE-affiliated academic excellence, modern science laboratories, digital learning, and holistic character building.
            </p>

            <div className="flex items-center gap-2 text-xs text-saffron-light bg-white/5 rounded-xl p-3 border border-white/10 backdrop-blur-sm">
              <Award className="size-4 shrink-0 text-saffron" />
              <span>Affiliated to CBSE, New Delhi • Co-Educational</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-display text-base font-bold text-saffron border-b border-white/10 pb-2">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center gap-2 text-primary-foreground/75 hover:text-saffron-light transition-colors"
                  >
                    <span className="text-saffron/50 transition-transform group-hover:translate-x-1 group-hover:text-saffron">
                      ›
                    </span>
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Important Resources */}
          <div>
            <h3 className="font-display text-base font-bold text-saffron border-b border-white/10 pb-2">
              School Disclosures
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {IMPORTANT_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group flex items-center gap-2 text-primary-foreground/75 hover:text-saffron-light transition-colors"
                  >
                    <span className="text-saffron/50 transition-transform group-hover:translate-x-1 group-hover:text-saffron">
                      ›
                    </span>
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div>
            <h3 className="font-display text-base font-bold text-saffron border-b border-white/10 pb-2">
              School Office & Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-saffron" />
                <span>{content.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-saffron" />
                <a href={`tel:${content.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-saffron transition-colors">
                  {content.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-saffron" />
                <a href={`mailto:${content.email}`} className="hover:text-saffron transition-colors">
                  {content.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-4 shrink-0 text-saffron" />
                <span>{content.officeHours}</span>
              </li>
            </ul>

            <div className="mt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-saffron hover:underline"
              >
                <span>View Campus Location Map</span>
                <ExternalLink className="size-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Policy Links */}
      <div className="border-t border-white/10 bg-black/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/65 sm:flex-row">
          <p>© {new Date().getFullYear()} {content.schoolName}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/about/policies" className="hover:text-saffron transition-colors">
              School Policies & Safety
            </Link>
            <Link to="/school-info/mandatory-disclosure" className="hover:text-saffron transition-colors">
              CBSE Mandatory Disclosure
            </Link>
            <Link to="/portal" className="hover:text-saffron transition-colors">
              Student / Parent Portal
            </Link>
            <Link to="/admin" className="text-saffron/80 hover:text-saffron font-semibold transition-colors">
              🔒 Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
