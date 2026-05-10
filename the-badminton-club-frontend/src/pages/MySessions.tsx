// src/pages/MySessions.tsx
import { useState } from "react";

interface Session {
  id: number;
  day: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  coach?: string;
  location: string;
  price: number;
  status: "upcoming" | "past" | "cancelled";
}

const mockSessions: Session[] = [
  {
    id: 1,
    day: "Monday",
    type: "Coaching",
    date: "2026-05-12",
    startTime: "18:00",
    endTime: "19:30",
    coach: "Sarah Chen",
    location: "Shamrock Sports Center",
    price: 25,
    status: "upcoming",
  },
  {
    id: 2,
    day: "Thursday",
    type: "Casual Play",
    date: "2026-05-15",
    startTime: "18:30",
    endTime: "20:00",
    location: "Shamrock Sports Center",
    price: 15,
    status: "upcoming",
  },
  {
    id: 3,
    day: "Saturday",
    type: "Coaching",
    date: "2026-05-03",
    startTime: "10:00",
    endTime: "11:30",
    coach: "Sarah Chen",
    location: "Shamrock Sports Center",
    price: 25,
    status: "cancelled",
  },
];

export default function MySessions() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "cancelled">("all");

  const filteredSessions =
    filter === "all" ? mockSessions : mockSessions.filter(s => s.status === filter);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">My Sessions</h1>
      <p className="text-gray-500 mb-6">Manage your bookings, cancel or reschedule sessions</p>

      {/* Filter Panel */}
      <div className="flex gap-2 bg-gray-100 rounded-xl p-2 mb-8">
        {(["all", "upcoming", "past", "cancelled"] as const).map(option => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              filter === option
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option === "all" ? "All Sessions" : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Session Cards */}
      <div className="flex flex-col gap-4">
        {filteredSessions.map(session => (
          <div
            key={session.id}
            className={`flex flex-col md:flex-row justify-between items-start md:items-center bg-white rounded-xl p-6 shadow-md border ${
              session.status === "cancelled" ? "border-red-400" : "border-gray-200"
            }`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{session.day}</h2>
                <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  {session.type}
                </span>
                {session.status === "cancelled" && (
                  <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-700">
                    Cancelled
                  </span>
                )}
              </div>
              <div className="flex gap-4 text-gray-500 text-sm mt-1">
                <span>📅 {new Date(session.date).toLocaleDateString()}</span>
                <span>⏰ {session.startTime} - {session.endTime}</span>
                <span>📍 {session.location}</span>
                {session.coach && <span>🎓 Coach: {session.coach}</span>}
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
              <span className="font-semibold text-lg">€{session.price}</span>
              <div className="flex gap-2">
                {session.status === "upcoming" && (
                  <>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors duration-200">
                      Cancel Session
                    </button>
                  </>
                )}
                {session.status === "past" && (
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-not-allowed">
                    Book Again
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}