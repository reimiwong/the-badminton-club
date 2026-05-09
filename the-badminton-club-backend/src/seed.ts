// src/seedTemplates.ts
import { prisma } from "./lib/prisma.js";

async function main() {
  console.log("Seeding templates...");

  // Clear existing templates
  await prisma.sessionTemplate.deleteMany();

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const coachingDays = ["Tuesday", "Thursday", "Saturday"];
  const matchPlayDays = ["Monday", "Wednesday", "Friday"];

  // Create coaching templates
  for (const day of coachingDays) {
    for (const level of skillLevels) {
      await prisma.sessionTemplate.create({
        data: {
          title: `${day} ${level} Coaching`,
          type: "Coaching",
          level,
          dayOfWeek: day,
          startTime: "12:00",
          duration: 90,
          coach: "Sarah Chen",
          location: "Court 1",
          capacity: 15,
          price: 15,
        },
      });
    }
  }

  // Create match play templates
  for (const day of matchPlayDays) {
    for (const level of skillLevels) {
      await prisma.sessionTemplate.create({
        data: {
          title: `${day} ${level} Match Play`,
          type: "Match Play",
          level,
          dayOfWeek: day,
          startTime: "18:00",
          duration: 120,
          coach: null,
          location: "Court 2",
          capacity: 10,
          price: 10,
        },
      });
    }
  }

  console.log("Templates seeded.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });