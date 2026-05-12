import { useState } from "react";
import { team } from "../data/teamData";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  funIntro: string;
};

function TeamCard({ person }: { person: TeamMember }) {
  const { name, role, image, funIntro } = person;
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  return (
    <div
      className="group [perspective:1200px] w-full h-[420px] sm:h-[460px] cursor-pointer"
      onClick={handleFlip}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped
            ? "[transform:rotateY(180deg)]"
            : "group-hover:[transform:rotateY(180deg)]"
        }`}
      >

        {/* FRONT */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-md [backface-visibility:hidden] bg-surface">

          <img src={image} alt={name} className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-surface">

            <h3 className="h3 text-surface">{name}</h3>

            <p className="text-body text-surface/80">
              {role}
            </p>

          </div>

        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl bg-surface shadow-md p-5 sm:p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">

          {/* TOP */}
          <div className="flex flex-col gap-4">

            <div className="flex items-center justify-between">

              <p className="label text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
                Player Profile
              </p>

              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />

            </div>

            <p className="text-body text-muted leading-relaxed">
              {funIntro}
            </p>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex flex-col gap-1">

              <p className="text-xs uppercase tracking-wide text-primary font-semibold">
                Role
              </p>

              <p className="text-body font-medium text-text">
                {role}
              </p>

            </div>

          </div>

          {/* BOTTOM */}
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">

            <div className="flex items-center gap-3">

              <img
                src={image}
                alt={name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              />

              <div>
                <p className="text-body font-semibold text-text leading-tight">
                  {name}
                </p>
                <p className="text-xs text-muted">
                  Badminton Coach
                </p>
              </div>

            </div>

            <div className="text-primary text-xs font-medium bg-primary/10 px-3 py-1 rounded-full">
              Active
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section className="bg-background py-16 sm:py-24 lg:py-32 px-5 sm:px-6">

      <div className="w-full max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-12 sm:mb-16 text-center">

          <h2 className="h1">
            Meet the <span className="text-primary">Team</span>
          </h2>

          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Coaches and staff behind the club’s training and day-to-day running.
          </p>

        </div>

        {/* MOBILE CAROUSEL */}
        <div className="lg:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2 sm:px-0">

          {team.map((person) => (
            <div key={person.name} className="min-w-[280px] snap-center">
              <TeamCard person={person} />
            </div>
          ))}

        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-4 gap-6 lg:gap-8">

          {team.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}

        </div>

      </div>

    </section>
  );
}