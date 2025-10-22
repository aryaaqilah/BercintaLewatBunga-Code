import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Tambah user baru
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ambil semua user
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default router;
