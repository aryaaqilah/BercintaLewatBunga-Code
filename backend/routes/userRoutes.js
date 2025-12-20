import express from "express";
import User from "../models/User.js";

const router = express.Router();

// 🚀 Tambah User Baru (POST /api/users)
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log("Membuat user baru:", user);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 Ambil Semua User (GET /api/users)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate('Orders');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ "Email": email, "Password": password });
    
    if (!user) {
      return res.status(404).json({ error: "Input Tidak Valid" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔎 Ambil User Berdasarkan ID (GET /api/users/:id)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('Orders');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✍️ Update User Berdasarkan ID (PUT /api/users/:id)
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id/add-order", async (req, res) => {
  try {
    const userId = req.params.id;
    const { OrderId } = req.body;

    console.log("User ID:", userId);
    console.log("Order ID:", OrderId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        // DI SINI LETAK $PUSH
        $push: { Orders: OrderId } 
      },
      { new: true } // Mengembalikan data user yang sudah terupdate
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Gagal update user", error });
  }
});

// 🗑️ Hapus User Berdasarkan ID (DELETE /api/users/:id)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;