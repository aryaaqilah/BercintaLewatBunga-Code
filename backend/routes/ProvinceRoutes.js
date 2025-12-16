import express from "express";
import Province from "../models/Province.js";

const router = express.Router();

// ➕ Tambah Province (POST /api/provinces)
router.post("/", async (req, res) => {
  try {
    const province = new Province(req.body);
    await province.save();
    res.status(201).json(province);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua Province (GET /api/provinces)
router.get("/", async (req, res) => {
  try {
    const provinces = await Province.find();
    res.json(provinces);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil Province Berdasarkan ID (GET /api/provinces/:id)
router.get("/:id", async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    if (!province) return res.status(404).json({ error: "Province not found" });
    res.json(province);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update Province (PUT /api/provinces/:id)
router.put("/:id", async (req, res) => {
  try {
    const province = await Province.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!province) return res.status(404).json({ error: "Province not found" });
    res.json(province);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus Province (DELETE /api/provinces/:id)
router.delete("/:id", async (req, res) => {
  try {
    const province = await Province.findByIdAndDelete(req.params.id);
    if (!province) return res.status(404).json({ error: "Province not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;