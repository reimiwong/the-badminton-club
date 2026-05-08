const navClass = "flex flex-col gap-3";
const h2Class = "text-surface font-semibold text-base md:text-lg";
const ulClass = "text-[#9CA3AF] flex flex-col gap-1";
const contactRowClass = "flex items-center gap-2";
const footerLinkClass =
  "transition-colors duration-200 ease-out hover:text-primary";

export default function Footer() {
  return (
    <footer className="bg-text py-8">
      {/* CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-12">
          {/* Brand / Description */}
          <div className={`${navClass} md:max-w-xs`}>
            <h2 className={h2Class}>The Badminton Club</h2>
            <p className="text-[#9CA3AF] leading-relaxed">
              Building a vibrant badminton community through training,
              competition, and fun.
            </p>

        <div className="flex gap-3 mt-2">

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
    aria-label="Facebook"
  >
    <img src="/images/icons/facebook-icon.svg" alt="Facebook" />
  </a>

  <a
    href="https://instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
    aria-label="Instagram"
  >
    <img src="/images/icons/instagram-icon.svg" alt="Instagram" />
  </a>

  <a
    href="https://twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="transition-transform duration-200 hover:-translate-y-1 hover:scale-110"
    aria-label="Twitter"
  >
    <img src="/images/icons/twitter-icon.svg" alt="Twitter / X" />
  </a>

</div>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-links" className={navClass}>
            <h2 id="footer-links" className={h2Class}>
              Quick Links
            </h2>
            <ul className={ulClass}>
              <li>
                <a href="/about" className={footerLinkClass}>
                  About Us
                </a>
              </li>
              <li>
                <a href="/coaches" className={footerLinkClass}>
                  Our Coaches
                </a>
              </li>
              <li>
                <a href="/news" className={footerLinkClass}>
                  News & Updates
                </a>
              </li>
              <li>
                <a href="/membership" className={footerLinkClass}>
                  Membership
                </a>
              </li>
            </ul>
          </nav>

          {/* Training */}
          <nav aria-labelledby="training-links" className={navClass}>
            <h2 id="training-links" className={h2Class}>
              Training
            </h2>
            <ul className={ulClass}>
              <li>
                <a href="/book-session" className={footerLinkClass}>
                  Book a Session
                </a>
              </li>
              <li>
                <a href="/private-coaching" className={footerLinkClass}>
                  Private Coaching
                </a>
              </li>
              <li>
                <a href="/group-classes" className={footerLinkClass}>
                  Group Classes
                </a>
              </li>
              <li>
                <a href="/tournament-prep" className={footerLinkClass}>
                  Tournament Prep
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className={navClass}>
            <h2 className={h2Class}>Contact</h2>
            <ul className={ulClass}>
              <li>
                <div className={contactRowClass}>
                  <img src="images/icons/location-icon.svg" alt="Location" />
                  <span>123 Sports Complex, Edinburgh, Scotland</span>
                </div>
              </li>
              <li>
                <div className={contactRowClass}>
                  <img src="images/icons/phone-icon.svg" alt="Phone" />
                  <span>+353 1234 5678</span>
                </div>
              </li>
              <li>
                <div className={contactRowClass}>
                  <img src="images/icons/email-icon.svg" alt="Email" />
                  <span>hello@thebadmintonclub.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 border-t border-[#9CA3AF]/30 max-w-7xl mx-auto" />

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[#9CA3AF] text-center">
          © 2026 The Badminton Club. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
