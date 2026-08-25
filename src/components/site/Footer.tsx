import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/school-logo.png";

const QUICK_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Admissions", to: "/admissions" },
  { label: "Infrastructure", to: "/infrastructure" },
  { label: "Faculty", to: "/academics/faculty" },
  { label: "News & Events", to: "/news" },
  { label: "Contact", to: "/contact" },
];

const IMPORTANT_LINKS = [
  { label: "Mandatory Disclosure", to: "/school-info/mandatory-disclosure" },
  { label: "Fee Structure", to: "/school-info/fee-structure" },
  { label: "Circulars", to: "/school-info/circulars" },
  { label: "Notice Board", to: "/notice-board" },
  { label: "Gallery", to: "/gallery" },
  { label: "Online Admission", to: "/admissions/form" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="bg-saffron py-2 text-center text-[0.7rem] font-bold tracking-[0.2em] text-accent-foreground">
        COMMITTED TO QUALITY EDUCATION AND LEARNING
      </div>
      <div className="border-b border-background/10 py-2 text-center text-[0.65rem] font-semibold tracking-[0.25em] text-primary-foreground/60">
        GOVERNMENT OF HIMACHAL PRADESH
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="School emblem"
              className="size-14 rounded-full bg-background/10 object-contain"
            />
            <span className="font-display text-lg font-bold leading-tight">
              Govt. Sr. Sec. School
              <span className="block text-saffron">Sangla</span>
            </span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Providing quality education in the heart of Kinnaur district, Himachal Pradesh.
            Nurturing young minds for a brighter tomorrow.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-saffron">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/75 hover:text-saffron-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-saffron">Contact Us</h3>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-saffron" />
              Sangla, Kinnaur District, Himachal Pradesh - 172106
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-saffron" />
              <a href="tel:+911786000000">+91 1786-XXXXXX</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-saffron" />
              <a href="mailto:gssssangla@gmail.com">gssssangla@gmail.com</a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-saffron" />
              Mon - Sat: 9:00 AM - 4:00 PM
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-bold text-saffron">Important Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {IMPORTANT_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-primary-foreground/75 hover:text-saffron-light">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© 2026 Govt. Sr. Sec. School Sangla. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about/policies" className="hover:text-saffron-light">
              School Policies
            </Link>
            <Link to="/school-info/mandatory-disclosure" className="hover:text-saffron-light">
              Mandatory Disclosure
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
