// src/seed.ts
import { prisma } from "./lib/prisma.js";

// Helper: get next occurrence of a weekday
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

  let diff = (targetDay + 7 - date.getDay()) % 7;
  if (diff === 0 && date < now) diff = 7;
  date.setDate(date.getDate() + diff);
  return date;
}

async function main() {
  console.log("Clearing existing data...");
  await prisma.booking.deleteMany();
  await prisma.session.deleteMany();
  await prisma.sessionTemplate.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding session templates...");

  const skillLevels = ["Beginner", "Intermediate", "Advanced"];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = {
    Coaching: ["10:00", "12:00", "14:00"],
    "Match Play": ["16:00", "18:00", "20:00"],
  };
  const coaches = ["Lee Chong Wei", "Lin Dan", "Kento Momota", "Peter Gade", "Viktor Axelsen"];
  const locations = [
    { name: "Mary Erskine School", lat: 55.9492, lng: -3.1900 },
    { name: "Meadowbank Sports Centre", lat: 55.9520, lng: -3.1690 },
  ];

  // Seed templates
  for (const day of weekdays) {
    for (const level of skillLevels) {
      const type = Math.random() > 0.5 ? "Coaching" : "Match Play";
      const slot = timeSlots[type][Math.floor(Math.random() * timeSlots[type].length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const coach = type === "Coaching" ? coaches[Math.floor(Math.random() * coaches.length)] : null;

      await prisma.sessionTemplate.create({
        data: {
          title: `${day} ${level} ${type}`,
          type,
          level,
          dayOfWeek: day,
          startTime: slot,
          duration: type === "Coaching" ? 90 : 120,
          coach,
          location: location.name,
          latitude: location.lat,
          longitude: location.lng,
          capacity: type === "Coaching" ? 15 : 10,
          price: type === "Coaching" ? 15 : 10,
        },
      });
    }
  }

  console.log("Seeding sessions from templates...");

  const templates = await prisma.sessionTemplate.findMany();

  // Create 4 upcoming sessions per template
  for (const template of templates) {
    for (let i = 0; i < 4; i++) {
      const [hour, minute] = template.startTime.split(":").map(Number);
      const date = nextDayOfWeek(template.dayOfWeek, hour, minute);
      date.setDate(date.getDate() + i * 7); // next 4 weeks

      await prisma.session.create({
        data: {
          templateId: template.id,
          title: template.title,
          description:
            template.type === "Coaching"
              ? `Improve your ${template.level.toLowerCase()} skills with hands-on coaching.`
              : `Casual or competitive ${template.level.toLowerCase()} match play session. Bring your racket!`,
          date,
          location: template.location!,
          latitude: template.latitude,
          longitude: template.longitude,
          level: template.level,
          capacity: template.capacity,
          price: template.price,
          coach: template.coach, // can be null for match play
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