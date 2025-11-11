import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./contactroute.js";
import quoteRoutes from "./quoteroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

const allowedOrigins = [
  "http://localhost:5173",
  "https://reazpartyrentals.onrender.com/",
];

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
  })
);



app.use(express.json());

// --- Routes ---
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);

// --- Test Route ---
app.get("/", (req, res) => res.json({ message: "✅ Server is running..." }));

// --- Error Handler ---
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
