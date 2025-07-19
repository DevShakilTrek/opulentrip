import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import { clerkMiddleware } from "@clerk/express";

// Routes
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Ensure raw body is parsed for webhooks BEFORE express.json() if you need it.
// For Clerk webhooks, they expect the raw body, so place this specifically for that route.
app.use("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks); // Clerk Webhook specific middleware

app.use(clerkMiddleware()); // Clerk auth middleware for other routes

// API Routes
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

// Root route
app.get("/", (req, res) => res.send("🚀 API is Working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));