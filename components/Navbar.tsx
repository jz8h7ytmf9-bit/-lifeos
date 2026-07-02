export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold">
            ⚡
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              LifeOS
            </h1>

            <p className="text-xs text-gray-400">
              Productivity Workspace
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">

          <a
            href="#"
            className="hover:text-white transition"
          >
            Home
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            Features
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="hover:text-white transition"
          >
            Contact
          </a>

        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <button className="hidden md:block border border-gray-700 hover:bg-gray-900 transition px-5 py-2 rounded-xl">
            Login
          </button>

          <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl font-semibold shadow-lg">
            🚀 Get Started
          </button>

        </div>

      </div>
    </nav>
  );
}