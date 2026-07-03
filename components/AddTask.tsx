"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function AddTask() {
  const [task, setTask] = useState("");

  async function addTask() {
    if (!task.trim()) {
      alert("Please enter a task.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert("Please sign in first.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: task,
        completed: false,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      setTask("");
      alert("✅ Task Added Successfully!");
    } catch (error) {
      console.error("Firestore Error:", error);
      alert("❌ Failed to add task.");
    }
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">
        ➕ Add New Task
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
          className="flex-1 bg-black border border-gray-700 rounded-lg px-4 py-3 outline-none"
        />

        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
        >
         ➕ Add Task
        </button>
      </div>
    </div>
  );
}