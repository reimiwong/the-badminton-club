// src/routes/bookings.ts
import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, AuthRequest } from "../middleware/auth.js";

const router = Router();

// Get all bookings for logged-in user
router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user!.id },
      include: { session: true },
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Create a booking for a session
router.post("/", authenticate, async (req: AuthRequest, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Missing sessionId" });
  }

  try {
    // Optionally: check if session exists and capacity isn't full
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { bookings: true },
    });
    if (!session) return res.status(404).json({ error: "Session not found" });

    if (session.bookings.length >= session.capacity) {
      return res.status(400).json({ error: "Session is full" });
    }

    // Prevent duplicate booking
    const existing = await prisma.booking.findFirst({
      where: { userId: req.user!.id, sessionId },
    });
    if (existing) return res.status(409).json({ error: "Already booked" });

    const booking = await prisma.booking.create({
      data: { userId: req.user!.id, sessionId },
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

export default router;