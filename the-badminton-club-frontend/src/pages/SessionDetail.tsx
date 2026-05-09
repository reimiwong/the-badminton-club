// src/pages/SessionDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Booking {
  id: number;
  userId: number;
  sessionId: number;
}

interface Session {
  id: number;
  title: string;
  description: string;
  date: string;
  capacity: number;
  bookings: Booking[];
  coach: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  location: string;
  type: "Coaching" | "Casual Play";
}

const SessionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const token = localStorage.getItem("token"); // JWT from login

  // Fetch session by ID
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`http://localhost:5000/api/sessions/${id}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data: Session = await res.json();
        setSession(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error fetching session");
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [id]);

  // Book session
  const handleBook = async () => {
    if (!token) return setError("You must log in to book a session");
    if (!session) return;

    setBookingLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId: session.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      alert("Booking successful!");
      navigate("/sessions"); // redirect back to sessions list
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading session...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!session) return <p className="p-6">Session not found</p>;

  const spotsLeft = session.capacity - session.bookings.length;

  return (
    <div className="container mx-auto p-6">
      <button
        className="link mb-4 inline-block"
        onClick={() => navigate("/sessions")}
      >
        &larr; Back to sessions
      </button>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm text-green-600 font-medium">
              {session.type} Session
            </span>
            <h1 className="h2 mt-2">{session.title}</h1>
            <p className="body mt-2">{session.description}</p>
          </div>
          <div className="text-right font-semibold text-lg">
            €{session.price} <span className="text-sm font-normal">per person</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm body">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <div>
              {new Date(session.date).toLocaleDateString()}
              <br />
              {new Date(session.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>📍</span>
            <div>{session.location}</div>
          </div>
          <div className="flex items-center gap-2">
            <span>👥</span>
            <div>{spotsLeft} of {session.capacity} spots left</div>
          </div>
          <div className="flex items-center gap-2">
            <span>🎯</span>
            <div>{session.level}</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="h3 mb-2">Your Coach</h3>
          <p className="body font-semibold">{session.coach}</p>
          <p className="body mt-1">Former national team player with years of experience</p>
        </div>

        <button
          className="btn-primary mt-6 w-full"
          disabled={spotsLeft <= 0 || bookingLoading}
          onClick={handleBook}
        >
          {spotsLeft > 0 ? (bookingLoading ? "Booking..." : "Book") : "Full"}
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default SessionDetailPage;