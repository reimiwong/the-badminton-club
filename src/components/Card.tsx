
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
        group
        w-full max-w-[384px]
        bg-white rounded-2xl
        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
        overflow-hidden
        flex flex-col

        cursor-pointer
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
      <div className="h-[220px] w-full overflow-hidden">
        <img
          src={img.src}
          alt={img.alt}
          className="h-full w-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-3 p-6 flex-1 text-left items-start">
        <h3 className="font-bold text-[22px] leading-tight">
          {title}
        </h3>

        <p className="text-muted text-base">
          {description}
        </p>
<span className="group mt-auto text-primary font-medium inline-flex items-center gap-1">
          {link.title}
   
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
      </div>
    </NavLink>
  );
}
