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
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-navy-light text-primary-foreground py-16 sm:py-20">
      {/* Decorative mountain grid & ambient glows */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-saffron/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 -z-10 size-96 rounded-full bg-primary-foreground/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 text-center">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-1.5 text-xs text-primary-foreground/70">
          <Link to="/" className="flex items-center gap-1 hover:text-saffron transition-colors">
            <Home className="size-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="size-3 text-saffron/70" />
                {b.to ? (
                  <Link to={b.to} className="hover:text-saffron transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-saffron-light font-medium">{b.label}</span>
                )}
              </span>
            ))
          ) : (
            <span className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-saffron/70" />
              <span className="text-saffron-light font-medium">{title}</span>
            </span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-saffron-light backdrop-blur-md border border-white/10">
            <Sparkles className="size-3.5 text-saffron" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="animate-fade-in font-display text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="animate-fade-in mx-auto mt-4 max-w-2xl text-base text-primary-foreground/80 sm:text-lg">
            {subtitle}
          </p>
        )}

        {/* Decorative divider */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          <div className="h-0.5 w-10 rounded-full bg-saffron/40" />
          <div className="h-1 w-12 rounded-full bg-saffron" />
          <div className="h-0.5 w-10 rounded-full bg-saffron/40" />
        </div>
      </div>
    </section>
  );
}
