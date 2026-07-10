"use client";

export default function QuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-pink-600/20 p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">

      {/* Glow */}
      <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl"></div>

      <div className="relative z-10">

        <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs text-purple-200">
          ✨ Quote of the Day
        </span>

        <div className="text-6xl mt-6">
          💡
        </div>

        <p className="mt-8 text-xl md:text-2xl leading-9 font-semibold text-white">
          “Success is the sum of small efforts repeated day after day.”
        </p>

        <div className="mt-10 flex items-center justify-between">

          <div>

            <p className="text-purple-300 font-semibold">
              — Robert Collier
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Consistency beats motivation.
            </p>

          </div>

          <button className="rounded-xl bg-white/10 hover:bg-white/20 transition px-4 py-2 text-sm font-medium">
            🔄 New Quote
          </button>

        </div>

      </div>

    </div>
  );
}