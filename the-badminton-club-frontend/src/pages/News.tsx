import { news } from "../data/mockNewsData";
import NewsCard from "../components/NewsCard";

export default function News() {
  if (!news || news.length === 0) {
    return (
      <div className="py-16 sm:py-24 text-center text-muted">
        No news available
      </div>
    );
  }

  const [featured, ...rest] = news;

  return (
    <section className="w-full">

      {/* =========================
          HERO
      ========================= */}
      <div className="bg-background px-5 sm:px-6 pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 text-center">

        <h1 className="h1 text-4xl sm:text-5xl lg:text-6xl">
          News & <span className="text-primary">Updates</span>
        </h1>

        <p className="mt-5 text-body-lg text-muted max-w-3xl mx-auto">
          Stay informed about tournaments, training programs, and club announcements
        </p>

      </div>

      {/* =========================
          FEATURED
      ========================= */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-surface">

        <div className="max-w-7xl mx-auto">

          <a
            href={featured?.link ?? "#"}
            className="
              group flex flex-col md:flex-row
              bg-surface
              rounded-3xl
              overflow-hidden
              border border-border
              shadow-lg
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >

            {/* IMAGE */}
            <div className="md:w-1/2 w-full relative overflow-hidden">

              <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                Featured
              </div>

              <div className="w-full aspect-[16/10] md:h-[420px]">
                <img
                  src={featured?.img?.src ?? ""}
                  alt={featured?.img?.alt ?? "featured image"}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

            {/* CONTENT */}
            <div className="md:w-1/2 p-5 sm:p-6 md:p-8 flex flex-col justify-center gap-4">

              <div className="flex items-center gap-3 text-xs sm:text-sm flex-wrap">

                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {featured?.category}
                </span>

                <span className="text-muted">
                  {featured?.date}
                </span>

              </div>

              <h2 className="h2 text-2xl sm:text-3xl lg:text-4xl group-hover:text-primary transition-colors">
                {featured?.title}
              </h2>

              <p className="text-body text-muted">
                {featured?.excerpt}
              </p>

              <div className="flex items-center gap-2 text-primary font-medium mt-2 group w-fit">

                <span>Read full article</span>

                <img
                  src="/images/icons/green-arrow-icon.svg"
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                />

              </div>

            </div>

          </a>

        </div>

      </section>

      {/* =========================
          LATEST
      ========================= */}
      <section className="py-14 sm:py-20 px-5 sm:px-6 bg-background">

        <div className="max-w-7xl mx-auto">

          <h2 className="h2 text-2xl sm:text-3xl lg:text-4xl">
            Latest Articles
          </h2>

          <p className="text-muted mt-2">
            Updates from the club
          </p>

          {/* MOBILE */}
          <div className="sm:hidden mt-6 flex gap-4 overflow-x-auto scrollbar-hide pb-2">

            {rest.map((item) => (
              <div key={item.id} className="min-w-[85%]">
                <NewsCard {...item} showReadMore />
              </div>
            ))}

          </div>

          {/* DESKTOP */}
          <div className="hidden sm:grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

            {rest.map((item) => (
              <NewsCard key={item.id} {...item} showReadMore />
            ))}

          </div>

        </div>

      </section>

      {/* =========================
          SUBSCRIBE
      ========================= */}
      <section className="bg-surface py-16 sm:py-20 lg:py-24">

        <div className="max-w-3xl mx-auto px-5 sm:px-6 flex flex-col items-center text-center gap-6">

          <img
            src="/images/icons/green-email-icon.svg"
            alt=""
            className="p-3 bg-primary/10 rounded-xl h-14"
          />

          <h2 className="h2 text-2xl sm:text-3xl lg:text-4xl">
            Never Miss an Update
          </h2>

          <p className="text-body-lg text-muted">
            Subscribe to our newsletter for the latest news, events, and training tips
          </p>

          <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3 mt-4">

            <input
              className="
                w-full
                rounded-xl
                border border-border
                bg-background
                px-5 py-3
                text-body
                outline-none
                focus:border-primary
                focus:ring-4
                focus:ring-primary/10
              "
              placeholder="Enter your email"
              type="email"
            />

            <button
              className="
                w-full sm:w-auto
                bg-primary
                text-white
                px-5 py-3
                rounded-xl
                font-medium
                transition
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>

    </section>
  );
}