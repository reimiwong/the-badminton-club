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
    title: "Spring Championship 2026 Registration Now Open",
    excerpt:
      "Our biggest seasonal tournament returns this spring. Compete across all levels, from beginners to advanced players, with prizes and club awards.",
    category: "Tournament",
    date: "May 1, 2026",
    link: "/news/spring-championship-2026",
    img: {
      src: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
      alt: "Badminton shuttlecock mid-air during competitive match",
    },
  },
  {
    id: "new-head-coach-2026",
    title: "International Head Coach Joins Coaching Team",
    excerpt:
      "We’re welcoming a new head coach with international tournament experience to elevate our training programs and player development structure.",
    category: "Coaching",
    date: "April 18, 2026",
    link: "/news/new-head-coach-2026",
    img: {
      src: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
      alt: "Coach giving badminton training instructions",
    },
  },
  {
    id: "junior-development-program",
    title: "Junior Development Program Expands for 2026",
    excerpt:
      "Due to high demand, we are expanding our junior training program with additional sessions focused on skill progression and match experience.",
    category: "Community",
    date: "March 30, 2026",
    link: "/news/junior-development-program",
    img: {
      src: "https://images.unsplash.com/photo-1594736797933-d0d6c7b3a5a2?auto=format&fit=crop&w=1200&q=80",
      alt: "Young badminton players training indoors",
    },
  },
  {
    id: "summer-camp-announcement",
    title: "Summer Training Camp Dates Announced",
    excerpt:
      "Intensive summer camps are now scheduled, featuring focused drills, fitness training, and competitive match play for all age groups.",
    category: "Announcement",
    date: "March 12, 2026",
    link: "/news/summer-camp-2026",
    img: {
      src: "https://images.unsplash.com/photo-1521417531039-0d9f9c7f0f3c?auto=format&fit=crop&w=1200&q=80",
      alt: "Indoor badminton courts prepared for training camp",
    },
  },
  {
    id: "club-membership-growth",
    title: "Club Membership Hits Record Growth in 2026",
    excerpt:
      "We’ve reached a new milestone in membership, reflecting the growing interest in structured badminton training and community play.",
    category: "Community",
    date: "February 25, 2026",
    link: "/news/membership-growth-2026",
    img: {
      src: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=80",
      alt: "Group celebrating badminton match victory",
    },
  },
  {
    id: "evening-session-update",
    title: "Extended Evening Court Hours Introduced",
    excerpt:
      "To support demand, we are extending evening booking slots, giving members more flexibility for after-work and late training sessions.",
    category: "Announcement",
    date: "February 10, 2026",
    link: "/news/evening-court-hours",
    img: {
      src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
      alt: "Badminton courts under indoor lighting",
    },
  },
];