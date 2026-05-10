// routes/sessions.js
import express from "express";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

// GET all sessions (already exists)
router.get("/", async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        template: true,
        bookings: true,
      },
      orderBy: { date: "asc" },
    });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// GET single session by ID
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid session ID" });

  try {
    const session = await prisma.session.findUnique({
      where: { id },
      include: {
        template: true,
        bookings: true,
      },
    });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch session" });
  }
});

export default router;