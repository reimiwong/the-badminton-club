// src/generateWeeklySessions.ts
import { prisma } from "./lib/prisma.js";

// Map weekdays to numbers
const weekdays: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// Get date for a specific weekday of a base Monday
function getDateForWeek(baseMonday: Date, dayName: string, hour = 18, minute = 0) {
  const dayOffset = weekdays[dayName];
  if (dayOffset === undefined) throw new Error(`Invalid day: ${dayName}`);

  const date = new Date(baseMonday);
  date.setDate(baseMonday.getDate() + dayOffset);
  date.setHours(hour, minute, 0, 0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export async function generateWeeklySessions() {
  console.log("Fetching session templates...");
  const templates = await prisma.sessionTemplate.findMany();
  if (!templates.length) {
    console.log("No session templates found. Aborting.");
    return;
  }

  const today = new Date();
  // Monday of this week
  const thisWeekMonday = new Date(today);
  thisWeekMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  thisWeekMonday.setHours(0, 0, 0, 0);

  // Monday of next week
  const nextWeekMonday = new Date(thisWeekMonday);
  nextWeekMonday.setDate(thisWeekMonday.getDate() + 7);

  const weeks = [thisWeekMonday, nextWeekMonday];

  for (const weekStart of weeks) {
    for (const template of templates) {
      const [hour, minute] = template.startTime.split(":").map(Number);
      const date = getDateForWeek(weekStart, template.dayOfWeek, hour, minute);

      const description =
        template.type === "Coaching"
          ? `Improve your ${template.level.toLowerCase()} skills with hands-on coaching.`
          : `Casual or competitive ${template.level.toLowerCase()} match play session. Bring your racket!`;

      // Upsert ensures no duplicates
      await prisma.session.upsert({
        where: {
          templateId_date: {
            templateId: template.id,
            date,
          },
        },
        update: {}, // do nothing if exists
        create: {
          templateId: template.id,
          title: template.title,
          description,
          date,
          location: template.location ?? "TBD",
          latitude: template.latitude ?? null,
          longitude: template.longitude ?? null,
          level: template.level,
          capacity: template.capacity,
          price: template.price,
          coach: template.coach ?? null,
        },
      });

      console.log(`Upserted session: ${template.title} (${template.type}) on ${date.toDateString()}`);
    }
  }

  console.log("Weekly sessions generated successfully.");
}

// ESM-safe CLI runner
if (import.meta.url === `file://${process.argv[1]}`) {
  generateWeeklySessions()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}