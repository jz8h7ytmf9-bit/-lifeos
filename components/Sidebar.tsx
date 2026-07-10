"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-black border-b border-gray-800 flex items-center justify-between px-5">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl">
            ⚡
          </div>

          <h2 className="text-2xl font-bold text-white">
            LifeOS
          </h2>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="text-3xl text-white"
        >
          ☰
        </button>

      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static
        top-0 left-0
        z-50
        h-screen
        w-72
        bg-gradient-to-b
        from-gray-950
        to-black
        border-r
        border-gray-800
        flex
        flex-col
        justify-between
        p-6
        transform
        transition-transform
        duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Logo */}

        <div>

          <div className="flex items-center justify-between lg:hidden mb-6">

            <h2 className="text-2xl font-bold text-white">
              LifeOS
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-3xl text-gray-300"
            >
              ✕
            </button>

          </div>

          <Link href="/" className="hidden lg:flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl">
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

          <nav className="mt-8 lg:mt-12 space-y-3">

            {menu.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">

          <h3 className="font-bold text-lg">
            🚀 LifeOS v1.1
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Stay productive every day and build better habits.
          </p>

        </div>

      </aside>
    </>
  );
}