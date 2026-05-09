import { prisma } from "./lib/prisma.js";

const weekdays: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

function getNextWeekDate(templateDayNum: number) {
  const today = new Date();
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + ((1 - today.getDay() + 7) % 7));
  const date = new Date(nextMonday);
  date.setDate(nextMonday.getDate() + (templateDayNum - 1));
  return date;
}

async function main() {
  console.log("Generating sessions for next week...");

  const templates = await prisma.sessionTemplate.findMany();

  for (const template of templates) {
    const templateDayNum = weekdays[template.dayOfWeek];
    const sessionDate = getNextWeekDate(templateDayNum);

    // Check if a session already exists for this template and week
    const exists = await prisma.session.findFirst({
      where: {
        templateId: template.id,
        date: {
          gte: sessionDate,
          lt: new Date(sessionDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    if (!exists) {
      await prisma.session.create({
        data: {
          templateId: template.id,
          date: sessionDate,
          capacity: template.capacity,
        },
      });
      console.log(`Created session for ${template.dayOfWeek} ${template.title}`);
    }
  }

  console.log("Finished generating sessions.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); });