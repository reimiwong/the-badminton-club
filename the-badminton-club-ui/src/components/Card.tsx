import { NavLink } from "react-router-dom";

type CardProps = {
  title: string;
  description: string;
  link: {
    title: string;
    page: string;
  };
  img: {
    src: string;
    alt: string;
  };
};

export default function Card({ title, description, link, img }: CardProps) {
  return (
    <NavLink
      to={link.page}
      className="
        group w-full flex flex-col
        bg-surface
        rounded-2xl overflow-hidden

        shadow-md
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-xl

        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-primary
      "
    >
      {/* IMAGE */}
      <div className="w-full min-h-[220px] h-[220px] sm:h-[220px] overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 gap-3 px-4 py-6 sm:px-6 text-left">
        {/* TITLE */}
        <h3 className="h3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-body text-muted leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* LINK */}
        <span className="mt-auto inline-flex items-center gap-2 text-primary font-medium flex-wrap">
          {link.title}
          <img
            src="/images/icons/green-arrow-icon.svg"
            alt=""
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </span>
      </div>
    </NavLink>
  );
}