"use client";

export default function QuickActions() {
  const actions = [
    {
      title: "New Task",
      icon: "📋",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "New Note",
      icon: "📝",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "AI Assistant",
      icon: "🤖",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Calendar",
      icon: "📅",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {actions.map((action) => (
        <button
          key={action.title}
          className={`${action.color} rounded-2xl p-6 transition-all duration-300 hover:scale-105 shadow-xl`}
        >
          <div className="text-4xl mb-3">
            {action.icon}
          </div>

          <p className="font-semibold text-lg">
            {action.title}
          </p>
        </button>
      ))}
    </div>
  );
}