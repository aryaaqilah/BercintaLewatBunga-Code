import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import design3DRoutes from "./routes/design3DRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Gunakan semua routes
app.use("/api/design3d", design3DRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
