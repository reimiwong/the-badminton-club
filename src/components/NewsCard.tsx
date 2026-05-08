import { NavLink } from "react-router-dom";

type NewsCardProps = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  link: string;
  img: {
    src: string;
    alt: string;
  };
  showReadMore?: boolean;
};

export default function NewsCard({
  title,
  excerpt,
  category,
  date,
  link,
  img,
  showReadMore = false,
}: NewsCardProps) {
  return (
    <NavLink
      to={link}
      className="
        group
        w-full
        h-[380px] sm:h-[436px]
        bg-white rounded-2xl
        overflow-hidden
        flex flex-col

        border border-black/10
        shadow-[0_2px_6px_rgba(0,0,0,0.04)]

        sm:border-black/5
        sm:shadow-[0_14px_36px_rgba(0,0,0,0.18)]
        hover:sm:shadow-[0_28px_70px_rgba(0,0,0,0.28)]

        transition-all duration-300 ease-out
        hover:scale-[1.02]

        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
      "
    >
      {/* IMAGE */}
      <div className="h-[160px] sm:h-[220px] w-full bg-gray-100 overflow-hidden">
        {img.src && (
          <img
            src={img.src}
            alt={img.alt}
            className="
              h-full w-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-[1.06]
            "
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 gap-4 px-6 py-6 text-left items-start">

        {/* META */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-muted">{date}</span>
        </div>

        {/* TITLE */}
        <h3 className="font-bold text-[18px] sm:text-[22px] leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-primary">
  {title}
</h3>

        {/* EXCERPT */}
     <p className="text-muted text-sm sm:text-base leading-relaxed line-clamp-3 transition-opacity duration-200 group-hover:opacity-80">
  {excerpt}
</p>

        {/* READ MORE */}
        {showReadMore && (
          <span className="group mt-auto text-primary font-medium inline-flex items-center gap-1">
            Read More
            <img
              src="./green-arrow.svg"
              alt=""
              aria-hidden="true"
              className="
                transition-transform
                duration-200
                ease-out
                group-hover:translate-x-1
              "
            />
          </span>
        )}

      </div>
    </NavLink>
  );
}