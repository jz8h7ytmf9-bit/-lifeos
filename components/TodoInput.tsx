"use client";

import { useState } from "react";

export default function TodoInput() {
  const [task, setTask] = useState("");

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        ➕ Add Task
      </h2>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
        className="w-full bg-gray-800 rounded-xl px-4 py-3 outline-none"
      />

      <button className="bg-blue-600 px-5 py-3 rounded-xl mt-4">
        Add Task
      </button>
    </div>
  );
}``