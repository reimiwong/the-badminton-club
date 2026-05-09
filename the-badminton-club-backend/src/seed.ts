// src/seed.ts
import { prisma } from "./lib/prisma.js"; // your existing prisma client

async function main() {
  console.log("Seeding started...");

  // Clear existing data (optional)
  await prisma.booking.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: {
      name: "Alice Wong",
      email: "alice@example.com",
      password: "hashed123",
    },
  });

  const bob = await prisma.user.create({
    data: {
      name: "Bob Lee",
      email: "bob@example.com",
      password: "hashed456",
    },
  });

  console.log("Created users:", alice.name, bob.name);

  // Create sessions
  const morning = await prisma.session.create({
    data: {
      title: "Morning Badminton",
      description: "Casual morning session",
      date: new Date("2026-05-10T09:00:00Z"),
      capacity: 8,
      type: "Coaching",      // required
      level: "Beginner",     // required
      price: 20,             // required
      coach: "Sarah Chen",   // optional
      location: "Court 1",   // optional
    },
  });

  const evening = await prisma.session.create({
    data: {
      title: "Evening Badminton",
      description: "Competitive evening session",
      date: new Date("2026-05-10T18:00:00Z"),
      capacity: 10,
      type: "Casual Play",    // required
      level: "Intermediate",  // required
      price: 15,              // required
      coach: null,            // optional
      location: "Court 2",    // optional
    },
  });

  console.log("Created sessions:", morning.title, evening.title);

  // Create bookings
  await prisma.booking.create({
    data: {
      userId: alice.id,
      sessionId: morning.id,
    },
  });

  await prisma.booking.create({
    data: {
      userId: bob.id,
      sessionId: evening.id,
    },
  });

  console.log("Created bookings for users");
  console.log("Seeding finished!");
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