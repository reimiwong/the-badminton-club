// src/generateWeeklySessions.ts
import { prisma } from "./lib/prisma.js";

// Map weekdays to numbers for Date calculations
const weekdays: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

// Get next occurrence of a weekday
function nextWeekday(dayName: string, hour = 18, minute = 0) {
  const dayNum = weekdays[dayName];
  if (dayNum === undefined) throw new Error(`Invalid day: ${dayName}`);

  const now = new Date();
  const date = new Date(now);
  date.setHours(hour, minute, 0, 0);

  let diff = (dayNum + 7 - date.getDay()) % 7;
  if (diff === 0 && date < now) diff = 7; // next week if today already passed
  date.setDate(date.getDate() + diff);
  return date;
}

// Generate sessions for the upcoming week
export async function generateWeeklySessions() {
  console.log("Fetching session templates...");
  const templates = await prisma.sessionTemplate.findMany();

  if (templates.length === 0) {
    console.log("No session templates found. Aborting.");
    return;
  }

  const sessionsToCreate = [];

  for (const template of templates) {
    const [hour, minute] = template.startTime.split(":").map(Number);
    const sessionDate = nextWeekday(template.dayOfWeek, hour, minute);

    const description =
      template.type === "Coaching"
        ? `Improve your ${template.level.toLowerCase()} skills with hands-on coaching.`
        : `Casual or competitive ${template.level.toLowerCase()} match play session. Bring your racket!`;

    sessionsToCreate.push({
      templateId: template.id,
      title: template.title,
      description,
      date: sessionDate,
      location: template.location ?? "TBD",
      latitude: template.latitude ?? null,
      longitude: template.longitude ?? null,
      level: template.level,
      capacity: template.capacity,
      price: template.price,
      coach: template.coach ?? null,
    });

    console.log(
      `Prepared session: ${template.title} (${template.type}) on ${sessionDate.toDateString()}`
    );
  }

  console.log("Inserting sessions into database...");
  for (const session of sessionsToCreate) {
    await prisma.session.create({ data: session });
  }

  console.log(`Created ${sessionsToCreate.length} session(s).`);
}

// CLI runner
if (import.meta.url === `file://${process.argv[1]}`) {
  generateWeeklySessions()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}