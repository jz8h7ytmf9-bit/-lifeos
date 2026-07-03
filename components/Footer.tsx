export default function Footer() {
  return (
    <footer
  id="footer"
  className="bg-black border-t border-gray-800 text-gray-400 py-16"
>
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl">
                ⚡
              </div>

              <h2 className="text-2xl font-bold text-white">
                LifeOS
              </h2>
            </div>

            <p className="text-gray-400 mt-4 leading-7">
              Your all-in-one productivity workspace for
              tasks, notes and AI.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">
              Quick Links
            </h3>

            <div className="space-y-3 text-gray-400">
              <p className="hover:text-white cursor-pointer">Home</p>
              <p className="hover:text-white cursor-pointer">Features</p>
              <p className="hover:text-white cursor-pointer">Dashboard</p>
              <p className="hover:text-white cursor-pointer">Contact</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-white font-bold mb-4">
              Project Status
            </h3>

            <div className="space-y-3">
              <p className="text-green-400">
                🟢 LifeOS v1.0
              </p>

              <p className="text-gray-400">
                Built with Next.js + Firebase
              </p>

              <p className="text-gray-400">
                AI Features Coming Soon 🚀
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 LifeOS. All rights reserved.
          </p>

          <p className="text-gray-500 mt-3 md:mt-0">
            Built with ❤️ by Team LifeOS
          </p>

        </div>

      </div>
    </footer>
  );
}