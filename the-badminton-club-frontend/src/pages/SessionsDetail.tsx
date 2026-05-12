// src/pages/SessionDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";
import { useAuth } from "../context/AuthContext";


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
  description?: string;
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
  const [showSignInModal, setShowSignInModal] = useState(false);
  
  const { isAuthenticated } = useAuth();

const API_URL = import.meta.env.VITE_API_URL;
useEffect(() => {
  if (isAuthenticated && showSignInModal && session) {
    setShowSignInModal(false);
    navigate("/booking", { state: { session } });
  }
}, [isAuthenticated, showSignInModal, session, navigate]);


useEffect(() => {
  async function fetchSession() {
    try {
      const res = await fetch(`${API_URL}/api/sessions/${id}`);
      if (!res.ok) throw new Error("Failed to fetch session");
      const data = await res.json();

      // Flatten template fields into top-level session object
      const flatSession = {
        ...data,
        type: data.template.type,
        level: data.template.level,
        title: data.template.title,
        coach: data.template.coach,
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
  if (loading) return <p className="p-6">Loading session...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!session) return <p className="p-6">Session not found</p>;


return (
  <div className="bg-background">

    {/* PAGE WRAPPER */}
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-24">

      {/* BACK BUTTON */}
      <div className="mb-6">
        <button
          className="link flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          onClick={() => navigate("/sessions")}
        >
          <img
            className="w-4 h-4 scale-x-[-1]"
            src="/images/icons/green-arrow-icon.svg"
          />
          Back to sessions
        </button>
      </div>

      {/* MAIN SESSION CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* TOP BAR */}
        <div className="bg-primary h-3 w-full" />

        <div className="p-5 md:p-8">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

            <div>
              <span className="text-xs md:text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                {session.type}
              </span>

              <h1 className="h2 mt-3 text-2xl md:text-4xl">
                {session.title}
              </h1>

              {session.description && (
                <p className="mt-2 text-muted text-body">
                  {session.description}
                </p>
              )}
            </div>

            <div className="text-left md:text-right font-semibold text-3xl md:text-4xl">
              £{session.price}
              <span className="block text-sm font-normal text-muted">
                per person
              </span>
            </div>

          </div>

          <hr className="my-6 border-border" />

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">

            <div className="flex items-start gap-3">
              <img className="w-5 h-5" src="/images/icons/green-calendar-icon.svg" />
              <div>
                <p className="text-muted">Date & Time</p>
                <p className="font-semibold">
                  {new Date(session.date).toLocaleDateString()}
                  <br />
                  {new Date(session.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <img className="w-5 h-5" src="/images/icons/green-location-icon.svg" />
              <div>
                <p className="text-muted">Location</p>
                <p className="font-semibold">{session.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <img className="w-5 h-5" src="/images/icons/green-players-icon.svg" />
              <div>
                <p className="text-muted">Availability</p>
                <p className="font-semibold">
                  {session.capacity - session.bookings.length} of {session.capacity} spots
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <img className="w-5 h-5" src="/images/icons/green-skill-icon.svg" />
              <div>
                <p className="text-muted">Skill Level</p>
                <p className="font-semibold">{session.level}</p>
              </div>
            </div>

          </div>

          {/* OPTIONAL SECTIONS */}
          {session.specialties?.length ? (
            <div className="mt-8">
              <h3 className="h3 mb-3">Specialties</h3>
              <ul className="body list-disc list-inside marker:text-primary space-y-1">
                {session.specialties.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {session.agenda?.length ? (
            <div className="mt-8">
              <h3 className="h3 mb-3">Agenda</h3>
              <ol className="body list-decimal list-inside marker:text-primary space-y-1">
                {session.agenda.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ol>
            </div>
          ) : null}

          {session.whatToBring?.length ? (
            <div className="mt-8">
              <h3 className="h3 mb-3">What to Bring</h3>
              <ul className="body list-disc list-inside marker:text-primary space-y-1">
                {session.whatToBring.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>
          ) : null}

        </div>
      </div>

     {/* TWO INFO BOXES */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

  {/* EXPECT */}
  <div className="relative bg-white p-6 rounded-2xl border border-border hover:border-primary/30 transition">

    {/* accent strip */}
    <div className="absolute left-0 top-6 bottom-6 w-1 bg-primary rounded-r-full" />

    <div className="pl-4">

      <h4 className="font-semibold text-lg md:text-xl mb-3">
        What to Expect
      </h4>

      <ul className="space-y-2 text-muted">
        <li className="flex gap-2">
          <span className="text-primary">▸</span>
          15 min warm-up and footwork drills
        </li>
        <li className="flex gap-2">
          <span className="text-primary">▸</span>
          45 min skill practice
        </li>
        <li className="flex gap-2">
          <span className="text-primary">▸</span>
          30 min match play / drills
        </li>
      </ul>

    </div>
  </div>

  {/* BRING */}
  <div className="relative bg-white p-6 rounded-2xl border border-border hover:border-primary/30 transition">

    {/* accent strip (different tone) */}
    <div className="absolute left-0 top-6 bottom-6 w-1 bg-accent rounded-r-full" />

    <div className="pl-4">

      <h4 className="font-semibold text-lg md:text-xl mb-3">
        What to Bring
      </h4>

      <ul className="space-y-2 text-muted">
        <li className="flex gap-2">
          <span className="text-accent">▸</span>
          Indoor court shoes
        </li>
        <li className="flex gap-2">
          <span className="text-accent">▸</span>
          Racket
        </li>
        <li className="flex gap-2">
          <span className="text-accent">▸</span>
          Water bottle
        </li>
        <li className="flex gap-2">
          <span className="text-accent">▸</span>
          Towel
        </li>
      </ul>

    </div>
  </div>

</div>

      {/* CTA */}
    {/* CTA */}
<div className="relative mt-10">

  {/* subtle glow background */}
  <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-3xl" />

  <div className="relative bg-surface border border-border rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">

    <div className="text-center md:text-left">

      <h4 className="font-semibold text-xl md:text-2xl text-text">
        Ready to book?
      </h4>

      <p className="text-muted mt-1">
        Secure your spot for this session
      </p>

      {/* subtle urgency cue */}
      <div className="mt-3 inline-flex items-center gap-2 text-xs text-primary font-medium">
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        Limited availability
      </div>

    </div>

    <button
      className="btn-primary px-10 py-3 w-full md:w-auto text-base"
      onClick={() => {
        if (!isAuthenticated) {
          setShowSignInModal(true);
          return;
        }
        navigate("/booking", { state: { session } });
      }}
    >
      Continue to Payment
    </button>
</div>
  </div>
</div>

    {showSignInModal && (
      <SignInModal
        isOpen={showSignInModal && !isAuthenticated}
        onClose={() => setShowSignInModal(false)}
      />
    )}

  </div>
);
};

export default SessionDetailPage;