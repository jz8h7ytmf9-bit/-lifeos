export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-gray-950 to-black border-r border-gray-800 flex flex-col justify-between p-6">

      {/* Logo */}
      <div>

        <div className="flex items-center gap-3">

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

        </div>

        {/* Navigation */}
        <nav className="mt-12 space-y-3">

          <button className="w-full flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl px-4 py-3 text-left font-semibold">
            🏠 Dashboard
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-800 transition rounded-xl px-4 py-3 text-left">
            📋 Tasks
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-800 transition rounded-xl px-4 py-3 text-left">
            📝 Notes
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-800 transition rounded-xl px-4 py-3 text-left">
            📊 Overview
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-800 transition rounded-xl px-4 py-3 text-left">
            🤖 AI Assistant
            <span className="ml-auto text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
              Soon
            </span>
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-gray-800 transition rounded-xl px-4 py-3 text-left">
            ⚙️ Settings
          </button>

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