import express from "express";
import Discount from "../models/Discount.js";

const router = express.Router();

// ➕ Tambah Discount (POST /api/discounts)
router.post("/", async (req, res) => {
  try {
    const discount = new Discount(req.body);
    await discount.save();
    res.status(201).json(discount);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua Discount (GET /api/discounts)
router.get("/", async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.json(discounts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil Discount Berdasarkan ID (GET /api/discounts/:id)
router.get("/:id", async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.json(discount);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update Discount (PUT /api/discounts/:id)
router.put("/:id", async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.json(discount);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus Discount (DELETE /api/discounts/:id)
router.delete("/:id", async (req, res) => {
  try {
    const discount = await Discount.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;