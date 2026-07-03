"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  if (!user) return null;

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      alert("Failed to logout.");
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-5">

        <img
          src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            {user.displayName}
          </h2>

          <p className="text-gray-400">
            {user.email}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>
    </div>
  );
}