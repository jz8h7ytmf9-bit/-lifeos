import Sidebar from "@/components/Sidebar";
import LoginButton from "@/components/LoginButton";
import UserProfile from "@/components/UserProfile";
import AddTask from "@/components/AddTask";
import RecentTasks from "@/components/RecentTasks";
import LiveStats from "@/components/LiveStats";
import NotesCard from "@/components/NotesCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">

            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold">
                Welcome Back 👋
              </h1>

              <p className="text-gray-400 mt-3 text-lg">
                Stay productive. Manage your tasks, notes and boost your workflow.
              </p>
            </div>

            <div className="space-y-4">
              <LoginButton />
              <UserProfile />
            </div>

          </div>

          {/* Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              📊 Overview
            </h2>

            <LiveStats />
          </section>

          {/* Tasks */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              📋 Task Manager
            </h2>

            <AddTask />

            <div className="mt-8">
              <RecentTasks />
            </div>
          </section>

          {/* Notes */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">
              📝 Notes
            </h2>

            <NotesCard />
          </section>

        </div>
      </main>
    </div>
  );
}