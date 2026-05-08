import "dotenv/config";
import { prisma } from "./lib/prisma.js";

async function main() {
  console.log("Connecting to DB...");

  const users = await prisma.user.findMany();
  console.log("Users in DB:", users);

  const sessions = await prisma.session.findMany();
  console.log("Sessions in DB:", sessions);
}

main()
  .then(() => {
    console.log("Done.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("Error:", e);
    prisma.$disconnect();
  });