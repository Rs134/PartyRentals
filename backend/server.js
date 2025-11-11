import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./contactroute.js";
import quoteRoutes from "./quoteroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// ✅ FIX: Configure CORS properly
app.use(
  cors({
    origin: "http://localhost:5173", // your React dev server
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  })
);

app.use(express.json());

// --- Routes ---
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);

// --- Test Route ---
app.get("/", (req, res) => res.send("✅ Server is running..."));

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
