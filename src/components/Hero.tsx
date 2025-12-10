import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";

export default function Hero() {
  return (
    <section
      className={cn(
        "relative min-h-screen w-full flex items-end justify-center overflow-hidden"
      )}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-20"
        style={{
          backgroundImage: "url('/video/bg_three.png')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 -z-10" />

      {/* Content Positioned on Center of Table */}
      <div className="absolute bottom-[15%] z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-4">

        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-2 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-emerald-300 tracking-wide uppercase">
            AI Powered
          </span>
        </div>

        <AnimatedText
          text="Workforce. Automated. Simplified."
          className="text-white font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl"
        />

      </div>
    </section>
  );
}
