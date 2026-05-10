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

// Get the date for a specific weekday in the same week as baseDate
function getDateForWeekday(baseDate: Date, dayName: string, hour = 18, minute = 0) {
  const targetDay = weekdays[dayName];
  if (targetDay === undefined) throw new Error(`Invalid day: ${dayName}`);

  const date = new Date(baseDate);
  const baseDay = date.getDay();
  let diff = targetDay - baseDay;
  if (diff < 0) diff += 7; // move forward within the week
  date.setDate(date.getDate() + diff);
  date.setHours(hour, minute, 0, 0);
  return date;
}

export async function generateWeeklySessions() {
  console.log("Fetching session templates...");
  const templates = await prisma.sessionTemplate.findMany();

  if (templates.length === 0) {
    console.log("No session templates found. Aborting.");
    return;
  }

  const today = new Date();

  // Get Monday of this week
  const thisWeekMonday = new Date(today);
  thisWeekMonday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  thisWeekMonday.setHours(0, 0, 0, 0);

  // Get Monday of next week
  const nextWeekMonday = new Date(thisWeekMonday);
  nextWeekMonday.setDate(thisWeekMonday.getDate() + 7);

  const sessionsToCreate: any[] = [];

  for (const template of templates) {
    const [hour, minute] = template.startTime.split(":").map(Number);

    // Generate session for this week
    const thisWeekDate = getDateForWeekday(thisWeekMonday, template.dayOfWeek, hour, minute);

    // Generate session for next week
    const nextWeekDate = getDateForWeekday(nextWeekMonday, template.dayOfWeek, hour, minute);

    [thisWeekDate, nextWeekDate].forEach((date) => {
      const description =
        template.type === "Coaching"
          ? `Improve your ${template.level.toLowerCase()} skills with hands-on coaching.`
          : `Casual or competitive ${template.level.toLowerCase()} match play session. Bring your racket!`;

      sessionsToCreate.push({
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
      });

      console.log(`Prepared session: ${template.title} (${template.type}) on ${date.toDateString()}`);
    });
  }

  console.log("Inserting sessions into database...");
  for (const session of sessionsToCreate) {
    await prisma.session.create({ data: session });
  }

  console.log(`Created ${sessionsToCreate.length} sessions.`);
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