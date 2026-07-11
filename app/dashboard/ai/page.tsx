"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import ChatSidebar from "@/components/ChatSidebar";

import {
  loadMessages,
  saveMessage,
  ChatMessage,
} from "@/lib/chatService";

import {
  createChatSession,
  loadChatSessions,
  ChatSession,
} from "@/lib/chatSessionService";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIPage() {
  const [uid, setUid] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const [sessions, setSessions] =
    useState<ChatSession[]>([]);

  const [currentChatId, setCurrentChatId] =
    useState("");

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Auto Focus
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Login + Load Chats
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) return;

        setUid(user.uid);

        let chats = await loadChatSessions(user.uid);

        if (chats.length === 0) {
          const id = await createChatSession(
            user.uid
          );

          chats = [
            {
              id,
              title: "New Chat",
            },
          ];
        }

        setSessions(chats);

        setCurrentChatId(chats[0].id);
      }
    );

    return unsubscribe;
  }, []);

  // Load Messages
  useEffect(() => {
    async function fetchMessages() {
      if (!uid || !currentChatId) return;

      const history = await loadMessages(
        uid,
        currentChatId
      );

      if (history.length === 0) {
        setMessages([
          {
            role: "assistant",
            content:
              "👋 Hi! I'm LifeOS AI.\n\nHow can I help you today?",
          },
        ]);
      } else {
        setMessages(history);
      }
    }

    fetchMessages();
  }, [uid, currentChatId]);
  function clearChat() {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi! I'm LifeOS AI.\n\nHow can I help you today?",
      },
    ]);
  }

  async function handleNewChat() {
    if (!uid) return;

    const id = await createChatSession(uid);

    const newChat: ChatSession = {
      id,
      title: "New Chat",
    };

    setSessions((prev) => [newChat, ...prev]);

    setCurrentChatId(id);

    clearChat();
  }

  async function sendMessage() {
    if (!message.trim() || loading) return;
    if (!uid || !currentChatId) return;

    const currentMessage = message.trim();

    const userMessage: Message = {
      role: "user",
      content: currentMessage,
    };

    setMessages((prev) => [...prev, userMessage]);

    await saveMessage(
      uid,
      currentChatId,
      "user",
      currentMessage
    );

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

      const aiReply =
        data.reply || "No response received.";

      const aiMessage: Message = {
        role: "assistant",
        content: aiReply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      await saveMessage(
        uid,
        currentChatId,
        "assistant",
        aiReply
      );
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
    <div className="flex h-screen bg-black text-white">

      <ChatSidebar
        sessions={sessions}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={handleNewChat}
      />

      <div className="flex-1 flex flex-col">

        {/* Header */}

        <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              🤖 LifeOS AI
            </h1>

            <p className="text-gray-400 mt-1">
              Your Personal Productivity Assistant
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

        {/* Chat */}

        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">

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

        {/* Input */}

        <div className="border-t border-gray-800 p-5">

          <div className="flex gap-4">

            <textarea
              ref={textareaRef}
              rows={2}
              value={message}
              placeholder="Ask LifeOS AI anything..."
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 bg-[#111827] border border-gray-700 rounded-2xl p-4 resize-none outline-none focus:border-blue-500 transition"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-8 rounded-2xl font-bold transition-all"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}