import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/apiFetch";

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
  // ✅ Hook MUST be at top level
  const auth = useAuth();

  const [sessions, setSessions] = useState<SessionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<ReactNode | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  if (!API_URL) throw new Error("VITE_API_URL is not defined");

  /* =========================
     LOAD BOOKINGS
  ========================= */

  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await apiFetch(
          `${API_URL}/api/bookings`,
          {},
          auth
        );

        if (!res.ok) throw new Error("Failed to load bookings");

        const data: BookingResponse[] = await res.json();

      const upcoming = data
  .filter((b) => b.session && b.session.date)
  .map((b) => {
    const dateObj = new Date(b.session.date);

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
      endTime: new Date(dateObj.getTime() + 90 * 60000).toLocaleTimeString([], {
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

    if (auth.isAuthenticated) {
      loadBookings();
    } else {
      setLoading(false);
    }
  }, [auth, API_URL]);

  /* =========================
     AUTO‑HIDE SUCCESS MESSAGE
  ========================= */

  useEffect(() => {
    if (!successMessage) return;
    const t = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(t);
  }, [successMessage]);

  /* =========================
     CANCEL BOOKING
  ========================= */

  async function handleCancelBooking(bookingId: number) {
    if (!confirm("Are you sure you want to cancel this session?")) return;

    setDeletingId(bookingId);

    try {
      const res = await apiFetch(
        `${API_URL}/api/bookings/${bookingId}`,
        { method: "DELETE" },
        auth
      );

      if (!res.ok) throw new Error("Cancel failed");

      setSessions((prev) =>
        prev.filter((s) => s.bookingId !== bookingId)
      );

      setSuccessMessage(
        <div className="flex gap-2">
          <img src="/images/icons/green-check-icon.svg" />
          <span>Session cancelled successfully</span>
        </div>
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }

  /* =========================
     RENDER
  ========================= */

  if (loading) {
    return <p className="p-6">Loading your sessions…</p>;
  }

return (
  <div className="bg-background">

    {/* PAGE WRAPPER */}
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 md:py-24">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="h2 text-2xl md:text-4xl">
          My Sessions
        </h1>

        <p className="text-muted mt-2">
          Manage your upcoming bookings
        </p>

      </div>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700 font-medium text-sm md:text-base">
          {successMessage}
        </div>
      )}

      {/* EMPTY STATE */}
      {sessions.length === 0 && (
        <p className="text-muted">
          You have no upcoming sessions.
        </p>
      )}

      {/* LIST */}
      <div className="flex flex-col gap-5">

        {sessions.map((session) => (
          <div
            key={session.bookingId}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >

            {/* TOP BAR */}
            <div className="h-3 w-full bg-primary" />

            {/* CONTENT */}
            <div className="p-5 md:p-6 flex flex-col md:flex-row justify-between gap-6">

              {/* LEFT */}
              <div className="flex flex-col gap-3">

                {/* TITLE */}
                <div className="flex items-center gap-2 flex-wrap">

                  <h2 className="text-lg md:text-xl font-bold">
                    {session.title}
                  </h2>

               

                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-sm text-muted">

                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src="/images/icons/gray-calendar-icon.svg" />
                    {new Date(session.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src="/images/icons/gray-clock-icon.svg" />
                    {session.startTime} – {session.endTime}
                  </div>

                  <div className="flex items-center gap-2">
                    <img className="w-4 h-4" src="/images/icons/gray-map-pin-icon.svg" />
                    {session.location}
                  </div>

                  {session.coach && (
                    <div className="flex items-center gap-2">
                      <img className="w-4 h-4" src="/images/icons/gray-graduation-cap-icon.svg" />
                      Coach: {session.coach}
                    </div>
                  )}

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">

                <span className="text-xl font-semibold">
                  £{session.price}
                </span>

                <button
                  onClick={() => handleCancelBooking(session.bookingId)}
                  disabled={deletingId === session.bookingId}
                  className="flex items-center gap-2 px-4 py-2 text-sm border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
                >
                  <img src="/images/icons/x-icon.svg" />
                  Cancel
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  </div>
);
}