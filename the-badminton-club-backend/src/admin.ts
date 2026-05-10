import { prisma } from "./lib/prisma.js";

export async function generateWeeklySessions() {
  const weekdays: Record<string, number> = {
    Sunday: 0, Monday: 1, Tuesday: 2,
    Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
  };

  const templates = await prisma.sessionTemplate.findMany();

  const today = new Date();
  const nextWeekStart = new Date(today);
  nextWeekStart.setDate(today.getDate() + 7 - today.getDay() + 1); // next Monday

  const sessionsToCreate = [];

  for (const template of templates) {
    const templateDayNum = weekdays[template.dayOfWeek];
    const date = new Date(nextWeekStart);
    date.setDate(nextWeekStart.getDate() + (templateDayNum - 1));
    sessionsToCreate.push({
      templateId: template.id,
      date,
      capacity: template.capacity,
    });
  }

  for (const s of sessionsToCreate) {
    await prisma.session.create({ data: s });
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