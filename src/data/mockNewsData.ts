// src/data/news.ts

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: "Tournament" | "Announcement" | "Coaching" | "Community";
  date: string;
  link: string;
  img: {
    src: string;
    alt: string;
  };
};

export const news: NewsItem[] = [
  {
    id: "spring-championship-2026",
    title: "Spring Championship Registration Open",
    excerpt:
      "Sign up now for our annual spring tournament. All skill levels are welcome, with prizes and refreshments included.",
    category: "Tournament",
    date: "May 1, 2026",
    link: "/news/spring-championship-2026",
    img: {
      src: "/images/news/spring-championship.jpg",
      alt: "Badminton shuttlecocks and rackets on a court",
    },
  },
  {
    id: "new-coach-joining",
    title: "New Senior Coach Joins The Badminton Club",
    excerpt:
      "We are excited to welcome an experienced international coach to our training team starting this summer.",
    category: "Coaching",
    date: "April 18, 2026",
    link: "/news/new-senior-coach",
    img: {
      src: "/images/news/new-coach.jpg",
      alt: "Coach giving instructions during a badminton session",
    },
  }
];