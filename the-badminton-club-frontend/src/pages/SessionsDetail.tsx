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
  date: string;
  capacity: number;
  bookings: Booking[];
  // Flattened template fields
  title: string;
  type: "Coaching" | "Match Play" | "Casual Play";
  level: "Beginner" | "Intermediate" | "Advanced";
  coach?: string | null;
  location: string;
  price: number;
  specialties?: string[];
  agenda?: string[];
  whatToBring?: string[];
}

const SessionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`http://localhost:5000/api/sessions/${id}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data = await res.json();

        // Flatten template
        const flatSession: Session = {
          id: data.id,
          date: data.date,
          capacity: data.capacity,
          bookings: data.bookings,
          title: data.template.title,
          type: data.template.type,
          level: data.template.level,
          coach: data.template.coach,
          location: data.template.location,
          price: data.template.price,
          specialties: data.template.specialties,
          agenda: data.template.agenda,
          whatToBring: data.template.whatToBring,
        };
        setSession(flatSession);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Error fetching session");
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, [id]);

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
      navigate("/sessions");
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
  const sessionDate = new Date(session.date);

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
            <span className="text-sm text-green-600 font-medium">{session.type}</span>
            <h1 className="h2 mt-2">{session.title}</h1>
            {session.type === "Coaching" && session.coach && (
              <p className="body mt-2">
                Coach: {session.coach}
              </p>
            )}
            {session.type === "Match Play" && (
              <p className="body mt-2">Match Play session – casual or competitive.</p>
            )}
            {session.type === "Casual Play" && (
              <p className="body mt-2">Casual play session – just enjoy the game.</p>
            )}
          </div>
          <div className="text-right font-semibold text-lg">
            £{session.price} <span className="text-sm font-normal">per person</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm body">
          <div className="flex items-center gap-2">
            <span>📅</span>
            <div>
              {sessionDate.toLocaleDateString()}<br />
              {sessionDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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

        {/* Optional: specialties */}
        {session.specialties && session.specialties.length > 0 && (
          <div className="mt-6">
            <h3 className="h3 mb-2">Specialties</h3>
            <ul className="body list-disc list-inside">
              {session.specialties.map(s => <li key={s}>{s}</li>)}
            </ul>
          </div>
        )}

        {/* Optional: agenda */}
        {session.agenda && session.agenda.length > 0 && (
          <div className="mt-6">
            <h3 className="h3 mb-2">Agenda</h3>
            <ol className="body list-decimal list-inside">
              {session.agenda.map((a, i) => <li key={i}>{a}</li>)}
            </ol>
          </div>
        )}

        {/* Optional: what to bring */}
        {session.whatToBring && session.whatToBring.length > 0 && (
          <div className="mt-6">
            <h3 className="h3 mb-2">What to Bring</h3>
            <ul className="body list-disc list-inside">
              {session.whatToBring.map((i, idx) => <li key={idx}>{i}</li>)}
            </ul>
          </div>
        )}

        <button
          className={`btn-primary mt-6 w-full ${spotsLeft <= 0 || bookingLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={spotsLeft <= 0 || bookingLoading}
          onClick={handleBook}
        >
          {spotsLeft > 0 ? (bookingLoading ? "Booking..." : "Book") : "Full"}
        </button>
      </div>
    </div>
  );
};

export default SessionDetailPage;