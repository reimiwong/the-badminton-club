import Card from "../components/Card";
import NewsCard from "../components/NewsCard";
import { homeFeatures } from "../data/homeFeatures";
import { news } from "../data/mockNewsData";

export default function Home() {
  const iconClass = "p-3 rounded-xl bg-[#009e601a]";
  const statsClass = "flex flex-col items-center text-center gap-2";

  return (
    <section className="w-full">
      {/* HERO */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col gap-6">
            <p className="inline-block bg-[#009e601a] px-4 py-2 rounded-2xl text-[#009E60] w-fit font-medium">
              Edinburgh No.1 Badminton Club
            </p>

            <h1 className="text-5xl font-bold leading-tight max-w-4xl md:text-6xl">
              Train. Compete. <span className="text-primary">Improve.</span>
            </h1>

            <p className="text-muted max-w-prose text-xl">
              Join a vibrant community of players at all levels. From casual games
              to competitive training.
            </p>

            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <button className="group flex items-center gap-1 bg-primary text-white rounded-xl px-6 py-4 transition hover:-translate-y-0.5 hover:shadow-md">
                <span>Book a Session</span>
                <img
                  src="./right-arrow.svg"
                  alt=""
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <button className="flex items-center bg-white border border-border rounded-xl px-6 py-4 transition hover:-translate-y-0.5 hover:shadow-sm">
                Explore Membership
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className={statsClass}>
              <img className={iconClass} src="./person-icon.svg" alt="" />
              <p className="text-4xl font-bold">500+</p>
              <p className="text-muted">Active Members</p>
            </div>

            <div className={statsClass}>
              <img className={iconClass} src="./calendar-icon.svg" alt="" />
              <p className="text-4xl font-bold">120+</p>
              <p className="text-muted">Weekly Sessions</p>
            </div>

            <div className={statsClass}>
              <img className={iconClass} src="./education-icon.svg" alt="" />
              <p className="text-4xl font-bold">15</p>
              <p className="text-muted">Expert Coaches</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-3">
          <h2 className="text-4xl font-bold text-center">
            Everything You Need
          </h2>
          <h3 className="text-xl text-muted text-center">
            Professional facilities, expert coaching, and a passionate community
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 py-10">
            {homeFeatures.map((feature) => (
              <Card key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Latest News</h2>

          <div className="
            mt-2
            grid grid-cols-1
            sm:grid-cols-[1fr_auto]
            gap-y-2 gap-x-4
            text-muted
          ">
            <span>
              Stay updated with club announcements and tournaments
            </span>

            <span className="
              group inline-flex items-center gap-1
              text-primary font-medium cursor-pointer
              justify-self-start sm:justify-self-end
              transition hover:translate-x-1
            ">
              <span>View All News</span>
              <img
                src="./green-arrow.svg"
                alt=""
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-10">
            {news.slice(0, 2).map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[linear-gradient(135deg,_#009E60_0%,_#22C55E_100%)] py-18">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 text-center">
          <h2 className="text-white text-5xl font-bold">
            Ready to Start Your Journey?
          </h2>
          <h3 className="text-white/90 text-xl">
            Join hundreds of players who have made TBC their home court
          </h3>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
           

<button
  className="
    group
    bg-white text-primary
    rounded-xl px-8 py-4
    flex items-center gap-2
    whitespace-nowrap

    transition
    hover:-translate-y-0.5 hover:shadow-md
  "
>
  <span>Book Your First Session</span>

  <img
    src="./green-arrow.svg"
    alt=""
    aria-hidden="true"
    className="
      w-4 h-4
      opacity-70
      transform transition-all duration-200 ease-out

      group-hover:translate-x-1
      group-hover:opacity-100
      group-hover:scale-110
    "
  />
</button>


            <button className="border-2 border-white text-white rounded-xl px-6 py-4 transition hover:bg-white/15">
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
