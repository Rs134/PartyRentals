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
    credentials: true,
  })
);

app.options("/*", cors()); // ✅ handle preflight safely
app.use(express.json());

// --- Routes ---
app.use("/api/contact", contactRoutes);
app.use("/api/quote", quoteRoutes);

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("✅ Party Rentals backend running successfully!");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
