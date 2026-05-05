import Card from "../components/Card";
import { homeFeatures } from "../data/homeFeatures";

export default function Home() {
  const iconClass = "p-3 rounded-xl bg-[#009e601a]";
  const statsClass = "flex flex-col items-center text-center gap-2";
  return (
    <section className="w-full">
      {/* Hero / Intro (constrained) */}
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <p className="inline-block bg-[#009e601a] px-4 py-2 rounded-2xl text-[#009E60] w-fit font-medium">
            Edinburgh No.1 Badminton Club
          </p>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight max-w-4xl md:text-6xl">
            Train. Compete. <p className="text-primary">Improve.</p>
          </h1>

          {/* Description */}
          <p className="text-muted max-w-prose text-xl">
            Join a vibrant community of players at all levels. From casual games
            to competitive training.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-3 pt-4">
            <button
              className="
    flex items-center justify-center gap-1
    whitespace-nowrap
    bg-primary text-white
    rounded-xl px-6 py-4

    transition-all
    duration-200
    ease-out
    cursor-pointer

    hover:-translate-y-0.5
    hover:shadow-md

    active:translate-y-0
    active:scale-[0.98]
  "
            >
              <span>Book a Session</span>
              <img src="./right-arrow.svg" alt="" aria-hidden="true" />
            </button>

            <button
              className="
    flex items-center justify-center
    whitespace-nowrap
    bg-white
    border border-border
    text-text
    rounded-xl px-6 py-4

    cursor-pointer
    transition-all
    duration-200
    ease-out

    hover:-translate-y-0.5
    hover:border-primary/50
    hover:shadow-sm

    active:translate-y-0
    active:scale-[0.98]
  "
            >
              Explore Membership
            </button>
          </div>
        </div>
      </div>

      {/* Stats band (full-width background) */}
      <div className="bg-white mt-15">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className={statsClass}>
              <img
                className={iconClass}
                src="./person-icon.svg"
                alt=""
                aria-hidden="true"
              />
              <p className="text-4xl font-bold text-black">500+</p>
              <p className="text-muted">Active Members</p>
            </div>

            <div className={statsClass}>
              <img
                className={iconClass}
                src="./calendar-icon.svg"
                alt=""
                aria-hidden="true"
              />
              <p className="text-4xl font-bold text-black">120+</p>
              <p className="text-muted">Weekly Sessions</p>
            </div>

            <div className={statsClass}>
              <img
                className={iconClass}
                src="./education-icon.svg"
                alt=""
                aria-hidden="true"
              />
              <p className="text-4xl font-bold text-black">15</p>
              <p className="text-muted">Expert Coaches</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center py-13 gap-3 mt-5">
        <h2 className="font-bold text-4xl">Everything You Need</h2>
        <h3 className="text-xl text-muted">
          Professional facilities, expert coaching, and a passionate community
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-7 items-stretch m-auto px-5 py-10">
          {homeFeatures.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              img={feature.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
