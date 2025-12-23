import express from "express";
import District from "../models/District.js";

const router = express.Router();

// ➕ Tambah District (POST /api/districts)
router.post("/", async (req, res) => {
  try {
    const district = new District(req.body);
    await district.save();
    res.status(201).json(district);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua District (GET /api/districts)
router.get("/", async (req, res) => {
  try {
    const districts = await District.find().populate('City');
    res.json(districts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil District Berdasarkan ID (GET /api/districts/:id)
router.get("/:id", async (req, res) => {
  try {
    const district = await District.findById(req.params.id).populate('City');
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json(district);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update District (PUT /api/districts/:id)
router.put("/:id", async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('City');
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json(district);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus District (DELETE /api/districts/:id)
router.delete("/:id", async (req, res) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return res.status(404).json({ error: "District not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;