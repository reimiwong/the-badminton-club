import Card from "../components/Card";
import NewsCard from "../components/NewsCard";
import { homeFeatures } from "../data/homeFeatures";
import { news } from "../data/mockNewsData";
import CountUp from "../components/CountUp";

export default function Home() {
  const iconClass = "p-3 rounded-xl bg-[#009e601a]";
  const statsClass = "flex flex-col items-center text-center gap-2";

  return (
    <section className="w-full">

      {/* =====================================================
          HERO + STATS (FULL VIEWPORT)
      ===================================================== */}
      <section className=" flex flex-col">

        {/* ================= HERO ================= */}
        <section className="flex-1 flex items-center py-12 md:py-16 ">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

              {/* LEFT: HERO COPY */}
              <div className="flex flex-col justify-center gap-4 md:gap-6">
                <p className="inline-block bg-[#009e601a] px-4 py-2 rounded-2xl text-[#009E60] w-fit font-medium">
                  Edinburgh No.1 Badminton Club
                </p>

                <h1 className="text-5xl font-bold leading-tight max-w-xl md:text-6xl">
                  Train. Compete.
                  <span className="text-primary block mt-1">Improve.</span>
                </h1>

                <p className="text-muted max-w-prose text-xl">
                  Join a vibrant community of players at all levels. From casual
                  games to competitive training.
                </p>

                {/* CTA BUTTONS */}
               
<div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 pt-4 w-full">
 
<button
  className="
    group
    w-full sm:w-auto
    bg-primary text-white
    rounded-xl
    px-8 py-4
    flex items-center justify-center gap-2

    transition-all duration-150 ease-out

    hover:scale-[1.02] hover:shadow-md
    active:scale-[0.97] active:shadow-sm
  "
>
  <span>Book a Session</span>
  <img
    src="./right-arrow.svg"
    alt=""
    aria-hidden="true"
    className="
      w-4 h-4
      transition-transform duration-200
      group-hover:translate-x-1
      group-active:translate-x-0
    "
  />
</button>


  <button
    className="
      w-full sm:w-auto
      flex items-center justify-center
      whitespace-nowrap
      bg-white border border-border text-text
      rounded-xl
      px-6 py-4
      cursor-pointer
      transition-all duration-200 ease-out
      hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm
      active:scale-[0.98]
    "
  >
    Explore Membership
  </button>
</div>

              </div>

              {/* RIGHT: VIDEO (DESKTOP ONLY) */}
             <div
  className="
    group
    lg:block
    [@media(hover:none)_and_(pointer:coarse)]:hidden
    relative overflow-hidden rounded-2xl
    min-h-[620px]
  "
>
  <video
    className="
      absolute inset-0 w-full h-full object-cover
      brightness-95 contrast-95 saturate-95
      transition-transform transition-filter
      duration-700 ease-out
      group-hover:scale-[1.05]
      group-hover:brightness-105
    "
    autoPlay
    loop
    muted
    playsInline
    preload="none"
    poster="/videos/badminton.jpg"
    aria-hidden="true"
  >
    <source src="/videos/badminton.mp4" type="video/mp4" />
  </video>

  <div
    className="
      absolute inset-0
      bg-gradient-to-l from-black/40 to-transparent
      transition-opacity duration-500 ease-out
      group-hover:opacity-50
    "
  />
</div>

            </div>
          </div>
        </section>

        {/* ================= STATS (BOTTOM OF VIEWPORT) ================= */}
     
<section
  className="
    bg-white
    py-8 sm:py-12 md:py-18

    shadow-[inset_0_1px_0_rgba(0,0,0,0.08)]
  "
>
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-3 gap-3 sm:gap-12">

      {/* STAT 1 */}
      <div className={statsClass}>
        <img src="./person-icon.svg" className={iconClass} alt="" />
        <p className="text-3xl sm:text-4xl font-bold">
          <CountUp end={500} />+
        </p>
        <p className="text-sm sm:text-base text-muted">
          Active Members
        </p>
      </div>

      {/* STAT 2 */}
      <div className={statsClass}>
        <img src="./calendar-icon.svg" className={iconClass} alt="" />
        <p className="text-3xl sm:text-4xl font-bold">
          <CountUp end={120} />+
        </p>
        <p className="text-sm sm:text-base text-muted">
          Weekly Sessions
        </p>
      </div>

      {/* STAT 3 */}
      <div className={statsClass}>
        <img src="./education-icon.svg" className={iconClass} alt="" />
        <p className="text-3xl sm:text-4xl font-bold">
          <CountUp end={15} />
        </p>
        <p className="text-sm sm:text-base text-muted">
          Expert Coaches
        </p>
      </div>

    </div>
  </div>
</section>

      </section>
      {/* ================= END FULL VIEWPORT ================= */}



      {/* ================= FEATURES ================= */}
   <section className="py-12">
  <div className="max-w-7xl mx-auto px-6 flex flex-col gap-3">

    <h2 className="text-4xl font-bold text-center">
      Everything You Need
    </h2>

    <h3 className="text-xl text-muted text-center">
      Professional facilities, expert coaching, and a passionate community
    </h3>

    {/* ================= MOBILE ================= */}
    <div className="sm:hidden grid gap-6 py-8">

      {/* PRIMARY: MEMBERSHIP PLANS */}
      <Card {...homeFeatures[0]} />

      {/* SECONDARY ROW */}
      <div className="grid grid-cols-2 gap-4">
        <Card {...homeFeatures[1]} />
        <Card {...homeFeatures[2]} />
      </div>

    </div>

    {/* ================= DESKTOP ================= */}
    <div className="hidden sm:grid grid-cols-3 gap-7 py-10">
      {homeFeatures.map((feature) => (
        <Card key={feature.title} {...feature} />
      ))}
    </div>

  </div>
</section>

      {/* ================= NEWS ================= */}
     
<section className="bg-white py-14">
  <div className="max-w-7xl mx-auto px-6">

    {/* ================= HEADER ================= */}
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-3">
      <h2 className="text-3xl sm:text-4xl font-bold">
        Latest News
      </h2>

      <p className="text-muted max-w-prose">
        Stay updated with club announcements and tournaments
      </p>

      {/* MOBILE CTA */}
      <button
        className="
          sm:hidden
          mt-2
          inline-flex items-center gap-2
          text-primary font-medium
          px-4 py-2 rounded-lg
          transition
          hover:bg-primary/10
          active:scale-95
        "
      >
        <span>View All News</span>
        <img src="./green-arrow.svg" alt="" aria-hidden />
      </button>
    </div>

    {/* DESKTOP CTA */}
    <div className="hidden sm:flex justify-end mt-2">
      <span className="group inline-flex items-center gap-1 text-primary font-medium cursor-pointer transition hover:translate-x-1">
        <span>View All News</span>
        <img
          src="./green-arrow.svg"
          alt=""
          aria-hidden
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </div>

    {/* ================= NEWS ================= */}

    {/* MOBILE: CAROUSEL */}
<div className="sm:hidden">
  <div
    className="
      flex gap-4
      px-6 py-2
      overflow-x-auto
      snap-x snap-mandatory
      scroll-smooth
      scrollbar-hide
    "
  >
    {news.slice(0, 5).map((item) => (
      <div
        key={item.id}
        className="
          snap-start
          shrink-0
          min-w-[85%]
          max-w-[85%]
        "
      >
        <NewsCard {...item} />
      </div>
    ))}
  </div>
</div>

    {/* DESKTOP: GRID */}
    <div className="hidden sm:grid grid-cols-2 gap-8 my-10">
      {news.slice(0, 2).map((item) => (
        <NewsCard key={item.id} {...item} />
      ))}
    </div>

  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="bg-[linear-gradient(135deg,_#009E60_0%,_#22C55E_100%)] py-18">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 text-center">
          <h2 className="text-white text-5xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <h3 className="text-white/90 text-xl">
            Join hundreds of players who have made TBC their home court
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group bg-white text-primary rounded-xl px-8 py-4 transition hover:scale-[1.02] hover:shadow-md">
              Book Your First Session
            </button>

            <button className="border-2 border-white text-white rounded-xl px-8 py-4 transition hover:scale-[1.02] hover:bg-white/15">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

    </section>
  );
}
