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
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Ex-competitive player who built the club’s training philosophy. Obsessed with clean technique and discipline.",
  },
  {
    name: "Lin Dan",
    role: "Coach",
    image: "./lin-dan-photo.jpg",
    funIntro:
      "Tactician focused on doubles systems and match awareness. Notices patterns most players miss.",
  },
  {
    name: "Akane Yamaguchi",
    role: "Service Desk",
    image: "./akane-yamaguchi-photo.jpg",
    funIntro:
      "Keeps bookings, enquiries, and general chaos under control with surprising patience.",
  },
  {
    name: "Viktor Axelsen",
    role: "Coach",
    image: "./viktor-axelson-photo.webp",
    funIntro:
      "Technical coach focused on footwork correction and efficient movement patterns.",
  },
  {
    name: "Peter Gade",
    role: "Junior Coach",
    image: "./peter-gade-photo.jpg",
    funIntro:
      "Works with younger players, balancing discipline with making training enjoyable.",
  },
  {
    name: "Taufik Hidayat",
    role: "Strength & Conditioning Coach",
    image: "./taufik-hidayat-photo.jpg",
    funIntro:
      "Builds explosive power and endurance programs tailored for badminton performance.",
  },
  {
    name: "Kento Momota",
    role: "Service Desk",
    image: "./kento-momota-photo.webp",
    funIntro:
      "Organised, calm, and the reason peak-time bookings don’t fall apart.",
  },
  {
    name: "Carolina Marín",
    role: "Stringer",
    image: "./carolina-marin-photo.jpg",
    funIntro:
      "Keeps rackets tournament-ready. Treats string tension like a science experiment.",
  },
  {
    name: "James Carter",
    role: "Club Manager",
    image: "./random-guy-photo.webp",
    funIntro:
      "Runs the club operations side quietly but decisively. Fixes problems before they become visible.",
  },
  {
    name: "Shi Yuqi",
    role: "Founder",
    image: "./shi-yu-qi-photo.webp",
    funIntro:
      "Started the club with a couple of courts and a lot of ambition. Still shows up to sessions unannounced.",
  },
];