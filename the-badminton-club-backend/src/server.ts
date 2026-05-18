import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import userRouter from "./routes/users.js";
import sessionsRouter from "./routes/sessions.js";
import bookingsRouter from "./routes/bookings.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://shamrockbadminton.co.uk",
  "https://www.shamrockbadminton.co.uk",
  "https://icy-pond-0b7ff0910.7.azurestaticapps.net",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

/* MIDDLEWARE ORDER (CRITICAL) */
app.set("trust proxy", 1);
// MUST be before routes (for refresh tokens)
app.use(cookieParser());
// Parse JSON bodies
app.use(express.json());

/*  ROUTES */
app.use("/api/users", userRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/bookings", bookingsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* START SERVER */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
