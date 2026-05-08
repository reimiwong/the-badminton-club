export default function ContactUs() {
  return (
    <section className="bg-white">

      {/* HERO */}
      <div className="text-center pt-20 pb-16 bg-[#F7FAF8] px-6">
        <h1 className="text-5xl font-bold">
          Get in <span className="text-primary">Touch</span>
        </h1>

        <p className="mt-4 text-muted text-lg max-w-2xl mx-auto">
          Have questions? Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      {/* MAIN */}
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* CONTACT INFO */}
          <div>
            <h2 className="text-3xl font-bold">Contact Information</h2>

            <p className="mt-3 text-muted">
              Visit us, call us, or email us anytime.
            </p>

            <div className="mt-8 space-y-6">

              {/* ITEM */}
              <div className="flex gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <img src="/images/icons/green-location-icon.svg" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted">My Basement, Edinburgh</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <img src="/images/icons//green-phone-icon.svg" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-muted">+353 1234 5678</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <img src="/images/icons/green-email-icon.svg" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted">hello@thebadmintonclub.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* FORM */}
         <form className="rounded-2xl shadow-lg p-8 space-y-5 bg-white border border-black/5">

  <h3 className="text-2xl font-bold">Send a Message</h3>

  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <label className="text-sm font-medium">Name</label>
      <input
        className="w-full mt-1 px-4 py-3 rounded-lg bg-[#F7FAF8] border border-black/10 outline-none focus:ring-2 focus:ring-primary"
        placeholder="John Doe"
      />
    </div>

    <div>
      <label className="text-sm font-medium">Email</label>
      <input
        className="w-full mt-1 px-4 py-3 rounded-lg bg-[#F7FAF8] border border-black/10 outline-none focus:ring-2 focus:ring-primary"
        placeholder="john@example.com"
      />
    </div>

  </div>

  <div>
    <label className="text-sm font-medium">Subject</label>
    <select className="w-full mt-1 px-4 py-3 rounded-lg bg-[#F7FAF8] border border-black/10 outline-none focus:ring-2 focus:ring-primary">
      <option>Select a topic</option>
      <option>Membership</option>
      <option>Coaching</option>
      <option>Booking</option>
      <option>Other</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium">Message</label>
    <textarea
      className="w-full mt-1 px-4 py-3 h-32 rounded-lg bg-[#F7FAF8] border border-black/10 outline-none focus:ring-2 focus:ring-primary resize-none"
      placeholder="Tell us how we can help..."
    />
  </div>

  <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition">
    Send Message
  </button>

</form>

        </div>
      </div>

      {/* MAP */}
      <div className="bg-[#F7FAF8] py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="relative rounded-3xl overflow-hidden shadow-lg">

            <div className="h-[500px]">
              <iframe
                title="Map"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Ravelston%20Terrace%20Edinburgh&output=embed"
              />
            </div>

            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

              <div>
                <p className="text-sm text-muted">Visit us</p>
                <p className="font-semibold">
                  Ravelston Terrace, Edinburgh
                </p>
              </div>

              <a
                href="https://www.google.com/maps?q=Ravelston+Terrace+Edinburgh"
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white px-5 py-2 rounded-xl hover:opacity-90 transition"
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