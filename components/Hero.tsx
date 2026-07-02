export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white flex items-center">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
            🚀 The Ultimate Productivity Platform
          </span>

          <h1 className="text-6xl md:text-8xl font-extrabold mt-8 leading-tight">
            Organize
            <br />
            Your Life
            <br />
            <span className="text-blue-500">
              with LifeOS
            </span>
          </h1>

          <p className="text-gray-400 text-xl mt-8 leading-8 max-w-xl">
            Manage your tasks, save notes, stay productive,
            and unlock AI-powered tools — all in one
            beautiful dashboard.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-xl font-semibold shadow-lg">
              🚀 Get Started
            </button>

            <button className="border border-gray-700 hover:bg-gray-900 transition px-8 py-4 rounded-xl">
              📖 Learn More
            </button>
          </div>

          <div className="flex items-center gap-6 mt-12 text-gray-400">

            <div>
              <h3 className="text-3xl font-bold text-white">
                100%
              </h3>

              <p>Free</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                Firebase
              </h3>

              <p>Powered</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">
                AI
              </h3>

              <p>Ready</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="relative">

          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-6">
              📊 Dashboard Preview
            </h2>

            <div className="space-y-4">

              <div className="bg-gray-800 rounded-xl p-4 flex justify-between">
                <span>📋 Today's Tasks</span>
                <span className="font-bold">12</span>
              </div>

              <div className="bg-gray-800 rounded-xl p-4 flex justify-between">
                <span>✅ Completed</span>
                <span className="font-bold text-green-400">
                  8
                </span>
              </div>

              <div className="bg-gray-800 rounded-xl p-4 flex justify-between">
                <span>📝 Notes</span>
                <span className="font-bold">
                  15
                </span>
              </div>

              <div className="bg-blue-600 rounded-xl p-4 mt-6">
                🤖 AI Assistant Ready
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}