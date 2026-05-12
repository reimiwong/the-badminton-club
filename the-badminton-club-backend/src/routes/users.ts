import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticate, AuthRequest } from "../middleware/auth.js";

export const userRouter = Router();

/* =========================
   ENV SAFETY CHECK
========================= */

if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("Missing JWT environment variables");
}

/* =========================
   TOKEN HELPERS
========================= */

const ACCESS_TOKEN_EXPIRES = "15m";
const REFRESH_TOKEN_EXPIRES = "7d";

function createAccessToken(payload: { id: number; email: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
  });
}

function createRefreshToken(payload: { id: number; email: string }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRES,
  });
}

/* =========================
   SIGNUP
========================= */

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "Email already exists" });
    }

    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/* =========================
   LOGIN
========================= */

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.password) {
      console.error("User missing password hash:", user.id);
      return res.status(500).json({ error: "Corrupt user record" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = createAccessToken({
      id: user.id,
      email: user.email,
    });

    const refreshToken = createRefreshToken({
      id: user.id,
      email: user.email,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/users/refresh",
    });

    return res.json({
      accessToken,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: "Login failed" });
  }
});

/* =========================
   REFRESH TOKEN
========================= */

userRouter.post("/refresh", (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as { id: number; email: string };

    const newAccessToken = createAccessToken({
      id: payload.id,
      email: payload.email,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("REFRESH ERROR:", err);
    return res.status(401).json({ error: "Invalid refresh token" });
  }
});

/* =========================
   LOGOUT
========================= */

userRouter.post("/logout", (_req, res) => {
  res.clearCookie("refreshToken", {
    path: "/api/users/refresh",
  });

  res.sendStatus(204);
});

/* =========================
   CURRENT USER
========================= */

userRouter.get("/me", authenticate, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { name: true, email: true },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

/* =========================
   USER BOOKINGS
========================= */

userRouter.get("/me/bookings", authenticate, async (req: AuthRequest, res) => {
  const userWithSessions = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: {
      id: true,
      name: true,
      email: true,
      bookings: {
        include: {
          session: true,
        },
      },
    },
  });

  res.json(userWithSessions);
});

export default userRouter;