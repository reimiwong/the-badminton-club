// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) return res.status(401).json({ error: "Malformed token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    req.user = payload; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};