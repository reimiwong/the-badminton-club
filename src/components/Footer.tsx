const navClass = "flex flex-col gap-3";
const h2Class = "text-surface font-semibold text-base md:text-lg";
const ulClass = "text-[#9CA3AF] flex flex-col gap-1";
const contactRowClass = "flex items-center gap-2";

export default function Footer() {
  return (
    <footer className="bg-text px-6 py-8">
      {/* Main footer content */}
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12 max-w-7xl mx-auto">

        {/* Brand / Description */}
        <div className={`${navClass} md:max-w-sm`}>
          <h2 className={h2Class}>The Badminton Club</h2>
          <p className="text-[#9CA3AF] leading-relaxed">
            Building a vibrant badminton community through training,
            competition, and fun.
          </p>

          {/* Social icons */}
          <div className="flex gap-3 mt-2">
            <img src="./facebook-icon.svg" alt="Facebook" />
            <img src="./instagram-icon.svg" alt="Instagram" />
            <img src="./twitter-icon.svg" alt="Twitter / X" />
          </div>
        </div>

        {/* Quick Links */}
        <nav aria-labelledby="footer-links" className={navClass}>
          <h2 id="footer-links" className={h2Class}>
            Quick Links
          </h2>
          <ul className={ulClass}>
            <li><a href="/about">About Us</a></li>
            <li><a href="/coaches">Our Coaches</a></li>
            <li><a href="/news">News &amp; Updates</a></li>
            <li><a href="/membership">Membership</a></li>
          </ul>
        </nav>

        {/* Training */}
        <nav aria-labelledby="training-links" className={navClass}>
          <h2 id="training-links" className={h2Class}>
            Training
          </h2>
          <ul className={ulClass}>
            <li><a href="/book-session">Book a Session</a></li>
            <li><a href="/private-coaching">Private Coaching</a></li>
            <li><a href="/group-classes">Group Classes</a></li>
            <li><a href="/tournament-prep">Tournament Prep</a></li>
          </ul>
        </nav>

        {/* Contact */}
        <div className={navClass}>
          <h2 className={h2Class}>Contact</h2>
          <ul className={ulClass}>
            <li>
              <div className={contactRowClass}>
                <img src="./location-icon.svg" alt="Location" />
                <span>123 Sports Complex, Edinburgh, Scotland</span>
              </div>
            </li>
            <li>
              <div className={contactRowClass}>
                <img src="./phone-icon.svg" alt="Phone" />
                <span>+353 1 234 5678</span>
              </div>
            </li>
            <li>
              <div className={contactRowClass}>
                <img src="./email-icon.svg" alt="Email" />
                <span>hello@thebadmintonclub.com</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-t border-[#9CA3AF]/30 max-w-7xl mx-auto" />

      {/* Copyright */}
      <div className="flex justify-center items-center">
        <p className="text-[#9CA3AF] text-center">
          © 2026 Shamrock Badminton Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}