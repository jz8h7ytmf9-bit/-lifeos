"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import StatCard from "./StatCard";

export default function LiveStats() {
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTotal(0);
        setCompleted(0);
        return;
      }

      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid)
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map((doc) => doc.data());

        setTotal(tasks.length);
        setCompleted(tasks.filter((task: any) => task.completed).length);
      });

      return unsubscribeSnapshot;
    });

    return unsubscribeAuth;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <StatCard title="Total Tasks" value={String(total)} />
      <StatCard title="Completed" value={String(completed)} />
      <StatCard title="Pending" value={String(total - completed)} />
    </div>
  );
}