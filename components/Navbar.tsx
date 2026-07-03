"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();

  async function handleLogin() {
    if (auth.currentUser) {
      router.push("/dashboard");
      return;
    }

    try {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl font-bold shadow-lg">
            ⚡
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">
              LifeOS
            </h1>

            <p className="text-xs text-gray-400">
              Productivity Workspace
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>

          <a href="/#features" className="hover:text-blue-400 transition">
            Features
          </a>

          <Link href="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>

          <a href="/#footer" className="hover:text-blue-400 transition">
            Contact
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <button
            onClick={handleLogin}
            className="hidden md:block border border-gray-700 hover:bg-gray-900 transition px-5 py-2 rounded-xl"
          >
            Login
          </button>

          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 px-6 py-2 rounded-xl font-semibold shadow-lg"
          >
            🚀 Get Started
          </button>

        </div>

      </div>
    </nav>
  );
}