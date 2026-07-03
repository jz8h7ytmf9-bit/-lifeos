"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", tasks: 2 },
  { day: "Tue", tasks: 5 },
  { day: "Wed", tasks: 4 },
  { day: "Thu", tasks: 7 },
  { day: "Fri", tasks: 6 },
  { day: "Sat", tasks: 8 },
  { day: "Sun", tasks: 9 },
];

export default function ProductivityChart() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        📈 Weekly Productivity
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" stroke="#333" />

            <XAxis dataKey="day" stroke="#888" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#3B82F6"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}