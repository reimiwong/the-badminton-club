// src/seed.ts
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  console.log("Clearing existing data...");
  await prisma.booking.deleteMany();
  await prisma.session.deleteMany();
  await prisma.sessionTemplate.deleteMany();
  await prisma.user.deleteMany();

  // ----------------------
  // Seed a test user
  // ----------------------
  const passwordHash = await bcrypt.hash("Test1234!", 10);

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: passwordHash,
    },
  });
  console.log("Seeded user:", user.email);

  // ----------------------
  // Seed session templates
  // ----------------------
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

  for (const day of weekdays) {
    const templatesCount = Math.random() < 0.5 ? 1 : 2;

    for (let i = 0; i < templatesCount; i++) {
      const type = Math.random() > 0.5 ? "Coaching" : "Match Play";
      const level = skillLevels[Math.floor(Math.random() * skillLevels.length)];
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

  console.log("Seeding complete.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });