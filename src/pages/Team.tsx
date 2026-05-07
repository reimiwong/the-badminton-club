import { team } from "../data/teamData";

export default function Team() {
  return (
    <div className="bg-[#F7FAF8] py-28 px-5 sm:px-10 lg:px-16 flex justify-center">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-5 mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight">
            Meet the <span className="text-primary">Team</span>
          </h2>

          <h3 className="text-center text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            The coaches, staff, and people who keep the club running day to day.
          </h3>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-5 px-5 lg:hidden">

          {team.map((person) => (
            <div
              key={person.name}
              className="min-w-[300px] snap-center group [perspective:1200px]"
            >
              <div className="relative w-full h-[460px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-md [backface-visibility:hidden]">

                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-semibold">{person.name}</h3>
                    <p className="text-sm text-white/80">{person.role}</p>
                  </div>

                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-3xl bg-white shadow-md border border-gray-100 p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-4">
                      About
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {person.funIntro}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">

                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />

                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Role
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {person.role}
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-4 gap-10">

          {team.map((person) => (
            <div key={person.name} className="group [perspective:1200px]">

              <div className="relative w-full h-[460px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-md [backface-visibility:hidden]">

                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-semibold">{person.name}</h3>
                    <p className="text-sm text-white/80">{person.role}</p>
                  </div>

                </div>

                {/* BACK */}
                <div className="absolute inset-0 rounded-3xl bg-white shadow-md border border-gray-100 p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">

                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-4">
                      About
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {person.funIntro}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">

                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />

                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Role
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        {person.role}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}