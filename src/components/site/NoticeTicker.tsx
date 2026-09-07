import { Bell, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSiteContent } from "@/hooks/useSiteContent";

export function NoticeTicker() {
  const { content } = useSiteContent();

  const items = content.tickerItems && content.tickerItems.length > 0
    ? content.tickerItems
    : [
        {
          tag: "Admissions 2026-27",
          text: "Online registration open for all classes (Class 1 to 12). Apply early for placement!",
          link: "/admissions/form",
        },
      ];

  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-[#050b14]/90 text-primary-foreground py-1 text-[11px]">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        {/* Static Slim Badge */}
        <div className="z-10 flex shrink-0 items-center gap-1 rounded-full bg-saffron px-2.5 py-0.5 font-bold text-navy-deep shadow-xs mr-3 text-[0.62rem]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy-deep opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-navy-deep" />
          </span>
          <Bell className="size-2.5" />
          <span className="tracking-wider uppercase">Alerts</span>
        </div>

        {/* Marquee Content */}
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {[...items, ...items].map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="rounded bg-white/10 px-1.5 py-0.2 text-[0.62rem] font-semibold text-saffron-light">
                  {item.tag}
                </span>
                <span className="text-primary-foreground/80 font-normal">
                  {item.text}
                </span>
                <Link
                  to={item.link || "/notice-board"}
                  className="inline-flex items-center gap-0.5 text-[0.65rem] font-semibold text-saffron hover:underline ml-0.5"
                >
                  View <ArrowRight className="size-2.5" />
                </Link>
                <span className="text-white/20 ml-3">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
