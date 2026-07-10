"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

import Sidebar from "@/components/Sidebar";
import DashboardHero from "@/components/DashboardHero";
import LoginButton from "@/components/LoginButton";
import UserProfile from "@/components/UserProfile";

import StatsCards from "@/components/StatsCards";
import LiveStats from "@/components/LiveStats";

import QuickActions from "@/components/QuickActions";

import WeatherCard from "@/components/WeatherCard";
import QuoteCard from "@/components/QuoteCard";

import ProgressCard from "@/components/ProgressCard";
import TodaysGoals from "@/components/TodaysGoals";

import ProductivityChart from "@/components/ProductivityChart";
import ActivityFeed from "@/components/ActivityFeed";

import AddTask from "@/components/AddTask";
import RecentTasks from "@/components/RecentTasks";

import NotesCard from "@/components/NotesCard";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold animate-pulse">
          Loading LifeOS...
        </h1>
      </div>
    );
  }

  if (!user) return null;

  const hour = currentTime.getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

          <DashboardHero
            user={user}
            greeting={greeting}
            formattedDate={formattedDate}
            formattedTime={formattedTime}
          />

          <div className="mt-8">
            <LoginButton />
            <UserProfile />
          </div>

          {/* Overview */}

          <section className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
              📊 Overview
            </h2>

            <StatsCards />

            <div className="mt-8">
              <LiveStats />
            </div>

          </section>

          {/* Quick Actions */}

          <section className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
              ⚡ Quick Actions
            </h2>

            <QuickActions />

          </section>

          {/* Weather */}

          <section className="mt-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <WeatherCard />

              <QuoteCard />

            </div>

          </section>

          {/* Progress */}

          <section className="mt-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <ProgressCard />

              <TodaysGoals />

            </div>

          </section>

          {/* Productivity */}

          <section className="mt-12">

            <ProductivityChart />

          </section>

                    {/* Activity Feed */}

          <section className="mt-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              <ActivityFeed />

              <div className="bg-gradient-to-br from-indigo-600/20 via-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-3xl p-8 flex flex-col justify-center shadow-2xl">

                <h2 className="text-3xl font-bold">
                  🎯 Keep Going!
                </h2>

                <p className="text-gray-300 mt-5 leading-8">
                  Every completed task brings you one step closer to your goals.
                  Consistency beats motivation. Build momentum every single day.
                </p>

                <button className="mt-8 bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl py-3 px-6 font-semibold w-fit shadow-lg">
                  View Analytics →
                </button>

              </div>

            </div>

          </section>

          {/* Task Manager */}

          <section className="mt-12">

            <h2 className="text-3xl font-bold mb-6">
              📋 Task Manager
            </h2>

            <AddTask />

            <div className="mt-8">

              <RecentTasks />

            </div>

          </section>

          {/* Notes */}

          <section className="mt-12 mb-16">

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