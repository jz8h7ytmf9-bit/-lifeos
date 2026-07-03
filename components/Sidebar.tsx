"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      icon: "🏠",
      href: "/dashboard",
    },
    {
      name: "Tasks",
      icon: "📋",
      href: "/tasks",
    },
    {
      name: "Notes",
      icon: "📝",
      href: "/notes",
    },
    {
      name: "AI Assistant",
      icon: "🤖",
      href: "/ai",
    },
    {
      name: "Calendar",
      icon: "📅",
      href: "/calendar",
    },
    {
      name: "Settings",
      icon: "⚙️",
      href: "/settings",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-950 to-black border-r border-gray-800 flex flex-col justify-between p-6">

      {/* Logo */}
      <div>

        <Link href="/" className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg">
            ⚡
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              LifeOS
            </h2>

            <p className="text-gray-400 text-sm">
              Productivity Workspace
            </p>
          </div>

        </Link>

        {/* Navigation */}
        <nav className="mt-12 space-y-3">

          {menu.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </Link>

          ))}

        </nav>

      </div>

      {/* Bottom Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">

        <h3 className="font-bold text-lg">
          🚀 LifeOS v1.0
        </h3>

        <p className="text-gray-400 text-sm mt-2">
          Stay productive every day and build better habits.
        </p>

      </div>

    </aside>
  );
}
