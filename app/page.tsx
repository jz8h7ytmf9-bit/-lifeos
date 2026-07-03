import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <section
        id="features"
        className="bg-black text-white py-28 px-6"
      >
  <div className="max-w-7xl mx-auto">

    <div className="text-center">
      <p className="text-blue-500 font-semibold uppercase tracking-widest">
        FEATURES
      </p>

      <h2 className="text-5xl md:text-6xl font-bold mt-4">
        Everything You Need.
      </h2>

      <p className="text-gray-400 text-xl mt-6 max-w-2xl mx-auto">
        LifeOS combines productivity, organization and AI
        into one beautiful workspace.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2 rounded-3xl p-8 shadow-xl">
        <div className="text-5xl mb-6">
          🤖
        </div>

        <h3 className="text-2xl font-bold">
          AI Assistant
        </h3>

        <p className="text-gray-400 mt-4 leading-7">
          Get instant help, summaries, ideas and productivity
          suggestions powered by AI.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-green-500 transition-all duration-300 hover:-translate-y-2 rounded-3xl p-8 shadow-xl">
        <div className="text-5xl mb-6">
          📋
        </div>

        <h3 className="text-2xl font-bold">
          Smart Tasks
        </h3>

        <p className="text-gray-400 mt-4 leading-7">
          Create, edit, complete and organize your daily
          tasks in real time.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-yellow-500 transition-all duration-300 hover:-translate-y-2 rounded-3xl p-8 shadow-xl">
        <div className="text-5xl mb-6">
          📝
        </div>

        <h3 className="text-2xl font-bold">
          Notes
        </h3>

        <p className="text-gray-400 mt-4 leading-7">
          Save your ideas, thoughts and important information
          securely in the cloud.
        </p>
      </div>

    </div>

  </div>
</section>


   <section className="bg-black text-white py-28 px-6">
  <div className="max-w-7xl mx-auto">

    <div className="text-center">

      <p className="text-blue-500 uppercase tracking-widest font-semibold">
        TESTIMONIALS
      </p>

      <h2 className="text-5xl md:text-6xl font-bold mt-4">
        Loved by Early Users
      </h2>

      <p className="text-gray-400 text-xl mt-6">
        People using LifeOS are becoming more productive every day.
      </p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">

      {/* Card 1 */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">

        <div className="text-yellow-400 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-300 mt-6 leading-8">
          "LifeOS helped me organize my study schedule and
          assignments in one place. It saves me a lot of time."
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
            R
          </div>

          <div>
            <h3 className="font-bold">
              Rohan
            </h3>

            <p className="text-gray-400 text-sm">
              Student
            </p>
          </div>
        </div>

      </div>

      {/* Card 2 */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-8 hover:border-green-500 transition-all duration-300 hover:-translate-y-2">

        <div className="text-yellow-400 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-300 mt-6 leading-8">
          "The clean dashboard makes planning my work incredibly
          simple. It's fast and easy to use."
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center font-bold">
            P
          </div>

          <div>
            <h3 className="font-bold">
              Priya
            </h3>

            <p className="text-gray-400 text-sm">
              Designer
            </p>
          </div>
        </div>

      </div>

      {/* Card 3 */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">

        <div className="text-yellow-400 text-xl">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-300 mt-6 leading-8">
          "Everything I need is finally in one place.
          Tasks, Notes and AI together feel amazing."
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <h3 className="font-bold">
              Aman
            </h3>

            <p className="text-gray-400 text-sm">
              Freelancer
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>
</section>
<Footer />
  </>
);
}