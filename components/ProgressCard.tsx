"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function ProgressCard() {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setProgress(0);
        setCompleted(0);
        setTotal(0);
        return;
      }

      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => doc.data());

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(
          (task: any) => task.completed
        ).length;

        setTotal(totalTasks);
        setCompleted(completedTasks);

        if (totalTasks === 0) {
          setProgress(0);
        } else {
          setProgress(
            Math.round((completedTasks / totalTasks) * 100)
          );
        }
      });

      return unsubscribeSnapshot;
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600/20 to-blue-700/20 border border-indigo-500/20 rounded-3xl p-8 shadow-xl">

      <h2 className="text-2xl font-bold">
        🎯 Today's Progress
      </h2>

      <div className="flex justify-center mt-8">

        <div className="relative w-44 h-44 rounded-full flex items-center justify-center">

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#3b82f6 ${
                progress * 3.6
              }deg,#1f2937 0deg)`,
            }}
          />

          <div className="absolute w-36 h-36 bg-black rounded-full flex items-center justify-center">

            <div className="text-center">

              <h2 className="text-4xl font-bold">
                {progress}%
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Completed
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">

        <div className="bg-black/30 rounded-xl p-4 text-center">

          <p className="text-gray-400 text-sm">
            Completed
          </p>

          <h3 className="text-3xl font-bold text-green-400 mt-2">
            {completed}
          </h3>

        </div>

        <div className="bg-black/30 rounded-xl p-4 text-center">

          <p className="text-gray-400 text-sm">
            Total Tasks
          </p>

          <h3 className="text-3xl font-bold text-blue-400 mt-2">
            {total}
          </h3>

        </div>

      </div>

      <p className="text-center text-gray-300 mt-8">

        {progress >= 100
          ? "🏆 Amazing! Everything is completed."
          : progress >= 70
          ? "🚀 Great job! Keep going."
          : progress >= 40
          ? "💪 You're making progress."
          : "⚡ Let's complete some tasks."}

      </p>

    </div>
  );
}