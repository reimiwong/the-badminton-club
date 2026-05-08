export type TeamRole =
  | "Founder"
  | "Lead Coach"
  | "Coach"
  | "Junior Coach"
  | "Strength & Conditioning Coach"
  | "Service Desk"
  | "Stringer"
  | "Club Manager";

export type TeamMember = {
  name: string;
  role: TeamRole;
  image: string;
  funIntro: string;
};

export const team: TeamMember[] = [
  {
    name: "Lee Chong Wei",
    role: "Lead Coach",
    image: "/images/team-members/lee-chong-wei-photo.jpg",
    funIntro:
      "Ex-competitive player who built the club’s training philosophy. Obsessed with clean technique and discipline.",
  },
  {
    name: "Lin Dan",
    role: "Coach",
    image: "/images/team-members/lin-dan-photo.jpg",
    funIntro:
      "Tactician focused on doubles systems and match awareness. Notices patterns most players miss.",
  },
  {
    name: "Akane Yamaguchi",
    role: "Service Desk",
    image: "/images/team-members/akane-yamaguchi-photo.jpg",
    funIntro:
      "Keeps bookings, enquiries, and general chaos under control with surprising patience.",
  },
  {
    name: "Viktor Axelsen",
    role: "Coach",
    image: "/images/team-members/viktor-axelson-photo.webp",
    funIntro:
      "Technical coach focused on footwork correction and efficient movement patterns.",
  },
  {
    name: "Peter Gade",
    role: "Junior Coach",
    image: "/images/team-members/peter-gade-photo.jpg",
    funIntro:
      "Works with younger players, balancing discipline with making training enjoyable.",
  },
  {
    name: "Taufik Hidayat",
    role: "Strength & Conditioning Coach",
    image: "/images/team-members/taufik-hidayat-photo.jpg",
    funIntro:
      "Builds explosive power and endurance programs tailored for badminton performance.",
  },
  {
    name: "Kento Momota",
    role: "Service Desk",
    image: "/images/team-members/kento-momota-photo.webp",
    funIntro:
      "Organised, calm, and the reason peak-time bookings don’t fall apart.",
  },
  {
    name: "Carolina Marín",
    role: "Stringer",
    image: "/images/team-members/carolina-marin-photo.jpg",
    funIntro:
      "Keeps rackets tournament-ready. Treats string tension like a science experiment.",
  },
  {
    name: "James Carter",
    role: "Club Manager",
    image: "/images/team-members/random-guy-photo.webp",
    funIntro:
      "Runs the club operations side quietly but decisively. Fixes problems before they become visible.",
  },
  {
    name: "Shi Yuqi",
    role: "Founder",
    image: "/images/team-members/shi-yu-qi-photo.webp",
    funIntro:
      "Started the club with a couple of courts and a lot of ambition. Still shows up to sessions unannounced.",
  },
];