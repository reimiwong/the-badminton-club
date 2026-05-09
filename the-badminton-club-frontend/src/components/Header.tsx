import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import { useEffect, useState } from "react";

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

const mobileNavLinkClass = ({ isActive }: NavLinkRenderProps) =>
  `
    transition-all duration-200 ease-out
    hover:translate-x-1 hover:text-primary
    ${isActive ? "text-primary font-medium translate-x-1" : "text-muted"}
  `;

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/session", label: "Sessions" },
  { to: "/team", label: "Team" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 bg-surface
        transition-all duration-300 ease-out
        ${scrolled
          ? "shadow-md py-2 bg-surface/95 backdrop-blur"
          : "py-4"
        }
      `}
    >

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LOGO */}
       <NavLink
  to="/"
  className="h3 text-text transition-all duration-200 hover:text-primary hover:-translate-y-0.5"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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

          <NavLink to="/session" className={buttonClass}>
            Book Now
          </NavLink>

        </nav>

        {/* MOBILE BUTTON */}
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
        className={`
          md:hidden flex flex-col gap-4 px-6
          transition-all duration-300 ease-out overflow-hidden
          ${open ? "max-h-96 py-4 opacity-100" : "max-h-0 opacity-0 py-0"}
        `}
      >

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={mobileNavLinkClass}
          >
            {item.label}
          </NavLink>
        ))}

        <NavLink
          to="/booking"
          className={buttonClass}
          onClick={() => setOpen(false)}
        >
          Book Now
        </NavLink>

      </nav>

    </header>
  );
}