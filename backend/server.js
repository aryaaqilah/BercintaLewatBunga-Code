import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import design3DRoutes from "./routes/design3DRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// === Konfigurasi path untuk folder publik ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Middleware ===
app.use(cors({ origin: "http://localhost:3000" })); // izinkan frontend React
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Folder publik untuk file model (GLB, dsb) ===
app.use("/models", express.static(path.join(__dirname, "public", "models")));

// === Routes ===
app.use("/api/design3d", design3DRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);

// === Tes koneksi backend ===
app.get("/", (req, res) => {
  res.send("✅ Backend florist-3d API is running!");
});

// === Koneksi ke MongoDB ===
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// === Jalankan server ===
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
