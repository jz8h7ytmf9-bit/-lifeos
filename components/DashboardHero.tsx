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
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20 backdrop-blur-xl p-8 shadow-2xl">

      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">

        {/* Left */}
        <div>

          <p className="text-blue-400 font-semibold uppercase tracking-widest">
            Welcome Back
          </p>

          <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
            {greeting},{" "}
            <span className="text-blue-400">
              {user.displayName?.split(" ")[0]}
            </span>{" "}
            👋
          </h1>

          <p className="text-gray-300 mt-6 text-lg">
            {formattedDate}
          </p>

          <p className="text-4xl font-bold mt-2">
            {formattedTime}
          </p>

          <p className="text-gray-400 mt-6 text-lg leading-8 max-w-xl">
            Stay productive, organize your work, complete your goals and
            build consistency every single day.
          </p>

        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-3 gap-4">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h3 className="text-3xl">🔥</h3>
            <p className="mt-3 text-3xl font-bold">
              7
            </p>
            <p className="text-gray-400 text-sm">
              Day Streak
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h3 className="text-3xl">📋</h3>
            <p className="mt-3 text-3xl font-bold">
              2
            </p>
            <p className="text-gray-400 text-sm">
              Tasks Left
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <h3 className="text-3xl">🚀</h3>
            <p className="mt-3 text-3xl font-bold">
              92%
            </p>
            <p className="text-gray-400 text-sm">
              Productivity
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}