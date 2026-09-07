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
    <div className="relative overflow-hidden border-b border-amber-200/80 bg-amber-50/90 text-slate-800 py-1.5 text-[11px]">
      <div className="mx-auto flex max-w-7xl items-center px-4">
        {/* Static Slim Badge */}
        <div className="z-10 flex shrink-0 items-center gap-1 rounded-full bg-saffron px-2.5 py-0.5 font-bold text-navy-deep shadow-2xs mr-3 text-[0.62rem]">
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
                <span className="rounded bg-amber-200/80 border border-amber-300 px-1.5 py-0.2 text-[0.62rem] font-bold text-amber-900">
                  {item.tag}
                </span>
                <span className="text-slate-700 font-medium">
                  {item.text}
                </span>
                <Link
                  to={item.link || "/notice-board"}
                  className="inline-flex items-center gap-0.5 text-[0.65rem] font-bold text-navy hover:text-amber-700 hover:underline ml-0.5"
                >
                  View <ArrowRight className="size-2.5" />
                </Link>
                <span className="text-slate-300 ml-3">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
