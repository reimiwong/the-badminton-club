export default function AboutUs() {
  const items = [
    { year: "2010", text: "Club founded with 50 members and 2 courts" },
    { year: "2014", text: "Expanded to 8 professional courts" },
    { year: "2018", text: "Launched competitive training program" },
    { year: "2022", text: "Reached 500+ active members" },
    { year: "2026", text: "Hosting national championship events" },
  ];

  const values = [
    {
      title: "Community First",
      text: "Building lasting friendships through shared passion for the sport",
      icon: "/images/icons/heart-icon.svg",
    },
    {
      title: "Continuous Growth",
      text: "Supporting every player's journey from beginner to competitive athlete",
      icon: "/images/icons/rise-icon.svg",
    },
    {
      title: "Excellence",
      text: "Maintaining top-tier facilities and professional coaching standards",
      icon: "/images/icons/bullseye-icon.svg",
    },
    {
      title: "Fun & Competition",
      text: "Balancing competitive spirit with enjoyment of the game",
      icon: "/images/icons/medal-icon.svg",
    },
  ];

  return (
    <section className="space-y-28">

      {/* HERO */}
      <div className="text-center pt-20 px-6">
        <h1 className="text-5xl font-bold">
          Our <span className="text-primary">Story</span>
        </h1>

        <p className="mt-4 text-muted text-xl max-w-3xl mx-auto">
          Building Edinburgh's most vibrant badminton community, one rally at a time
        </p>
      </div>

      {/* MISSION */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div className="hidden lg:block rounded-2xl overflow-hidden h-[420px] relative">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/badminton.mp4" type="video/mp4" />
            </video>
          </div>

          <div>
            <h2 className="text-4xl font-bold">Our Mission</h2>

            <div className="mt-5 space-y-4 text-muted text-lg">
              <p>
                Founded in 2010, Shamrock Badminton Club began with a simple vision:
                create a welcoming space for all players.
              </p>

              <p>
                Today, we're a premier facility offering coaching, courts, and community.
              </p>

              <p>
                We focus on development, enjoyment, and long-term player growth.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* VALUES */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold">What We Stand For</h2>
          <p className="text-muted mt-2">Core values that guide everything</p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 text-left hover:-translate-y-1 transition shadow-sm hover:shadow-md"
              >
                <div className="bg-primary/10 p-2 rounded-xl w-fit">
                  <img src={v.icon} className="w-6 h-6" alt={v.title} />
                </div>

                <h3 className="mt-4 font-bold text-lg">{v.title}</h3>
                <p className="text-muted mt-2">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TIMELINE */}
      <div className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center">Our Journey</h2>

          <div className="mt-16 relative border-l border-black/10 pl-10 space-y-10">
            {items.map((item, i) => (
              <div key={i} className="relative">

                <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-primary" />

                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
                  {item.year}
                </span>

                <p className="mt-2 text-lg font-medium">{item.text}</p>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-green-500 py-20 px-6 text-center">
        <h2 className="text-white text-4xl font-bold">
          Join Our Community
        </h2>

        <p className="text-white/90 mt-4 max-w-2xl mx-auto">
          Whether you're a beginner or competitive player, there's a place for you.
        </p>

        <button className="mt-8 bg-white text-primary px-8 py-3 rounded-xl font-medium hover:scale-[1.02] transition">
          Explore Membership Options
        </button>
      </div>

    </section>
  );
}