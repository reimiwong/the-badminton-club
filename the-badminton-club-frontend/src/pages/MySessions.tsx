import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface BookingResponse {
  id: number;
  session: {
    id: number;
    date: string;
    title: string;
    type: string;
    coach?: string | null;
    location: string;
    price: number;
  };
}

interface SessionCard {
  bookingId: number;
  id: number;
  title: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  coach?: string;
  location: string;
  price: number;
}

export default function MySessions() {
  const { token } = useAuth();

  const [sessions, setSessions] = useState<SessionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<ReactNode | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data: BookingResponse[] = await res.json();
        if (!res.ok) throw new Error("Failed to load bookings");

        // ✅ Only keep upcoming sessions
        const upcoming = data
          .map((b) => {
            const dateObj = new Date(b.session.date);
            if (dateObj < new Date()) return null;

            return {
              bookingId: b.id,
              id: b.session.id,
              title: b.session.title,
              type: b.session.type,
              date: b.session.date,
              startTime: dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              endTime: new Date(
                dateObj.getTime() + 90 * 60000
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              coach: b.session.coach || undefined,
              location: b.session.location,
              price: b.session.price,
            };
          })
          .filter(Boolean) as SessionCard[];

        setSessions(upcoming);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, [token]);

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(t);
  }, [successMessage]);

  async function handleCancelBooking(bookingId: number) {
    if (!confirm("Are you sure you want to cancel this session?")) return;

    setDeletingId(bookingId);

    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Cancel failed");

      // ✅ Remove from UI immediately
      setSessions((prev) =>
        prev.filter((s) => s.bookingId !== bookingId)
      );

      const successMessage=<div className="flex gap-2"><img src="/images/icons/green-check-icon.svg" /><span>Session cancelled successfully</span></div>
      setSuccessMessage(successMessage);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <p className="p-6">Loading your sessions…</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-[1000px]">
      <h1 className="h2 mb-2">My Sessions</h1>
      <p className="text-gray-500 mb-6">
        Manage your upcoming bookings
      </p>

      {successMessage && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 font-medium">
          {successMessage}
        </div>
      )}

      {sessions.length === 0 && (
        <p className="text-gray-500">
          You have no upcoming sessions.
        </p>
      )}

      <div className="flex flex-col gap-4">
        {sessions.map((session) => (
          <div
            key={session.bookingId}
            className="flex flex-col bg-white rounded-xl shadow-md"
          >
            <div className="h-4 w-full rounded-t-xl bg-primary" />

            <div className="flex flex-col md:flex-row justify-between items-start p-6 gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">
                    {session.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {session.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-16 text-gray-500 text-sm mt-1">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-4 h-4"
                      src="/images/icons/gray-calendar-icon.svg"
                    />
                    {new Date(session.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      className="w-4 h-4"
                      src="/images/icons/gray-clock-icon.svg"
                    />
                    {session.startTime} – {session.endTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      className="w-4 h-4"
                      src="/images/icons/gray-map-pin-icon.svg"
                    />
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

              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <span className="font-semibold text-xl">
                  £{session.price}
                </span>

                <button
                  onClick={() =>
                    handleCancelBooking(session.bookingId)
                  }
                  disabled={deletingId === session.bookingId}
                  className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 flex gap-1 justify-center disabled:opacity-50"
                >
                  <img src="/images/icons/x-icon.svg" />
                  Cancel Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
``