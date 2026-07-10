"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
  {
    title: "New Task",
    icon: "📋",
    subtitle: "Manage Tasks",
    gradient: "from-blue-600 to-cyan-500",
    route: "/dashboard/tasks",
  },
  {
    title: "New Note",
    icon: "📝",
    subtitle: "Write Notes",
    gradient: "from-green-600 to-emerald-500",
    route: "/dashboard/notes",
  },
  {
    title: "AI Assistant",
    icon: "🤖",
    subtitle: "Ask Anything",
    gradient: "from-purple-600 to-pink-500",
    route: "/dashboard/ai",
  },
  {
    title: "Calendar",
    icon: "📅",
    subtitle: "Coming Soon",
    gradient: "from-orange-500 to-red-500",
    route: "/dashboard/calendar",
  },
];
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

      {actions.map((action) => (

        <button
          key={action.title}
          onClick={() => router.push(action.route)}
          className={`
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-br
          ${action.gradient}
          p-6
          shadow-2xl
          transition-all
          duration-300
          hover:scale-105
          active:scale-95
          text-left
          `}
        >

          {/* Glow */}
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">

            <div className="text-5xl">
              {action.icon}
            </div>

            <h2 className="mt-6 text-xl font-bold">
              {action.title}
            </h2>

            <p className="text-white/80 mt-2 text-sm">
              {action.subtitle}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">

              Open

              <span>
                →
              </span>

            </div>

          </div>

        </button>

      ))}

    </div>
  );
}