// src/routes/sessions.ts
import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Get all sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      include: { bookings: true }, // optional: see how full each session is
    });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

export default router;