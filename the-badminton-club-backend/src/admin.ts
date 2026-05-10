// src/generateWeeklySessions.ts
import { prisma } from "./lib/prisma.js";

// Helper: get the next date for a given day of the week (0 = Sunday, 6 = Saturday)
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
  date.setDate(date.getDate() + (diff === 0 && date < now ? 7 : diff));

  return date;
}

export async function generateWeeklySessions() {
  const templates = await prisma.sessionTemplate.findMany();
  const sessionsToCreate = [];

  for (const template of templates) {
    if (!template.startTime || !template.dayOfWeek || !template.level) {
      console.warn(`Skipping template ${template.id} due to missing data`);
      continue;
    }

    const [hourStr, minuteStr] = template.startTime.split(":");
    const hour = Number(hourStr);
    const minute = Number(minuteStr);

    // Generate 1-2 sessions per template per week
    const numSessions = Math.random() > 0.5 ? 1 : 2;

    for (let i = 0; i < numSessions; i++) {
      const baseDate = nextDayOfWeek(template.dayOfWeek, hour, minute);
      const sessionDate = new Date(baseDate);
      sessionDate.setDate(sessionDate.getDate() + i * 7); // next weeks

      // Optional: skip if session already exists
      const exists = await prisma.session.findFirst({
        where: { templateId: template.id, date: sessionDate },
      });
      if (exists) continue;

      sessionsToCreate.push({
        templateId: template.id,
        title: template.title,
        description:
          template.type === "Coaching"
            ? `Improve your ${template.level.toLowerCase()} skills with hands-on coaching.`
            : `Casual or competitive match play for ${template.level.toLowerCase()} players.`,
        date: sessionDate,
        location: template.location || "TBD",
        level: template.level,
        capacity: template.capacity,
        price: template.price,
        coach: template.coach || null,
      });
    }
  }

  // Batch insert into DB
  if (sessionsToCreate.length) {
    await prisma.session.createMany({ data: sessionsToCreate });
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