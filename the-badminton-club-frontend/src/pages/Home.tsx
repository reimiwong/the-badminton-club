import Card from "../components/Card";
import NewsCard from "../components/NewsCard";
import { homeFeatures } from "../data/homeFeatures";
import { news } from "../data/mockNewsData";
import CountUp from "../utils/CountUp";
import { NavLink } from "react-router-dom";

export default function Home() {

  const statIcon = "p-3 rounded-xl bg-primary/10";
  const statWrap = "flex flex-col items-center text-center gap-3";

  return (
    <section className="w-full">

      {/* =========================
          HERO
      ========================= */}
      <section className="bg-background py-16 sm:py-24 lg:py-32">

        <div className="max-w-7xl mx-auto px-5 sm:px-6">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* TEXT */}
            <div className="flex flex-col gap-6">

              <p className="label bg-primary/10 text-primary w-fit px-4 py-2 rounded-xl">
                Edinburgh's No.1 Badminton Club
              </p>

              <h1 className="h1 text-4xl sm:text-5xl lg:text-6xl">
                Train. Compete.
                <span className="block text-primary mt-1">Improve.</span>
              </h1>

              <p className="text-body text-muted leading-relaxed max-w-prose">
                Join a vibrant community of players at all levels. From casual games to competitive training, we're here to elevate your badminton journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <NavLink to="/sessions" className="btn-primary w-full sm:w-auto">
                  Book a Session
                </NavLink>

                <NavLink to="/about" className="btn-secondary w-full sm:w-auto">
                  About Us
                </NavLink>
              </div>

            </div>

            {/* VIDEO */}
            <div className="relative hidden lg:block overflow-hidden rounded-2xl min-h-[500px]">

              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/badminton.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-black/30" />

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          STATS
      ========================= */}
      <section className="bg-surface py-16 sm:py-20 lg:py-24 border-t border-border">

        <div className="max-w-7xl mx-auto px-5 sm:px-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">

            <div className={statWrap}>
              <img src="/images/icons/person-icon.svg" className={statIcon} />
              <p className="h2 text-2xl sm:text-3xl">
                <CountUp end={500} />+
              </p>
              <p className="text-muted text-sm sm:text-base">Active Members</p>
            </div>

            <div className={statWrap}>
              <img src="/images/icons/calendar-icon.svg" className={statIcon} />
              <p className="h2 text-2xl sm:text-3xl">
                <CountUp end={120} />+
              </p>
              <p className="text-muted text-sm sm:text-base">Weekly Sessions</p>
            </div>

            <div className={statWrap}>
              <img src="/images/icons/education-icon.svg" className={statIcon} />
              <p className="h2 text-2xl sm:text-3xl">
                <CountUp end={15} />
              </p>
              <p className="text-muted text-sm sm:text-base">Coaches</p>
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          FEATURES
      ========================= */}
      <section className="py-16 sm:py-24 lg:py-28">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 text-center">

          <h2 className="h2">Everything You Need</h2>

          <p className="text-body text-muted mt-4 sm:mt-5">
            Facilities, coaching, and community
          </p>

          {/* DESKTOP GRID */}
          <div className="mt-10 sm:mt-12 hidden lg:grid grid-cols-3 gap-6 lg:gap-7">
            {homeFeatures.map((f) => (
              <Card key={f.title} {...f} />
            ))}
          </div>

          {/* MOBILE / TABLET PYRAMID */}
          <div className="lg:hidden grid gap-6 mt-10 sm:mt-12">

            <Card {...homeFeatures[0]} />

            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              <Card {...homeFeatures[1]} />
              <Card {...homeFeatures[2]} />
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          NEWS
      ========================= */}
      <section className="bg-surface py-16 sm:py-24 lg:py-32">

        <div className="max-w-7xl mx-auto px-5 sm:px-6">

          <h2 className="h2 text-center sm:text-left">
            Latest News
          </h2>

          <p className="text-body text-muted mt-3 sm:mt-4 text-center sm:text-left">
            Updates from the club
          </p>

          <div className="mt-12 hidden sm:grid grid-cols-2 gap-6 lg:gap-8">

            {news.slice(0, 2).map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}

          </div>

          <div className="sm:hidden mt-12 flex gap-5 overflow-x-auto scrollbar-hide px-5">

            {news.slice(0, 5).map((item) => (
              <div key={item.id} className="min-w-[85%]">
                <NewsCard {...item} />
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="bg-gradient-to-br from-primary to-accent py-16 sm:py-24 lg:py-32 text-center px-5 sm:px-6">

        <div className="max-w-3xl mx-auto">

          <h2 className="h1 text-surface text-3xl sm:text-5xl">
            Ready to Start Your Journey?
          </h2>

          <p className="text-body sm:text-body-lg text-surface/90 mt-6">
            Join players across Edinburgh
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

            <NavLink to="/sessions" className="btn-light w-full sm:w-auto">
              Book Session
            </NavLink>

            <NavLink to="/contact" className="btn-outline-light w-full sm:w-auto">
              Contact Us
            </NavLink>

          </div>

        </div>

      </section>

    </section>
  );
}