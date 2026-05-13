import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-text text-surface">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex flex-col gap-3 md:max-w-sm">
            <h2 className="h3">The Badminton Club</h2>

            <p className="body muted leading-relaxed">
              Building a vibrant badminton community through training,
              competition, and fun.
            </p>

            <div className="flex gap-3 mt-2">
              {["facebook", "instagram", "twitter"].map((icon) => (
                <a
                  key={icon}
                  href={`https://${icon}.com`}
                  className="transition-transform duration-200 hover:-translate-y-1 hover:scale-110 "
                >
                  <img src={`/images/icons/${icon}-icon.svg`} alt={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <nav className="flex flex-col gap-3">
            <h2 className="h3">Quick Links</h2>

            <ul className="flex flex-col gap-2 text-muted">
              {[
                ["About Us", "/about"],
                ["The Team", "/team"],
                ["News & Updates", "/news"],
                ["Membership", "/membership"],
              ].map(([label, href]) => (
                <li key={href}>
                  <NavLink
                    to={href}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* TRAINING */}
          <nav className="flex flex-col gap-3">
            <h2 className="h3">Training</h2>

            <ul className="flex flex-col gap-2 text-muted">
              {[
                ["Book a Session", "/booking"],
                ["Private Coaching", "/private-coaching"],
                ["Group Classes", "/group-classes"],
                ["Tournament Prep", "/tournament-prep"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACT */}
          <div className="flex flex-col gap-3">
            <h2 className="h3">Contact</h2>

            <ul className="flex flex-col gap-2 text-muted">
              <li className="flex items-center gap-2">
                <img src="images/icons/location-icon.svg" />
                <span>Edinburgh</span>
              </li>

              <li className="flex items-center gap-2">
                <img src="images/icons/phone-icon.svg" />
                <span>+353 1234 5678</span>
              </li>

              <li className="flex items-center gap-2">
                <img src="images/icons/email-icon.svg" />
                <span>hello@shamrock.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="border-border/30 max-w-7xl mx-auto" />

      <p className="py-6 text-muted text-center text-sm">
        © 2026 Shamrock Badminton
      </p>
    </footer>
  );
}
