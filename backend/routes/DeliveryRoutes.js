import express from "express";
import Delivery from "../models/Delivery.js";

const router = express.Router();

// ➕ Tambah Delivery (POST /api/deliveries)
router.post("/", async (req, res) => {
  try {
    const delivery = new Delivery(req.body);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua Delivery (GET /api/deliveries)
router.get("/", async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil Delivery Berdasarkan ID (GET /api/deliveries/:id)
router.get("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.json(delivery);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update Delivery (PUT /api/deliveries/:id)
router.put("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.json(delivery);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus Delivery (DELETE /api/deliveries/:id)
router.delete("/:id", async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) return res.status(404).json({ error: "Delivery not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;