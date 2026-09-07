import { Link } from "@tanstack/react-router";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/school-logo.png";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  label: string;
  to: string;
  children?: { label: string; to: string }[];
};

const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About Us",
    to: "/about",
    children: [
      { label: "About the School", to: "/about" },
      { label: "Our Faculty", to: "/academics/faculty" },
      { label: "School Policies", to: "/about/policies" },
    ],
  },
  {
    label: "Admission",
    to: "/admissions",
    children: [
      { label: "Admission Process", to: "/admissions" },
      { label: "Online Admission Form", to: "/admissions/form" },
      { label: "Fee Structure", to: "/school-info/fee-structure" },
    ],
  },
  {
    label: "Infrastructure",
    to: "/infrastructure",
    children: [{ label: "Facilities Overview", to: "/infrastructure" }],
  },
  {
    label: "School Info",
    to: "/school-info",
    children: [
      { label: "Overview", to: "/school-info" },
      { label: "Mandatory Disclosure", to: "/school-info/mandatory-disclosure" },
      { label: "Fee Structure", to: "/school-info/fee-structure" },
      { label: "Circulars", to: "/school-info/circulars" },
      { label: "Notice Board", to: "/notice-board" },
    ],
  },
  {
    label: "Gallery",
    to: "/gallery",
    children: [
      { label: "Photo Gallery", to: "/gallery" },
      { label: "News & Events", to: "/news" },
      { label: "Events Calendar", to: "/events" },
    ],
  },
  { label: "Contact Us", to: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-navy-deep text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:+911786000000" className="flex items-center gap-2 hover:text-saffron-light">
              <Phone className="size-3.5" /> +91 1786-XXXXXX
            </a>
            <a
              href="mailto:gssssangla@gmail.com"
              className="flex items-center gap-2 hover:text-saffron-light"
            >
              <Mail className="size-3.5" /> gssssangla@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-5">
            {isAdmin && (
              <Link to="/admin" className="font-semibold text-saffron-light hover:text-saffron">
                Admin Panel
              </Link>
            )}
            <Link to="/portal" className="hover:text-saffron-light">
              {user ? "My Account" : "Student / Parent Portal"}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-navy text-primary-foreground shadow-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Govt. Sr. Sec. School Sangla emblem"
              className="animate-float-soft size-12 rounded-full bg-background/10 object-contain"
            />
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold sm:text-xl">
                Govt. Sr. Sec. School Sangla
              </span>
              <span className="block text-[0.65rem] font-semibold tracking-[0.2em] text-saffron">
                EXCELLENCE IN EDUCATION
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className="story-link flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-background/10"
                  activeProps={{ className: "text-saffron-light" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {item.label}
                  {item.children && <ChevronDown className="size-3.5" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-60 translate-y-1 rounded-md border border-border bg-card p-1 opacity-0 shadow-elevated transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.to + child.label}
                        to={child.to}
                        className="block rounded px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 transition-colors hover:bg-background/10 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-background/10 bg-navy-deep px-4 pb-4 lg:hidden">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-background/10 py-1">
                <div className="flex items-center justify-between">
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block flex-1 py-2 text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-label={`Expand ${item.label}`}
                      onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      className="p-2"
                    >
                      <ChevronDown
                        className={`size-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {item.children && expanded === item.label && (
                  <div className="pb-2 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.to + child.label}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-sm text-primary-foreground/80"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
