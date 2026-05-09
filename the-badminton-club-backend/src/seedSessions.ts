// src/seedSessions.ts
import { prisma } from "./lib/prisma.js";

async function main() {
  const sessions = [
    // --- Coaching ---
    {
      title: "Beginner Coaching - Monday",
      date: new Date("2026-05-05T18:00:00Z"),
      capacity: 8,
      type: "Coaching",
      level: "Beginner",
      price: 20,
      coach: "Sarah Chen",
      location: "Court 1"
    },
    {
      title: "Intermediate Coaching - Tuesday",
      date: new Date("2026-05-06T18:00:00Z"),
      capacity: 8,
      type: "Coaching",
      level: "Intermediate",
      price: 25,
      coach: "Michael O'Brien",
      location: "Court 1"
    },
    {
      title: "Advanced Coaching - Wednesday",
      date: new Date("2026-05-07T19:00:00Z"),
      capacity: 6,
      type: "Coaching",
      level: "Advanced",
      price: 30,
      coach: "Alex Wong",
      location: "Court 1"
    },
    // --- Games Sessions ---
    {
      title: "Beginner Games - Thursday",
      date: new Date("2026-05-08T17:00:00Z"),
      capacity: 12,
      type: "Games Session",
      level: "Beginner",
      price: 15,
      coach: "N/A",
      location: "Court 2"
    },
    {
      title: "Intermediate Games - Friday",
      date: new Date("2026-05-09T17:00:00Z"),
      capacity: 12,
      type: "Games Session",
      level: "Intermediate",
      price: 15,
      coach: "N/A",
      location: "Court 2"
    },
    {
      title: "Advanced Games - Saturday",
      date: new Date("2026-05-10T18:00:00Z"),
      capacity: 12,
      type: "Games Session",
      level: "Advanced",
      price: 20,
      coach: "N/A",
      location: "Court 2"
    },
    // Extra coaching sessions
    {
      title: "Beginner Coaching - Sunday",
      date: new Date("2026-05-11T10:00:00Z"),
      capacity: 8,
      type: "Coaching",
      level: "Beginner",
      price: 20,
      coach: "Emily Davis",
      location: "Court 1"
    },
    {
      title: "Intermediate Coaching - Sunday",
      date: new Date("2026-05-11T11:30:00Z"),
      capacity: 8,
      type: "Coaching",
      level: "Intermediate",
      price: 25,
      coach: "Chris Lee",
      location: "Court 1"
    }
  ];

  await prisma.session.createMany({ data: sessions });

  console.log("Seeded sessions successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
  });