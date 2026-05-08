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
      <div className="flex flex-col flex-1 gap-3 px-6 py-6">

        {/* META */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <span className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-muted">{date}</span>
        </div>

        {/* TITLE */}
        <h3 className="font-bold text-[18px] sm:text-[22px] leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* EXCERPT */}
        <p className="text-muted text-sm sm:text-base leading-relaxed line-clamp-3 group-hover:opacity-80 transition-opacity">
          {excerpt}
        </p>

        {/* READ MORE (BOTTOM LEFT FIXED) */}
        <div className="mt-auto flex items-center justify-start gap-2 text-primary font-medium">
          <span>Read More</span>

          <img
            src="/images/icons/green-arrow-icon.svg"
            alt=""
            aria-hidden="true"
            className="
              w-4 h-4
              transition-transform duration-200 ease-out
              group-hover:translate-x-1
            "
          />
        </div>

      </div>
    </NavLink>
  );
}