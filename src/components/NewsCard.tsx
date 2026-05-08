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
}: NewsCardProps) {
  return (
    <NavLink
      to={link}
      className="
        group
        w-full
        h-[380px] sm:h-[436px]   /* keeps desktop layout intact */

        bg-surface
        rounded-2xl
        overflow-hidden
        flex flex-col

        border border-border
        shadow-[0_2px_6px_rgba(0,0,0,0.04)]
        sm:shadow-[0_14px_36px_rgba(0,0,0,0.18)]
        hover:sm:shadow-[0_28px_70px_rgba(0,0,0,0.28)]

        transition-all duration-300 ease-out
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
      "
    >
      {/* IMAGE */}
      <div className="h-[160px] sm:h-[220px] w-full bg-background overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className="
            h-full w-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.06]
          "
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6">
        {/* META */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <span className="bg-primary/10 text-primary font-medium px-2 sm:px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="muted text-xs sm:text-sm">{date}</span>
        </div>

        {/* TITLE */}
        <h3 className="h3 group-hover:text-primary transition-colors line-clamp-2 sm:line-clamp-2">
          {title}
        </h3>

        {/* EXCERPT */}
        <p className="body muted line-clamp-3 sm:line-clamp-3 group-hover:opacity-80 transition-opacity text-sm sm:text-body">
          {excerpt}
        </p>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-2 text-primary font-medium text-sm sm:text-base">
          <span>Read More</span>
          <img
            src="/images/icons/green-arrow-icon.svg"
            alt=""
            aria-hidden="true"
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </div>
      </div>
    </NavLink>
  );
}