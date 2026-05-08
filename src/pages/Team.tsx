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
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-md [backface-visibility:hidden]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-white/80">{role}</p>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 rounded-3xl bg-white shadow-md p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">

          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-4">
              About
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              {funIntro}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
            <img
              src={image}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Role
              </p>
              <p className="text-sm font-medium text-gray-700">
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
    <div className="bg-[#F7FAF8] py-24 px-6 flex justify-center">
      <div className="w-full max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">
            Meet the <span className="text-primary">Team</span>
          </h2>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
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
    </div>
  );
}