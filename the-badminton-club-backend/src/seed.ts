// src/seed.ts
import { prisma } from "./lib/prisma.js";

// Helper to get next occurrence of a day (0 = Sunday, 6 = Saturday)
function nextDayOfWeek(dayName: string, hour = 18, minute = 0) {
  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const targetDay = dayMap[dayName];
  if (targetDay === undefined) throw new Error(`Invalid day: ${dayName}`);

  const now = new Date();
  const date = new Date(now);
  date.setHours(hour, minute, 0, 0);

  const diff = (targetDay + 7 - date.getDay()) % 7;
  if (diff === 0 && date < now) date.setDate(date.getDate() + 7);
  else date.setDate(date.getDate() + diff);

  return date;
}

async function main() {
  console.log("Clearing existing data...");
  await prisma.booking.deleteMany();
  await prisma.session.deleteMany();
  await prisma.sessionTemplate.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding templates...");

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const coachingDays = ["Tuesday", "Thursday", "Saturday"];
  const matchPlayDays = ["Monday", "Wednesday", "Friday"];

  // Coaching templates
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

  // Match Play templates
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

  console.log("Seeding sessions from templates...");

  const templates = await prisma.sessionTemplate.findMany();

  for (const template of templates) {
    // Create 4 sessions per template, one week apart
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i * 7);
      await prisma.session.create({
        data: {
          templateId: template.id,
          title: template.title,
          description:
            template.type === "Coaching"
              ? `Improve your ${template.level.toLowerCase()} skills with hands-on coaching.`
              : `Casual or competitive match play for ${template.level.toLowerCase()} players.`,
          date,
          location: template.location!,
          level: template.level,
          capacity: template.capacity,
          price: template.price, // required
        },
      });
    }
  }

  console.log("Seeding complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });