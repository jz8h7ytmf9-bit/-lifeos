"use client";

import { ChatSession } from "@/lib/chatSessionService";

type ChatSidebarProps = {
  sessions: ChatSession[];
  currentChatId: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
};

export default function ChatSidebar({
  sessions,
  currentChatId,
  onSelectChat,
  onNewChat,
}: ChatSidebarProps) {
  return (
    <aside className="hidden md:flex w-72 bg-[#0d1117] border-r border-gray-800 flex-col">

      <div className="p-5 border-b border-gray-800">
        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl py-3 font-semibold transition"
        >
          ➕ New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        <p className="text-gray-500 text-xs uppercase mb-3">
          Recent Chats
        </p>

        {sessions.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full text-left rounded-xl p-4 mb-3 transition ${
              currentChatId === chat.id
                ? "bg-blue-600"
                : "bg-[#161b22] hover:bg-[#1f2937]"
            }`}
          >
            <h3 className="font-medium truncate">
              💬 {chat.title}
            </h3>
          </button>
        ))}

      </div>
    </aside>
  );
}