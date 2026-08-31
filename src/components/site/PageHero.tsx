export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="hero-gradient text-primary-foreground">
      <div className="animate-fade-in mx-auto max-w-7xl px-4 py-16 text-center sm:py-20">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">{subtitle}</p>
        )}
        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-saffron" />
      </div>
    </section>
  );
}
