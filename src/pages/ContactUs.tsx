export default function ContactUs() {
  return (
    <section className="bg-white min-h-screen flex flex-col">
      {/* HERO */}
      <div className="flex flex-col items-center text-center pt-16 pb-20 bg-[#F7FAF8]">
        <h1 className="text-5xl font-bold">
          Get in <span className="text-primary">Touch</span>
        </h1>

        <h3 className="mt-3 text-muted text-xl max-w-3xl">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </h3>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex justify-center pt-16 flex-1">
        <div
          className="
            flex flex-col md:flex-row
            w-full max-w-5xl
            pb-16
            items-start
            gap-10 md:gap-6
            px-6
          "
        >
          {/* CONTACT INFO */}
          <div className="w-full md:w-1/2">
            <h2 className="font-bold text-3xl">Contact Information</h2>

            <p className="pt-3 text-base text-muted">
              Visit us, call us, or drop us an email. We're here to help with any questions about our club, facilities, or programs.
            </p>

            {/* LOCATION */}
            <div className="grid grid-cols-[auto_1fr] gap-3 mt-6">
              <div className="bg-primary/10 p-3 rounded-xl h-fit">
                <img src="/green-location-icon.svg" alt="location" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-muted">My Basement</p>
                <p className="text-muted">Edinburgh, EDY 123</p>
                <p className="text-muted">Scotland</p>
              </div>
            </div>

            {/* PHONE */}
            <div className="grid grid-cols-[auto_1fr] gap-3 mt-5">
              <div className="bg-primary/10 p-3 rounded-xl h-fit">
                <img src="/green-phone-icon.svg" alt="phone" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-muted">+353 1234 5678</p>
                <p className="text-muted">Mon–Fri 9:00–18:00</p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="grid grid-cols-[auto_1fr] gap-3 mt-5">
              <div className="bg-primary/10 p-3 rounded-xl h-fit">
                <img src="/green-email-icon.svg" alt="email" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-muted">hello@thebadmintonclub.com</p>
                <p className="text-muted">info@thebadmintonclub.com</p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form
            className="
              bg-[#F7FAF8]
              flex flex-col
              gap-4
              p-6
              rounded-xl
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              w-full md:w-1/2
            "
          >
            <h4 className="text-2xl font-bold">Send us a Message</h4>

            {/* NAME + EMAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Your Name</label>
                <div className="border border-black/10 bg-white rounded-lg px-4 py-3 mt-1 focus-within:ring-2 focus-within:ring-primary transition-all">
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="outline-none w-full bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <div className="border border-black/10 bg-white rounded-lg px-4 py-3 mt-1 focus-within:ring-2 focus-within:ring-primary transition-all">
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="outline-none w-full bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* SUBJECT */}
            <div>
              <label className="text-sm font-medium">Subject</label>
              <div className="border border-black/10 bg-white rounded-lg px-4 py-3 mt-1 focus-within:ring-2 focus-within:ring-primary transition-all">
                <select className="outline-none w-full bg-transparent">
                  <option value="">Select a topic</option>
                  <option value="membership">Membership inquiry</option>
                  <option value="coaching">Coaching information</option>
                  <option value="booking">Booking support</option>
                  <option value="tournament">Tournament information</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="text-sm font-medium">Message</label>
              <div className="border border-black/10 bg-white rounded-lg px-4 py-3 mt-1 focus-within:ring-2 focus-within:ring-primary transition-all">
                <textarea
                  placeholder="Tell us how we can help you..."
                  className="outline-none w-full h-32 resize-none bg-transparent"
                />
              </div>
            </div>

            {/* BUTTON */}
            <button className="bg-primary text-white py-2 rounded-lg hover:opacity-90">
              Send Message
            </button>
          </form>
        </div>
        
      </div>

      {/* FIND US SECTION */}
{/* FIND US SECTION */}
{/* FIND US SECTION */}
<div className="bg-[#F7FAF8] mt-16 py-20 px-6 flex justify-center">
  <div className="w-full max-w-6xl">

    <div className="relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

      {/* MAP (PRIMARY FOCUS) */}
      <div className="h-[520px] w-full">
        <iframe
          title="Map"
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Sports%20Complex%20Drive%20Dublin%204%20Ireland&output=embed"
        />
      </div>

      {/* OVERLAY INFO */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        <div>
          <p className="text-sm text-muted">Visit us at</p>
          <p className="text-lg font-semibold text-text">
            123 Sports Complex Drive, Dublin 4, Ireland
          </p>
        </div>

        <a
          href="https://www.google.com/maps?q=Sports%20Complex%20Drive%20Dublin%204%20Ireland"
          target="_blank"
          rel="noreferrer"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
        >
          Open in Google Maps
        </a>

      </div>

    </div>

  </div>
</div>
    </section>
  );
}