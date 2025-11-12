import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./contactroute.js";
import quoteRoutes from "./quoteroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// ✅ Include both dev and deployed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://reazpartyrentals.onrender.com"
];

// ✅ Apply CORS globally and correctly
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// ✅ Ensure Express can handle preflight requests automatically

app.use(express.json());

// --- Routes ---
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);

// --- Root Test Route ---
app.get("/", (req, res) => {
  res.json({ message: "✅ Party Rentals backend is running..." });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res
    .status(500)
    .json({ success: false, message: "Internal Server Error (CORS or Mail)" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
