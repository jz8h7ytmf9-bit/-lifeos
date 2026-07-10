"use client";

export default function WeatherCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/20 via-blue-600/20 to-indigo-900/30 p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300">

      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-sky-400/20 blur-3xl"></div>

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs text-sky-200">
              🌍 Live Weather
            </span>

            <h2 className="text-5xl font-bold mt-5">
              31°
            </h2>

            <p className="text-sky-300 mt-2 text-lg">
              Clear Sky
            </p>

            <p className="text-gray-300 mt-1">
              📍 Patna, India
            </p>

          </div>

          <div className="text-8xl animate-pulse">
            ☀️
          </div>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">

          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4">

            <p className="text-gray-300 text-sm">
              💧 Humidity
            </p>

            <h3 className="text-3xl font-bold mt-2">
              72%
            </h3>

          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-4">

            <p className="text-gray-300 text-sm">
              🌬 Wind
            </p>

            <h3 className="text-3xl font-bold mt-2">
              9 km/h
            </h3>

          </div>

        </div>

        <div className="mt-6 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 p-4">

          <div className="flex justify-between text-sm text-gray-300">

            <span>Feels Like</span>

            <span>33°</span>

          </div>

          <div className="flex justify-between mt-3 text-sm text-gray-300">

            <span>UV Index</span>

            <span>Moderate</span>

          </div>

        </div>

      </div>

    </div>
  );
}