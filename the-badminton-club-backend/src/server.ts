import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/users.js";
import sessionsRouter from "./routes/sessions.js"; // import your sessions router
import bookingsRouter from "./routes/bookings.js"

console.log("server.js script started");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

const allowedOrigins = [
  "http://localhost:5173",        // Vite dev
  "http://localhost:3000",        // optional
  process.env.FRONTEND_URL        // Azure frontend
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non‑browser tools (curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionsRouter); // mount sessions router
app.use("/api/bookings", bookingsRouter); // mount bookings router

// Test route
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() })
});

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start server 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});