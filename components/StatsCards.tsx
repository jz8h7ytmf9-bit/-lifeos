"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function StatsCards() {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [notes, setNotes] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTotalTasks(0);
        setCompletedTasks(0);
        setNotes(0);
        return;
      }

      const taskQuery = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid)
      );

      const unsubscribeTasks = onSnapshot(taskQuery, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => doc.data());

        setTotalTasks(tasks.length);
        setCompletedTasks(
          tasks.filter((task: any) => task.completed).length
        );
      });

      const notesQuery = query(
        collection(db, "notes"),
        where("uid", "==", user.uid)
      );

      const unsubscribeNotes = onSnapshot(notesQuery, (snapshot) => {
        setNotes(snapshot.size);
      });

      return () => {
        unsubscribeTasks();
        unsubscribeNotes();
      };
    });

    return unsubscribeAuth;
  }, []);

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: "📋",
      color: "from-blue-600 via-cyan-500 to-sky-500",
      desc: "All your tasks",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "✅",
      color: "from-green-600 via-emerald-500 to-lime-500",
      desc: "Finished tasks",
    },
    {
      title: "Notes",
      value: notes,
      icon: "📝",
      color: "from-yellow-500 via-orange-500 to-red-500",
      desc: "Saved notes",
    },
    {
      title: "Productivity",
      value: `${productivity}%`,
      icon: "🚀",
      color: "from-purple-600 via-pink-500 to-fuchsia-500",
      desc: "Completion rate",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${item.color}
          p-[1px] shadow-2xl group hover:scale-105 transition-all duration-300`}
        >

          <div className="bg-[#0F172A] rounded-3xl p-6 h-full">

            {/* Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition duration-500" />

            <div className="relative flex justify-between items-start">

              <div>

                <p className="text-gray-400 text-sm font-medium">
                  {item.title}
                </p>

                <h2 className="text-5xl font-extrabold mt-3 text-white">
                  {item.value}
                </h2>

                <p className="text-gray-500 text-sm mt-3">
                  {item.desc}
                </p>

              </div>

              <div className="text-6xl group-hover:rotate-12 transition duration-300">
                {item.icon}
              </div>

            </div>

            <div className="mt-6 w-full h-1 bg-white/10 rounded-full overflow-hidden">

              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{
                  width:
                    item.title === "Productivity"
                      ? `${productivity}%`
                      : "100%",
                }}
              />

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}