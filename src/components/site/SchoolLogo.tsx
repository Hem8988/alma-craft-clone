import logoPng from "@/assets/school-logo.png";
import { useSiteContent } from "@/hooks/useSiteContent";

interface SchoolLogoProps {
  className?: string;
  showText?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export function SchoolLogo({ className = "", showText = true, size = "sm" }: SchoolLogoProps) {
  const { content } = useSiteContent();

  const sizeClasses = {
    xs: "size-8",
    sm: "size-9 sm:size-10",
    md: "size-11 sm:size-12",
    lg: "size-14 sm:size-16",
  };

  const imageSrc = content.logoUrl && content.logoUrl.trim() !== "" ? content.logoUrl : logoPng;

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Royal Crest Emblem Container */}
      <div className="relative shrink-0">
        {/* Ambient Glow Aura */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-saffron via-amber-400 to-saffron opacity-50 blur-[2px] group-hover:opacity-100 group-hover:blur-sm transition-all duration-300" />

        {/* Outer Golden Gear / Shield Ring */}
        <div className={`relative ${sizeClasses[size]} rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-saffron-light to-amber-300 shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
          {/* Inner Navy Deep Disc */}
          <div className="size-full rounded-full bg-gradient-to-br from-navy-deep via-navy to-navy-deep p-0.5 flex items-center justify-center border border-white/20 shadow-inner overflow-hidden">
            <img
              src={imageSrc}
              alt={`${content.schoolName} Emblem`}
              className="size-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Small Active Government Verification Badge */}
        <span
          className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-1.5 ring-navy-deep flex items-center justify-center shadow-sm"
          title="Govt. Verified"
        />
      </div>

      {/* Brand Text Details - Dynamic */}
      {showText && (
        <div className="leading-tight text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-sm sm:text-base font-extrabold tracking-tight text-slate-900 group-hover:text-navy transition-colors whitespace-nowrap">
              {content.schoolShortName || content.schoolName}
            </span>
            <span className="hidden sm:inline-block rounded bg-amber-100 border border-amber-300 px-1.5 py-0.2 text-[0.58rem] font-bold text-amber-900">
              {content.stat3Value || "CBSE"}
            </span>
          </div>
          <span className="block text-[0.62rem] font-semibold tracking-wider text-amber-700 uppercase whitespace-nowrap">
            {content.tagline || "Govt. Sr. Sec. School • Kinnaur"}
          </span>
        </div>
      )}
    </div>
  );
}
