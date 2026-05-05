import { NavLink } from "react-router-dom";
import { useState } from "react";

const buttonClass =
  "px-4 py-2 bg-primary text-white text-base rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

const mobileButtonClass =
  "px-4 py-2 bg-primary text-white text-base text-center rounded-xl transition-all duration-200 ease-out hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-95";

const navLinkClass =
  "relative text-base text-muted transition-all duration-200 ease-out hover:text-primary hover:-translate-y-0.5 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-200 hover:after:w-full";

const burgerNavLinkClass =
  "text-base text-muted transition-all duration-200 ease-out hover:text-primary hover:translate-x-1 hover:font-medium";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/booking", label: "Booking" },
  { to: "/coaches", label: "Coaches" },
  { to: "/news", label: "News" },
  { to: "/membership", label: "Membership" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-surface">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 sm:px-6 md:px-8 py-3 max-w-7xl mx-auto">
        
        {/* Logo */}
        <a className="font-bold text-lg flex-shrink-0 transition-all duration-200 ease-out hover:text-primary hover:-translate-y-0.5 cursor-pointer">
          The Badminton Club
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 flex-shrink-0">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
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
        >
          ☰
        </button>
      </div>

      {/* Mobile nav */}
      <nav
        className={`md:hidden flex flex-col gap-4 text-muted transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100 px-5 pb-4" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
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