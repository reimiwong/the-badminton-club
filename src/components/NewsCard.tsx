
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
        h-[436px]
        bg-white rounded-2xl
        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
        overflow-hidden
        flex flex-col
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(0,0,0,0.14)]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
      "
    >
      {/* IMAGE HEADER */}
      <div className="h-[220px] w-full bg-gray-100 overflow-hidden">
        {img.src && (
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-1 gap-8 px-6 py-6 text-left items-start">
        <div className="flex items-center gap-3 text-sm">
          <span className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-muted">{date}</span>
        </div>

        <h3 className="font-bold text-[22px] leading-tight">
          {title}
        </h3>

        <p className="text-muted text-base leading-relaxed">
          {excerpt}
        </p>
      </div>
    </NavLink>
  );
}
