"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export default function LoginButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  if (user) return null;

  async function login() {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);
    } catch (error: any) {
  console.error("Firebase Error:", error);
  alert(error.code + "\n\n" + error.message);
}
     finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={login}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition shadow-lg"
    >
      {loading ? "Signing in..." : "🚀 Continue with Google"}
    </button>
  );
}