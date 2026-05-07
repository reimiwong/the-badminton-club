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
    name: "Alex Chen",
    role: "Lead Coach",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Ex-competitive player who built the club’s training philosophy. Obsessed with clean technique and discipline.",
  },
  {
    name: "Sarah Patel",
    role: "Coach",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Tactician focused on doubles systems and match awareness. Notices patterns most players miss.",
  },
  {
    name: "Mark Evans",
    role: "Service Desk",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Keeps bookings, enquiries, and general chaos under control with surprising patience.",
  },
  {
    name: "Daniel Wong",
    role: "Coach",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Technical coach focused on footwork correction and efficient movement patterns.",
  },
  {
    name: "Emily Tan",
    role: "Junior Coach",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Works with younger players, balancing discipline with making training enjoyable.",
  },
  {
    name: "Jason Lim",
    role: "Strength & Conditioning Coach",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Builds explosive power and endurance programs tailored for badminton performance.",
  },
  {
    name: "Priya Nair",
    role: "Service Desk",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Organised, calm, and the reason peak-time bookings don’t fall apart.",
  },
  {
    name: "Tom Hughes",
    role: "Stringer",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Keeps rackets tournament-ready. Treats string tension like a science experiment.",
  },
  {
    name: "Aisha Rahman",
    role: "Club Manager",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Runs the club operations side quietly but decisively. Fixes problems before they become visible.",
  },
  {
    name: "Michael Lee",
    role: "Founder",
    image: "./lee-chong-wei-photo.jpg",
    funIntro:
      "Started the club with a couple of courts and a lot of ambition. Still shows up to sessions unannounced.",
  },
];