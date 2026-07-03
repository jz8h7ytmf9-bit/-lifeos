"use client";

export default function QuoteCard() {
  return (
    <div className="bg-gradient-to-br from-purple-700/20 to-pink-700/20 border border-purple-500/20 rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300 h-full">

      <p className="text-gray-400">
        Quote of the Day
      </p>

      <div className="text-5xl mt-5">
        💡
      </div>

      <p className="text-xl leading-9 mt-6 font-medium">
        Success is the sum of small efforts repeated day after day.
      </p>

      <p className="text-purple-300 mt-8">
        — Robert Collier
      </p>

    </div>
  );
}