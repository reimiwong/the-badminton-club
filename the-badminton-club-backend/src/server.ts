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
app.use(cors());
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