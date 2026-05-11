// src/pages/SessionDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";

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
  const [redirectToBooking, setRedirectToBooking] = useState(false);

  // --- Auth state ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  // ------------------------
  // Fetch session
  // ------------------------
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`http://localhost:5000/api/sessions/${id}`);
        if (!res.ok) throw new Error("Failed to fetch session");
        const data = await res.json();

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

  // ------------------------
  // Auth check on mount
  // ------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(data => {
        setIsAuthenticated(true);
        setUser({ username: data.name, email: data.email });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  if (loading) return <p className="p-6">Loading session...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!session) return <p className="p-6">Session not found</p>;

  // ------------------------
  // Handle booking
  // ------------------------
  const handleContinueToBooking = () => {
    if (!isAuthenticated) {
      setRedirectToBooking(true);
      setShowSignInModal(true);
      return;
    }

    navigate("/booking", { state: { session } });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Back button */}
      <div className="flex mb-4">
        <button
          className="link flex items-center gap-2 transition-transform duration-200 ease-in-out hover:scale-105 cursor-pointer"
          onClick={() => navigate("/sessions")}
        >
          <img
            className="transform scale-x-[-1] w-4 h-4 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            src="/images/icons/green-arrow-icon.svg"
          />
          Back to sessions
        </button>
      </div>

      {/* Session card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-primary h-4 w-full"></div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded-3xl">
                {session.type}
              </span>
              <h1 className="h2 mt-2">{session.title}</h1>
              {session.description && <p className="mt-2 text-gray-600">{session.description}</p>}
            </div>
            <div className="text-right font-semibold text-4xl flex flex-col">
              £{session.price}{" "}
              <span className="text-sm font-normal text-muted">per person</span>
            </div>
          </div>

          <hr className="my-4 border-t border-gray-300" />

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm body">
            <div className="flex items-start gap-2">
              <img className="w-5 h-5" src="/images/icons/green-calendar-icon.svg" />
              <div className="flex flex-col">
                <p className="text-muted">Date & Time</p>
                <div className="font-semibold">
                  {new Date(session.date).toLocaleDateString()}
                  <br />
                  {new Date(session.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <img className="w-5 h-5" src="/images/icons/green-location-icon.svg" />
              <div className="flex flex-col">
                <p className="text-muted">Location</p>
                <div className="font-semibold">{session.location}</div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <img className="w-5 h-5" src="/images/icons/green-players-icon.svg" />
              <div className="flex flex-col">
                <p className="text-muted">Availability</p>
                <div className="font-semibold">
                  {session.capacity - session.bookings.length} of {session.capacity} spots left
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <img className="w-5 h-5" src="/images/icons/green-skill-icon.svg" />
              <div className="flex flex-col">
                <p className="text-muted">Skill Level</p>
                <div className="font-semibold">{session.level}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white mt-6 rounded-2xl p-6 gap-4 shadow-lg">
        <div className="flex flex-col">
          <h4 className="font-bold text-lg">Ready to Book?</h4>
          <p className="text-muted">Secure your spot for this session</p>
        </div>
        <button
          className="btn-primary px-8 py-3 w-full md:w-auto"
          onClick={handleContinueToBooking}
        >
          Continue to Payment
        </button>
      </div>

      {/* Sign-in Modal */}
      {showSignInModal && (
        <SignInModal
          isOpen={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          onSignIn={(userData) => {
            if (!userData.token) return;

            localStorage.setItem("token", userData.token);
            localStorage.setItem("username", userData.username);
            localStorage.setItem("email", userData.email);

            setUser({ username: userData.username, email: userData.email });
            setIsAuthenticated(true);
            setShowSignInModal(false);

            if (redirectToBooking) {
              navigate("/booking", { state: { session } });
              setRedirectToBooking(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default SessionDetailPage;