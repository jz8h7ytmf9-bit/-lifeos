"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function RecentTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState("");
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setTasks([]);
        setLoading(false);
        return;
      }

      const q = query(
        collection(db, "tasks"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data: Task[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Task, "id">),
        }));

        setTasks(data);
        setLoading(false);
      });

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  async function toggleTask(id: string, completed: boolean) {
    try {
      await updateDoc(doc(db, "tasks", id), {
        completed: !completed,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update task.");
    }
  }

  async function deleteTask(id: string) {
    const ok = confirm("Delete this task?");

    if (!ok) return;

    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task.");
    }
  }

  async function saveTask(id: string) {
    if (!editingText.trim()) return;

    try {
      await updateDoc(doc(db, "tasks", id), {
        title: editingText,
      });

      setEditingId("");
      setEditingText("");
    } catch (error) {
      console.error(error);
      alert("Failed to update task.");
    }
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📋 My Tasks
      </h2>

      {loading ? (
        <div className="text-center py-8 text-gray-400">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-gray-800 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-3">📋</div>

          <h3 className="text-xl font-semibold">
            No Tasks Yet
          </h3>

          <p className="text-gray-400 mt-2">
            Add your first task to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-800 rounded-xl p-4"
            >
              <span
                className={
                  task.completed
                    ? "line-through text-gray-500"
                    : ""
                }
              >
                {editingId === task.id ? (
                  <input
                    value={editingText}
                    onChange={(e) =>
                      setEditingText(e.target.value)
                    }
                    className="bg-gray-700 px-3 py-2 rounded-lg outline-none"
                  />
                ) : (
                  task.title
                )}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toggleTask(task.id, task.completed)
                  }
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>

                {editingId === task.id ? (
                  <button
                    onClick={() => saveTask(task.id)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditingText(task.title);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}