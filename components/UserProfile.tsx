"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mt-6">
      <h2 className="text-xl font-bold">
        {user.displayName}
      </h2>

      <p className="text-gray-400 mt-2">
        {user.email}
      </p>

      <button
        onClick={() => signOut(auth)}
        className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}