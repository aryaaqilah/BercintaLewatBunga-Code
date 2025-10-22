import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import designRoutes from "./routes/designRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Routes
app.use("/api/users", userRoutes);
app.use("/api/designs", designRoutes);

// 🧠 Koneksi MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
