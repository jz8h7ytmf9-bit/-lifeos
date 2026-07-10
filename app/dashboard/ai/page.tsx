"use client";


import ChatSidebar from "@/components/ChatSidebar";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { loadMessages, saveMessage } from "@/lib/chatService";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [uid, setUid] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm LifeOS AI.\n\nI can help you with coding, studying, productivity, writing, business, fitness and much more.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Auto focus
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Load Firebase Chat
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) return;

        setUid(user.uid);

        try {
          const history = await loadMessages(user.uid);

          if (history.length > 0) {
            setMessages(history);
          }
        } catch (err) {
          console.error(err);
        }
      }
    );

    return unsubscribe;
  }, []);

  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi! I'm LifeOS AI.\n\nHow can I help you today?",
      },
    ]);
  }

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const currentMessage = message.trim();

    const userMessage: Message = {
      role: "user",
      content: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    if (uid) {
      try {
        await saveMessage(
          uid,
          "user",
          currentMessage
        );
      } catch (err) {
        console.error(err);
      }
    }

    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      const aiReply: Message = {
        role: "assistant",
        content:
          data.reply || "No response received.",
      };

      setMessages((prev) => [...prev, aiReply]);

      if (uid) {
        try {
          await saveMessage(
            uid,
            "assistant",
            aiReply.content
          );
        } catch (err) {
          console.error(err);
        }
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `❌ ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex">

      <ChatSidebar
  onNewChat={clearChat}
/>

  <div className="max-w-5xl mx-auto px-4 py-6">

    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

      <div>

        <h1 className="text-3xl sm:text-5xl font-bold">
          🤖 LifeOS AI
        </h1>

        <p className="text-gray-400 mt-2">
          Your personal productivity assistant
        </p>

      </div>

      <div className="flex gap-3">

        <Link
          href="/dashboard"
          className="bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-xl transition"
        >
          ← Dashboard
        </Link>

        <button
          onClick={clearChat}
          className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl transition"
        >
          🗑 Clear
        </button>

      </div>

    </div>

    <div className="bg-[#111827] border border-gray-800 rounded-3xl h-[68vh] overflow-y-auto p-5 space-y-6 shadow-2xl">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={`flex ${
            msg.role === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >

          <div
            className={`flex gap-3 max-w-[90%] ${
              msg.role === "user"
                ? "flex-row-reverse"
                : ""
            }`}
          >

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-blue-600"
                  : "bg-purple-600"
              }`}
            >
              {msg.role === "user" ? "👤" : "🤖"}
            </div>

            <div
              className={`rounded-2xl px-5 py-4 whitespace-pre-wrap leading-7 ${
                msg.role === "user"
                  ? "bg-blue-600 rounded-br-md"
                  : "bg-gray-800 border border-gray-700 rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>

          </div>

        </div>

      ))}

      {loading && (

        <div className="flex gap-3">

          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
            🤖
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 animate-pulse">
            Thinking...
          </div>

        </div>

      )}

      <div ref={messagesEndRef} />

    </div>

    <div className="flex flex-col sm:flex-row gap-4 mt-6">

      <textarea
        ref={textareaRef}
        rows={3}
        value={message}
        placeholder="Ask LifeOS AI anything..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-[#111827] border border-gray-700 rounded-2xl p-4 resize-none outline-none focus:border-blue-500 transition"
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95"
      >
        {loading ? "..." : "Send"}
      </button>

    </div>

  </div>

</div>
  );
}