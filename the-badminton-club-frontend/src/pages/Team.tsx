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

  return (
    <div
      className="group [perspective:1200px] w-full h-[420px] sm:h-[460px] cursor-pointer"
      onClick={() => setFlipped((p) => !p)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d]
        ${
          flipped
            ? "[transform:rotateY(180deg)] scale-[1.02]"
            : "group-hover:[transform:rotateY(180deg)] group-hover:scale-[1.01]"
        }`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg [backface-visibility:hidden] bg-surface">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <h3 className="h3 text-white">{name}</h3>
            <p className="text-sm text-white/80">{role}</p>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl bg-surface shadow-lg p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {/* TOP */}
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-3 py-1 rounded-full w-fit">
              Player Profile
            </span>

            <p className="text-body text-muted leading-relaxed">{funIntro}</p>

            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4">
              <p className="text-xs text-primary font-semibold uppercase tracking-wide mb-1">
                Role
              </p>
              <p className="font-medium text-text">{role}</p>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <img
                src={image}
                alt={name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
              />

              <div>
                <p className="font-semibold text-text leading-tight">{name}</p>
                <p className="text-xs text-muted">Coach</p>
              </div>
            </div>

            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Active
            </span>
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

          <p className="text-lg text-muted max-w-2xl mx-auto">
            Coaches and staff behind the club’s training and day-to-day running.
          </p>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="lg:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-2 scroll-smooth">
          {team.map((person) => (
            <div
              key={person.name}
              className="min-w-[280px] snap-center shrink-0 hover:scale-[1.02] transition-transform"
            >
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
