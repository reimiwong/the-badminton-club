import { prisma } from "./lib/prisma.js";

async function main() {
  console.log("Seed started");

  // Create users
  const alice = await prisma.user.create({
    data: { name: "Alice Wong", email: "alice@example.com", password: "hashed123" },
  });
  const bob = await prisma.user.create({
    data: { name: "Bob Lee", email: "bob@example.com", password: "hashed456" },
  });
  console.log("Created users:", alice, bob);

  // Create sessions
  const morning = await prisma.session.create({
    data: { title: "Morning Badminton", date: new Date("2026-05-10T09:00:00Z"), capacity: 8 },
  });
  const evening = await prisma.session.create({
    data: { title: "Evening Badminton", date: new Date("2026-05-10T18:00:00Z"), capacity: 10 },
  });
  console.log("Created sessions:", morning, evening);

  // Create bookings
  await prisma.booking.create({ data: { userId: alice.id, sessionId: morning.id } });
  await prisma.booking.create({ data: { userId: bob.id, sessionId: evening.id } });
  console.log("Created bookings for users");

  console.log("Seed finished!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });