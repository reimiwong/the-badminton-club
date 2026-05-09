// routes/sessions.js
import express from "express";
import { prisma } from "../lib/prisma.js"; // adjust import if needed

const router = express.Router();

router.get("/", async (req, res) => {
  try {
  const sessions = await prisma.session.findMany({
  include: {
    template: {
      select: {
        id: true,
        title: true,
        type: true,
        level: true,
        dayOfWeek: true,
        startTime: true,
        duration: true,
        coach: true,
        location: true,
        capacity: true,
        price: true,
      }
    },
    bookings: true,
  },
  orderBy: { date: "asc" }
});
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

export default router;