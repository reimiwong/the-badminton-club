import { mileStones } from "../data/milestonesData";

export default function AboutUs() {
  const values = [
    {
      title: "Community First",
      text: "Building lasting friendships through shared passion for the sport",
      icon: "images/icons/heart-icon.svg",
    },
    {
      title: "Continous Growth",
      text: "Supporting every player's journey from beginner to competitive athlete",
      icon: "images/icons/rise-icon.svg",
    },
    {
      title: "Excellence",
      text: "Maintaining top-tier facilities and professional coaching standards",
      icon: "images/icons/bullseye-icon.svg",
    },
    {
      title: "Fun & Competition",
      text: "Balancing competitive spirit with enjoyment of the game",
      icon: "images/icons/medal-icon.svg",
    },
  ];

  return (
    <section>

      {/* HERO */}
      <div className="flex flex-col items-center text-center pt-18 pb-20 px-6">
        <h1 className="h1 w-fit">
          Our <span className="text-primary">Story</span>
        </h1>

        <p className="body-lg muted mt-4 max-w-3xl">
          Building Edinburgh's most vibrant badminton community, one rally at a time
        </p>
      </div>

      {/* MOBILE FLOATING VIDEO */}
      <div className="lg:hidden relative w-full flex justify-center -mt-10 mb-10">
        <div className="relative w-[90%] aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/promo.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Ring effect */}
          <div className="absolute inset-0 ring-1 ring-white/10" />
        </div>
      </div>

      {/* MISSION */}
      <section className="bg-white px-5 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14">

          {/* DESKTOP VIDEO */}
          <div className="hidden lg:block w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-2xl h-[420px] group">
              <video
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/promo.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-20" />
              <div className="absolute inset-0 ring-1 ring-white/10 transition-all duration-500 group-hover:ring-white/20" />
            </div>
          </div>

          {/* TEXT */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="h2">Our Mission</h2>

            <div className="pt-5 flex flex-col gap-5">
              <p className="body text-muted leading-relaxed">
                Founded in 2010, Shamrock Badminton Club began with a simple vision: create a welcoming space where players of all levels could discover the joy of badminton while developing their skills.
              </p>

              <p className="body text-muted leading-relaxed">
                Today, we're proud to be Dublin's premier badminton facility, offering world-class courts, expert coaching, and a vibrant community that celebrates both competitive excellence and the pure enjoyment of the game.
              </p>

              <p className="body text-muted leading-relaxed">
                Our commitment goes beyond just providing courts. We nurture talent, build friendships, and create opportunities for players to challenge themselves and achieve their personal best.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24">
        <div className="flex flex-col items-center text-center px-6">
          <h2 className="h2">What We Stand For</h2>
          <p className="body muted mt-3">
            The values that guide everything we do
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-6 mt-14 md:max-w-7xl mx-auto px-4">
          {values.map((item, i) => (
            <div key={i} className="w-full flex">
              <div className="group flex flex-col h-full w-full items-start text-left gap-3 py-7 px-7 bg-white rounded-2xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
                <div className="p-2 rounded-[16px] bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                  <img src={item.icon} alt={item.title} className="w-7 h-7 transition-transform duration-300 group-hover:rotate-6" />
                </div>
                <h3 className="h3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="body text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="h2 text-center mb-16">Our Journey</h2>

          <div className="relative">
            <div className="absolute left-4 sm:left-24 top-6 bottom-0 w-px bg-border" />
            <div className="flex flex-col gap-10">
              {mileStones.map((mileStone, idx) => (
                <div key={idx} className="relative pl-12 sm:pl-32 py-2">
                  <div className="absolute left-4 sm:left-24 top-6 -translate-x-1/2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      <div className="w-5 h-5 bg-primary rounded-full border-4 border-white" />
                    </div>
                  </div>

                  <time className="label bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">
                    {mileStone.year}
                  </time>

                  <p className="body-lg font-semibold text-text mt-3">
                    {mileStone.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-accent py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="h2 text-white">Join Our Community</h2>
          <p className="body-lg text-white/90 mt-5 max-w-3xl mx-auto">
            Whether you're picking up a racket for the first time or training for competition, there's a place for you here.
          </p>
          <button className="mt-8 bg-white text-primary px-8 py-4 rounded-xl font-medium transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]">
            Explore Membership Options
          </button>
        </div>
      </section>
    </section>
  );
}