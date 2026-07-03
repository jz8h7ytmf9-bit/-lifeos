"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export default function ActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setActivities([]);
        return;
      }

      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(6)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setActivities(data);
      });

      return unsubscribeSnapshot;
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="bg-[#111827] border border-gray-800 rounded-3xl p-6 shadow-xl h-full">

      <h2 className="text-2xl font-bold mb-6">
        🕒 Recent Activity
      </h2>

      {activities.length === 0 ? (

        <div className="text-center py-10">

          <p className="text-gray-400">
            No recent activity.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {activities.map((task: any) => (

            <div
              key={task.id}
              className="flex items-start gap-4"
            >

              <div
                className={`w-3 h-3 rounded-full mt-2 ${
                  task.completed
                    ? "bg-green-500"
                    : "bg-blue-500"
                }`}
              />

              <div>

                <h3 className="font-semibold">

                  {task.completed
                    ? `Completed "${task.title}"`
                    : `Created "${task.title}"`}

                </h3>

                <p className="text-gray-400 text-sm">

                  {task.createdAt?.toDate
                    ? task.createdAt
                        .toDate()
                        .toLocaleString()
                    : "Just now"}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}