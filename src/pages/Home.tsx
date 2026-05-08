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

      {/* HERO + STATS */}
      <section className="flex flex-col">

        {/* HERO */}
        <section className="flex-1 flex items-center py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 w-full">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

              {/* LEFT */}
              <div className="flex flex-col justify-center gap-5">

                <p className="inline-block bg-[#009e601a] px-4 py-2 rounded-2xl text-[#009E60] w-fit font-medium">
                  Edinburgh No.1 Badminton Club
                </p>

                <h1 className="text-5xl font-bold leading-tight md:text-6xl">
                  Train. Compete.
                  <span className="text-primary block mt-1">Improve.</span>
                </h1>

                <p className="text-muted text-xl max-w-prose">
                  Join a vibrant community of players at all levels. From casual games to competitive training.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">

                  <button className="w-full sm:w-auto bg-primary text-white rounded-xl px-8 py-4 flex items-center justify-center gap-2 transition hover:opacity-90 active:scale-[0.98]">
                    Book a Session
                    <img src="/images/icons/right-arrow-icon.svg" className="w-4 h-4" />
                  </button>

                  <button className="w-full sm:w-auto bg-white text-text rounded-xl px-6 py-4 transition hover:bg-gray-50 active:scale-[0.98]">
                    Explore Membership
                  </button>

                </div>

              </div>

              {/* VIDEO */}
              <div className="relative overflow-hidden rounded-2xl min-h-[620px] lg:block hidden">

                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                >
                  <source src="/videos/badminton.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/30" />

              </div>

            </div>

          </div>
        </section>

        {/* STATS */}
        <section className="bg-white py-10 shadow-[inset_0_1px_0_rgba(0,0,0,0.08)]">
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid grid-cols-3 gap-6 sm:gap-12">

              <div className={statsClass}>
                <img src="/images/icons/person-icon.svg" className={iconClass} />
                <p className="text-3xl font-bold"><CountUp end={500} />+</p>
                <p className="text-muted">Active Members</p>
              </div>

              <div className={statsClass}>
                <img src="/images/icons/calendar-icon.svg" className={iconClass} />
                <p className="text-3xl font-bold"><CountUp end={120} />+</p>
                <p className="text-muted">Weekly Sessions</p>
              </div>

              <div className={statsClass}>
                <img src="/images/icons/education-icon.svg" className={iconClass} />
                <p className="text-3xl font-bold"><CountUp end={15} /></p>
                <p className="text-muted">Coaches</p>
              </div>

            </div>

          </div>
        </section>

      </section>

      {/* FEATURES */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold">Everything You Need</h2>
          <p className="text-muted mt-2">Facilities, coaching, and community</p>

          <div className="sm:hidden grid gap-6 mt-10">
            <Card {...homeFeatures[0]} />
            <div className="grid grid-cols-2 gap-4">
              <Card {...homeFeatures[1]} />
              <Card {...homeFeatures[2]} />
            </div>
          </div>

          <div className="hidden sm:grid grid-cols-3 gap-7 mt-10">
            {homeFeatures.map((f) => (
              <Card key={f.title} {...f} />
            ))}
          </div>

        </div>
      </section>

      {/* NEWS */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center sm:text-left">
            <h2 className="text-4xl font-bold">Latest News</h2>
            <p className="text-muted mt-2">Updates from the club</p>
          </div>

          <div className="mt-10 sm:grid sm:grid-cols-2 gap-8 hidden">
            {news.slice(0, 2).map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>

          <div className="sm:hidden mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory">
            {news.slice(0, 5).map((item) => (
              <div key={item.id} className="min-w-[85%] snap-start">
                <NewsCard {...item} />
              </div>
            ))}
            
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-green-500 py-20 text-center">

        <h2 className="text-white text-5xl font-bold">
          Ready to Start Your Journey?
        </h2>

        <p className="text-white/90 mt-4 text-xl">
          Join players across Edinburgh
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

          <button className="bg-white text-primary px-8 py-4 rounded-xl">
            Book Session
          </button>

          <button className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white/10">
            Contact Us
          </button>

        </div>

      </section>

    </section>
  );
}