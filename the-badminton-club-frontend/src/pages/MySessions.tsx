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
    <div className="container mx-auto px-6 py-12 max-w-[1000px]">
      <h1 className="text-2xl font-bold mb-2 h2">My Sessions</h1>
      <p className="text-gray-500 mb-6">
        Manage your bookings, cancel or reschedule sessions
      </p>

      {/* Filter Panel */}
      <div className="flex gap-2 bg-white rounded-xl px-5 p-3 mb-8 shadow-md">
        {(["all", "upcoming", "past", "cancelled"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              filter === option
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option === "all"
              ? "All Sessions"
              : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Session Cards */}
      <div className="flex flex-col gap-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="flex flex-col bg-white rounded-xl shadow-md">
            {/* Top strip inside card */}
            <div
              className={`h-4 w-full rounded-t-xl ${
                session.status === "upcoming"
                  ? "bg-primary"
                  : session.status === "past"
                  ? "bg-gray-400"
                  : "bg-[#D32F2F]"
              }`}
            ></div>

            {/* Card content with padding */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start p-6 gap-4">
              {/* Left section */}
              <div className="flex flex-col gap-1 md:w-auto w-full">
                {/* Day & Type */}
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

                {/* Grid 2x2 */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-16 text-gray-500 text-sm mt-1">
                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src="/images/icons/gray-calendar-icon.svg" />
                    {new Date(session.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src="/images/icons/gray-clock-icon.svg" />
                    {session.startTime} - {session.endTime}
                  </div>
                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src="/images/icons/gray-map-pin-icon.svg" />
                    {session.location}
                  </div>
                  {session.coach && (
                    <div className="flex items-center gap-2">
                      <img
                        className="w-4 h-4"
                        src="/images/icons/gray-graduation-cap-icon.svg"
                      />
                      Coach: {session.coach}
                    </div>
                  )}
                </div>
              </div>

              {/* Right section: price & actions */}
              <div className="flex flex-col md:items-start gap-2 mt-4 md:mt-0 w-full md:w-auto">
                <span className="font-semibold text-xl">£{session.price}</span>

                {session.status === "upcoming" && (
                  <div className="flex flex-col gap-2 w-full md:w-auto">
                    <button className="w-full md:w-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex gap-2 justify-center">
                        <img src="/images/icons/reschedule-icon.svg" />
                      Reschedule
                    </button>

                    <button className="w-full md:w-auto px-4 py-2 border border-red-[#D32F2F] text-[#D32F2F] rounded-lg hover:bg-red-50 transition-colors duration-200 flex gap-1 justify-center">
                        <img src="/images/icons/x-icon.svg" />
                      Cancel Session
                    </button>
                  </div>
                )}

                {session.status === "past" && (
                  <button className="w-full md:w-auto px-4 py-2 bg-gray-200 text-gray-700 rounded-lg cursor-not-allowed">
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