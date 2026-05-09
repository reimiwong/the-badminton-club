// src/seed.ts
import { prisma } from "./lib/prisma.js";

async function main() {
  console.log("Seeding started...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.session.deleteMany();
  await prisma.sessionTemplate.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: { name: "Alice Wong", email: "alice@example.com", password: "hashed123" },
  });

  const bob = await prisma.user.create({
    data: { name: "Bob Lee", email: "bob@example.com", password: "hashed456" },
  });

  console.log("Created users:", alice.name, bob.name);

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const coachingDays = ["Tuesday", "Thursday", "Saturday"];
  const matchPlayDays = ["Monday", "Wednesday", "Friday"];

  const coachingTemplates = [];
  const matchPlayTemplates = [];

  // Create Coaching templates (1.5h, capacity 16, price 15)
  for (const day of coachingDays) {
    for (const level of skillLevels) {
      const template = await prisma.sessionTemplate.create({
        data: {
          title: `${level} Coaching`,
          type: "Coaching",
          level,
          dayOfWeek: day,
          startTime: "12:00",
          duration: 90,
          coach: "Sarah Chen",
          location: "Court 1",
          capacity: 16,
          price: 15,
        },
      });
      coachingTemplates.push(template);
    }
  }

  // Create Match Play templates (2h, capacity 24, price 10)
  for (const day of matchPlayDays) {
    for (const level of skillLevels) {
      const template = await prisma.sessionTemplate.create({
        data: {
          title: `${level} Match Play`,
          type: "Match Play",
          level,
          dayOfWeek: day,
          startTime: "18:00",
          duration: 120,
          coach: null,
          location: "Court 2",
          capacity: 24,
          price: 10,
        },
      });
      matchPlayTemplates.push(template);
    }
  }

  // Helper to get next date for a given weekday
  const getNextDateOfWeekday = (weekday: string) => {
    const weekdays: Record<string, number> = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };
    const now = new Date();
    const targetDay = weekdays[weekday];
    const date = new Date(now);
    const diff = (targetDay + 7 - date.getDay()) % 7;
    date.setDate(date.getDate() + diff);
    return date;
  };

  // Create actual sessions for this week from templates
  const allTemplates = [...coachingTemplates, ...matchPlayTemplates];
  const sessions = [];
  for (const template of allTemplates) {
    const date = getNextDateOfWeekday(template.dayOfWeek);
    const session = await prisma.session.create({
      data: {
        templateId: template.id,
        date,
        capacity: template.capacity,
      },
    });
    sessions.push(session);
  }

  // Optional: create a few bookings
  if (sessions.length >= 2) {
    await prisma.booking.create({
      data: { userId: alice.id, sessionId: sessions[0].id },
    });
    await prisma.booking.create({
      data: { userId: bob.id, sessionId: sessions[1].id },
    });
  }

  console.log("Seeding finished. Created sessions and bookings.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });