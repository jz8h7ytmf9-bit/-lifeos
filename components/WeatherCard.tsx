"use client";

export default function WeatherCard() {
  return (
    <div className="bg-gradient-to-br from-sky-600/20 to-blue-900/20 border border-blue-500/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-gray-400">
            Today's Weather
          </p>

          <h2 className="text-5xl font-bold mt-3">
            ☀️ 31°
          </h2>

          <p className="text-blue-300 mt-3">
            Clear Sky
          </p>

          <p className="text-gray-500 mt-2">
            Patna, India
          </p>
        </div>

        <div className="text-7xl">
          🌤️
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-black/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Humidity
          </p>

          <h3 className="text-2xl font-bold">
            72%
          </h3>
        </div>

        <div className="bg-black/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">
            Wind
          </p>

          <h3 className="text-2xl font-bold">
            9 km/h
          </h3>
        </div>

      </div>

    </div>
  );
}