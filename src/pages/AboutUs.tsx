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
      <div className="flex flex-col items-center text-center pt-18 pb-30">
        <h1 className="w-fit text-5xl font-bold">
          Our <span className="text-primary">Story</span>
        </h1>
        <h3 className="w-fit mt-3 text-muted text-xl max-w-3xl">
          Building Edinburgh's most vibrant badminton community, one rally at a
          time
        </h3>
      </div>

      {/* MISSION */}
      <div className="bg-white px-5 py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* VIDEO (hidden on mobile) */}
          <div className="hidden lg:block w-full lg:w-1/2">
            <div className="group relative overflow-hidden rounded-2xl min-h-[430px]">
              <video
                className="absolute inset-0 w-full h-full object-cover
            brightness-95 contrast-95 saturate-95
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/videos/badminton.jpg"
              >
                <source src="/videos/promo.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />
            </div>
          </div>

          {/* TEXT */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-4xl font-bold">Our Mission</h2>

            <div className="pt-4 text-muted text-lg gap-4 flex flex-col">
              <p>
                Founded in 2010, Shamrock Badminton Club began with a simple
                vision: create a welcoming space where players of all levels
                could discover the joy of badminton while developing their
                skills.
              </p>

              <p>
                Today, we're proud to be Dublin's premier badminton facility,
                offering world-class courts, expert coaching, and a vibrant
                community that celebrates both competitive excellence and the
                pure enjoyment of the game.
              </p>

              <p>
                Our commitment goes beyond just providing courts. We nurture
                talent, build friendships, and create opportunities for players
                to challenge themselves and achieve their personal best.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
    <section className="py-24">
  <div className="flex flex-col mx-auto text-center">
    <h2 className="text-4xl font-bold">What We Stand For</h2>
    <h3 className="text-muted text-lg my-3">
      The values that guide everything we do
    </h3>
  </div>

 <div className="flex flex-col gap-6 mt-12 md:flex-row md:max-w-7xl m-auto px-4">
  {values.map((item, i) => (
    <div key={i} className="w-full md:flex md:flex-row">
      
      <div
        className="
          group
          flex flex-col items-start text-left gap-2
          py-6 px-7 mx-4
          bg-white rounded-2xl

          transition-all duration-300 ease-out
          hover:-translate-y-2
          hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]
        "
      >
        {/* ICON */}
        <div
          className="
            p-2 rounded-[16px]
            bg-[rgba(0,158,96,0.1)]
            transition-all duration-300 ease-out
            group-hover:scale-110
            group-hover:bg-[rgba(0,158,96,0.18)]
          "
        >
          <img
            src={item.icon}
            alt={item.title}
            className="
              w-7 h-7
              transition-transform duration-300 ease-out
              group-hover:rotate-6
            "
          />
        </div>

        {/* TITLE */}
        <h3
          className="
            text-lg font-bold
            transition-all duration-300 ease-out
            group-hover:-translate-y-0.5
          "
        >
          {item.title}
        </h3>

        {/* TEXT */}
        <p className="text-muted text-base">
          {item.text}
        </p>
      </div>
    </div>
  ))}
</div>
</section>

      {/* TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>

          <div className="relative pb-24">
            {/* vertical line with fade */}
            <div
              className="absolute left-4 sm:left-24 top-6 bottom-0 w-px
        bg-gradient-to-b from-slate-300 via-slate-300 to-transparent"
            />

            <div className="flex flex-col gap-10">
              {mileStones.map((mileStone, idx) => (
                <div
                  key={idx}
                  className="relative pl-12 sm:pl-32 py-2 group"
                  style={{
                    animation: `fadeUp 600ms ease forwards`,
                    animationDelay: `${idx * 120}ms`,
                    opacity: 0,
                  }}
                >
                  {/* BIG animated node */}
                  <div className="absolute left-4 sm:left-24 top-6 -translate-x-1/2">
                    <div className="relative">
                      {/* pulse ring */}
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />

                      {/* main dot */}
                      <div className="w-5 h-5 bg-primary rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-125" />
                    </div>
                  </div>

                  {/* content */}
                  <time className="text-xs uppercase font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full w-fit">
                    {mileStone.year}
                  </time>

                  <p className="text-lg font-semibold text-slate-900 mt-2">
                    {mileStone.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* animation keyframes */}
          <style>{`
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0px);
        }
      }
    `}</style>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[linear-gradient(135deg,_#009E60_0%,_#22C55E_100%)] py-18">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 text-center">
          <h2 className="text-white text-4xl font-bold">Join Our Community</h2>

          <h3 className="text-white/90 text-xl max-w-4xl mx-auto text-center">
            Whether you're picking up a racket for the first time or training
            for competition, there's a place for you here.
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group bg-white text-primary rounded-xl px-8 py-4 transition hover:scale-[1.02] hover:shadow-md">
              Explore Membership Options
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
