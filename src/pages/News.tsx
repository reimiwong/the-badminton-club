import { news } from "../data/mockNewsData";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [featured, ...rest] = news;

  return (
    <div>
      {/* HERO */}
      <div className="flex flex-col items-center text-center pt-16 pb-20 bg-[#F7FAF8] px-6">
        <h1 className="text-5xl font-bold">
          News & <span className="text-primary">Updates</span>
        </h1>

        <h3 className="mt-3 text-muted text-xl max-w-3xl">
          Stay informed about tournaments, training programs, and club
          announcements
        </h3>
      </div>

      {/* FEATURED SECTION */}
      <section className="py-16 px-6 flex justify-center bg-white">
  <div className="w-full max-w-7xl">

    <a
      href={featured.link}
      className="
        group flex flex-col md:flex-row

        bg-white rounded-3xl overflow-hidden
        border border-black/10

        shadow-[0_18px_50px_rgba(0,0,0,0.15)]
        hover:shadow-[0_30px_80px_rgba(0,0,0,0.25)]

        transition-all duration-300

        md:h-[420px]
      "
    >
      {/* IMAGE */}
      <div className="md:w-1/2 w-full h-[240px] md:h-full relative overflow-hidden">
        
        <div className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>

        <img
          src={featured.img.src}
          alt={featured.img.alt}
          className="
            w-full h-full
            object-cover
            object-center
            group-hover:scale-105
            transition-transform duration-700
          "
        />
      </div>

      {/* CONTENT */}
      <div className="md:w-1/2 w-full p-8 flex flex-col justify-center gap-4 text-left">

        <div className="flex items-center gap-3 text-sm">
          <span className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
            {featured.category}
          </span>
          <span className="text-muted">{featured.date}</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold leading-tight transition-colors duration-200 group-hover:text-primary">
          {featured.title}
        </h2>

        <p className="text-muted text-base leading-relaxed">
          {featured.excerpt}
        </p>

        <div className="flex items-center gap-2 text-primary font-medium mt-2">
          <span>Read full article</span>
          <img
            src="./green-arrow.svg"
            alt=""
            aria-hidden="true"
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>

      </div>
    </a>

  </div>
</section>

      {/* LATEST ARTICLES */}
      <section className="pt-10 pb-30 px-6 flex justify-center bg-[#F7FAF8]">
        <div className="w-full max-w-7xl flex flex-col gap-10">
          <h2 className="text-3xl font-bold text-left">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                excerpt={item.excerpt}
                category={item.category}
                date={item.date}
                link={item.link}
                img={item.img}
                showReadMore={true}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white flex flex-col gap-8 items-center py-18">
      <img className="p-3 bg-primary/10 rounded-xl" src="green-email-icon.svg" />
          <h2 className="text-4xl font-bold">Never Miss an Update</h2>
          <h3 className="text-muted text-xl">Subscribe to our newsletter for the latest news, events, and training tips</h3>

     
              <form className="flex flex-row gap-5 w-full max-w-lg">
                <input 
                className="border
                flex-1
                border-black/20
                rounded-xl
                px-5 py-3 "
                placeholder="Enter your email"
                type="email"></input>
                <button className="bg-primary rounded-xl px-5 py-3 text-white">Subscribe</button>
              </form>
        
       
      </div>
    </div>
  );
}
