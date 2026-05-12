import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

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
const todayWeekStart = useMemo(() => {
  const today = new Date();
  return getWeekRange(today)[0];
}, []);
  const [weekStart, weekEnd] = useMemo(
    () => getWeekRange(currentWeekStart),
    [currentWeekStart],
  );

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, { month: "short", day: "numeric" });

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

    // BLOCK going before current week
    if (startOfDay(next) < startOfDay(todayWeekStart)) {
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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-28 pb-14 sm:pb-20">
        {/* HERO */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-primary font-semibold text-sm uppercase tracking-wide">
              Live Booking
            </p>
          </div>

          <h1 className="h1 leading-tight mb-3">
            Book your <span className="text-primary">next session</span>
          </h1>

          <p className="text-xl text-muted max-w-xl">
            Coaching and match play sessions updated weekly. Secure your spot
            before they fill.
          </p>
        </div>

        {/* CONTROL PANEL */}
        <div className="relative mb-10 sm:mb-12">
          {/* glowing background accent */}
          <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-3xl" />

          <div className="relative bg-surface border border-border rounded-3xl p-4 sm:p-6">
            {/* WEEK NAV */}
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={prevWeek}
             disabled={startOfDay(weekStart) <= startOfDay(todayWeekStart)}
                className="p-2 rounded-xl hover:bg-background transition disabled:opacity-30"
              >
                <img src="/images/icons/left-icon.svg" alt="" />
              </button>

              <div className="text-center">
                <p className="text-xs text-muted">Week schedule</p>
                <p className="font-semibold text-text text-lg sm:text-xl">
                  {formatDate(weekStart)} → {formatDate(weekEnd)}
                </p>
              </div>

              <button
                onClick={nextWeek}
                className="p-2 rounded-xl hover:bg-background transition"
              >
                <img src="/images/icons/right-icon.svg" alt="" />
              </button>
            </div>

            {/* FILTERS */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  {/* SESSION TYPE */}
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted font-medium">Session type</span>

    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {["All", "Match Play", "Coaching"].map((type) => (
        <button
          key={type}
          onClick={() =>
            setTypeFilter(type as "All" | "Coaching" | "Match Play")
          }
          className={`whitespace-nowrap px-3 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200
            ${
              typeFilter === type
                ? "bg-primary text-white shadow-sm"
                : "bg-primary/10 text-text hover:bg-primary/20"
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>
  </div>

  {/* SESSION LEVEL */}
  <div className="flex flex-col gap-1">
    <span className="text-xs text-muted font-medium">Session level</span>

    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
        <button
          key={level}
          onClick={() =>
            setLevelFilter(
              level as "All" | "Beginner" | "Intermediate" | "Advanced"
            )
          }
          className={`whitespace-nowrap px-3 py-1.5 text-xs md:text-sm font-medium rounded-full transition-all duration-200
            ${
              levelFilter === level
                ? "bg-primary text-white shadow-sm"
                : "bg-primary/10 text-text hover:bg-primary/20"
            }
          `}
        >
          {level}
        </button>
      ))}
    </div>
  </div>



</div>
          </div>
        </div>

        {/* SESSIONS */}
        {Object.entries(
          visibleSessions.reduce(
            (acc, s) => {
              const day = new Date(s.date).toLocaleDateString(undefined, {
                weekday: "long",
              });
              if (!acc[day]) acc[day] = [];
              acc[day].push(s);
              return acc;
            },
            {} as Record<string, Session[]>,
          ),
        ).map(([day, daySessions]) => (
          <div key={day} className="mb-14">
            {/* DAY HEADER */}
            <div className="flex items-center gap-4 mb-6">
              <h3 className="text-xl font-semibold text-text whitespace-nowrap">
                {day}
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {daySessions.map((session) => {
                const spotsLeft = session.capacity - session.bookings.length;

                return (
                  <div
                    key={session.id}
                    className="group relative rounded-2xl overflow-hidden border border-border bg-surface hover:border-primary/40 transition"
                  >
                    {/* top glow accent */}
                    <div className="h-1.5 w-full bg-primary " />

                    <div className="p-5 sm:p-6 flex flex-col gap-4">
                      {/* title */}
                      <div>
                        <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                          {session.template.type}
                        </p>

                        <h4 className="text-lg font-semibold text-text mt-1">
                          {session.template.level} Session
                        </h4>
                      </div>

                      {/* details */}
                      <div className="text-sm text-muted space-y-1">
                        <p>{new Date(session.date).toLocaleDateString()}</p>
                        <p>Coach: {session.template.coach || "TBA"}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="h-2 flex-1 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${(spotsLeft / session.capacity) * 100}%`,
                              }}
                            />
                          </div>

                          <span className="text-xs font-medium">
                            {spotsLeft}/{session.capacity}
                          </span>
                        </div>
                      </div>

                      {/* footer */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xl font-semibold text-text">
                          £{session.template.price}
                        </span>

                        <button
                          onClick={() => navigate(`/sessions/${session.id}`)}
                          disabled={spotsLeft <= 0}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                            spotsLeft > 0
                              ? "bg-primary text-white hover:scale-[1.02]"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {spotsLeft > 0 ? "Book" : "Full"}
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
    </div>
  );
};

export default SessionsPage;
