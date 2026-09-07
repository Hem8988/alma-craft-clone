import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  variant?: "up" | "down" | "left" | "right" | "zoom";
  className?: string;
  threshold?: number;
}

export function Reveal({
  children,
  delay = 0,
  duration = 700,
  variant = "up",
  className = "",
  threshold = 0.12,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const variantClass = `reveal-${variant}`;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={`reveal ${variantClass} ${className}`}
    >
      {children}
    </div>
  );
}
