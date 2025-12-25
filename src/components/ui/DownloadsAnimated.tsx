"use client";

export default function TeamTunedMockup() {
  return (
    <div
      className="w-full bg-black flex justify-center items-center py-32"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* iPhone Mockup */}
      <div className="w-[230px] sm:w-[280px] lg:w-[320px]">
        <div className="rounded-[3rem] bg-zinc-900 border-[9px] border-zinc-800 shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
          <div className="relative aspect-[9/19] rounded-[2.5rem] bg-black overflow-hidden text-white">

            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[32%] h-5 bg-zinc-900 rounded-full" />

            {/* Screen Content */}
            <div className="pt-16 px-5 pb-6 space-y-6">
              {/* App Title */}
              <h1 className="text-xl font-semibold tracking-tight text-white">
                TeamTuned
              </h1>

              {/* Dashboard Card */}
              <div className="h-28 rounded-xl bg-zinc-900 border border-zinc-800" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="h-14 rounded-lg bg-zinc-900 border border-zinc-800" />
                <div className="h-14 rounded-lg bg-zinc-900 border border-zinc-800" />
              </div>

              {/* Activity */}
              <div className="h-20 rounded-xl bg-zinc-900 border border-zinc-800" />

              {/* Footer Bar */}
              <div className="h-10 rounded-lg bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
