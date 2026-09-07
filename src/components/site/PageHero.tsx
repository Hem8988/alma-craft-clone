import { Link } from "@tanstack/react-router";
import { ChevronRight, Home, Sparkles } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export function PageHero({
  title,
  subtitle,
  badge,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50/90 via-slate-50 to-white text-slate-900 py-12 sm:py-16 border-b border-slate-200">
      {/* Decorative subtle mountain grid & soft ambient glows */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 text-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link to="/" className="flex items-center gap-1 hover:text-navy transition-colors">
            <Home className="size-3.5 text-slate-400" />
            <span>Home</span>
          </Link>
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="size-3 text-slate-400" />
                {b.to ? (
                  <Link to={b.to} className="hover:text-navy transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-navy font-bold">{b.label}</span>
                )}
              </span>
            ))
          ) : (
            <span className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-slate-400" />
              <span className="text-navy font-bold">{title}</span>
            </span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100/90 px-3.5 py-1 text-xs font-bold text-amber-900 border border-amber-300 shadow-2xs">
            <Sparkles className="size-3.5 text-amber-700" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="animate-fade-in font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-navy">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="animate-fade-in mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Decorative divider */}
        <div className="mx-auto mt-5 flex items-center justify-center gap-2">
          <div className="h-0.5 w-10 rounded-full bg-saffron/40" />
          <div className="h-1 w-12 rounded-full bg-saffron" />
          <div className="h-0.5 w-10 rounded-full bg-saffron/40" />
        </div>
      </div>
    </section>
  );
}
