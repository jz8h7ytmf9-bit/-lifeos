"use client";

type ChatSidebarProps = {
  onNewChat: () => void;
};

const chats = [
  {
    id: 1,
    title: "Welcome to LifeOS AI",
    time: "Today",
  },
];

export default function ChatSidebar({
  onNewChat,
}: ChatSidebarProps) {
  return (
    <aside className="hidden md:flex w-72 bg-[#0d1117] border-r border-gray-800 flex-col">

      <div className="p-5 border-b border-gray-800">

        <button
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-500 transition rounded-xl py-3 font-semibold"
        >
          ➕ New Chat
        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-4">

        <p className="text-gray-500 text-xs uppercase mb-3">
          Recent Chats
        </p>

        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left bg-[#161b22] hover:bg-[#1f2937] transition rounded-xl p-4 mb-3"
          >
            <h3 className="font-medium truncate">
              💬 {chat.title}
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              {chat.time}
            </p>
          </button>
        ))}

      </div>

    </aside>
  );
}