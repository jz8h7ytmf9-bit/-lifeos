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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Login ho chuka hai to button mat dikhao
  if (user) return null;

  async function login() {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      alert(`Welcome ${result.user.displayName}! 🎉`);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <button
      onClick={login}
      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
    >
      Sign in with Google
    </button>
  );
}