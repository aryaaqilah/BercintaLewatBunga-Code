import express from "express";
import City from "../models/City.js";

const router = express.Router();

// ➕ Tambah City (POST /api/cities)
router.post("/", async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua City (GET /api/cities)
router.get("/", async (req, res) => {
  try {
    const cities = await City.find().populate('Province');
    res.json(cities);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil City Berdasarkan ID (GET /api/cities/:id)
router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('Province');
    if (!city) return res.status(404).json({ error: "City not found" });
    res.json(city);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update City (PUT /api/cities/:id)
router.put("/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('Province');
    if (!city) return res.status(404).json({ error: "City not found" });
    res.json(city);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus City (DELETE /api/cities/:id)
router.delete("/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ error: "City not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;