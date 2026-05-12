export default function ContactUs() {
  return (
    <section className="bg-surface w-full">

      {/* =========================
          HERO
      ========================= */}
      <div className="bg-background px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 text-center">

        <h1 className="h1 text-4xl sm:text-5xl lg:text-6xl">
          Get in <span className="text-primary">Touch</span>
        </h1>

        <p className="mt-5 mx-auto max-w-2xl text-body text-muted sm:text-body-lg">
          Have questions? Send us a message and we’ll respond as soon as possible.
        </p>

      </div>

      {/* =========================
          MAIN
      ========================= */}
      <div className="px-5 sm:px-6 py-14 sm:py-20 lg:py-24">

        <div className="mx-auto grid max-w-6xl gap-10 lg:gap-14 lg:grid-cols-2 items-start">

          {/* LEFT */}
          <div>

            <div className="max-w-md">

              <h2 className="h2">
                Contact Information
              </h2>

              <p className="mt-4 text-body text-muted">
                Visit us, call us, or email us anytime. We’re always happy to help new and existing members.
              </p>

            </div>

            {/* CONTACT CARDS */}
            <div className="mt-10 space-y-4 sm:space-y-5">

              {[
                {
                  title: "Location",
                  text: "My Basement, Edinburgh",
                  icon: "/images/icons/green-location-icon.svg",
                },
                {
                  title: "Phone",
                  text: "+353 1234 5678",
                  icon: "/images/icons/green-phone-icon.svg",
                },
                {
                  title: "Email",
                  text: "hello@shamrock.com",
                  icon: "/images/icons/green-email-icon.svg",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    group flex items-start gap-4
                    rounded-2xl
                    border border-border
                    bg-background
                    p-5
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >

                  <div className="rounded-xl bg-primary/10 p-3 transition group-hover:bg-primary/15">

                    <img src={item.icon} alt="" className="w-6 h-6" />

                  </div>

                  <div>

                    <p className="h3">
                      {item.title}
                    </p>

                    <p className="mt-1 text-body text-muted">
                      {item.text}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* SOCIALS */}
            <div className="mt-10">

              <div className="flex items-center gap-3 mb-4">

                <div className="w-8 h-px bg-primary/40" />

                <p className="label text-muted">
                  Follow us
                </p>

              </div>

              <div className="flex items-center gap-3 flex-wrap">

                {["facebook", "instagram", "twitter"].map((icon) => (
                  <a
                    key={icon}
                    href={`https://${icon}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group relative
                      flex items-center justify-center
                      w-11 h-11
                      rounded-2xl
                      border border-border
                      bg-background
                      shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-primary/30
                      hover:shadow-md
                    "
                  >

                    <div className="absolute inset-0 rounded-2xl bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition" />

                    <img
                      src={`/images/icons/${icon}-icon.svg`}
                      alt={icon}
                      className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    />

                  </a>
                ))}

              </div>

            </div>

          </div>

          {/* FORM */}
          <form className="rounded-3xl border border-border bg-surface p-5 sm:p-6 lg:p-8 shadow-lg">

            <div className="mb-6 sm:mb-8">

              <h3 className="h2">
                Send a Message
              </h3>

              <p className="mt-2 text-body text-muted">
                Fill out the form below and we’ll get back to you shortly.
              </p>

            </div>

            {/* GRID */}
            <div className="grid gap-5 md:grid-cols-2">

              {["Name", "Email"].map((label) => (
                <div key={label}>

                  <label className="label text-text">
                    {label}
                  </label>

                  <input
                    className="
                      mt-2 w-full
                      rounded-xl
                      border border-border
                      bg-background
                      px-4 py-3
                      text-body
                      outline-none
                      focus:border-primary
                      focus:ring-4
                      focus:ring-primary/10
                    "
                    placeholder={label === "Email" ? "john@example.com" : "John Doe"}
                  />

                </div>
              ))}

            </div>

            {/* SUBJECT */}
            <div className="mt-5">

              <label className="label text-text">
                Subject
              </label>

              <select className="
                mt-2 w-full
                rounded-xl
                border border-border
                bg-background
                px-4 py-3
                text-body
                text-muted
                outline-none
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              ">

                <option>Select a topic</option>
                <option>Membership</option>
                <option>Coaching</option>
                <option>Booking</option>
                <option>Other</option>

              </select>

            </div>

            {/* MESSAGE */}
            <div className="mt-5">

              <label className="label text-text">
                Message
              </label>

              <textarea
                className="
                  mt-2 h-36 w-full resize-none
                  rounded-xl
                  border border-border
                  bg-background
                  px-4 py-3
                  text-body
                  outline-none
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/10
                "
                placeholder="Tell us how we can help..."
              />

            </div>

            {/* BUTTON */}
            <button
              className="
                mt-6 w-full
                flex items-center justify-center gap-2
                rounded-xl
                bg-primary
                px-5 py-3.5
                font-semibold text-white
                transition
                hover:-translate-y-0.5
                hover:shadow-lg
                active:scale-[0.985]
              "
            >
              Send Message

              <img
                src="/images/icons/right-arrow-icon.svg"
                alt=""
                className="w-4 h-4"
              />

            </button>

          </form>

        </div>

      </div>

      {/* =========================
          MAP
      ========================= */}
      <div className="bg-background px-5 sm:px-6 py-14 sm:py-20 lg:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="overflow-hidden rounded-3xl shadow-lg">

            <div className="h-[300px] sm:h-[400px] lg:h-[500px]">

              <iframe
                title="Map"
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps?q=Ravelston%20Terrace%20Edinburgh&output=embed"
              />

            </div>

            <div className="flex flex-col gap-4 bg-surface px-5 sm:px-6 py-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-muted text-sm">
                  Visit us
                </p>

                <p className="mt-1 h3">
                  Ravelston Terrace, Edinburgh
                </p>

              </div>

              <a
                href="https://www.google.com/maps?q=Ravelston+Terrace+Edinburgh"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-2
                  rounded-xl
                  bg-primary
                  px-5 py-3
                  font-medium text-white
                  transition
                  hover:-translate-y-0.5
                "
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