import express from "express";
import Address from "../models/Address.js";

const router = express.Router();

// Tambah address baru
router.post("/", async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ambil semua address
router.get("/", async (req, res) => {
  const addresses = await Address.find();
  res.json(addresses);
});

// Ambil address berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.json(address);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
