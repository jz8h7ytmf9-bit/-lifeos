"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function TodaysGoals() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTasks([]);
        return;
      }

      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(data);
      });

      return unsubscribeSnapshot;
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-600/20 to-emerald-700/20 border border-green-500/20 rounded-3xl p-8 shadow-xl">

      <h2 className="text-2xl font-bold mb-8">
        ✅ Today's Goals
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center py-10">

          <p className="text-gray-400">
            No tasks yet 🚀
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Add your first task below.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {tasks.slice(0, 6).map((task: any) => (

            <div
              key={task.id}
              className="flex items-center gap-4"
            >

              <div className="text-2xl">
                {task.completed ? "✅" : "⬜"}
              </div>

              <p
                className={`text-lg ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-white"
                }`}
              >
                {task.title}
              </p>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}