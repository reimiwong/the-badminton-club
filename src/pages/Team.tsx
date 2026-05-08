import { team } from "../data/teamData";

export type TeamMember = {
  name: string;
  role: string;
  image: string;
  funIntro: string;
};

function TeamCard({ person }: { person: TeamMember }) {
  const { name, role, image, funIntro } = person;

  return (
    <div className="group [perspective:1200px] w-full h-[460px]">

      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* FRONT */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-md [backface-visibility:hidden] bg-surface">

          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-surface">

            <h3 className="h3 text-surface">
              {name}
            </h3>

            <p className="text-body text-surface/80">
              {role}
            </p>

          </div>

        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl bg-surface shadow-md p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">

          <div>

            <p className="label mb-4">
              About
            </p>

            <p className="text-body text-muted leading-relaxed">
              {funIntro}
            </p>

          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">

            <img
              src={image}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>

              <p className="label">
                Role
              </p>

              <p className="text-body text-text font-medium">
                {role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default function Team() {
  return (
    <section className="bg-background py-24 px-6 flex justify-center">

      <div className="w-full max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-16 text-center">

          <h2 className="h1">
            Meet the <span className="text-primary">Team</span>
          </h2>

          <p className="text-body-lg text-muted max-w-2xl mx-auto">
            Coaches and staff behind the club’s training and day-to-day running.
          </p>

        </div>

        {/* MOBILE CAROUSEL */}
        <div className="lg:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6">

          {team.map((person) => (
            <div key={person.name} className="min-w-[280px] snap-center">
              <TeamCard person={person} />
            </div>
          ))}

        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-4 gap-8">

          {team.map((person) => (
            <TeamCard key={person.name} person={person} />
          ))}

        </div>

      </div>

    </section>
  );
}