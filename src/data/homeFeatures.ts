
export type HomeFeature = {
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

export const homeFeatures: HomeFeature[] = [
  {
    title: "Expert Coaching",
    description: "Train with Edinburgh's finest badminton coaches",
    link: {
        title: "Meet Our Coaches",
        page: "/coaches",
    },
    img: {
      src: "./badminton-insight-photo.jpg",
      alt: "Photo of the coaches",
    },
  },

   {
    title: "Flexible Booking",
    description: "Book your session in seconds",
    link: {
        title: "Join a Session",
        page: "/booking",
    },
    img: {
      src: "./badminton-court.webp",
      alt: "Photo of badminton courts",
    },
  },

   {
    title: "Membership Plans",
    description: "Find the perfect plan for you game",
    link: {
        title: "View Plans",
        page: "/membership",
    },
    img: {
      src: "./club-photo.jpg",
      alt: "Photo of the badminton club members",
    },
  },
];
