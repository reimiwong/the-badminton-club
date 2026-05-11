import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInModal from "../components/SignInModal";

interface Session {
  id: number;
  date: string;
  capacity: number;
  bookings: { id: number }[];
  template: {
    title: string;
    type: "Coaching" | "Match Play";
    level: "Beginner" | "Intermediate" | "Advanced";
    coach: string | null;
    price: number;
  };
}

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [typeFilter, setTypeFilter] = useState<"All" | "Coaching" | "Match Play">("All");
  const [levelFilter, setLevelFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [redirectSessionId, setRedirectSessionId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  const navigate = useNavigate();
  const today = new Date();

  // ------------------------
  // AUTH CHECK ON PAGE LOAD
  // ------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    fetch("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUser({
          username: data.name,
          email: data.email,
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  // ------------------------
  // Week calculation
  // ------------------------
  const getWeekRange = (date: Date) => {
    const day = date.getDay();
    const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
    const weekStart = new Date(date);
    weekStart.setDate(diffToMonday);
    if (weekStart < today) weekStart.setTime(today.getTime());

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return [weekStart, weekEnd];
  };

  const [weekStart, weekEnd] = React.useMemo(() => getWeekRange(currentWeekStart), [currentWeekStart]);

  const prevWeek = () => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate < today ? prev : newDate;
    });
  };

  const nextWeek = () => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  // ------------------------
  // Fetch sessions
  // ------------------------
  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch("http://localhost:5000/api/sessions");
        const data: Session[] = await res.json();
        setSessions(data);

        if (data.length > 0) {
          const firstSessionDate = new Date(data[0].date);
          const [start] = getWeekRange(firstSessionDate);
          if (start.getTime() !== currentWeekStart.getTime()) setCurrentWeekStart(start);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchSessions();
  }, []);

  // ------------------------
  // Filter sessions
  // ------------------------
  useEffect(() => {
    let filtered = [...sessions];
    if (typeFilter !== "All") filtered = filtered.filter((s) => s.template.type === typeFilter);
    if (levelFilter !== "All") filtered = filtered.filter((s) => s.template.level === levelFilter);
    filtered = filtered.filter((s) => {
      const date = new Date(s.date);
      return date >= weekStart && date <= weekEnd;
    });
    setFilteredSessions(filtered);
  }, [sessions, typeFilter, levelFilter, weekStart, weekEnd]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const formatTimeRange = (session: Session) => {
    const start = new Date(session.date);
    const duration = session.template.type === "Coaching" ? 90 : 120;
    const end = new Date(start.getTime() + duration * 60 * 1000);
    return `${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  // ------------------------
  // Handle session button click
  // ------------------------
const handleViewDetails = (sessionId: number, spotsLeft: number) => {
  if (spotsLeft <= 0) return;

  const token = localStorage.getItem("token");
  if (!token) {
    setRedirectSessionId(sessionId);
    setShowSignInModal(true);
  } else {
    navigate(`/sessions/${sessionId}`);
  }
};

return (
  <div className="container mx-auto max-w-[1400px] bg-background px-6 pt-20 md:pt-24 pb-14 md:pb-20">
    <h1 className="h1 mb-6">
      Book a <span className="text-primary mt-1">Session.</span>
    </h1>
    <p className="body mb-8 text-muted">Choose from match play or professional coaching sessions</p>

    {/* Week Navigator */}
    <div className="flex items-center justify-between mb-8 bg-white rounded-lg shadow-md px-6 py-5">
      <button onClick={prevWeek} className="p-2 hover:text-gray-500 cursor-pointer">
        <img src="/images/icons/left-icon.svg" className="transition-transform duration-200 hover:-translate-x-1" alt="Previous week" />
      </button>
      <div className="flex flex-col items-center">
        <span className="text-sm text-black/50">Week of</span>
        <span className="font-semibold text-black text-lg md:text-xl">{formatDate(weekStart)} - {formatDate(weekEnd)}</span>
      </div>
      <button onClick={nextWeek} className="p-2 hover:text-gray-500 cursor-pointer">
        <img src="/images/icons/right-icon.svg" className="transition-transform duration-200 hover:translate-x-1" alt="Next week" />
      </button>
    </div>

    {/* Filters */}
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <div className="flex items-center gap-3 mb-6">
        <img className="w-6 h-6" src="/images/icons/filter-icon.svg" />
        <h4 className="text-lg font-semibold text-gray-800">Filter Sessions</h4>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Session Type */}
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-sm font-semibold text-gray-500">Session Type</span>
          <div className="flex flex-wrap gap-3">
            {["All", "Match Play", "Coaching"].map((type) => (
              <button
                key={type}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  typeFilter === type ? "bg-primary text-white shadow-md scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
                onClick={() => setTypeFilter(type as "All" | "Coaching" | "Match Play")}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Level */}
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-sm font-semibold text-gray-500">Skill Level</span>
          <div className="flex flex-wrap gap-3">
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  levelFilter === level ? "bg-primary text-white shadow-md scale-105" : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                }`}
                onClick={() => setLevelFilter(level as "All" | "Beginner" | "Intermediate" | "Advanced")}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Session Cards Grouped by Day */}
    {Object.entries(
      filteredSessions.reduce((acc, s) => {
        const dayStr = new Date(s.date).toLocaleDateString(undefined, { weekday: "long" });
        if (!acc[dayStr]) acc[dayStr] = [];
        acc[dayStr].push(s);
        return acc;
      }, {} as Record<string, Session[]>)
    ).map(([day, daySessions]) => (
      <div key={day} className="mb-10">
        <h3 className="text-2xl font-semibold mb-6 border-b-2 border-gray-200 pb-2">{day}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {daySessions.map((session) => {
            const spotsLeft = session.capacity - session.bookings.length;
            return (
              <div key={session.id} className="flex flex-col rounded-2xl shadow-lg bg-white overflow-hidden transform transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl">
                <div className="bg-primary h-2 w-full"></div>
                <div className="p-5 flex flex-col gap-3 text-muted flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-base md:text-lg text-black">{`${session.template.level} ${session.template.type}`}</h4>
                    <span className="bg-primary/20 text-primary font-medium text-sm px-3 py-1 rounded-md whitespace-nowrap">
                      {session.template.type}
                    </span>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                      <img className="w-5 h-5" src="/images/icons/clock-icon.svg" alt="Time" />
                      <p className="text-sm">{new Date(session.date).toLocaleDateString()} | {formatTimeRange(session)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="w-5 h-5" src="/images/icons/coach-icon.svg" alt="Coach" />
                      <p className="text-sm">Coach: {session.template.coach || "N/A"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img className="w-5 h-5" src="/images/icons/players-icon.svg" alt="Players" />
                      <p className="text-sm">{spotsLeft} of {session.capacity} spots available</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-300/50 w-full flex justify-between items-center">
                    <h3 className="font-bold text-black text-xl">£{session.template.price}</h3>
                    <button
                      className={`px-4 py-2 rounded-md font-medium text-white transition-all duration-150 cursor-pointer ${
                        spotsLeft > 0 ? "bg-primary/90 hover:bg-primary" : "bg-gray-300 cursor-not-allowed"
                      }`}
                      onClick={() => handleViewDetails(session.id, spotsLeft)}
                      disabled={spotsLeft <= 0}
                    >
                      {spotsLeft > 0 ? "View Details" : "Full"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ))}

    {/* Sign In Modal */}
   {showSignInModal && (
  <SignInModal
    isOpen={showSignInModal}
    onClose={() => setShowSignInModal(false)}
    onSignIn={(userData) => {
      if (!userData.token) {
        console.error("Login failed: no token returned");
        return;
      }

      // Save token & user info
      localStorage.setItem("token", userData.token);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("email", userData.email);

      setUser({ username: userData.username, email: userData.email });
      setIsAuthenticated(true);
      setShowSignInModal(false);

      // Redirect to session if applicable
      if (redirectSessionId) {
        navigate(`/sessions/${redirectSessionId}`);
        setRedirectSessionId(null);
      }
    }}
  />
)}
  </div>
);
};

export default SessionsPage;
