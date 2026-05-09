// src/pages/SessionsPage.tsx
import React, { useEffect, useState } from "react";

interface Session {
  id: number;
  title: string;
  date: string;
  capacity: number;
  bookings: { id: number }[];
  type: "Coaching" | "Casual Play";
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  coach: string;
}

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  // Fetch sessions from backend
  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch("http://localhost:5000/api/sessions");
        const data: Session[] = await res.json();
        setSessions(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchSessions();
  }, []);

  const handleBook = (sessionId: number) => {
    // TODO: call POST /api/bookings with JWT
    console.log("Book session", sessionId);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="h1 mb-4">Book a Session</h1>
      <p className="body mb-6">
        Choose from casual play or professional coaching sessions
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sessions.map((session) => {
          const spotsTaken = session.bookings.length;
          const spotsLeft = session.capacity - spotsTaken;

          return (
            <div
              key={session.id}
              className="bg-white rounded-lg p-4 shadow flex flex-col justify-between"
            >
              <div>
                <h2 className="h3">{session.title}</h2>
                <p className="body mt-1">
                  {new Date(session.date).toLocaleDateString()} |{" "}
                  {new Date(session.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="body mt-1">
                  Coach: {session.coach}
                </p>
                <p className="body mt-1">
                  {spotsLeft} of {session.capacity} spots available
                </p>
                <p className="body mt-1">Level: {session.level}</p>
                <p className="body mt-1 font-semibold">€{session.price}</p>
              </div>
              <button
                className="btn-primary mt-4 w-full"
                onClick={() => handleBook(session.id)}
                disabled={spotsLeft <= 0}
              >
                {spotsLeft > 0 ? "Book" : "Full"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SessionsPage;