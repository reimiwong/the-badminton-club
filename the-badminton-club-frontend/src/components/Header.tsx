// src/components/Header.tsx
import { NavLink, useNavigate, type NavLinkRenderProps } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import SignInModal from "./SignInModal";
import { useAuth } from "../context/AuthContext";

const buttonClass =
  "px-5 py-2.5 bg-primary text-surface rounded-xl font-medium transition-all duration-200 ease-out hover:opacity-90 hover:-translate-y-0.5 active:scale-95";

const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
  `
    relative transition-all duration-200 ease-out
    hover:-translate-y-0.5 hover:text-primary
    after:content-['']
    after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-primary
    after:transition-all after:duration-200
    ${isActive ? "text-primary font-medium after:w-full" : "text-muted after:w-0"}
  `;

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/sessions", label: "Sessions" },
  { to: "/team", label: "Team" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setUserOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-surface transition-all duration-300 ease-out ${
          scrolled ? "shadow-md py-2 bg-surface/95 backdrop-blur" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <NavLink
            to="/"
            className="h3 text-text transition-all duration-200 hover:text-primary hover:-translate-y-0.5"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
          >
            The Badminton Club
          </NavLink>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            {!isAuthenticated && (
              <div className="flex items-center gap-6 ml-4">
                <button
                  className="text-muted font-bold text-md hover:underline"
                  onClick={() => setSignInOpen(true)}
                >
                  Sign in
                </button>
                <button
                  className={buttonClass}
                  onClick={() => setSignInOpen(true)}
                >
                  Book Now
                </button>
              </div>
            )}

            {isAuthenticated && user && (
              <div className="relative" ref={userRef}>
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
                  onClick={() => setUserOpen(!userOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                    {user.username[0].toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-800">
                    {user.username}
                  </span>
                </button>

                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl py-2 flex flex-col z-50
                    transition-all duration-200 ease-out origin-top
                    ${
                      userOpen
                        ? "scale-100 opacity-100"
                        : "scale-95 opacity-0 pointer-events-none"
                    }`}
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="font-semibold text-sm">{user.username}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>

                  <NavLink
                    to="/my-sessions"
                    className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-muted text-sm"
                  >
                    <img
                      className="h-4 w-4"
                      src="/images/icons/gray-calendar-icon.svg"
                    />
                    My Sessions
                  </NavLink>

                  <button
                    className="flex gap-2 px-4 py-2 text-[#D32F2F] hover:bg-red-50 text-left text-sm cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <img
                      className="h-4 w-4"
                      src="/images/icons/log-out-icon.svg"
                    />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* MOBILE NAV */}
       
<nav
  className={`md:hidden flex flex-col transition-all duration-300 ease-out overflow-hidden ${
    open ? "max-h-[1000px] py-4 opacity-100" : "max-h-0 opacity-0 py-0"
  }`}
>
  <div className="flex flex-col gap-1 px-6">
    {navItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={() => setOpen(false)}
        className="px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2 text-muted"
      >
        {item.label}
      </NavLink>
    ))}

    {/* LOGGED OUT */}
    {!isAuthenticated && (
      <div className="flex flex-col gap-2 mt-3">
        <button
          className="text-muted font-bold text-sm hover:underline text-left px-4"
          onClick={() => setSignInOpen(true)}
        >
          Sign in
        </button>
        <button
          className={`${buttonClass} mx-4`}
          onClick={() => setSignInOpen(true)}
        >
          Book Now
        </button>
      </div>
    )}

    {/* ✅ LOGGED IN */}
    {isAuthenticated && user && (
      <div className="mt-4 border-t border-gray-200 pt-4 flex flex-col gap-2">
        {/* User summary */}
        <div className="flex items-center gap-3 px-4 pb-2">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
            {user.username[0].toUpperCase()}
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user.username}</span>
            <span className="text-muted text-xs">{user.email}</span>
          </div>
        </div>

        {/* My Sessions */}
        <NavLink
          to="/my-sessions"
          onClick={() => setOpen(false)}
          className="px-4 py-2 flex items-center gap-3 text-sm hover:bg-gray-100 text-muted"
        >
          <img
            className="h-4 w-4"
            src="/images/icons/gray-calendar-icon.svg"
          />
          My Sessions
        </NavLink>

        {/* Sign Out */}
        <button
          onClick={() => {
            handleSignOut();
            setOpen(false);
          }}
          className="px-4 py-2 flex items-center gap-3 text-sm text-red-600 hover:bg-red-50 text-left"
        >
          <img
            className="h-4 w-4"
            src="/images/icons/log-out-icon.svg"
          />
          Sign Out
        </button>
      </div>
    )}
  </div>
</nav>

      </header>

      {/* SIGN-IN MODAL */}
      <SignInModal
        isOpen={signInOpen && !isAuthenticated}
        onClose={() => setSignInOpen(false)}
      />
    </>
  );
}