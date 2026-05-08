import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import { useEffect, useState } from "react";

const buttonClass =
  "px-4 py-2 bg-primary text-white rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

const mobileButtonClass =
  "px-4 py-2 bg-primary text-white text-center rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

const navLinkClass = ({ isActive }: NavLinkRenderProps) =>
  `relative transition-all duration-200 ease-out hover:-translate-y-0.5
   after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]
   after:bg-primary after:transition-all after:duration-200
   ${
     isActive
       ? "text-primary font-medium after:w-full"
       : "text-muted hover:text-primary after:w-0"
   }`;

const burgerNavLinkClass = ({ isActive }: NavLinkRenderProps) =>
  `transition-all duration-200 ease-out
   ${
     isActive
       ? "text-primary font-medium translate-x-1"
       : "text-muted hover:text-primary hover:translate-x-1"
   }`;

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/booking", label: "Booking" },
  { to: "/team", label: "Team" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50
        bg-surface
        transition-all duration-300 ease-out
        ${scrolled
          ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md bg-white/90 py-2"
          : "shadow-none py-3"
        }
      `}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-6 md:px-8 max-w-7xl mx-auto transition-all duration-300">

        {/* Logo */}
        <NavLink
          to="/"
          className="font-bold text-lg flex-shrink-0 transition-all duration-200 ease-out hover:text-primary hover:-translate-y-0.5"
          end
        >
          The Badminton Club
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 flex-shrink-0">
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

          <NavLink to="/booking" className={buttonClass}>
            Book Now
          </NavLink>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl cursor-pointer select-none transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        className={`md:hidden flex flex-col gap-4 transition-all duration-500 ease-in-out ${
          open
            ? "max-h-96 opacity-100 px-5 pb-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={closeMenu}
            className={burgerNavLinkClass}
          >
            {item.label}
          </NavLink>
        ))}

        <NavLink
          to="/booking"
          className={mobileButtonClass}
          onClick={closeMenu}
        >
          Book Now
        </NavLink>
      </nav>
    </header>
  );
}