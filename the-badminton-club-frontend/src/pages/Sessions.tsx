import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../components/skeleton";

/* =========================
   SKELETON
========================= */

function SessionsSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-20 w-full rounded-2xl" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <Skeleton className="h-1.5 w-full" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================
   TYPES
========================= */

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

/* =========================
   COMPONENT
========================= */

const SessionsPage: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState<
    "All" | "Coaching" | "Match Play"
  >("All");

  const [levelFilter, setLevelFilter] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());

  /* =========================
     HELPERS
  ========================= */

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const getWeekRange = (date: Date) => {
    const day = date.getDay();
    const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);

    const weekStart = new Date(date);
    weekStart.setDate(diffToMonday);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return [weekStart, weekEnd] as const;
  };

  const [weekStart, weekEnd] = useMemo(
    () => getWeekRange(currentWeekStart),
    [currentWeekStart]
  );

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const formatTimeRange = (session: Session) => {
    const start = new Date(session.date);
    const duration = session.template.type === "Coaching" ? 90 : 120;
    const end = new Date(start.getTime() + duration * 60 * 1000);

    return `${start.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })} - ${end.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  /* =========================
     FETCH (runs once)
  ========================= */

  useEffect(() => {
  async function fetchSessions() {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/sessions`);
      const data: Session[] = await res.json();

      setSessions(data);
      console.log(data);
      if (data.length > 0) {
        const first = new Date(data[0].date);
        const [start] = getWeekRange(first);
        setCurrentWeekStart(start);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  fetchSessions();
}, []); // KEEP EMPTY

  /* =========================
     FILTERED DATA (DERIVED)
  ========================= */

  const visibleSessions = useMemo(() => {
    let filtered = [...sessions];

    if (typeFilter !== "All") {
      filtered = filtered.filter((s) => s.template.type === typeFilter);
    }

    if (levelFilter !== "All") {
      filtered = filtered.filter((s) => s.template.level === levelFilter);
    }

    filtered = filtered.filter((s) => {
     const d = startOfDay(new Date(s.date));
return d >= startOfDay(weekStart) && d <= startOfDay(weekEnd);
    });

    return filtered;
  }, [sessions, typeFilter, levelFilter, weekStart, weekEnd]);

  /* =========================
     WEEK NAV
  ========================= */

  const prevWeek = () => {
    setCurrentWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() - 7);

      if (startOfDay(next) < startOfDay(new Date())) {
        return prev;
      }

      return next;
    });
  };

  const nextWeek = () => {
    setCurrentWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 7);
      return next;
    });
  };

  /* =========================
     LOADING STATE
  ========================= */
if (loading) {
  return (
    <div className="container mx-auto max-w-[1400px] bg-background px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-28 pb-14 sm:pb-20">
      
      {/* HEADER SKELETON */}
      <div className="space-y-4 mb-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* MAIN SKELETON */}
      <SessionsSkeleton />
      
    </div>
  );
}

return (
  <div className="container mx-auto max-w-[1400px] bg-background px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-28 pb-14 sm:pb-20">

    {/* HEADER */}
    <h1 className="h1 mb-4 sm:mb-6">
      Book a <span className="text-primary">Session.</span>
    </h1>

    <p className="body text-muted mb-8 sm:mb-10">
      Choose from match play or professional coaching sessions
    </p>

    {/* WEEK NAV */}
    <div className="flex items-center justify-between mb-8 sm:mb-10 bg-white rounded-xl shadow-md px-5 sm:px-6 py-4 sm:py-5">
      <button
        onClick={prevWeek}
        disabled={startOfDay(weekStart) <= startOfDay(new Date())}
        className="p-2 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <img src="/images/icons/left-icon.svg" alt="" />
      </button>

      <div className="flex flex-col items-center text-center">
        <span className="text-xs sm:text-sm text-black/50">Week of</span>
        <span className="font-semibold text-black text-base sm:text-lg md:text-xl">
          {formatDate(weekStart)} - {formatDate(weekEnd)}
        </span>
      </div>

      <button
        onClick={nextWeek}
        className="p-2 transition hover:opacity-80 active:scale-95"
      >
        <img src="/images/icons/right-icon.svg" alt="" />
      </button>
    </div>

    {/* FILTERS */}
   {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <div className="flex items-center gap-3 mb-6">
          <img className="w-6 h-6" src="/images/icons/filter-icon.svg" />
          <h4 className="text-lg font-semibold text-gray-800">
            Filter Sessions
          </h4>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Session Type */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-sm font-semibold text-gray-500">
              Session Type
            </span>
            <div className="flex flex-wrap gap-3">
              {["All", "Match Play", "Coaching"].map((type) => (
                <button
                  key={type}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    typeFilter === type
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  }`}
                  onClick={() =>
                    setTypeFilter(type as "All" | "Coaching" | "Match Play")
                  }
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="text-sm font-semibold text-gray-500">
              Skill Level
            </span>
            <div className="flex flex-wrap gap-3">
              {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    levelFilter === level
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                  }`}
                  onClick={() =>
                    setLevelFilter(
                      level as "All" | "Beginner" | "Intermediate" | "Advanced",
                    )
                  }
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    {/* SESSIONS */}
    {Object.entries(
      visibleSessions.reduce((acc, s) => {
        const day = new Date(s.date).toLocaleDateString(undefined, {
          weekday: "long",
        });
        if (!acc[day]) acc[day] = [];
        acc[day].push(s);
        return acc;
      }, {} as Record<string, Session[]>)
    ).map(([day, daySessions]) => (
      <div key={day} className="mb-10 sm:mb-12">

        <h3 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6 border-b border-gray-200 pb-2">
          {day}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

          {daySessions.map((session) => {
            const spotsLeft = session.capacity - session.bookings.length;

            return (
              <div
                key={session.id}
                className="flex flex-col rounded-2xl shadow-lg bg-white overflow-hidden"
              >
                <div className="bg-primary h-1.5 w-full" />

                <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">

                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold text-base sm:text-lg text-black">
                      {session.template.level} {session.template.type}
                    </h4>
                  </div>

                  <div className="text-sm text-muted space-y-2">
                    <p>{new Date(session.date).toLocaleDateString()}</p>
                    <p>Coach: {session.template.coach || "N/A"}</p>
                    <p>
                      {spotsLeft} / {session.capacity} spots
                    </p>
                  </div>

                  <div className="mt-auto flex justify-between items-center pt-4 border-t">
                    <span className="font-bold">£{session.template.price}</span>

                    <button
                      onClick={() => navigate(`/sessions/${session.id}`)}
                      disabled={spotsLeft <= 0}
                      className="px-4 py-2 rounded-md text-white bg-primary disabled:bg-gray-300"
                    >
                      {spotsLeft > 0 ? "View" : "Full"}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    ))}

  </div>
);
};

export default SessionsPage;