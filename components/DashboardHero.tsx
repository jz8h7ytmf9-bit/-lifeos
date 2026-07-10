"use client";

import { User } from "firebase/auth";

type Props = {
  user: User;
  greeting: string;
  formattedDate: string;
  formattedTime: string;
};

export default function DashboardHero({
  user,
  greeting,
  formattedDate,
  formattedTime,
}: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1e293b] shadow-2xl">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 p-6 md:p-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
              👋 Welcome Back
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">

              {greeting},

              <br />

              <span className="text-blue-400">
                {user.displayName?.split(" ")[0]}
              </span>

            </h1>

            <div className="mt-6 space-y-2">

              <p className="text-gray-400 text-base md:text-lg">
                📅 {formattedDate}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                🕒 {formattedTime}
              </h2>

            </div>

            <p className="mt-6 text-gray-300 text-base md:text-lg leading-8 max-w-xl">
              Stay productive, organize your work, finish your daily goals
              and build consistency every single day.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl font-semibold shadow-lg">
                🚀 Continue Working
              </button>

              <button className="border border-gray-700 hover:border-blue-500 hover:bg-white/5 transition px-6 py-3 rounded-xl">
                📊 View Analytics
              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition">

              <div className="text-5xl">
                🔥
              </div>

              <h2 className="mt-4 text-4xl font-bold">
                7
              </h2>

              <p className="text-gray-400 mt-2">
                Day Streak
              </p>

            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition">

              <div className="text-5xl">
                📋
              </div>

              <h2 className="mt-4 text-4xl font-bold">
                2
              </h2>

              <p className="text-gray-400 mt-2">
                Tasks Left
              </p>

            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition">

              <div className="text-5xl">
                🚀
              </div>

              <h2 className="mt-4 text-4xl font-bold">
                92%
              </h2>

              <p className="text-gray-400 mt-2">
                Productivity
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}